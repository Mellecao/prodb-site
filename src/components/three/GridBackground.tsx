// src/components/three/GridBackground.tsx
"use client";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface GridBackgroundProps {
  opacity?: number;
  className?: string;
}

export function GridBackground({ opacity = 1, className = "" }: GridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    let visible = true;

    // Pause rendering when section is scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { rootMargin: "80px" }
    );
    io.observe(container);

    const init = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(0, 8, 14);
      camera.lookAt(0, 0, 0);

      // antialias: false — grid lines don't need MSAA, this halves GPU cost
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
      container.appendChild(renderer.domElement);

      // Rectangular grid: very wide in X (no visible lateral edges), normal depth in Z
      const GRID_W = 500;   // total X extent (±250) — lateral edges never visible
      const GRID_D = 60;    // total Z depth (±30) — same as before
      const CELL = 2;       // cell size — same visual density as before

      const positions: number[] = [];
      // Lines running along X (parallel to X-axis, spaced in Z)
      for (let z = -GRID_D / 2; z <= GRID_D / 2; z += CELL) {
        positions.push(-GRID_W / 2, 0, z,  GRID_W / 2, 0, z);
      }
      // Lines running along Z (parallel to Z-axis, spaced in X)
      for (let x = -GRID_W / 2; x <= GRID_W / 2; x += CELL) {
        positions.push(x, 0, -GRID_D / 2,  x, 0, GRID_D / 2);
      }

      const gridGeo = new THREE.BufferGeometry();
      gridGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
      const gridMat = new THREE.LineBasicMaterial({ color: "#018DEE", opacity: 0.15, transparent: true });
      scene.add(new THREE.LineSegments(gridGeo, gridMat));

      // Brighter center horizontal line, same wide extent
      const centerGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-GRID_W / 2, 0, 0),
        new THREE.Vector3( GRID_W / 2, 0, 0),
      ]);
      const centerMat = new THREE.LineBasicMaterial({ color: "#018DEE", opacity: 0.4, transparent: true });
      scene.add(new THREE.Line(centerGeo, centerMat));

      // Floating particles
      const pCount = 80;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const c1 = new THREE.Color("#018DEE");
      const c2 = new THREE.Color("#01AFE2");
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3]     = (Math.random() - 0.5) * 50;
        pPos[i * 3 + 1] = Math.random() * 10;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        const m = c1.clone().lerp(c2, Math.random());
        pCol[i * 3] = m.r; pCol[i * 3 + 1] = m.g; pCol[i * 3 + 2] = m.b;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color",    new THREE.BufferAttribute(pCol, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.6 });
      const points = new THREE.Points(pGeo, pMat);
      scene.add(points);

      // State for smooth camera mouse-tracking
      let mouseNX = 0; // normalised -1..+1
      let mouseNY = 0;
      let scrollProgress = 0;

      const onMouseMove = (e: MouseEvent) => {
        mouseNX = (e.clientX / window.innerWidth)  * 2 - 1;
        mouseNY = (e.clientY / window.innerHeight) * 2 - 1;
      };
      const onScroll = () => {
        scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("scroll",    onScroll,    { passive: true });

      let t = 0;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        // Skip GPU work entirely when off-screen
        if (!visible) return;

        t += 0.005;

        // Target camera position: scroll drives Y, mouse drives X and fine-tunes Y
        const baseY   = 8 - scrollProgress * 3;
        const targetX = mouseNX * 3.5;     // ±3.5 units left/right
        const targetY = baseY - mouseNY;   // ±1 unit up/down (inverted so up-cursor lifts cam)

        // Smooth lerp — 0.035 gives a fluid ~0.4 s response
        camera.position.x += (targetX - camera.position.x) * 0.035;
        camera.position.y += (targetY - camera.position.y) * 0.035;

        camera.lookAt(0, 0, 0);
        points.rotation.y = t * 0.1;
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(rafId);
        io.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("scroll",    onScroll);
        window.removeEventListener("resize",    onResize);
        gridGeo.dispose();
        gridMat.dispose();
        centerGeo.dispose();
        centerMat.dispose();
        pGeo.dispose();
        pMat.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => { cleanup?.(); cancelAnimationFrame(rafId); io.disconnect(); };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(1,141,238,0.12), transparent 60%)",
          opacity,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    />
  );
}

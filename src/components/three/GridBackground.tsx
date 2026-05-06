// src/components/three/GridBackground.tsx
"use client";
import { useEffect, useRef } from "react";
import type { LineBasicMaterial } from "three";
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

    const init = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(0, 8, 14);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
      container.appendChild(renderer.domElement);

      // Grid
      const gridHelper = new THREE.GridHelper(60, 30, "#018DEE", "#018DEE");
      const gridMat = gridHelper.material as LineBasicMaterial;
      gridMat.opacity = 0.15;
      gridMat.transparent = true;
      gridHelper.rotation.x = 0;
      scene.add(gridHelper);

      // Center line brighter
      const centerGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-30, 0, 0), new THREE.Vector3(30, 0, 0)
      ]);
      const centerMat = new THREE.LineBasicMaterial({ color: "#018DEE", opacity: 0.4, transparent: true });
      scene.add(new THREE.Line(centerGeo, centerMat));

      // Particles
      const pCount = 80;
      const pPositions = new Float32Array(pCount * 3);
      const pColors = new Float32Array(pCount * 3);
      const c1 = new THREE.Color("#018DEE");
      const c2 = new THREE.Color("#01AFE2");
      for (let i = 0; i < pCount; i++) {
        pPositions[i * 3] = (Math.random() - 0.5) * 50;
        pPositions[i * 3 + 1] = Math.random() * 10;
        pPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        const mixed = c1.clone().lerp(c2, Math.random());
        pColors[i * 3] = mixed.r; pColors[i * 3 + 1] = mixed.g; pColors[i * 3 + 2] = mixed.b;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.6 });
      const points = new THREE.Points(pGeo, pMat);
      scene.add(points);

      let scrollProgress = 0;
      const onScroll = () => {
        scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      let t = 0;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        t += 0.005;
        camera.position.y = 8 - scrollProgress * 3;
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
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => { cleanup?.(); cancelAnimationFrame(rafId); };
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

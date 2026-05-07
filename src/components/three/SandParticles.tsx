// src/components/three/SandParticles.tsx
"use client";
import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { useIsMobile } from "@/hooks/useIsMobile";

export function SandParticles() {
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
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
      container.appendChild(renderer.domElement);

      // Circular sprite texture
      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = 32;
      spriteCanvas.height = 32;
      const ctx = spriteCanvas.getContext("2d")!;
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 14);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.6, "rgba(255,255,255,0.8)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      const texture = new THREE.CanvasTexture(spriteCanvas);

      const count = 450;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const phases = new Float32Array(count * 3);
      const speeds = new Float32Array(count * 3);
      const amplitudes = new Float32Array(count * 3);

      const darkBlue = new THREE.Color("#012d5e");
      const midBlue = new THREE.Color("#014f99");
      const brightBlue = new THREE.Color("#018DEE");
      const lightBlue = new THREE.Color("#01AFE2");

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

        phases[i * 3]     = Math.random() * Math.PI * 2;
        phases[i * 3 + 1] = Math.random() * Math.PI * 2;
        phases[i * 3 + 2] = Math.random() * Math.PI * 2;

        speeds[i * 3]     = 0.15 + Math.random() * 0.25;
        speeds[i * 3 + 1] = 0.1  + Math.random() * 0.2;
        speeds[i * 3 + 2] = 0.08 + Math.random() * 0.15;

        amplitudes[i * 3]     = 0.08 + Math.random() * 0.25;
        amplitudes[i * 3 + 1] = 0.08 + Math.random() * 0.2;
        amplitudes[i * 3 + 2] = 0.03 + Math.random() * 0.1;

        const t = Math.random();
        let color: THREE.Color;
        if (t < 0.3)       color = darkBlue.clone();
        else if (t < 0.55) color = midBlue.clone();
        else if (t < 0.8)  color = brightBlue.clone();
        else               color = lightBlue.clone();

        colors[i * 3]     = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const origPositions = positions.slice();

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 4,
        map: texture,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        sizeAttenuation: false,
        alphaTest: 0.05,
        depthWrite: false,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      let t = 0;

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        t += 0.008;

        for (let i = 0; i < count; i++) {
          positions[i * 3]     = origPositions[i * 3]     + Math.sin(t * speeds[i * 3]     + phases[i * 3])     * amplitudes[i * 3];
          positions[i * 3 + 1] = origPositions[i * 3 + 1] + Math.sin(t * speeds[i * 3 + 1] + phases[i * 3 + 1]) * amplitudes[i * 3 + 1];
          positions[i * 3 + 2] = origPositions[i * 3 + 2] + Math.cos(t * speeds[i * 3 + 2] + phases[i * 3 + 2]) * amplitudes[i * 3 + 2];
        }
        posAttr.needsUpdate = true;

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
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geo.dispose();
        mat.dispose();
        texture.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => { cleanup?.(); cancelAnimationFrame(rafId); };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-[4]"
    />
  );
}

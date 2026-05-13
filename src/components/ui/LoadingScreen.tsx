// src/components/ui/LoadingScreen.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type * as THREE from "three";

const _threePromise = import("three");
const _gltfLoaderPromise = import("three/examples/jsm/loaders/GLTFLoader.js");

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

export function LoadingScreen() {
  const pathname = usePathname();
  const mountRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("show");
  const [modelLoaded, setModelLoaded] = useState(false);

  // Mode locked at mount: '/' = GLB on every full reload; everything else = simple SVG.
  const [mode] = useState<"glb" | "simple">(() => (pathname === "/" ? "glb" : "simple"));

  // GLB mode
  useEffect(() => {
    if (mode !== "glb") return;
    const container = mountRef.current;
    if (!container) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;

    // Smoothly animate the bar from 0 → 65 % during fetch + parse + setup, regardless of network.
    // The remaining 65 → 100 % is driven by the spin animation.
    const FAKE_TARGET = 65;
    let fake = 0;
    const fakeId = window.setInterval(() => {
      // Asymptotic ease — fast start, slow approach.
      fake += (FAKE_TARGET - fake) * 0.04;
      if (barRef.current) barRef.current.style.width = `${fake}%`;
    }, 16);

    const setBar = (pct: number) => {
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };

    const glbPromise = fetch("/models/logo-prodb-3d.glb").then((r) => r.arrayBuffer());

    (async () => {
      const [THREE, { GLTFLoader }, glbBuffer] = await Promise.all([
        _threePromise,
        _gltfLoaderPromise,
        glbPromise,
      ]);
      if (cancelled) return;

      // Yield so the spinner / bar can paint a frame between heavy steps.
      await nextFrame();

      const mobile = window.innerWidth < 768;
      const size = mobile ? 380 : 720;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
      camera.position.z = mobile ? 4.2 : 2.5;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      // Cap DPR at 1.5 — pixel-perfect at no real visual cost on retina, much cheaper to render.
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setSize(size, size);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.85));
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(1, 2, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x018dee, 1.0);
      rim.position.set(-3, 0.5, -3);
      scene.add(rim);
      const fill = new THREE.DirectionalLight(0x01afe2, 0.35);
      fill.position.set(2, -1.5, 2);
      scene.add(fill);

      const cloudMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#018DEE"),
        roughness: 0.18,
        metalness: 0.12,
        side: THREE.DoubleSide,
      });
      const bodyMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f0f4ff"),
        roughness: 0.28,
        metalness: 0.06,
        side: THREE.DoubleSide,
      });

      // Parse the GLB. parse() is synchronous so wrap in a Promise + yield around it.
      const gltf = await new Promise<{ scene: THREE.Group }>((resolve) => {
        new GLTFLoader().parse(glbBuffer, "", (g) => resolve(g as { scene: THREE.Group }));
      });
      if (cancelled) return;
      await nextFrame();

      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      model.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          const n = mesh.name.toLowerCase();
          mesh.material = n.includes("cloud") || n.includes("nuvem") ? cloudMat : bodyMat;
        }
      });

      scene.add(model);
      await nextFrame();

      // ⚡ Pre-compile every shader BEFORE the first frame of the spin animation.
      // This is what removes the ~100-300 ms hitch on the first render call.
      // compileAsync uses KHR_parallel_shader_compile when supported by the GPU.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = renderer as any;
      if (typeof r.compileAsync === "function") {
        await r.compileAsync(scene, camera);
      } else {
        renderer.compile(scene, camera);
      }
      if (cancelled) return;

      // One warm-up render to push the very first draw out of the visible animation window.
      renderer.render(scene, camera);

      // Stop the fake progress; spin animation drives the bar to 100 from here.
      window.clearInterval(fakeId);
      setModelLoaded(true);

      const SPIN_MS = 1400;
      const start = performance.now();
      const startBar = fake; // continue from wherever fake progress reached

      const tick = () => {
        const p = Math.min((performance.now() - start) / SPIN_MS, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        model.rotation.y = eased * Math.PI * 2;
        setBar(startBar + (100 - startBar) * p);
        renderer.render(scene, camera);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            setPhase("fade");
            window.dispatchEvent(new CustomEvent("prodb:loading-done"));
            setTimeout(() => setPhase("gone"), 700);
          }, 320);
        }
      };
      rafRef.current = requestAnimationFrame(tick);

      dispose = () => {
        cancelAnimationFrame(rafRef.current);
        window.clearInterval(fakeId);
        renderer.dispose();
        cloudMat.dispose();
        bodyMat.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    })();

    return () => {
      cancelled = true;
      window.clearInterval(fakeId);
      dispose?.();
    };
  }, [mode]);

  // Simple mode — symbol + progress bar
  useEffect(() => {
    if (mode !== "simple") return;

    let p = 0;
    const id = setInterval(() => {
      p = Math.min(p + 100 / 40, 100);
      if (barRef.current) barRef.current.style.width = `${p}%`;
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => {
          setPhase("fade");
          window.dispatchEvent(new CustomEvent("prodb:loading-done"));
          setTimeout(() => setPhase("gone"), 700);
        }, 220);
      }
    }, 1000 / 40);

    return () => clearInterval(id);
  }, [mode]);

  if (phase === "gone") return null;

  const cls = `fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ${
    phase === "fade" ? "opacity-0 pointer-events-none" : "opacity-100"
  }`;

  if (mode === "simple") {
    return (
      <div className={cls} style={{ background: "#040810" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            width: 360, height: 360, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(1,141,238,0.14) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/prodb-logo-branco.svg"
              alt=""
              className="h-10 object-contain select-none"
              style={{ filter: "drop-shadow(0 0 18px rgba(1,141,238,0.7)) drop-shadow(0 0 6px rgba(1,175,226,0.4))" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/birthday-hat.svg"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none select-none"
              style={{ width: 22, height: 29, top: -22, left: -2, transform: "rotate(-14deg)" }}
            />
          </div>
          <div className="overflow-hidden rounded-full" style={{ width: 120, height: 2, background: "rgba(255,255,255,0.07)" }}>
            <div
              ref={barRef}
              style={{
                height: "100%", width: "0%",
                background: "linear-gradient(90deg, #018DEE, #01AFE2)",
                borderRadius: "9999px",
                transition: "width 0.03s linear",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cls} style={{ background: "#040810" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: 640, height: 640, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(1,141,238,0.18) 0%, rgba(1,175,226,0.07) 40%, transparent 65%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-7">
        {!modelLoaded && mode === "glb" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
            <div
              className="rounded-full border-2 border-transparent animate-spin"
              style={{ width: 72, height: 72, borderTopColor: "#018DEE", borderRightColor: "rgba(1,141,238,0.3)", animationDuration: "0.9s" }}
            />
          </div>
        )}
        <div ref={mountRef} className="w-[380px] h-[380px] md:w-[720px] md:h-[720px]" />
        <div className="overflow-hidden rounded-full" style={{ width: 112, height: 2, background: "rgba(255,255,255,0.08)" }}>
          <div
            ref={barRef}
            style={{
              height: "100%", width: "0%",
              background: "linear-gradient(90deg, #018DEE, #01AFE2)",
              borderRadius: "9999px",
              transition: "width 60ms linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}

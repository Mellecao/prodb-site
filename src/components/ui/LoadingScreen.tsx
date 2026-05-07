// src/components/ui/LoadingScreen.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type * as THREE from "three";

const _threePromise = import("three");
const _gltfLoaderPromise = import("three/examples/jsm/loaders/GLTFLoader.js");

export function LoadingScreen() {
  const pathname = usePathname();
  const mountRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("show");
  const [modelLoaded, setModelLoaded] = useState(false);

  // Mode is captured ONCE at mount based on the current route.
  // useState's lazy initializer means SPA navigations won't change it.
  // — index ('/') always shows GLB on full page load
  // — every other page shows the simple SVG loader
  const [mode] = useState<"glb" | "simple">(() => (pathname === "/" ? "glb" : "simple"));

  // GLB mode
  useEffect(() => {
    if (mode !== "glb") return;
    const container = mountRef.current;
    if (!container) return;

    const glbPromise = fetch("/models/logo-prodb-3d.glb").then((r) => r.arrayBuffer());
    let dispose: (() => void) | undefined;

    (async () => {
      const [THREE, { GLTFLoader }, glbBuffer] = await Promise.all([
        _threePromise,
        _gltfLoaderPromise,
        glbPromise,
      ]);

      const mobile = window.innerWidth < 768;
      const size = mobile ? 380 : 720;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
      camera.position.z = mobile ? 4.2 : 2.5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
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

      new GLTFLoader().parse(glbBuffer, "", (gltf) => {
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
        setModelLoaded(true);

        const SPIN_MS = 1400;
        const start = performance.now();

        const tick = () => {
          const p = Math.min((performance.now() - start) / SPIN_MS, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          model.rotation.y = eased * Math.PI * 2;
          if (barRef.current) barRef.current.style.width = `${p * 100}%`;
          renderer.render(scene, camera);
          if (p < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            setTimeout(() => {
              setPhase("fade");
              setTimeout(() => setPhase("gone"), 700);
            }, 380);
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      });

      dispose = () => {
        cancelAnimationFrame(rafRef.current);
        renderer.dispose();
        cloudMat.dispose();
        bodyMat.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    })();

    return () => dispose?.();
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/prodb-logo-branco.svg"
            alt=""
            className="h-10 object-contain select-none"
            style={{ filter: "drop-shadow(0 0 18px rgba(1,141,238,0.7)) drop-shadow(0 0 6px rgba(1,175,226,0.4))" }}
          />
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

  // GLB loader (first visit) — also shown while mode is null (initial render)
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
            style={{ height: "100%", width: "0%", background: "linear-gradient(90deg, #018DEE, #01AFE2)", borderRadius: "9999px" }}
          />
        </div>
      </div>
    </div>
  );
}

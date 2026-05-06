// src/components/ui/CustomCursor.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 1.5, borderColor: "#01AFE2", duration: 0.3 });
    };
    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, borderColor: "#018DEE", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Crosshair + dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="relative w-5 h-5">
          <div className="absolute top-1/2 left-0 w-full h-px bg-blue-primary/30 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-blue-primary/30 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[5px] h-[5px] rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 36,
          height: 36,
          border: "1.5px solid #018DEE",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}

// src/components/ui/ScrollTrail.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { useIsMobile } from "@/hooks/useIsMobile";

export function ScrollTrail() {
  const countRef = useRef(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    let lastY = window.scrollY;
    let lastTime = Date.now();

    const spawn = (scrollY: number) => {
      const now = Date.now();
      const delta = Math.abs(scrollY - lastY);
      if (delta < 4 || countRef.current >= 12) return;
      if (now - lastTime < 40) return;
      lastTime = now;
      lastY = scrollY;

      const particle = document.createElement("div");
      const x = window.innerWidth - 12;
      const y = (scrollY / (document.body.scrollHeight - window.innerHeight)) * window.innerHeight;

      Object.assign(particle.style, {
        position: "fixed",
        left: `${x}px`,
        top: `${y}px`,
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: "#018DEE",
        filter: "blur(2px)",
        pointerEvents: "none",
        zIndex: "9990",
        transform: "translate(-50%, -50%)",
      });

      document.body.appendChild(particle);
      countRef.current++;

      gsap.to(particle, {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
          countRef.current = Math.max(0, countRef.current - 1);
        },
      });
    };

    const onScroll = () => spawn(window.scrollY);
    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", ({ scroll }: { scroll: number }) => spawn(scroll));
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMobile]);

  return null;
}

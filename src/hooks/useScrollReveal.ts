// src/hooks/useScrollReveal.ts
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: { y?: number; opacity?: number; duration?: number; stagger?: number; start?: string } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { y = 30, opacity = 0, duration = 0.7, stagger = 0.08, start = "top 85%" } = options;

    const targets = el.children.length > 1 ? Array.from(el.children) : [el];

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.from(targets, { y, opacity, duration, stagger, ease: "power3.out" });
      },
    });

    return () => trigger.kill();
  }, []);

  return ref;
}

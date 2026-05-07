"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface GlitchTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function GlitchText({ text, as: Tag = "h2", className = "" }: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLSpanElement>(".rw"));
    gsap.set(words, { opacity: 0, y: 18, filter: "blur(4px)" });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        gsap.to(words, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
        });
      },
    });

    return () => trigger.kill();
  }, [text]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`font-black tracking-tight ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="rw inline-block" style={{ marginRight: "0.28em", opacity: 0 }}>
          {word}
        </span>
      ))}
    </Tag>
  );
}

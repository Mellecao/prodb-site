"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface GlitchTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function GlitchText({ text, as: Tag = "h2", className = "" }: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(text);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (triggeredRef.current) return;
        triggeredRef.current = true;

        let iteration = 0;
        const interval = setInterval(() => {
          setDisplay(
            text
              .split("")
              .map((char, i) => {
                if (i < iteration) return char;
                if (char === " ") return " ";
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join("")
          );
          iteration += 0.5;
          if (iteration >= text.length) {
            clearInterval(interval);
            setDisplay(text);
          }
        }, 50);
      },
    });

    return () => trigger.kill();
  }, [text]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`font-black tracking-tight ${className}`}>
      {display}
    </Tag>
  );
}

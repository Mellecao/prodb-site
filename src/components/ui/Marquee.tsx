"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

interface MarqueeProps {
  items: { src: string; alt: string }[];
  speed?: number;
  className?: string;
}

export function Marquee({ items, speed = 25, className = "" }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    tlRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tlRef.current?.timeScale(0.2);
    const resume = () => tlRef.current?.timeScale(1);

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      tlRef.current?.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, [speed]);

  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex gap-16 w-max">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center justify-center h-10 w-32 shrink-0">
            <Image
              src={item.src}
              alt={item.alt}
              width={120}
              height={40}
              className="object-contain"
              style={{ filter: "brightness(0) invert(0.5)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

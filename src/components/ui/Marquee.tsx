"use client";
import { useEffect, useRef, useState } from "react";
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
  // Start with 3 copies — enough for most viewports during SSR / first paint
  const [copies, setCopies] = useState(3);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!items.length) return;

    const setup = () => {
      // Need at least 2 copies in the DOM to measure one copy's width
      if (track.children.length < items.length * 2) return;

      const secondCopyFirstChild = track.children[items.length] as HTMLElement;
      const oneCopyWidth = secondCopyFirstChild.offsetLeft;
      if (oneCopyWidth <= 0) return;

      // Track must be wide enough that, even when the animation has scrolled
      // by one full copy, the right edge of the viewport is still covered.
      // Required total = viewportWidth + oneCopyWidth (with a small margin).
      const required = window.innerWidth + oneCopyWidth + 32;
      const neededCopies = Math.ceil(required / oneCopyWidth);

      if (neededCopies > copies) {
        setCopies(neededCopies);
        return; // re-run after re-render
      }

      tlRef.current?.kill();
      gsap.set(track, { x: 0 });

      tlRef.current = gsap.to(track, {
        x: -oneCopyWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };

    setup();

    const imgs = Array.from(track.querySelectorAll("img"));
    let pending = imgs.filter((img) => !img.complete).length;
    const onLoad = () => {
      pending--;
      if (pending <= 0) setup();
    };
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onLoad);
    });

    const ro = new ResizeObserver(() => setup());
    ro.observe(track);
    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      tlRef.current?.kill();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      imgs.forEach((img) => img.removeEventListener("load", onLoad));
    };
  }, [speed, items.length, copies]);

  const repeated = Array.from({ length: copies }, () => items).flat();

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
    >
      <div ref={trackRef} className="flex gap-20 w-max">
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center justify-center h-14 w-44 shrink-0">
            <Image
              src={item.src}
              alt={item.alt}
              width={168}
              height={56}
              className="object-contain"
              style={{ filter: "brightness(0) invert(0.55)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

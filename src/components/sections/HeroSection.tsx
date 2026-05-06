// src/components/sections/HeroSection.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GridBackground } from "@/components/three/GridBackground";
import { TypingText } from "@/components/ui/TypingText";
import Link from "next/link";

interface HeroSectionProps {
  tag?: string;
  title: string;
  subtitle: string;
  ctas?: { label: string; href: string; primary?: boolean }[];
}

export function HeroSection({ tag, title, subtitle, ctas = [] }: HeroSectionProps) {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    if (tagRef.current) tl.from(tagRef.current, { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" });
    if (subtitleRef.current) tl.from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.1");
    if (ctasRef.current) tl.from(ctasRef.current.children, { y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.2");
  }, []);

  return (
    <section className="relative min-h-screen bg-bg-dark flex items-center overflow-hidden pt-24">
      <GridBackground opacity={0.9} />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(1,141,238,0.10) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full flex items-center gap-12">
        {/* Text */}
        <div className="flex flex-col flex-1 max-w-3xl">
          {tag && (
            <div ref={tagRef} className="text-blue-primary text-xs tracking-[3px] uppercase font-semibold mb-5">
              {tag}
            </div>
          )}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-[-2px] text-white mb-6">
            <TypingText text={title} speed={35} />
          </h1>

          <p ref={subtitleRef} className="text-white/55 text-lg leading-relaxed max-w-xl mb-8">
            {subtitle}
          </p>

          {ctas.length > 0 && (
            <div ref={ctasRef} className="flex flex-wrap gap-4">
              {ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={`px-7 py-3.5 rounded-full font-semibold text-sm transition-all ${
                    cta.primary
                      ? "bg-blue-primary text-white hover:bg-blue-dark-btn"
                      : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </div>


      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #040810)" }}
      />
    </section>
  );
}

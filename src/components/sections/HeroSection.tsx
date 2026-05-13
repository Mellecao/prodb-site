// src/components/sections/HeroSection.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SandParticles } from "@/components/three/SandParticles";
import { TypingText } from "@/components/ui/TypingText";
import { LiquidGlassV2 } from "@/components/ui/LiquidGlass";
import Link from "next/link";

interface HeroSectionProps {
  tag?: string;
  title: string;
  subtitle: string;
  ctas?: { label: string; href: string; primary?: boolean }[];
}

export function HeroSection({ tag, title, subtitle, ctas = [] }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const leftCloudRef = useRef<HTMLImageElement>(null);
  const rightCloudRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const end = window.innerHeight * 1.5;

    // Entrance animations — initial opacity set via CSS, GSAP animates TO visible
    if (subtitleRef.current) {
      gsap.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.5, ease: "power3.out" });
    }
    if (ctasRef.current) {
      gsap.to(ctasRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.75, ease: "power3.out" });
    }
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 1.1, ease: "power3.out" });
    }

    // Fade hero out over 1.5vh of scroll
    const fadeOut = gsap.to(section, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end,
        scrub: 1.5,
        onUpdate: (self) => {
          if (section) section.style.pointerEvents = self.progress >= 1 ? "none" : "";
        },
      },
    });

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const leftFloat = gsap.to(leftCloudRef.current, {
      y: -14, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1,
    });
    const rightFloat = gsap.to(rightCloudRef.current, {
      y: -9, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.7,
    });

    const leftSlide = gsap.to(leftCloudRef.current, {
      x: -(vw * 1.1), ease: "none",
      scrollTrigger: { start: 0, end: vh * 4, scrub: 3 },
    });
    const rightSlide = gsap.to(rightCloudRef.current, {
      x: vw * 1.1, ease: "none",
      scrollTrigger: { start: 0, end: vh * 3.5, scrub: 3 },
    });

    return () => {
      fadeOut.scrollTrigger?.kill();
      leftFloat.kill();
      rightFloat.kill();
      leftSlide.scrollTrigger?.kill();
      rightSlide.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[10] min-h-screen bg-blue-950 flex items-center overflow-hidden pt-24"
    >
      <style>{`
        @keyframes hero-mob-orb-a {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.3; }
          50% { transform: translateX(-50%) translateY(-24px) scale(1.12); opacity: 0.42; }
        }
        @keyframes hero-mob-orb-b {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          55% { transform: translateY(18px) scale(1.16); opacity: 0.3; }
        }
        @keyframes hero-mob-orb-c {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.14; }
          45% { transform: translateX(-50%) translateY(-12px) scale(1.06); opacity: 0.22; }
        }
        @keyframes hero-mob-scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 0.6; }
          100% { transform: translateY(200vh); opacity: 0; }
        }
      `}</style>

      {/* Mobile atmospheric background — replaces the flat bg-blue-950 */}
      <div aria-hidden="true" className="md:hidden absolute inset-0 z-[0] overflow-hidden pointer-events-none">
        {/* Richer dark gradient base */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(168deg, #071330 0%, #040d1f 30%, #020a18 58%, #010508 100%)" }}
        />
        {/* Primary blue core orb */}
        <div
          className="absolute"
          style={{
            top: "14%", left: "50%",
            width: 460, height: 460,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(1,141,238,0.38) 0%, rgba(1,85,185,0.14) 42%, transparent 68%)",
            filter: "blur(56px)",
            animation: "hero-mob-orb-a 7s ease-in-out infinite",
          }}
        />
        {/* Teal accent — upper right */}
        <div
          className="absolute"
          style={{
            top: "-8%", right: "-14%",
            width: 320, height: 320,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(1,175,226,0.26) 0%, transparent 62%)",
            filter: "blur(46px)",
            animation: "hero-mob-orb-b 9s 2.4s ease-in-out infinite",
          }}
        />
        {/* Deep indigo bottom anchor */}
        <div
          className="absolute"
          style={{
            bottom: "-2%", left: "50%",
            width: 540, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(2,14,52,0.75) 0%, transparent 70%)",
            filter: "blur(42px)",
            animation: "hero-mob-orb-c 6.5s 1.1s ease-in-out infinite",
          }}
        />
        {/* Subtle left bloom */}
        <div
          className="absolute"
          style={{
            top: "40%", left: "-8%",
            width: 220, height: 220,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(0,100,200,0.2) 0%, transparent 65%)",
            filter: "blur(36px)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(1,141,238,0.16) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.45,
          }}
        />
        {/* Slow scanning light line */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(1,175,226,0.45) 30%, rgba(1,210,255,0.65) 50%, rgba(1,175,226,0.45) 70%, transparent 100%)",
            filter: "blur(1px)",
            animation: "hero-mob-scanline 12s 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Video background — desktop only */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover pointer-events-none z-[1]"
        style={{ opacity: 0.45 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: [
            "radial-gradient(ellipse at center, transparent 10%, rgba(0,4,20,0.92) 100%)",
            "linear-gradient(to bottom, rgba(0,4,20,0.72) 0%, transparent 30%, transparent 60%, rgba(0,4,20,0.88) 100%)",
            "linear-gradient(to right, rgba(0,4,20,0.68) 0%, transparent 22%, transparent 78%, rgba(0,4,20,0.68) 100%)",
          ].join(", "),
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(1,141,238,0.12) 0%, transparent 55%)" }}
      />

      <SandParticles />

      {/* Centered text */}
      <div className="relative z-[10] w-full flex flex-col items-center text-center px-8" style={{ transform: "translateY(-150px)" }}>
        {/* Logo — mobile only, sits above the title */}
        <div className="md:hidden relative inline-block mb-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/prodb-logo-branco.svg"
            alt="Prodb"
            className="h-10 select-none"
            style={{ filter: "drop-shadow(0 0 16px rgba(1,141,238,0.5))" }}
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
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.06] tracking-[-2px] text-white mb-6 max-w-3xl"
          style={{
            textShadow: [
              "0 0 25px rgba(1,141,238,0.55)",
              "0 0 70px rgba(1,141,238,0.22)",
              "0 2px 18px rgba(0,0,0,0.85)",
            ].join(", "),
          }}
        >
          <TypingText text={title} speed={35} />
        </h1>
        <p ref={subtitleRef} className="text-white/55 text-lg leading-relaxed max-w-xl" style={{ opacity: 0, transform: "translateY(16px)" }}>
          {subtitle}
        </p>
      </div>

      {/* CTAs — bottom 172px on mobile (90px lower), 262px on desktop */}
      {ctas.length > 0 && (
        <div
          ref={ctasRef}
          className="absolute left-0 right-0 flex justify-center flex-wrap gap-4 px-8 bottom-[172px] md:bottom-[262px]"
          style={{ zIndex: 4, opacity: 0, transform: "translateY(16px)" }}
        >
          {ctas.map((cta) =>
            cta.primary ? (
              <Link
                key={cta.label}
                href={cta.href}
                className="px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "#018DEE" }}
              >
                {cta.label}
              </Link>
            ) : (
              <LiquidGlassV2 key={cta.label}>
                <Link href={cta.href} className="block px-7 py-3.5 font-semibold text-sm text-white">
                  {cta.label}
                </Link>
              </LiquidGlassV2>
            )
          )}
        </div>
      )}

      {/* Left cloud — desktop only */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={leftCloudRef}
        src="/assets/nuvem%20esquerda.png"
        alt=""
        className="hidden md:block absolute left-0 w-[78%] max-w-[960px] object-contain object-bottom select-none pointer-events-none"
        style={{ opacity: 0.3, bottom: "-120px", zIndex: 5 }}
      />
      {/* Right cloud — desktop only */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={rightCloudRef}
        src="/assets/nuvem%20direita.png"
        alt=""
        className="hidden md:block absolute right-0 w-[78%] max-w-[960px] object-contain object-bottom select-none pointer-events-none"
        style={{ opacity: 0.3, bottom: "-120px", zIndex: 6 }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[7]"
        style={{ background: "linear-gradient(to bottom, transparent, #040810)" }}
      />

      {/* Scroll indicator — desktop only */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-0 right-0 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: 0, transform: "translateY(12px)", zIndex: 8 }}
      >
        <span className="text-white/35 text-[9px] tracking-[6px] uppercase font-medium">Descubra</span>
        <div className="flex flex-col items-center gap-1">
          <div
            style={{
              width: 1,
              height: 28,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)",
            }}
          />
          <svg
            className="animate-bounce"
            style={{ animationDuration: "1.8s" }}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

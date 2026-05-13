"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Link from "next/link";
import { Counter } from "@/components/ui/Counter";

const stats = [
  { value: 550, suffix: "+", label: "empresas atendidas" },
  { value: 2,   suffix: "",  label: "data centers próprios" },
  { value: 99,  suffix: ",98%", label: "uptime garantido" },
  { value: 15,  suffix: "",  label: "anos de história", gold: true },
];

export function AnniversarySection() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    // Card entrance — scale + fade
    gsap.set(card, { opacity: 0, y: 40, scale: 0.97 });
    triggers.push(
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" });
        },
      })
    );

    // Individual content reveals
    const els = card.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 24 });
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.65, delay: i * 0.09, ease: "power3.out" });
          },
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section className="py-20 md:py-28 overflow-hidden" style={{ background: "#f9f9f9" }}>
      <div ref={wrapRef} className="max-w-[1100px] mx-auto px-5 md:px-8 relative">

        {/* Glow — blue, bottom-left */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            left: -50, bottom: -20,
            width: 560, height: 380,
            background: "radial-gradient(ellipse at center, rgba(1,141,238,0.26) 0%, transparent 68%)",
            filter: "blur(52px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        {/* Glow — gold, top-right */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            right: -50, top: -20,
            width: 460, height: 320,
            background: "radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 68%)",
            filter: "blur(52px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        {/* ── Card ── */}
        <div
          ref={cardRef}
          className="relative overflow-hidden"
          style={{
            borderRadius: 40,
            background: "linear-gradient(145deg, #060D1F 0%, #0C1830 32%, #080F1C 62%, #050810 100%)",
            padding: "clamp(40px, 6vw, 72px) clamp(28px, 5vw, 64px)",
            zIndex: 1,
            // subtle border catching the glows from outside
            boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 32px 80px rgba(0,0,0,0.18)",
          }}
        >
          {/* Top gold accent line */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.6) 30%, rgba(232,201,106,0.95) 50%, rgba(201,168,76,0.6) 70%, transparent 100%)",
            }}
          />

          {/* Glass sheen — top portion */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              top: 0, left: 0, right: 0,
              height: "42%",
              borderRadius: "40px 40px 0 0",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.028) 0%, transparent 100%)",
            }}
          />

          {/* Grain texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.018,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
            }}
          />

          {/* Inner diagonal ambient — mirrors the card gradient with a soft cross-light */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 10% 90%, rgba(1,141,238,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 45% at 90% 10%, rgba(212,175,55,0.055) 0%, transparent 55%)",
            }}
          />

          {/* ── Content ── */}
          <div className="relative z-10">

            {/* Badge */}
            <div className="flex justify-center mb-8" data-reveal>
              <div
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.07)",
                  border: "1px solid rgba(212,175,55,0.26)",
                }}
              >
                <span
                  style={{
                    color: "#D4AF37",
                    fontSize: 11,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  ✦ 15 Anos ✦
                </span>
              </div>
            </div>

            {/* Headline */}
            <h2
              data-reveal
              className="text-center text-4xl md:text-[58px] font-black text-white leading-tight mb-6"
              style={{ letterSpacing: "-1.5px" }}
            >
              Quinze anos{" "}
              <span
                style={{
                  color: "#D4AF37",
                  textShadow: "0 0 50px rgba(212,175,55,0.4)",
                }}
              >
                transformando
              </span>
              <br className="hidden sm:block" />
              {" "}a nuvem no Brasil
            </h2>

            {/* Subtext */}
            <p
              data-reveal
              className="text-center text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-14"
            >
              Desde 2011, a ProDB entrega infraestrutura de ponta para empresas de todos os
              tamanhos. Uma jornada de inovação, confiança e crescimento lado a lado dos nossos
              clientes.
            </p>

            {/* Stats */}
            <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-5 md:p-6 rounded-2xl transition-colors duration-300"
                  style={{
                    background: stat.gold ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.03)",
                    border: stat.gold
                      ? "1px solid rgba(212,175,55,0.24)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="text-4xl md:text-5xl font-black tabular-nums"
                    style={{
                      color: stat.gold ? "#D4AF37" : "white",
                      textShadow: stat.gold
                        ? "0 0 24px rgba(212,175,55,0.55)"
                        : "0 0 22px rgba(1,141,238,0.32)",
                    }}
                  >
                    <Counter target={stat.value} suffix={stat.suffix} duration={2.2} />
                  </span>
                  <span className="text-white/45 text-xs md:text-sm mt-2 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div data-reveal className="flex justify-center">
              <Link
                href="/empresa"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:gap-5 hover:opacity-90"
                style={{
                  color: "#D4AF37",
                  background: "rgba(212,175,55,0.07)",
                  border: "1px solid rgba(212,175,55,0.38)",
                  boxShadow: "0 0 28px rgba(212,175,55,0.1)",
                }}
              >
                Conheça nossa história
                <span aria-hidden="true">→</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

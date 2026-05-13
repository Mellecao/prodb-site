// src/components/sections/TimelineSection.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const milestones = [
  {
    year: "2011",
    title: "O Início de Tudo",
    body: "A ProDB nasceu para oferecer serviços de administração em banco de dados para empresas de grande a pequeno porte em todo cenário nacional.",
  },
  {
    year: "2013",
    title: "Entrando na Nuvem",
    body: "Início da parceria com o data center Tier III Ascenty, aumentando o foco na qualidade, disponibilidade e segurança para nossos clientes e parceiros.",
  },
  {
    year: "2016",
    title: "Evolução Tecnológica",
    body: "Consolidação da parceria com a fornecedora DELL Technologies, transformando 100% de nossa infraestrutura.",
  },
  {
    year: "2021",
    title: "Lançamento do 2º Data Center",
    body: "Expansão da 2ª unidade de Data Center na cidade de Osasco, ampliando nossa capacidade e redundância.",
  },
  {
    year: "2026",
    title: "15 Anos de Inovação",
    body: "A ProDB celebra uma década e meia transformando a infraestrutura cloud no Brasil, com mais de 550 empresas confiando em nossa plataforma.",
  },
];

export function TimelineSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const itemRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    // ── Line scrub ──
    const line = lineRef.current;
    if (line) {
      gsap.set(line, { scaleY: 0 });
      triggers.push(
        ScrollTrigger.create({
          trigger: line.parentElement,
          start: "top 72%",
          end: "bottom 28%",
          scrub: 1.2,
          onUpdate: (self) => {
            gsap.set(line, { scaleY: self.progress });
          },
        })
      );
    }

    // ── Item reveals — set BEFORE creating triggers so elements start invisible ──
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      const fromX = i % 2 === 0 ? -36 : 36;
      gsap.set(item, { opacity: 0, x: fromX });
      triggers.push(
        ScrollTrigger.create({
          trigger: item,
          start: "top 84%",
          onEnter: () => {
            gsap.to(item, { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" });
          },
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-24 md:py-32 overflow-hidden">

      {/* Subtle top tint */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,141,238,0.25), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(1,141,238,0.025) 0%, transparent 100%)" }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="mb-20 text-center">
          <p className="text-xs tracking-[4px] uppercase font-bold mb-4" style={{ color: "#018DEE" }}>
            Trajetória
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Nossa Jornada
          </h2>
          <p className="text-gray-400 text-base mt-4 max-w-md mx-auto leading-relaxed">
            15 anos de história, inovação e crescimento ao lado dos nossos clientes.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Background track */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-px bg-gray-100 hidden md:block"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          />

          {/* Animated fill */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-px hidden md:block"
            style={{ left: "50%", transform: "translateX(-50%)", transformOrigin: "top" }}
          >
            <div
              ref={lineRef}
              className="w-full h-full origin-top"
              style={{
                background: "linear-gradient(to bottom, #018DEE, #01AFE2)",
              }}
            />
          </div>

          {/* Mobile track */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-px bg-gray-100 md:hidden"
            style={{ left: 20 }}
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* ── Content block ── */}
                  <div
                    className={`flex-1 pl-12 md:pl-0 ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}
                  >
                    {/* Year */}
                    <span
                      className="block text-5xl md:text-6xl font-black leading-none mb-3"
                      style={{ color: "#018DEE" }}
                    >
                      {m.year}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2 leading-snug">
                      {m.title}
                    </h3>

                    {/* Body */}
                    <p
                      className={`text-gray-400 text-sm leading-relaxed ${
                        isEven ? "md:ml-auto" : ""
                      }`}
                      style={{ maxWidth: 300 }}
                    >
                      {m.body}
                    </p>
                  </div>

                  {/* ── Center dot (desktop) ── */}
                  <div className="relative shrink-0 hidden md:flex items-center justify-center" style={{ width: 28, marginTop: 8 }}>
                    <div
                      className="w-4 h-4 rounded-full bg-white border-2 flex items-center justify-center"
                      style={{
                        borderColor: "#018DEE",
                        boxShadow: "0 0 0 5px rgba(1,141,238,0.10), 0 0 0 10px rgba(1,141,238,0.04)",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#018DEE" }} />
                    </div>
                  </div>

                  {/* ── Mobile dot ── */}
                  <div
                    className="absolute md:hidden flex items-center justify-center"
                    style={{ left: 12, top: 12 }}
                  >
                    <div
                      className="w-4 h-4 rounded-full bg-white border-2"
                      style={{
                        borderColor: "#018DEE",
                        boxShadow: "0 0 0 4px rgba(1,141,238,0.10)",
                      }}
                    />
                  </div>

                  {/* ── Empty spacer (desktop) ── */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom tint */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,141,238,0.15), transparent)" }}
      />
    </section>
  );
}

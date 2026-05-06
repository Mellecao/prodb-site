// src/components/sections/TimelineSection.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const milestones = [
  { year: "2011", title: "O Início de Tudo", body: "A Prodb nasceu para oferecer serviços de administração em banco de dados para empresas de grande a pequeno porte em todo cenário nacional." },
  { year: "2013", title: "Entrando na Nuvem", body: "Início da parceria com o data center Tier III Ascenty, aumentando o foco na qualidade, disponibilidade e segurança para nossos clientes e parceiros." },
  { year: "2016", title: "Evolução Tecnológica", body: "Consolidação da parceria com a fornecedora DELL Technologies transformando 100% de nossa infraestrutura." },
  { year: "2021", title: "Lançamento do 2º Data Center", body: "Expansão da 2ª unidade de Data Center na cidade de Osasco." },
  { year: "2025", title: "Foco na Experiência do Cliente", body: "A Prodb fortaleceu a escuta ativa para ajudar nas definições de projetos e ambientes, sempre com foco em qualidade." },
];

export function TimelineSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (line) {
      ScrollTrigger.create({
        trigger: line.parentElement,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(line, { scaleY: self.progress });
        },
      });
    }

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        onEnter: () => {
          gsap.from(item, { x: i % 2 === 0 ? -40 : 40, opacity: 0, duration: 0.7, ease: "power3.out" });
        },
      });
    });
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-16 text-center">
          <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-3">Trajetória</p>
          <h2 className="text-4xl font-black text-gray-900">Nossa jornada</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2">
            <div
              ref={lineRef}
              className="w-full bg-blue-primary origin-top"
              style={{ height: "100%", transform: "scaleY(0)" }}
            />
          </div>

          <div className="flex flex-col gap-14">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`flex items-start gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <span className="text-4xl font-black text-blue-primary">{m.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{m.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.body}</p>
                </div>
                {/* Dot */}
                <div className="relative shrink-0 mt-2">
                  <div className="w-4 h-4 rounded-full bg-blue-primary ring-4 ring-blue-primary/20" />
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

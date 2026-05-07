// src/components/sections/WhyProdbSection.tsx
import { ParallaxSection } from "./ParallaxSection";
import { Counter } from "@/components/ui/Counter";
import { GlitchText } from "@/components/ui/GlitchText";

const stats = [
  {
    value: 550,
    suffix: "+",
    label: "empresas confiam na Prodb",
    detail: "Clientes de todos os segmentos confiam na nossa infraestrutura cloud.",
    accent: "#01AFE2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
      </svg>
    ),
  },
  {
    value: 99,
    suffix: ",98%",
    label: "uptime garantido",
    detail: "Alta disponibilidade certificada para que seu negócio nunca pare.",
    accent: "#018DEE",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    value: 24,
    suffix: "/7",
    label: "suporte disponível",
    detail: "Equipe especializada pronta para resolver qualquer incidente.",
    accent: "#0064C8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z" />
      </svg>
    ),
  },
  {
    value: 10,
    suffix: "+",
    label: "anos de experiência",
    detail: "Mais de uma década entregando soluções de infraestrutura cloud.",
    accent: "#0150AA",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2v4M18 2v4M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
];

export function WhyProdbSection() {
  return (
    <ParallaxSection id="por-que-prodb" className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-4">Diferenciais</p>
          <GlitchText text="Por que escolher a Prodb?" className="text-4xl md:text-5xl text-white mb-5" />
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Oferecemos mais do que serviços, entregamos soluções que fazem a diferença.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(160deg, rgba(1,141,238,0.06) 0%, rgba(0,8,22,0.4) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                minHeight: 280,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${stat.accent}55, 0 0 40px ${stat.accent}25`,
                }}
              />

              {/* Background radial accent */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top right, ${stat.accent}18, transparent 60%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${stat.accent}1a`,
                    border: `1px solid ${stat.accent}40`,
                    color: stat.accent,
                  }}
                >
                  {stat.icon}
                </div>

                {/* Stat number */}
                <div
                  className="text-4xl md:text-5xl font-black text-white leading-none mb-3 tabular-nums"
                  style={{ textShadow: `0 0 24px ${stat.accent}66` }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-white/95 font-bold text-base mb-2 leading-tight">{stat.label}</h3>

                {/* Description */}
                <p className="text-white/45 text-sm leading-relaxed">{stat.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}

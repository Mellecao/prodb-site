// src/components/sections/PricingSection.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Plan {
  name: string;
  price: string;
  suffix?: string;
  features: string[];
  cta: string;
  href: string;
  note?: string;
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: "Essencial",
    price: "R$ 99",
    suffix: "/mês",
    features: [
      "Armazenamento: 100 GB",
      "Backup diário automático",
      "Suporte técnico via e-mail",
      "1 - Licença OBM",
    ],
    cta: "Quero o plano essencial",
    href: "/contato?plano=essencial",
  },
  {
    name: "Avançado",
    price: "R$ 306",
    suffix: "/mês",
    features: [
      "Armazenamento: 1 TB",
      "Backup diário automático",
      "Suporte técnico via e-mail",
      "1 - Licença OBM",
    ],
    cta: "Começar agora",
    note: "Teste grátis de 15 dias",
    href: "/contato?plano=avancado",
    featured: true,
  },
  {
    name: "Sob Medida",
    price: "Customizável",
    features: [
      "Escolha o tamanho de armazenamento",
      "Integrações avançadas",
      "Defina a quantidade de licenças",
      "Replicável para outra estrutura (localidade)",
    ],
    cta: "Quero um orçamento personalizado",
    href: "/contato?plano=customizado",
  },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const seed = Array.from({ length: 35 }, (_, id) => ({
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: 0.25 + Math.random() * 0.5,
    }));
    setParticles(seed);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "#01AFE2" : "#018DEE",
            boxShadow: `0 0 ${p.size * 4}px ${p.id % 3 === 0 ? "#01AFE2" : "#018DEE"}`,
            opacity: p.opacity,
            animation: `prodb-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes prodb-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: var(--o, 0.3); }
          25% { transform: translateY(-15px) translateX(8px); opacity: 1; }
          50% { transform: translateY(-30px) translateX(-4px); opacity: 0.6; }
          75% { transform: translateY(-12px) translateX(-10px); opacity: 0.9; }
        }
        @keyframes prodb-glow-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes prodb-glow-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function CheckIcon({ color = "#01AFE2" }: { color?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 mt-[2px]"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  if (plan.featured) {
    return (
      <div className="relative md:-translate-y-2">
        {/* Soft outer halo */}
        <div
          className="absolute -inset-6 rounded-[36px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(1,141,238,0.35) 0%, transparent 60%)",
            animation: "prodb-glow-pulse 3s ease-in-out infinite",
            filter: "blur(20px)",
          }}
        />

        {/* Inner card with static gradient border */}
        <div
          className="relative rounded-[24px] p-8 flex flex-col h-full"
          style={{
            background: "linear-gradient(180deg, #0a1c34 0%, #050d1a 100%)",
            border: "1.5px solid transparent",
            backgroundImage:
              "linear-gradient(180deg, #0a1c34 0%, #050d1a 100%), linear-gradient(135deg, #018DEE 0%, #01AFE2 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 32px rgba(1,141,238,0.25)",
          }}
        >
          {/* Popular badge */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] tracking-[2px] uppercase font-bold text-white whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #018DEE, #01AFE2)",
              boxShadow: "0 4px 16px rgba(1,141,238,0.5)",
            }}
          >
            Mais Popular
          </div>

          <h3 className="text-white text-xl font-bold mb-1">{plan.name}</h3>

          <div className="flex items-baseline gap-2 mt-5 mb-1">
            <span
              className="text-5xl md:text-6xl font-black text-white leading-none"
              style={{ textShadow: "0 0 20px rgba(1,141,238,0.5)" }}
            >
              {plan.price}
            </span>
            {plan.suffix && (
              <span className="text-white/50 text-sm font-medium">{plan.suffix}</span>
            )}
          </div>

          {plan.note && (
            <p className="text-blue-primary text-xs font-semibold mt-2 mb-1">
              {plan.note}
            </p>
          )}

          <div
            className="my-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(1,141,238,0.4), transparent)",
            }}
          />

          <ul className="flex flex-col gap-3.5 mb-8 flex-1">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-white/80 text-sm leading-relaxed">
                <CheckIcon color="#01AFE2" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link
            href={plan.href}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #018DEE 0%, #01AFE2 100%)",
              boxShadow:
                "0 6px 28px rgba(1,141,238,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          >
            {plan.cta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(180deg, #08131f 0%, #040810 100%)",
        border: "1px solid rgba(1,141,238,0.18)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 0 rgba(0,0,0,0.2)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(1,175,226,0.5), 0 0 40px rgba(1,141,238,0.2)",
        }}
      />

      <h3 className="relative z-10 text-white text-xl font-bold mb-1">{plan.name}</h3>

      <div className="relative z-10 flex items-baseline gap-2 mt-5 mb-6">
        <span className="text-4xl md:text-5xl font-black text-white leading-none">
          {plan.price}
        </span>
        {plan.suffix && (
          <span className="text-white/50 text-sm font-medium">{plan.suffix}</span>
        )}
      </div>

      <div
        className="relative z-10 mb-6 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <ul className="relative z-10 flex flex-col gap-3.5 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
            <CheckIcon color="#018DEE" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={plan.href}
        className="relative z-10 flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-sm text-white border transition-all hover:bg-blue-primary/10"
        style={{ borderColor: "rgba(1,141,238,0.35)" }}
      >
        {plan.cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

export function PricingSection() {
  return (
    <section
      id="precos"
      className="relative bg-[#040810] py-24 px-8 overflow-hidden"
    >
      {/* Background ambient glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "8%",
          left: "5%",
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(1,141,238,0.18) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          right: "6%",
          width: 560,
          height: 560,
          background:
            "radial-gradient(circle, rgba(1,175,226,0.13) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(1,141,238,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating particles */}
      <Particles />

      {/* Top hairline accent */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(1,141,238,0.5), transparent)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-4">
            Preços
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Planos de backup sob medida
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Oferecemos planos de backup acessíveis e robustos, desde soluções básicas
            até opções totalmente personalizáveis. Escolha o plano que melhor se adapta
            ao seu crescimento e mantenha seus dados sempre seguros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch pt-4">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

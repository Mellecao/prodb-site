// src/components/sections/CTASection.tsx
"use client";
import { GridBackground } from "@/components/three/GridBackground";
import Link from "next/link";

interface CTASectionProps {
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CTASection({
  title = "Pronto para transformar sua infraestrutura?",
  body = "Fale com um especialista e descubra a solução ideal para o seu negócio.",
  ctaLabel = "Fale com um especialista",
  ctaHref = "#contato",
}: CTASectionProps) {
  return (
    <section className="relative bg-bg-dark py-28 text-center overflow-hidden">
      <GridBackground opacity={0.6} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(1,141,238,0.12), transparent 60%)" }}
      />
      <div className="relative z-10 max-w-2xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">{title}</h2>
        <p className="text-white/50 text-lg mb-10 leading-relaxed">{body}</p>
        <Link
          href={ctaHref}
          className="inline-block bg-blue-primary text-white font-semibold px-10 py-4 rounded-full hover:bg-blue-dark-btn transition-all hover:shadow-[0_0_30px_rgba(1,141,238,0.4)] text-sm"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}

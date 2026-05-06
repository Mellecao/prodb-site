// src/app/empresa/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import Link from "next/link";

export const metadata = {
  title: "Empresa - Prodb",
  description: "Com anos de experiência no mercado, oferecemos soluções completas em backup, servidores em nuvem e otimização digital.",
};

export default function EmpresaPage() {
  return (
    <>
      <HeroSection
        tag="Quem somos"
        title="Tecnologia que transforma negócios"
        subtitle="Com anos de experiência no mercado, oferecemos soluções completas em backup, servidores em nuvem e otimização digital, sempre com foco na excelência e personalização."
      />

      <TimelineSection />

      {/* Soluções */}
      <section className="bg-bg-dark py-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-14 text-center">
            <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-3">Soluções</p>
            <h2 className="text-4xl font-black text-white">Conheça nossas soluções</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🖥️",
                title: "Servidores cloud",
                body: "Processamento rápido e confiável para aplicações, bancos de dados e armazenamento com total flexibilidade.",
                href: "/servidores-cloud",
                cta: "Quero um servidor mais rápido",
              },
              {
                icon: "🗄️",
                title: "Backup",
                body: "Planos de backup acessíveis e robustos, desde soluções básicas até opções totalmente personalizáveis.",
                href: "/backup",
                cta: "Ver planos de backup",
              },
            ].map((sol) => (
              <LiquidGlass key={sol.title} className="p-10" enableTilt>
                <div className="text-5xl mb-5">{sol.icon}</div>
                <h3 className="text-2xl font-black text-white mb-4">{sol.title}</h3>
                <p className="text-white/50 leading-relaxed mb-7">{sol.body}</p>
                <Link
                  href={sol.href}
                  className="inline-block bg-blue-primary text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-blue-dark-btn transition-colors"
                >
                  {sol.cta}
                </Link>
              </LiquidGlass>
            ))}
          </div>
        </div>
      </section>

      <CertificationsSection />

      {/* CTA Final */}
      <section className="relative bg-bg-dark py-24 text-center overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-white mb-5">Pronto para transformar sua infraestrutura?</h2>
          <p className="text-white/50 text-lg mb-8">Fale com um especialista e descubra a solução ideal para o seu negócio.</p>
          <Link href="#contato" className="inline-block bg-blue-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-blue-dark-btn transition-colors text-sm">
            Fale com um especialista
          </Link>
        </div>
      </section>
    </>
  );
}

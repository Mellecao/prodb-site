// src/app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { LottieScrollSection } from "@/components/sections/LottieScrollSection";
import heroAnimation from "@/data/hero-animation.json";
import { HorizontalScroll } from "@/components/sections/HorizontalScroll";
import { WhyProdbSection } from "@/components/sections/WhyProdbSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ContactSection } from "@/components/sections/ContactSection";
const lottieBlocks: [
  { tag: string; title: string; body: string },
  { tag: string; title: string; body: string },
  { tag: string; title: string; body: string }
] = [
  {
    tag: "Servidores Cloud",
    title: "Processamento rápido e confiável",
    body: "Aloje aplicativos, bancos de dados e sites com total flexibilidade, sem investimento em hardware físico.",
  },
  {
    tag: "Backup",
    title: "Seus dados sempre seguros",
    body: "Planos de backup acessíveis e robustos, desde soluções básicas até opções totalmente personalizáveis.",
  },
  {
    tag: "Certificações",
    title: "Confiança garantida por certificações",
    body: "Tier III, ISO 27001, PCI-DSS e mais — conformidade com os mais altos padrões internacionais.",
  },
];

const solutionCards = [
  {
    title: "Servidores Cloud",
    body: "Processamento rápido e confiável para aplicações, bancos de dados e armazenamento com flexibilidade total.",
    cta: "Quero um servidor",
    href: "/servidores-cloud",
    icon: "🖥️",
    image: "/img/servidores%20cloud.JPG",
  },
  {
    title: "Backup",
    body: "Planos de backup acessíveis e robustos, do básico ao totalmente personalizado para o seu negócio.",
    cta: "Ver planos",
    href: "/backup",
    icon: "🗄️",
    image: "/img/backup.jpg",
  },
  {
    title: "Certificações",
    body: "Infraestrutura certificada Tier III, ISO 27001, PCI-DSS, SOC e muito mais para máxima segurança.",
    cta: "Ver certificações",
    href: "/empresa#certificacoes",
    icon: "🏅",
    image: "/img/certificacoes.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Single sticky container — both sections absolutely stacked inside.
          Hero (z:10) sits on top of Lottie (z:1). Hero fades 0→1.5vh, lottie plays 1.5→4.5vh.
          450vh of sticky scroll = exactly the window we need. */}
      <div style={{ position: "relative", height: "550vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh" }}>
          {/* Lottie behind */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <LottieScrollSection
              blocks={lottieBlocks}
              animationData={heroAnimation}
              id="solucoes"
            />
          </div>
          {/* Hero on top */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
            <HeroSection
              title="A solução em nuvem que impulsiona o seu sucesso"
              subtitle="Simplifique operações, aumente a segurança dos seus dados e escale seu negócio com tecnologia em nuvem sob medida para você."
              ctas={[
                { label: "Quero proteger meus dados", href: "/backup", primary: true },
                { label: "Quero meu servidor na nuvem", href: "/servidores-cloud" },
              ]}
            />
          </div>
        </div>
      </div>

      <WhyProdbSection />

      <HorizontalScroll
        id="servicos"
        cards={solutionCards}
        title="Nossas soluções"
        bgLight
      />

      <PricingSection />

      <PartnersSection />

      <NewsSection />

      <ContactSection />
    </>
  );
}

// src/app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { LottieScrollSection } from "@/components/sections/LottieScrollSection";
import { HorizontalScroll } from "@/components/sections/HorizontalScroll";
import { WhyProdbSection } from "@/components/sections/WhyProdbSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
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
  },
  {
    title: "Backup",
    body: "Planos de backup acessíveis e robustos, do básico ao totalmente personalizado para o seu negócio.",
    cta: "Ver planos",
    href: "/backup",
    icon: "🗄️",
  },
  {
    title: "Certificações",
    body: "Infraestrutura certificada Tier III, ISO 27001, PCI-DSS, SOC e muito mais para máxima segurança.",
    cta: "Ver certificações",
    href: "/empresa#certificacoes",
    icon: "🏅",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection
        tag="Cloud · Backup · Security"
        title="A solução em nuvem que impulsiona o seu sucesso"
        subtitle="Simplifique operações, aumente a segurança dos seus dados e escale seu negócio com tecnologia em nuvem sob medida para você."
        ctas={[
          { label: "Quero proteger meus dados", href: "/backup", primary: true },
          { label: "Quero meu servidor na nuvem", href: "/servidores-cloud" },
        ]}
      />

      <LottieScrollSection
        blocks={lottieBlocks}
        src="/lottie/lottie.lottie"
        id="solucoes"
      />

      <WhyProdbSection />

      <HorizontalScroll
        id="servicos"
        cards={solutionCards}
        title="Nossas soluções"
        bgLight
      />

      <PartnersSection />

      <NewsSection />

      <ContactSection />
    </>
  );
}

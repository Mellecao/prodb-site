// src/app/backup/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { HorizontalScroll } from "@/components/sections/HorizontalScroll";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = {
  title: "Backup - Prodb",
  description: "Planos de backup acessíveis e robustos para manter seus dados sempre seguros.",
};

const planCards = [
  {
    icon: "🌱",
    title: "Essencial",
    body: "Armazenamento básico com retenção padrão. Ideal para pequenas empresas que estão começando a proteger seus dados com praticidade e custo reduzido.",
    cta: "Quero o plano essencial",
    href: "#contato",
  },
  {
    icon: "🚀",
    title: "Profissional",
    body: "Armazenamento ampliado, retenção estendida e suporte prioritário. Para empresas que precisam de mais controle, relatórios e alta disponibilidade.",
    cta: "Começar agora",
    href: "#contato",
  },
  {
    icon: "⚙️",
    title: "Personalizado",
    body: "Sem limite definido, tudo sob medida. Ideal para grandes operações com requisitos específicos de compliance, volume e integração com sistemas existentes.",
    cta: "Quero um orçamento personalizado",
    href: "#contato",
  },
];

export default function BackupPage() {
  return (
    <>
      <HeroSection
        tag="Backup"
        title="Seus dados sempre seguros, sempre acessíveis"
        subtitle="Manter os dados da sua empresa seguros e acessíveis é essencial. O backup é a prática fundamental para garantir que, em caso de falhas, perdas ou ataques cibernéticos, suas informações mais valiosas possam ser recuperadas."
        ctas={[{ label: "Quero proteger meus dados", href: "#planos", primary: true }]}
      />

      {/* O que é Backup */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-4">Entenda</p>
          <h2 className="text-4xl font-black text-gray-900 mb-6">O que é Backup e por que é essencial?</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Backup é a cópia de segurança dos seus dados, armazenada em local separado do original. Em caso de
            ransomware, falha de hardware, erro humano ou desastre natural, o backup é o que garante a continuidade
            do seu negócio sem prejuízos irreversíveis.
          </p>

          {/* Animated shield icon */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
              style={{
                background: "radial-gradient(circle, rgba(1,141,238,0.15), transparent 70%)",
                animation: "pulse-glow 3s ease-in-out infinite",
              }}
            >
              🛡️
            </div>
            <style>{`@keyframes pulse-glow { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.8} }`}</style>
          </div>
        </div>
      </section>

      <HorizontalScroll
        id="planos"
        cards={planCards}
        title="Planos de backup sob medida"
        bgLight={false}
      />

      <CertificationsSection compact />

      <ContactSection />
    </>
  );
}

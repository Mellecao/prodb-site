// src/app/servidores-cloud/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { LottieScrollSection } from "@/components/sections/LottieScrollSection";
import { ParallaxSection } from "@/components/sections/ParallaxSection";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { ContactSection } from "@/components/sections/ContactSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { CTASection } from "@/components/sections/CTASection";
import heroAnimation from "@/data/hero-animation.json";

export const metadata = {
  title: "Servidores cloud - Prodb",
  description: "Processamento rápido e confiável para aplicações, bancos de dados e armazenamento.",
};

const lottieBlocks: [{ tag: string; title: string; body: string }, { tag: string; title: string; body: string }, { tag: string; title: string; body: string }] = [
  {
    tag: "Flexibilidade",
    title: "Defina seu ambiente para melhor performance",
    body: "Configure seu ambiente ou aplicativo e hospede-os nos melhores servidores em nuvem. A flexibilidade é sua: combine a tecnologia ideal com a infraestrutura que seu projeto merece.",
  },
  {
    tag: "Segurança",
    title: "Segurança de ponta",
    body: "Proteja seus dados com tecnologia de última geração e monitoramento constante, garantindo que suas informações estejam sempre seguras e acessíveis.",
  },
  {
    tag: "Personalização",
    title: "Soluções sob medida",
    body: "Serviços adaptados às necessidades únicas do seu negócio. Configure tudo do seu jeito para máxima eficiência e desempenho.",
  },
];

const specialists = [
  { icon: "🕐", title: "24/7", body: "Disponibilidade total para resolver problemas a qualquer hora, garantindo continuidade para os clientes." },
  { icon: "🏆", title: "Equipe Qualificada", body: "Profissionais certificados e em constante atualização para oferecer as melhores soluções." },
  { icon: "📡", title: "Atendimento Proativo", body: "Monitoramento constante para identificar e solucionar problemas antes que afetem as operações." },
  { icon: "⚡", title: "Alta Velocidade de Resposta", body: "Tempo de atendimento reduzido, minimizando impactos em caso de falhas." },
  { icon: "❤️", title: "Foco na Experiência do Cliente", body: "Atendimento humanizado e compromisso com a satisfação total do cliente." },
];

export default function ServidoresCloudPage() {
  return (
    <>
      <HeroSection
        tag="Servidores Cloud"
        title="Processamento rápido e confiável para o seu negócio"
        subtitle="Com uma infraestrutura robusta e confiável, nossas soluções em cloud permitem que sua empresa aloje aplicativos, bancos de dados e sites com total flexibilidade."
        ctas={[{ label: "Quero um servidor mais rápido e seguro", href: "#contato", primary: true }]}
        showLottie
        animationData={heroAnimation}
      />

      <LottieScrollSection blocks={lottieBlocks} animationData={heroAnimation} id="features" />

      <ParallaxSection id="especialistas" className="py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="mb-14 text-center">
            <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-3">Suporte</p>
            <h2 className="text-4xl font-black text-white">Especialistas prontos para te ajudar</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {specialists.map((s) => (
              <LiquidGlass key={s.title} className="p-6 text-center">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{s.body}</p>
              </LiquidGlass>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Testimonials */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-12 text-center">
            <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-3">Clientes</p>
            <h2 className="text-4xl font-black text-gray-900">Qualidade e compromisso com seu sucesso</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "A Prodb transformou nossa infraestrutura. Temos total segurança e performance que nunca tínhamos antes.", author: "Gestor de TI", company: "Empresa de varejo" },
              { quote: "Suporte 24/7 de verdade. Qualquer problema é resolvido rapidamente, sem impacto nas nossas operações.", author: "CTO", company: "Startup de tecnologia" },
              { quote: "A personalização das soluções fez toda a diferença. Não é um produto de prateleira, é o que precisávamos.", author: "Diretor de Operações", company: "Indústria nacional" },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.author}</p>
                  <p className="text-gray-400 text-xs">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CertificationsSection compact />

      <ContactSection />
      <CTASection />
    </>
  );
}

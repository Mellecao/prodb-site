import { GlitchText } from "@/components/ui/GlitchText";
import { Marquee } from "@/components/ui/Marquee";

const partners = [
  { src: "/parceiros/cropped-gtgm-e1738613889211.png", alt: "GTGM" },
  { src: "/parceiros/gestao-dinamica-logo.png", alt: "Gestão Dinâmica" },
  { src: "/parceiros/inntegra-logo.png", alt: "Inntegra" },
  { src: "/parceiros/kruzer-logo.png", alt: "Kruzer" },
  { src: "/parceiros/m3-case-logo.png", alt: "M3 Case" },
  { src: "/parceiros/pushin-pay-logo.png", alt: "Pushin Pay" },
  { src: "/parceiros/softilux-logo.png", alt: "Softilux" },
];

export function PartnersSection() {
  return (
    <section id="parceiros" className="bg-bg-dark py-24">
      <div className="max-w-6xl mx-auto px-8 mb-14 text-center">
        <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-4">Parcerias</p>
        <GlitchText text="Nossos parceiros, nossa força" className="text-4xl md:text-5xl text-white mb-5" />
        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
          Na Prodb, valorizamos cada parceria construída ao longo da nossa trajetória. Trabalhamos lado a lado com
          empresas e instituições renomadas, formando uma rede sólida que fortalece nossos serviços.
        </p>
      </div>

      <Marquee items={partners} speed={20} className="py-4" />
    </section>
  );
}

import { ParallaxSection } from "./ParallaxSection";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { Counter } from "@/components/ui/Counter";
import { GlitchText } from "@/components/ui/GlitchText";

const stats = [
  { icon: "🏢", value: 550, suffix: "+", label: "empresas confiam na Prodb" },
  { icon: "⚡", value: 99, suffix: ",98%", label: "uptime garantido" },
  { icon: "🕐", value: 24, suffix: "/7", label: "suporte disponível" },
  { icon: "📅", value: 10, suffix: "+ anos", label: "de experiência no mercado" },
];

export function WhyProdbSection() {
  return (
    <ParallaxSection id="por-que-prodb" className="py-24">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-4">Diferenciais</p>
          <GlitchText
            text="Por que escolher a Prodb?"
            className="text-4xl md:text-5xl text-white mb-5"
          />
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Oferecemos mais do que serviços, entregamos soluções que fazem a diferença.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <LiquidGlass key={i} className="p-8 text-center" enableTilt>
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-black text-blue-primary mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/50 text-sm leading-snug">{stat.label}</p>
            </LiquidGlass>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}

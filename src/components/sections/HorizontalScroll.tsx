// src/components/sections/HorizontalScroll.tsx
import Link from "next/link";

interface HCard {
  title: string;
  body: string;
  cta: string;
  href: string;
  icon?: string;
  image?: string;
}

interface HorizontalScrollProps {
  cards: HCard[];
  title?: string;
  bgLight?: boolean;
  id?: string;
}

const CARD_OVERLAYS = [
  "radial-gradient(ellipse at 35% 40%, rgba(1,141,238,0.52) 0%, rgba(0,8,22,0.80) 100%)",
  "radial-gradient(ellipse at 65% 55%, rgba(1,100,210,0.50) 0%, rgba(0,6,18,0.82) 100%)",
  "radial-gradient(ellipse at 50% 30%, rgba(0,70,170,0.52) 0%, rgba(0,5,14,0.82) 100%)",
];

export function HorizontalScroll({ cards, title, id }: HorizontalScrollProps) {
  return (
    <section id={id} className="bg-[#040810] py-24 px-8" style={{ contain: "paint layout" }}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-4">Soluções</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">{title}</h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="relative overflow-hidden rounded-3xl flex flex-col" style={{ minHeight: 500 }}>
              {/* Visual top area */}
              <div
                className="relative flex flex-col justify-between p-8 overflow-hidden"
                style={{ minHeight: 280, background: CARD_OVERLAYS[i % CARD_OVERLAYS.length] }}
              >
                {/* Card image — sits behind everything else */}
                {card.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                    style={{ opacity: 0.55 }}
                  />
                )}

                {/* Brand color overlay on top of the photo */}
                <div
                  className="absolute inset-0"
                  style={{ background: CARD_OVERLAYS[i % CARD_OVERLAYS.length], opacity: 0.7 }}
                />

                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(1,141,238,0.2) 0%, transparent 55%)" }}
                />

                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(1,175,226,0.5), transparent)" }}
                />

                <div
                  className="absolute inset-x-0 bottom-0"
                  style={{ height: 80, background: "linear-gradient(to top, #050d1a, transparent)" }}
                />

                {card.icon && (
                  <div className="relative z-10 text-5xl select-none w-fit" style={{ filter: "drop-shadow(0 0 14px rgba(1,141,238,0.65))" }}>
                    {card.icon}
                  </div>
                )}

                <h3
                  className="relative z-10 text-2xl md:text-3xl font-black text-white leading-tight"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.85)" }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Content area */}
              <div
                className="flex flex-col flex-1 p-8 gap-6"
                style={{
                  background: "linear-gradient(180deg, #06111f 0%, #040810 100%)",
                  borderTop: "1px solid rgba(1,141,238,0.10)",
                }}
              >
                <p className="text-white/50 text-sm leading-relaxed flex-1">{card.body}</p>

                <Link
                  href={card.href}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #018DEE 0%, #01AFE2 100%)",
                    boxShadow: "0 4px 24px rgba(1,141,238,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  {card.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

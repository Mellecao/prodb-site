// src/components/sections/HorizontalScroll.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HCard {
  title: string;
  body: string;
  cta: string;
  href: string;
  icon?: string;
}

interface HorizontalScrollProps {
  cards: HCard[];
  title?: string;
  bgLight?: boolean;
  id?: string;
}

export function HorizontalScroll({ cards, title, bgLight = true, id }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const container = containerRef.current;
    const progressBar = progressRef.current;
    if (!section || !container) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${container.scrollWidth - window.innerWidth + 120}`,
      scrub: 1,
      onUpdate: (self) => {
        const offset = self.progress * (container.scrollWidth - window.innerWidth);
        gsap.set(container, { x: -offset });
        if (progressBar) gsap.set(progressBar, { scaleX: self.progress });
      },
    });

    return () => trigger.kill();
  }, [isMobile]);

  const bg = bgLight ? "bg-white" : "bg-bg-dark";
  const titleColor = bgLight ? "text-gray-900" : "text-white";
  const cardBg = bgLight
    ? "bg-white border border-gray-100 shadow-sm"
    : "bg-bg-dark-2 border border-blue-primary/15";
  const cardTitle = bgLight ? "text-gray-900" : "text-white";
  const cardBody = bgLight ? "text-gray-500" : "text-white/50";

  if (isMobile) {
    return (
      <section id={id} className={`${bg} py-16 px-6`}>
        {title && <h2 className={`text-3xl font-black ${titleColor} mb-10 text-center`}>{title}</h2>}
        <div className="flex flex-col gap-6 max-w-lg mx-auto">
          {cards.map((card, i) => (
            <div key={i} className={`${cardBg} rounded-2xl p-6`}>
              {card.icon && <div className="text-3xl mb-3">{card.icon}</div>}
              <h3 className={`text-xl font-bold ${cardTitle} mb-2`}>{card.title}</h3>
              <p className={`text-sm leading-relaxed ${cardBody} mb-4`}>{card.body}</p>
              <a href={card.href} className="text-blue-primary text-sm font-semibold hover:underline">{card.cta} →</a>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id={id} ref={sectionRef} className={`relative overflow-hidden ${bg}`} style={{ height: "100vh" }}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-100 z-10">
        <div
          ref={progressRef}
          className="h-full bg-blue-primary origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {title && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center">
          <h2 className={`text-4xl font-black ${titleColor}`}>{title}</h2>
        </div>
      )}

      {/* Scrolling container */}
      <div className="flex h-full items-center">
        <div ref={containerRef} className="flex gap-8 px-24 will-change-transform">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`${cardBg} rounded-3xl p-10 flex flex-col justify-between shrink-0`}
              style={{ width: "min(400px, 80vw)", height: "min(500px, 60vh)" }}
            >
              {card.icon && <div className="text-5xl mb-4">{card.icon}</div>}
              <div>
                <h3 className={`text-2xl font-black ${cardTitle} mb-4 leading-tight`}>{card.title}</h3>
                <p className={`text-sm leading-relaxed ${cardBody}`}>{card.body}</p>
              </div>
              <a
                href={card.href}
                className="inline-flex items-center gap-2 text-blue-primary text-sm font-semibold mt-6 hover:gap-3 transition-all"
              >
                {card.cta} <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

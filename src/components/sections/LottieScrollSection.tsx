// src/components/sections/LottieScrollSection.tsx
"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface TextBlock {
  tag?: string;
  title: string;
  body: string;
}

interface LottieScrollSectionProps {
  blocks: [TextBlock, TextBlock, TextBlock];
  animationData: object;
  id?: string;
}

export function LottieScrollSection({ blocks, animationData, id }: LottieScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<{ goToAndStop: (frame: number, isFrame: boolean) => void; getDuration: (inFrames: boolean) => number } | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const totalFrames = lottieRef.current?.getDuration(true) ?? 60;
    const vh = window.innerHeight;

    const trigger = ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: "top top",
      end: `+=${vh * 3}`,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        // Animate Lottie
        lottieRef.current?.goToAndStop(p * totalFrames, true);
        // Show/hide text blocks
        textRefs.current.forEach((el, i) => {
          if (!el) return;
          const blockStart = i / 3;
          const blockEnd = (i + 1) / 3;
          const localP = Math.max(0, Math.min(1, (p - blockStart) / (1 / 3)));
          const visible = p >= blockStart && p < blockEnd;
          gsap.set(el, {
            opacity: visible ? Math.min(localP * 4, 1) : 0,
            x: visible ? 0 : localP < 0.5 ? -20 : 20,
          });
        });
      },
    });

    return () => trigger.kill();
  }, [isMobile]);

  // Mobile: autoplay + text stacked below
  if (isMobile) {
    return (
      <section id={id} className="bg-white py-16 px-6">
        <div className="max-w-md mx-auto">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: "100%", maxWidth: 280, margin: "0 auto 32px", filter: "brightness(0)" }}
          />
          {blocks.map((b, i) => (
            <div key={i} className="mb-10">
              {b.tag && <p className="text-xs tracking-[3px] uppercase text-blue-primary mb-2 font-semibold">{b.tag}</p>}
              <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{b.title}</h3>
              <p className="text-gray-600 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id={id} ref={sectionRef} className="relative bg-white overflow-hidden" style={{ height: "100vh" }}>
      <div className="flex h-full max-w-7xl mx-auto px-8">
        {/* Text side */}
        <div className="relative flex-1 flex items-center">
          {blocks.map((b, i) => (
            <div
              key={i}
              ref={(el) => { textRefs.current[i] = el; }}
              className="absolute"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {b.tag && (
                <p className="text-xs tracking-[3px] uppercase text-blue-primary mb-3 font-semibold">{b.tag}</p>
              )}
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-tight max-w-md">{b.title}</h2>
              <p className="text-gray-500 leading-relaxed max-w-sm text-lg">{b.body}</p>
            </div>
          ))}
        </div>

        {/* Lottie side */}
        <div className="w-[42%] flex items-center justify-center">
          <Lottie
            lottieRef={lottieRef as React.MutableRefObject<any>}
            animationData={animationData}
            autoplay={false}
            loop={false}
            style={{ width: "100%", maxWidth: 420, filter: "brightness(0)" }}
          />
        </div>
      </div>
    </section>
  );
}

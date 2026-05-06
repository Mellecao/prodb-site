// src/components/sections/LottieScrollSection.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

interface TextBlock {
  tag?: string;
  title: string;
  body: string;
}

interface LottieScrollSectionProps {
  blocks: [TextBlock, TextBlock, TextBlock];
  src: string;
  id?: string;
}

export function LottieScrollSection({ blocks, src, id }: LottieScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dotLottieRef = useRef<any>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;
    const vh = window.innerHeight;

    const trigger = ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: "top top",
      end: `+=${vh * 3}`,
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;

        // Control dotLottie frame
        const dl = dotLottieRef.current;
        if (dl) {
          const total: number = dl.totalFrames ?? 60;
          // Clamp to [0, total-1] to avoid out-of-range edge
          const frame = Math.min(p * total, total - 0.001);
          try { dl.setFrame(frame); } catch { /* not ready yet */ }
        }

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

  if (isMobile) {
    return (
      <MobileLottieSection src={src} blocks={blocks} id={id} />
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
          <DesktopLottie src={src} onRef={(ref) => { dotLottieRef.current = ref; }} />
        </div>
      </div>
    </section>
  );
}

// Split into sub-components to avoid conditional hook issues with dynamic imports

function DesktopLottie({ src, onRef }: { src: string; onRef: (ref: unknown) => void }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [DotLottieReact, setDotLottieReact] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import("@lottiefiles/dotlottie-react").then((m) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setDotLottieReact(() => m.DotLottieReact as React.ComponentType<any>);
    });
  }, []);

  if (!DotLottieReact) return <div className="w-full max-w-[420px] aspect-square" />;

  return (
    <DotLottieReact
      src={src}
      autoplay={false}
      loop={false}
      dotLottieRefCallback={(ref: unknown) => {
        onRef(ref);
        // Explicitly pause so setFrame has full control with no internal playhead conflict
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dl = ref as any;
        if (dl) { dl.pause(); dl.setFrame(0); }
      }}
      backgroundColor="transparent"
      style={{ width: "100%", maxWidth: 420 }}
    />
  );
}

function MobileLottieSection({ src, blocks, id }: { src: string; blocks: [TextBlock, TextBlock, TextBlock]; id?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [DotLottieReact, setDotLottieReact] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import("@lottiefiles/dotlottie-react").then((m) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setDotLottieReact(() => m.DotLottieReact as React.ComponentType<any>);
    });
  }, []);

  return (
    <section id={id} className="bg-white py-16 px-6">
      <div className="max-w-md mx-auto">
        {DotLottieReact && (
          <DotLottieReact
            src={src}
            autoplay
            loop
            backgroundColor="transparent"
            style={{ width: "100%", maxWidth: 280 }}
          />
        )}
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

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData: any;
  id?: string;
}

const CERT_FILES = [
  "Tier-III.png","TR3-TUV-Rheinland.png","SOC.png",
  "PCI-DDS.png","ISO-27001.png","ISO-20000.png",
  "ISO-50001.png","ISO-14001.png","ISO-37001.png",
];

export function LottieScrollSection({ blocks, animationData, id }: LottieScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const lottieWrapperRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const certContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;
    const vh = window.innerHeight;

    let activeBlock = 0;

    const certFloatTweens: gsap.core.Tween[] = [];

    const showCertLogos = () => {
      const container = certContainerRef.current;
      if (!container) return;
      const logos = Array.from(container.querySelectorAll<HTMLElement>('.cert-logo'));
      certFloatTweens.forEach(t => t.kill());
      certFloatTweens.length = 0;
      gsap.set(container, { opacity: 1 });
      gsap.killTweensOf(logos);
      gsap.fromTo(logos,
        { y: 24, opacity: 0, scale: 0.8 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.5, ease: 'back.out(1.8)', stagger: 0.055,
          onComplete: () => {
            logos.forEach((logo, idx) => {
              const amp = 5 + Math.random() * 5;
              const dur = 1.5 + Math.random() * 0.8;
              certFloatTweens.push(
                gsap.to(logo, { y: -amp, duration: dur, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: idx * 0.1 })
              );
            });
          },
        }
      );
    };

    const hideCertLogos = () => {
      certFloatTweens.forEach(t => t.kill());
      certFloatTweens.length = 0;
      const container = certContainerRef.current;
      if (!container) return;
      const logos = container.querySelectorAll('.cert-logo');
      gsap.killTweensOf(logos);
      gsap.set(container, { opacity: 0 });
      gsap.set(logos, { y: 0, opacity: 0, scale: 0.8 });
    };

    const enterBlock = (i: number) => {
      const el = textRefs.current[i];
      if (!el) return;

      // Make container visible before animating children
      gsap.set(el, { opacity: 1, y: 0, filter: 'blur(0px)' });

      const tag = el.querySelector<HTMLElement>('.block-tag');
      const words = Array.from(el.querySelectorAll<HTMLElement>('.title-word'));
      const body = el.querySelector<HTMLElement>('.block-body');

      if (tag) gsap.killTweensOf(tag);
      gsap.killTweensOf(words);
      if (body) gsap.killTweensOf(body);

      const tl = gsap.timeline();

      if (tag) {
        tl.fromTo(tag,
          { y: 12, opacity: 0, letterSpacing: '6px' },
          { y: 0, opacity: 1, letterSpacing: '3px', duration: 0.55, ease: 'power3.out' }
        );
      }

      if (words.length > 0) {
        tl.fromTo(words,
          { y: 45, opacity: 0, filter: 'blur(14px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.75, stagger: 0.07, ease: 'power4.out' },
          0.1
        );
      }

      if (body) {
        tl.fromTo(body,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
          words.length * 0.07 + 0.25
        );
      }

      if (i === 2) {
        gsap.delayedCall(0.4, showCertLogos);
      }
    };

    const exitBlock = (i: number, goingForward: boolean) => {
      const el = textRefs.current[i];
      if (!el) return;

      const tag = el.querySelector<HTMLElement>('.block-tag');
      const words = Array.from(el.querySelectorAll<HTMLElement>('.title-word'));
      const body = el.querySelector<HTMLElement>('.block-body');

      if (tag) gsap.killTweensOf(tag);
      gsap.killTweensOf(words);
      if (body) gsap.killTweensOf(body);

      if (i === 2) {
        hideCertLogos();
      }

      const targets: HTMLElement[] = [];
      if (tag) targets.push(tag);
      targets.push(...words);
      if (body) targets.push(body);

      gsap.to(targets, {
        opacity: 0,
        y: goingForward ? -30 : 30,
        filter: 'blur(8px)',
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(el, { opacity: 0, y: 0, filter: 'blur(0px)' });
          gsap.set(targets, { opacity: 0, y: 0, filter: 'blur(0px)' });
        },
      });
    };

    // Phase 1 — zoom in: lottie starts at 200%, zooms to 100% as user scrolls (vh*1.5 → vh*2.5)
    gsap.set(lottieWrapperRef.current, { scale: 2, transformOrigin: 'center center' });
    const zoomTween = gsap.to(lottieWrapperRef.current, {
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: { start: vh * 1.5, end: vh * 2.5, scrub: 1 },
    });

    // Phase 2 — lottie plays + blocks transition: only after zoom completes (vh*2.5 → vh*4.5)
    const trigger = ScrollTrigger.create({
      start: vh * 2.5,
      end: vh * 4.5,
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;

        const anim = lottieRef.current;
        if (anim) {
          const total: number = anim.totalFrames ?? 60;
          const frame = Math.min(p * total, total - 0.001);
          try { anim.goToAndStop(frame, true); } catch { /* not ready */ }
        }

        const nextBlock = p < 1/3 ? 0 : p < 2/3 ? 1 : 2;
        if (nextBlock !== activeBlock) {
          exitBlock(activeBlock, nextBlock > activeBlock);
          enterBlock(nextBlock);
          activeBlock = nextBlock;
        }
      },
    });

    // Show block 0 immediately on mount
    enterBlock(0);

    return () => {
      zoomTween.scrollTrigger?.kill();
      trigger.kill();
      certFloatTweens.forEach(t => t.kill());
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <MobileLottieSection animationData={animationData} blocks={blocks} id={id} />
    );
  }

  return (
    <section id={id} ref={sectionRef} className="relative bg-white overflow-hidden" style={{ height: "100vh" }}>
      <div className="flex h-full max-w-7xl mx-auto px-8">
        {/* Text side */}
        <div className="relative flex-1 flex items-center">
          {blocks.map((b, i) => (
            /* Outer: CSS-only centering — does NOT move with GSAP */
            <div
              key={i}
              className="absolute"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              {/* Inner: GSAP target — opacity/blur/y animations */}
              <div
                ref={(el) => { textRefs.current[i] = el; }}
                style={{ opacity: 0, position: 'relative' }}
              >
                {b.tag && (
                  <p className="block-tag text-xs tracking-[3px] uppercase text-blue-primary mb-3 font-semibold">{b.tag}</p>
                )}
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-tight max-w-md">
                  {b.title.split(' ').map((word, wi) => (
                    <span key={wi} className="title-word inline-block" style={{ marginRight: '0.3em' }}>{word}</span>
                  ))}
                </h2>
                <p className="block-body text-gray-500 leading-relaxed max-w-sm text-lg">{b.body}</p>

                {/* Cert logos: absolutely placed below text, not part of centering height */}
                {i === 2 && (
                  <div
                    ref={certContainerRef}
                    style={{ position: 'absolute', top: 'calc(100% + 0.75rem)', left: 0, opacity: 0 }}
                  >
                    {/* Top row: even indices — 5 logos */}
                    <div className="flex gap-2 mb-2">
                      {CERT_FILES.filter((_, idx) => idx % 2 === 0).map((file) => (
                        <div key={file} className="cert-logo" style={{ width: 120, height: 120, flexShrink: 0 }}>
                          <img src={`/certificacoes/${file}`} alt="" className="w-full h-full object-contain" />
                        </div>
                      ))}
                    </div>
                    {/* Bottom row: odd indices — 4 logos, offset half-step for zigzag */}
                    <div className="flex gap-2" style={{ paddingLeft: 64 }}>
                      {CERT_FILES.filter((_, idx) => idx % 2 === 1).map((file) => (
                        <div key={file} className="cert-logo" style={{ width: 120, height: 120, flexShrink: 0 }}>
                          <img src={`/certificacoes/${file}`} alt="" className="w-full h-full object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lottie side */}
        <div ref={lottieWrapperRef} className="w-[42%] flex items-center justify-center">
          <DesktopLottie animationData={animationData} onRef={(ref) => { lottieRef.current = ref; }} />
        </div>
      </div>
    </section>
  );
}

function DesktopLottie({
  animationData,
  onRef,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData: any;
  onRef: (ref: unknown) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Lottie, setLottie] = useState<React.ComponentType<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const innerRef = useRef<any>(null);

  useEffect(() => {
    import("lottie-react").then((m) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setLottie(() => m.default as React.ComponentType<any>);
    });
  }, []);

  if (!Lottie) return <div className="w-full max-w-[420px] aspect-square" />;

  return (
    <Lottie
      animationData={animationData}
      autoplay={false}
      loop={false}
      lottieRef={innerRef}
      onDOMLoaded={() => {
        // lottieRef.current is now the animation instance — expose it to parent
        onRef(innerRef.current);
        innerRef.current?.goToAndStop(0, true);
      }}
      style={{ width: "100%", maxWidth: 420 }}
    />
  );
}

function MobileLottieSection({
  animationData,
  blocks,
  id,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData: any;
  blocks: [TextBlock, TextBlock, TextBlock];
  id?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Lottie, setLottie] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import("lottie-react").then((m) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setLottie(() => m.default as React.ComponentType<any>);
    });
  }, []);

  return (
    <section id={id} className="bg-white py-16 px-6">
      <div className="max-w-md mx-auto">
        {Lottie && (
          <Lottie
            animationData={animationData}
            autoplay
            loop
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

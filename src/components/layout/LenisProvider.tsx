"use client";
import { useEffect } from "react";
import { createLenis, destroyLenis } from "@/lib/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const lenis = createLenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      destroyLenis();
    };
  }, [isMobile]);

  return <>{children}</>;
}

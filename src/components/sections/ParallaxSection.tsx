// src/components/sections/ParallaxSection.tsx
"use client";
import { GridBackground } from "@/components/three/GridBackground";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ParallaxSection({ children, className = "", id }: ParallaxSectionProps) {
  return (
    <section id={id} className={`relative overflow-hidden bg-bg-dark-2 ${className}`}>
      <GridBackground opacity={0.3} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(1,141,238,0.08), transparent 60%)" }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

// src/components/ui/LiquidGlass.tsx
"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function GlassDistortionFilter() {
  return (
    <svg style={{ display: "none", position: "absolute", width: 0, height: 0 }}>
      <defs>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.002 0.002" numOctaves="2" seed="92" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap in="SourceGraphic" in2="blurred" scale="28" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  enableTilt?: boolean;
  blur?: number;
  style?: React.CSSProperties;
}

export function LiquidGlass({
  children,
  className = "",
  borderRadius = "1.5rem",
  enableTilt = false,
  blur = 4,
  style,
}: LiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !enableTilt) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{
        borderRadius,
        boxShadow: "0 6px 24px rgba(0,0,0,0.2), 0 0 1px rgba(255,255,255,0.1)",
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: enableTilt ? "preserve-3d" : undefined,
        ...style,
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: `url(#glass-distortion) blur(${blur}px) saturate(120%)`,
          WebkitBackdropFilter: `url(#glass-distortion) blur(${blur}px) saturate(120%)`,
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(145deg, rgba(12,12,12,0.52), rgba(12,12,12,0.32) 55%, rgba(12,12,12,0.44))" }}
      />
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ boxShadow: "inset 0 0 18px -6px rgba(255,255,255,0.22)", borderRadius }}
      />
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius }}
      />
      <div className="relative z-[3]">{children}</div>
    </motion.div>
  );
}

export function LiquidGlassProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlassDistortionFilter />
      {children}
    </>
  );
}

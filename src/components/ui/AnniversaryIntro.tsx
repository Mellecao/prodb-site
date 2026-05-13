"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePathname } from "next/navigation";
import Image from "next/image";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${4 + (i * 4.1) % 91}%`,
  size: `${1.5 + (i % 4) * 1.1}px`,
  delay: `${(i * 0.51) % 7}s`,
  duration: `${5 + (i * 0.63) % 5}s`,
  drift: `${-28 + (i % 7) * 9}px`,
  opacity: i % 3 === 0 ? "0.85" : "0.45",
}));

export function AnniversaryIntro() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [gone, setGone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const anosRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Only show on home page — on every hard reload (no sessionStorage)
    if (pathname !== "/") {
      setGone(true);
      return;
    }
    window.scrollTo(0, 0);
    const onDone = () => setVisible(true);
    window.addEventListener("prodb:loading-done", onDone, { once: true });
    return () => window.removeEventListener("prodb:loading-done", onDone);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;

    window.scrollTo(0, 0);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl
      .set(overlayRef.current, { opacity: 0 })
      .to(overlayRef.current, { opacity: 1, duration: 1.0 })
      .fromTo(badgeRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.55")
      .fromTo(numRef.current, { opacity: 0, y: 44, filter: "blur(12px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 }, "-=0.4")
      .fromTo(anosRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.5")
      .fromTo(divRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.85, ease: "power2.inOut" }, "-=0.3")
      .fromTo(logoRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5")
      .fromTo(subRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
      .fromTo(btnRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.15");

    let rafId: number;
    const confettiTimer = setTimeout(() => {
      import("canvas-confetti").then(({ default: lib }) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const fire = lib.create(canvas, { resize: true });
        const colors = ["#C9A84C", "#FFE09A", "#E8C96A", "#018DEE", "#01AFE2", "#F5EDD6", "#fff"];
        const isMobile = window.innerWidth < 768;
        fire({ particleCount: isMobile ? 48 : 110, spread: isMobile ? 68 : 85, origin: { y: 0.52 }, colors, startVelocity: isMobile ? 26 : 32, gravity: 0.9 });
        const end = Date.now() + (isMobile ? 2800 : 5500);
        const frame = () => {
          fire({ particleCount: isMobile ? 1 : 2, angle: 58, spread: 56, origin: { x: 0 }, colors });
          fire({ particleCount: isMobile ? 1 : 2, angle: 122, spread: 56, origin: { x: 1 }, colors });
          if (Date.now() < end) rafId = requestAnimationFrame(frame);
        };
        rafId = requestAnimationFrame(frame);
      });
    }, 1100);

    return () => {
      tl.kill();
      clearTimeout(confettiTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visible]);

  const handleEnter = () => {
    const el = overlayRef.current;
    if (!el) { setGone(true); return; }
    gsap.to(el, {
      rotationX: 10,
      scale: 1.07,
      opacity: 0,
      transformPerspective: 1100,
      duration: 0.65,
      ease: "power2.in",
      onComplete: () => setGone(true),
    });
  };

  if (gone || !visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Syne:wght@400;600;700;800&display=swap');

        .anni-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 700;
          font-style: italic;
          line-height: 1;
          letter-spacing: -0.03em;
          background: linear-gradient(165deg, #F0D878 0%, #E8C96A 18%, #C9A84C 42%, #A87D28 64%, #C9A84C 80%, #F0D878 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(201,168,76,0.35));
          display: block;
        }

        .anni-syne { font-family: 'Syne', sans-serif; }

        .anni-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,201,106,0.95) 0%, rgba(201,168,76,0.3) 60%, transparent 100%);
          animation: anni-rise var(--dur, 6s) var(--delay, 0s) ease-in infinite;
          bottom: -8px;
          pointer-events: none;
        }

        @keyframes anni-rise {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          6%   { opacity: var(--op, 0.6); }
          85%  { opacity: 0.08; }
          100% { transform: translateY(-105vh) translateX(var(--drift, 0px)) scale(0.4); opacity: 0; }
        }

        /* ── Gala searchlight sweeps ── */
        @keyframes anni-sweep-a {
          0%         { transform: translateX(-50%) rotate(-50deg); }
          42%, 58%   { transform: translateX(-50%) rotate(-9deg);  }
          100%       { transform: translateX(-50%) rotate(-50deg); }
        }
        @keyframes anni-sweep-b {
          0%         { transform: translateX(-50%) rotate(50deg);  }
          42%, 58%   { transform: translateX(-50%) rotate(9deg);   }
          100%       { transform: translateX(-50%) rotate(50deg);  }
        }

        .anni-beam {
          position: absolute;
          bottom: 0;
          width: 220px;
          height: 95vh;
          transform-origin: bottom center;
          clip-path: polygon(50% 100%, 37% 0%, 63% 0%);
          mix-blend-mode: screen;
          pointer-events: none;
        }
        .anni-beam-a {
          left: 24%;
          animation: anni-sweep-a 6.8s ease-in-out infinite;
          background: linear-gradient(
            to top,
            rgba(240,216,120,0.32) 0%,
            rgba(201,168,76,0.13) 28%,
            rgba(201,168,76,0.04) 62%,
            transparent 100%
          );
        }
        .anni-beam-b {
          left: 76%;
          animation: anni-sweep-b 8.2s 1.3s ease-in-out infinite;
          background: linear-gradient(
            to top,
            rgba(220,200,100,0.28) 0%,
            rgba(180,140,60,0.11) 30%,
            rgba(180,140,60,0.03) 65%,
            transparent 100%
          );
        }

        .anni-btn {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #E8C96A;
          border: 1px solid rgba(201,168,76,0.38);
          padding: 14px 44px;
          background: transparent;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 0.35s ease, color 0.35s ease;
        }
        .anni-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 0%, rgba(232,201,106,0.1) 50%, transparent 100%);
          transform: translateX(-110%);
          transition: transform 0.55s ease;
        }
        .anni-btn:hover::before { transform: translateX(110%); }
        .anni-btn:hover { border-color: rgba(232,201,106,0.7); color: #F7E9A0; }
        .anni-btn:active { opacity: 0.8; transform: scale(0.98); }

        .anni-frame-line {
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.55), rgba(232,201,106,0.85), rgba(201,168,76,0.55), transparent);
        }
        .anni-divider-wrap { display: flex; align-items: center; gap: 10px; transform-origin: center; }
        .anni-divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent); }
        .anni-diamond {
          width: 5px; height: 5px; background: #C9A84C; transform: rotate(45deg);
          flex-shrink: 0; box-shadow: 0 0 6px rgba(201,168,76,0.6);
        }
      `}</style>

      <div
        ref={overlayRef}
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        style={{ opacity: 0, zIndex: 9998 }}
      >
        {/* Dark base */}
        <div className="absolute inset-0" style={{ background: "#020508" }} />

        {/* Subtle ambient center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 55% 45% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 60%),
              radial-gradient(ellipse 35% 40% at 50% 50%, rgba(1,141,238,0.05) 0%, transparent 50%)
            `,
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.022,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* ── Gala searchlight beams ── */}
        <div className="anni-beam anni-beam-a" />
        <div className="anni-beam anni-beam-b" />

        {/* Inset frame lines */}
        <div className="absolute top-[18px] left-[18px] right-[18px] h-px anni-frame-line pointer-events-none" />
        <div
          className="absolute bottom-[18px] left-[18px] right-[18px] h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), rgba(201,168,76,0.55), rgba(201,168,76,0.35), transparent)" }}
        />

        {/* Corner ornaments */}
        {(
          [
            { top: 14, left: 14 },
            { top: 14, right: 14, flipX: true },
            { bottom: 14, left: 14, flipY: true },
            { bottom: 14, right: 14, flipX: true, flipY: true },
          ] as { top?: number; bottom?: number; left?: number; right?: number; flipX?: boolean; flipY?: boolean }[]
        ).map((pos, i) => (
          <svg
            key={i}
            width="22" height="22" viewBox="0 0 22 22" fill="none"
            className="absolute pointer-events-none"
            style={{
              top: pos.top,
              bottom: pos.bottom,
              left: pos.left,
              right: pos.right,
              transform: `scale(${pos.flipX ? -1 : 1}, ${pos.flipY ? -1 : 1})`,
            }}
          >
            <path d="M1 21 L1 1 L21 1" stroke="#C9A84C" strokeWidth="1" opacity="0.55" />
          </svg>
        ))}

        {/* Floating gold particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="anni-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              "--dur": p.duration,
              "--delay": p.delay,
              "--drift": p.drift,
              "--op": p.opacity,
            } as React.CSSProperties}
          />
        ))}

        {/* Confetti canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* ─── Main content ─── */}
        <div className="relative flex flex-col items-center text-center px-8" style={{ zIndex: 2, gap: 0 }}>

          {/* Eyebrow — "mais um ano de vida" */}
          <div ref={badgeRef} style={{ opacity: 0, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 32, height: 1, background: "rgba(201,168,76,0.4)" }} />
              <span
                className="anni-syne"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(201,168,76,0.58)",
                  fontWeight: 700,
                }}
              >
                Mais um ano de vida
              </span>
              <div style={{ width: 32, height: 1, background: "rgba(201,168,76,0.4)" }} />
            </div>
          </div>

          {/* 15 */}
          <div ref={numRef} style={{ opacity: 0 }}>
            <span className="anni-num" style={{ fontSize: "clamp(144px, 21vw, 230px)" }}>
              15
            </span>
          </div>

          {/* ANOS — sits below the number with proper clearance */}
          <div ref={anosRef} style={{ opacity: 0, marginTop: 12, marginBottom: 30 }}>
            <span
              className="anni-syne"
              style={{
                fontSize: "clamp(12px, 1.6vw, 16px)",
                fontWeight: 800,
                letterSpacing: "0.55em",
                textTransform: "uppercase",
                color: "rgba(245,237,214,0.6)",
              }}
            >
              Anos
            </span>
          </div>

          {/* Decorative divider */}
          <div
            ref={divRef}
            className="anni-divider-wrap"
            style={{ width: "min(300px, 78vw)", marginBottom: 26 }}
          >
            <div className="anni-divider-line" />
            <div className="anni-diamond" />
            <div className="anni-divider-line" />
          </div>

          {/* Logo */}
          <div ref={logoRef} style={{ opacity: 0, marginBottom: 20 }}>
            <Image
              src="/logo/prodb-logo-branco.svg"
              alt="ProDB"
              width={108}
              height={34}
              style={{
                filter: "drop-shadow(0 0 18px rgba(1,141,238,0.5)) drop-shadow(0 0 5px rgba(1,175,226,0.28))",
                opacity: 0.85,
              }}
            />
          </div>

          {/* Subtitle — slightly larger, still subtle */}
          <p
            ref={subRef}
            className="anni-syne"
            style={{
              opacity: 0,
              fontSize: "clamp(13px, 1.5vw, 15px)",
              fontWeight: 400,
              color: "rgba(245,237,214,0.42)",
              letterSpacing: "0.04em",
              lineHeight: 1.9,
              maxWidth: 340,
              marginBottom: 34,
            }}
          >
            Uma década e meia transformando<br />
            a infraestrutura cloud no Brasil.
          </p>

          {/* CTA */}
          <button
            ref={btnRef}
            onClick={handleEnter}
            className="anni-btn"
            style={{ opacity: 0 }}
          >
            Entrar no site
          </button>
        </div>

        {/* Side vignettes */}
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(2,5,8,0.6), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(2,5,8,0.6), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(2,5,8,0.55), transparent)" }} />
      </div>
    </>
  );
}

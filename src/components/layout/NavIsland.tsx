"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Empresa", href: "/empresa" },
  {
    label: "Nossas soluções",
    href: "#",
    children: [
      { label: "Servidores cloud", href: "/servidores-cloud" },
      { label: "Backup", href: "/backup" },
    ],
  },
  { label: "Seja um parceiro", href: "#parceiros" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

export function NavIsland() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop nav — full bar with logo + links + CTA */}
      <header className="fixed top-5 left-0 right-0 z-[100] hidden md:flex justify-center pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center gap-7 px-7 py-3 transition-all duration-300"
          style={{
            borderRadius: 9999,
            background: scrolled ? "rgba(4,8,16,0.92)" : "rgba(10,14,22,0.72)",
            backdropFilter: "blur(16px) saturate(120%)",
            WebkitBackdropFilter: "blur(16px) saturate(120%)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <Link href="/" className="shrink-0">
            <Image src="/logo/prodb-logo-branco.svg" alt="Prodb" width={90} height={28} priority />
          </Link>

          <div className="flex items-center gap-6">
            {links.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    className="text-sm text-white/70 hover:text-white transition-colors"
                    onClick={() => setSolutionsOpen((v) => !v)}
                  >
                    {link.label} ▾
                  </button>
                  {solutionsOpen && (
                    <div
                      className="absolute top-full mt-2 left-0 py-2 min-w-[180px] rounded-2xl"
                      style={{
                        background: "rgba(4,8,16,0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setSolutionsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <Link
            href="#contato"
            className="text-sm font-semibold text-white px-5 py-2 transition-all hover:bg-blue-dark-btn"
            style={{ borderRadius: 9999, background: "#018DEE" }}
          >
            Fale com um especialista
          </Link>
        </nav>
      </header>

      {/* Mobile nav — single glassy circle button on the right */}
      <button
        className="md:hidden fixed top-5 right-5 z-[100] w-12 h-12 rounded-full flex items-center justify-center"
        onClick={() => setMenuOpen(true)}
        aria-label="Menu"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(14px) saturate(130%)",
          WebkitBackdropFilter: "blur(14px) saturate(130%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        <div className="flex flex-col gap-[5px]">
          <div className="w-[18px] h-[1.5px] bg-white rounded-full" />
          <div className="w-[18px] h-[1.5px] bg-white rounded-full" />
          <div className="w-[18px] h-[1.5px] bg-white rounded-full" />
        </div>
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[101] md:hidden"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-72 flex flex-col p-8 gap-6"
            style={{ background: "#040810", borderLeft: "1px solid rgba(255,255,255,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src="/logo/prodb-logo-branco.svg" alt="Prodb" width={80} height={25} />
            {links.flatMap((l) =>
              l.children
                ? l.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="text-white/80 text-base hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))
                : [
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-white/80 text-base hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label}
                    </Link>,
                  ]
            )}
            <Link
              href="#contato"
              className="mt-auto text-center font-semibold text-white py-3 rounded-full"
              style={{ background: "#018DEE" }}
              onClick={() => setMenuOpen(false)}
            >
              Fale com um especialista
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

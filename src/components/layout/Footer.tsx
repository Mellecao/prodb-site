import Image from "next/image";
import Link from "next/link";

const solutions = [
  { label: "Servidores cloud", href: "/servidores-cloud" },
  { label: "Backup", href: "/backup" },
  { label: "Seja nosso parceiro", href: "#parceiros" },
  { label: "Suporte", href: "#contato" },
];

const company = [
  { label: "Quem somos", href: "/empresa" },
  { label: "Certificações", href: "/empresa#certificacoes" },
  { label: "Contato", href: "#contato" },
  { label: "Blog", href: "#blog" },
];

const legal = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
  { label: "Política de Cookies", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/5">
      {/* Top text marquee — '>_' terminal vibe */}
      <div
        className="overflow-hidden border-b border-white/5 py-5 relative"
        style={{
          background: "linear-gradient(180deg, #02060c 0%, #040810 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <style>{`
          @keyframes prodb-text-mq {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }
        `}</style>
        <div
          className="flex whitespace-nowrap select-none"
          style={{
            animation: "prodb-text-mq 50s linear infinite",
            width: "max-content",
          }}
        >
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="mx-7 font-mono text-2xl"
              style={{
                color: "rgba(1,141,238,0.45)",
                textShadow: "0 0 12px rgba(1,141,238,0.35)",
              }}
            >
              {">_"}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Image src="/logo/prodb-logo-branco.svg" alt="Prodb" width={90} height={28} className="mb-4" />
              <p className="text-white/40 text-sm leading-relaxed">
                R. José Rodrigues de Carvalho, 116 Jd. Nilópolis – Campinas/SP 13088-833
              </p>
              <div className="flex gap-4 mt-5">
                {["Linkedin", "Facebook", "Instagram"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-white/40 hover:text-blue-primary text-xs transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs tracking-[3px] uppercase text-blue-primary mb-5 font-semibold">Soluções</h4>
              <ul className="space-y-3">
                {solutions.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-[3px] uppercase text-blue-primary mb-5 font-semibold">Empresa</h4>
              <ul className="space-y-3">
                {company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-[3px] uppercase text-blue-primary mb-5 font-semibold">Contato</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li><a href="tel:+551932913150" className="hover:text-white transition-colors">(19) 3291-3150</a></li>
                <li><a href="mailto:contato@prodb.com.br" className="hover:text-white transition-colors">contato@prodb.com.br</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              Prodb CNPJ: 37.683.941/0001-87 © Todos os direitos reservados 2026
            </p>
            <div className="flex gap-5">
              {legal.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-white/30 hover:text-white/60 text-xs transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

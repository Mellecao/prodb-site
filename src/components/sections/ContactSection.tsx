"use client";

const fields = [
  { label: "Nome", type: "text", placeholder: "Seu nome", name: "name" },
  { label: "Empresa", type: "text", placeholder: "Nome da empresa", name: "company" },
  { label: "Telefone", type: "tel", placeholder: "(00) 00000-0000", name: "phone" },
  { label: "E-mail", type: "email", placeholder: "seu@email.com", name: "email" },
];

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const contacts = [
  { icon: <PhoneIcon />, label: "Telefone", value: "(19) 3291-3150", href: "tel:+551932913150" },
  { icon: <EmailIcon />, label: "E-mail", value: "contato@prodb.com.br", href: "mailto:contato@prodb.com.br" },
  { icon: <MapIcon />, label: "Endereço", value: "R. José Rodrigues de Carvalho, 116\nJd. Nilópolis – Campinas/SP", href: undefined },
];

export function ContactSection() {
  return (
    <section id="contato" className="relative bg-[#040810] py-24 px-8 overflow-hidden">
      {/* Ambient glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "12%", left: "5%", width: 520, height: 520,
          background: "radial-gradient(circle, rgba(1,141,238,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "8%", right: "5%", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(1,175,226,0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,141,238,0.4), transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-4">Contato</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Vamos começar juntos
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
            Preencha o formulário ou entre em contato diretamente com nossa equipe para receber um
            orçamento personalizado.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-7">
          {/* Form card */}
          <div
            className="lg:col-span-3 rounded-3xl p-8 md:p-10"
            style={{
              background: "linear-gradient(180deg, #08131f 0%, #040810 100%)",
              border: "1px solid rgba(1,141,238,0.18)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <h3 className="text-white text-xl font-bold mb-2">Solicite seu orçamento</h3>
            <p className="text-white/45 text-sm mb-7">Resposta em até 24h úteis.</p>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                {fields.map((f) => (
                  <div key={f.name} className="flex flex-col">
                    <label className="text-white/55 text-xs uppercase tracking-[1.5px] font-semibold mb-2">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-primary/60 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <label className="text-white/55 text-xs uppercase tracking-[1.5px] font-semibold mb-2">
                  Mensagem
                </label>
                <textarea
                  rows={5}
                  placeholder="Como podemos ajudar?"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-primary/60 focus:bg-white/[0.05] transition-all resize-none"
                />
              </div>

              <label className="flex items-start gap-3 text-white/45 text-xs cursor-pointer leading-relaxed">
                <input type="checkbox" className="mt-0.5 accent-blue-primary" />
                <span>Ao enviar, você concorda com nossa Política de Privacidade.</span>
              </label>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #018DEE 0%, #01AFE2 100%)",
                  boxShadow: "0 6px 28px rgba(1,141,238,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
              >
                Enviar mensagem
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Right column: stat + contact info — fills full grid-cell height */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Featured stat card */}
            <div
              className="relative overflow-hidden rounded-3xl p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(1,141,238,0.22) 0%, rgba(1,175,226,0.05) 100%)",
                border: "1px solid rgba(1,141,238,0.32)",
              }}
            >
              <div
                className="absolute -top-12 -right-12 w-44 h-44 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(1,175,226,0.5), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <div className="relative z-10">
                <div
                  className="text-5xl font-black text-white mb-2 leading-none tabular-nums"
                  style={{ textShadow: "0 0 24px rgba(1,141,238,0.55)" }}
                >
                  +550
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  empresas confiam na Prodb para manter seus dados seguros.
                </p>
              </div>
            </div>

            {/* Contact items — flex-1 each, so they grow equally to fill the column */}
            {contacts.map((c) => {
              const inner = (
                <div
                  className="h-full flex items-center gap-4 rounded-2xl p-5 transition-all group-hover:bg-white/[0.05] group-hover:border-blue-primary/40"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(1,141,238,0.14)",
                      border: "1px solid rgba(1,141,238,0.32)",
                      color: "#01AFE2",
                    }}
                  >
                    {c.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white/45 text-[10px] tracking-[2px] uppercase font-semibold mb-1">
                      {c.label}
                    </div>
                    <div className="text-white text-sm font-semibold whitespace-pre-line leading-snug">
                      {c.value}
                    </div>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} className="group block flex-1 min-h-[88px]">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="group flex-1 min-h-[88px]">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

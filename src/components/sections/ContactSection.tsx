"use client";

export function ContactSection() {
  return (
    <section id="contato" className="bg-bg-dark py-24">
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-12">
          <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-3">Contato</p>
          <h2 className="text-4xl font-black text-white mb-4">Vamos começar</h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl">
            Preencha o formulário ou entre em contato diretamente com nossa equipe para receber um orçamento
            personalizado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            {[
              { label: "Nome", type: "text", placeholder: "Seu nome" },
              { label: "Telefone", type: "tel", placeholder: "(00) 00000-0000" },
              { label: "E-mail", type: "email", placeholder: "seu@email.com" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-white/60 text-sm mb-1.5 block">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-primary transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Mensagem</label>
              <textarea
                rows={4}
                placeholder="Como podemos ajudar?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-primary transition-colors resize-none"
              />
            </div>
            <label className="flex items-start gap-3 text-white/40 text-xs cursor-pointer">
              <input type="checkbox" className="mt-0.5 accent-blue-primary" />
              Ao enviar, você concorda com nossa Política de Privacidade.
            </label>
            <button
              type="submit"
              className="bg-blue-primary text-white font-semibold py-3.5 rounded-full hover:bg-blue-dark-btn transition-colors"
            >
              Enviar
            </button>
          </form>

          <div className="flex flex-col gap-8">
            <div className="bg-blue-primary/10 border border-blue-primary/20 rounded-2xl p-6">
              <div className="text-3xl font-black text-blue-primary mb-1">+550</div>
              <div className="text-white/60 text-sm">pessoas confiam na Prodb</div>
            </div>
            <div className="text-white/40 text-sm leading-relaxed space-y-2">
              <p>📞 (19) 3291-3150</p>
              <p>✉️ contato@prodb.com.br</p>
              <p>📍 R. José Rodrigues de Carvalho, 116<br />Jd. Nilópolis – Campinas/SP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

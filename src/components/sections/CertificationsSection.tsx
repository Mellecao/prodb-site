// src/components/sections/CertificationsSection.tsx
"use client";
import { useState } from "react";
import Image from "next/image";

const certs = [
  { file: "Tier-III.png", name: "Tier III", desc: "Disponibilidade de 99,982% com componentes redundantes e múltiplos caminhos de distribuição garantindo alta disponibilidade." },
  { file: "TR3-TUV-Rheinland.png", name: "TR3 TÜV Rheinland", desc: "Garante que o Data Center atende aos padrões ANSI/TIA 942 em projeto, operação, manutenção e segurança." },
  { file: "SOC.png", name: "SOC", desc: "Certifica eficiência nos processos e segurança física, atendendo requisitos de conformidade regulatória." },
  { file: "PCI-DDS.png", name: "PCI-DSS", desc: "Garante a segurança de dados de transações financeiras, protegendo contra fraudes e acessos não autorizados." },
  { file: "ISO-27001.png", name: "ISO 27001", desc: "Padrão global para gestão da Segurança da Informação, abordando políticas, controle de acessos e criptografia." },
  { file: "ISO-20000.png", name: "ISO 20000", desc: "Garante que o gerenciamento de serviços de TI atende às melhores práticas e promove melhoria contínua." },
  { file: "ISO-50001.png", name: "ISO 50001", desc: "Foco na utilização eficiente da energia elétrica, promovendo desempenho mais ecológico e sustentável." },
  { file: "ISO-14001.png", name: "ISO 14001", desc: "Reconhece a empresa como pioneira em práticas sustentáveis no setor de Data Centers desde 2016." },
  { file: "ISO-37001.png", name: "ISO 37001", desc: "Garante que a empresa adota práticas éticas com sistemas eficazes para prevenir suborno e corrupção." },
];

interface CertificationsSectionProps {
  compact?: boolean;
}

export function CertificationsSection({ compact = false }: CertificationsSectionProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="certificacoes" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-8">
        {!compact && (
          <div className="mb-14 text-center">
            <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-3">Confiança</p>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Certificações que garantem confiança</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              A infraestrutura utilizada pela Prodb tem como determinante as certificações internacionais em cloud que
              garantem conformidade com os mais altos padrões de segurança, performance e governança.
            </p>
          </div>
        )}

        <div className={`grid ${compact ? "grid-cols-3 md:grid-cols-5 gap-6" : "grid-cols-2 md:grid-cols-3 gap-6"}`}>
          {certs.map((cert, i) => (
            <div
              key={cert.name}
              className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                ${expanded === i
                  ? "border-blue-primary shadow-[0_0_20px_rgba(1,141,238,0.2)]"
                  : "border-gray-100 hover:border-blue-primary/40"
                }
              `}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-16 flex items-center justify-center mb-4">
                  <Image
                    src={`/certificacoes/${cert.file}`}
                    alt={cert.name}
                    width={80}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                {!compact && (
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: expanded === i ? 200 : 0 }}
                  >
                    <p className="text-gray-500 text-xs leading-relaxed mt-3">{cert.desc}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

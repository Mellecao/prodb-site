"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Link from "next/link";

const posts = [
  {
    title: "Redução de custos cloud: por que 70% das empresas pagam por recursos que nunca usam",
    excerpt:
      "Se a sua empresa usa AWS, Azure ou Google Cloud, há uma grande chance de que parte da sua fatura mensal esteja sendo desperdiçada...",
    href: "#",
    date: "2026",
    image: "/img/blog_redu%C3%A7%C3%A3o%20de%20custos.jpg",
  },
  {
    title: "Ambientes Integrados e Automatizados: Como Reduzir Erros e Aumentar a Produtividade na Sua TI",
    excerpt:
      "Você já parou para calcular quanto tempo sua equipe de TI perde com tarefas manuais repetitivas? Além disso, quantos erros humanos poderiam ser evitados...",
    href: "#",
    date: "2026",
    image: "/img/blog_ambientes_integrados.webp",
  },
  {
    title: "O que é cibersegurança e segurança de dados e por que isso é essencial em 2026",
    excerpt:
      "A tecnologia está cada vez mais presente no dia a dia das empresas. Sistemas em nuvem, trabalho remoto, e-commerces e uso constante de dados...",
    href: "#",
    date: "2026",
    image: "/img/blog_ciberseguran_a_e_seguran_a.webp",
  },
];

export function NewsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;
    const trigger = ScrollTrigger.create({
      trigger: cards,
      start: "top 80%",
      onEnter: () => {
        gsap.from(cards.children, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
        });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section id="blog" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-12">
          <p className="text-xs tracking-[3px] uppercase text-blue-primary font-semibold mb-3">Blog</p>
          <h2 className="text-4xl font-black text-gray-900">Últimas notícias</h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article
              key={i}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Cover image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle bottom gradient for visual depth */}
                <div
                  className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.15), transparent)",
                  }}
                />
              </div>

              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <Link
                  href={post.href}
                  className="text-blue-primary text-sm font-semibold hover:underline w-fit"
                >
                  Leia mais »
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

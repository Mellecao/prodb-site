"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Link from "next/link";

const posts = [
  {
    title: "Redução de custos cloud: por que 70% das empresas pagam por recursos que nunca usam",
    excerpt: "Se a sua empresa usa AWS, Azure ou Google Cloud, há uma grande chance de que parte da sua fatura mensal esteja sendo desperdiçada...",
    href: "#",
    date: "2026",
  },
  {
    title: "Ambientes Integrados e Automatizados: Como Reduzir Erros e Aumentar a Produtividade na Sua TI",
    excerpt: "Você já parou para calcular quanto tempo sua equipe de TI perde com tarefas manuais repetitivas? Além disso, quantos erros humanos poderiam ser evitados...",
    href: "#",
    date: "2026",
  },
  {
    title: "O que é cibersegurança e segurança de dados e por que isso é essencial em 2026",
    excerpt: "A tecnologia está cada vez mais presente no dia a dia das empresas. Sistemas em nuvem, trabalho remoto, e-commerces e uso constante de dados...",
    href: "#",
    date: "2026",
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
          y: 40, opacity: 0, stagger: 0.15, duration: 0.7, ease: "power3.out",
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
            <article key={i} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 rounded-xl bg-gradient-to-br from-blue-primary/10 to-blue-secondary/5 mb-5 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-primary/20 flex items-center justify-center text-blue-primary text-xl">📰</div>
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 line-clamp-3">{post.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
              <Link href={post.href} className="text-blue-primary text-sm font-semibold hover:underline">Leia mais »</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

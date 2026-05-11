import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Database,
  Keyboard,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Header } from "@/src/components/main/Header";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça o TypeDash, um projeto open-source para medir velocidade, precisão e evolução em testes de digitação.",
};

const pillars = [
  {
    title: "Medição objetiva",
    description:
      "WPM e precisão são calculados a partir do log real de teclas, considerando correções com Backspace.",
    icon: Keyboard,
  },
  {
    title: "Evolução pessoal",
    description:
      "Usuários autenticados mantêm histórico de testes e gráficos para acompanhar consistência ao longo do tempo.",
    icon: BarChart3,
  },
  {
    title: "Competição justa",
    description:
      "Rankings diários, semanais, mensais e gerais mostram apenas a melhor marca de cada pessoa.",
    icon: Trophy,
  },
];

const stack = [
  "Next.js App Router",
  "Auth.js com GitHub",
  "PostgreSQL e Prisma",
  "Tailwind CSS",
  "Recharts",
  "Zod",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#282a36" }}>
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-10 md:px-8">
        <section className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-comment">
                Sobre o projeto
              </p>
              <h1 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
                TypeDash
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-comment">
                O TypeDash é uma plataforma de teste de digitação pensada para
                quem quer medir velocidade, precisão e evolução com uma interface
                direta, tema Dracula e histórico persistente.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "#bd93f9", color: "#282a36" }}
              >
                Iniciar teste
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com/emanuelVINI01/typedash"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-current-line px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-purple hover:text-purple"
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-current-line bg-current-line/10 shadow-2xl shadow-black/20">
            <Image
              src="/dash_image.png"
              alt="Tela do dashboard do TypeDash"
              width={1080}
              height={630}
              className="h-auto w-full"
              priority
            />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="rounded-lg border border-current-line bg-[#21222c] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/10 text-purple">
                  <Icon size={20} />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-comment">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-comment">
              Institucional
            </p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">
              Construído para praticar e acompanhar progresso
            </h2>
            <p className="mt-4 text-sm leading-6 text-comment">
              O projeto combina experiência de digitação, autenticação, banco de
              dados e visualização de métricas em um produto pequeno, útil e
              aberto para evolução.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-current-line bg-current-line/10 p-5">
              <ShieldCheck className="h-6 w-6 text-green" />
              <h3 className="mt-4 font-semibold text-foreground">
                Dados do usuário
              </h3>
              <p className="mt-2 text-sm leading-6 text-comment">
                Resultados são salvos somente para usuários autenticados, usando
                a conta do GitHub como identidade no ranking.
              </p>
            </div>
            <div className="rounded-lg border border-current-line bg-current-line/10 p-5">
              <Database className="h-6 w-6 text-cyan" />
              <h3 className="mt-4 font-semibold text-foreground">
                Base técnica
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-current-line px-2.5 py-1 text-xs text-comment"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

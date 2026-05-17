"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Medal, Trophy, Users } from "lucide-react";
import { Header } from "@/src/components/main/Header";
import { RankingSection } from "@/src/components/main/RankingSection";
import { useLanguage } from "@/src/context/LanguageContext";

export default function RankingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple/25 bg-purple/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-purple sm:text-xs">
              <Trophy className="h-3.5 w-3.5" />
              {t.rankingPage.badge}
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
              {t.rankingPage.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-comment sm:text-base">
              {t.rankingPage.subtitle}
            </p>
          </div>
          <Link href="/" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple px-5 text-sm font-semibold text-background shadow-lg shadow-purple/20">
            {t.rankingPage.startTest}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Medal, ...t.rankingPage.cards[0] },
            { icon: Users, ...t.rankingPage.cards[1] },
            { icon: Trophy, ...t.rankingPage.cards[2] },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-xl border border-current-line/70 bg-current-line/20 p-4">
              <Icon className="h-5 w-5 text-cyan" />
              <h2 className="mt-4 font-semibold text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-comment">{text}</p>
            </article>
          ))}
        </section>

        <RankingSection limit={20} />
      </main>
    </div>
  );
}

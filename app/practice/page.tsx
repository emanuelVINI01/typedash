"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Gauge, Keyboard, Repeat2, Timer, WandSparkles } from "lucide-react";
import { Header } from "@/src/components/main/Header";
import { useLanguage } from "@/src/context/LanguageContext";

export default function PracticePage() {
  const { t } = useLanguage();

  const drills = [
    { icon: Timer, ...t.practicePage.drills[0] },
    { icon: Repeat2, ...t.practicePage.drills[1] },
    { icon: Brain, ...t.practicePage.drills[2] },
    { icon: Gauge, ...t.practicePage.drills[3] },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-cyan sm:text-xs">
              <WandSparkles className="h-3.5 w-3.5" />
              {t.practicePage.badge}
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
              {t.practicePage.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-comment sm:text-base">
              {t.practicePage.subtitle}
            </p>
          </div>
          <Link href="/" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan px-5 text-sm font-semibold text-background shadow-lg shadow-cyan/20">
            {t.practicePage.openTest}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-2">
          {drills.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-current-line/70 bg-current-line/20 p-5"
            >
              <Icon className="h-6 w-6 text-purple" />
              <h2 className="mt-5 text-lg font-semibold text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-comment">{text}</p>
            </motion.article>
          ))}
        </section>

        <section className="rounded-2xl border border-green/20 bg-green/5 p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
            <Keyboard className="h-8 w-8 text-green" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{t.practicePage.recommendedTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-comment">
                {t.practicePage.recommendedText}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

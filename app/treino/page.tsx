"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Gauge, Keyboard, Repeat2, Timer, WandSparkles } from "lucide-react";
import { Header } from "@/src/components/main/Header";

const drills = [
  {
    icon: Timer,
    title: "30-second sprint",
    text: "Run three short tests and keep the best score. Short loops make mobile practice less tiring.",
  },
  {
    icon: Repeat2,
    title: "Correction discipline",
    text: "Use Backspace only when needed. The metric model rewards speed, but accuracy keeps progress honest.",
  },
  {
    icon: Brain,
    title: "Pattern focus",
    text: "Watch repeated mistakes, then run a slower session to retrain the pattern before pushing WPM.",
  },
  {
    icon: Gauge,
    title: "Consistency check",
    text: "A strong dashboard trend matters more than a single lucky score.",
  },
];

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-cyan sm:text-xs">
              <WandSparkles className="h-3.5 w-3.5" />
              Practice resources
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
              A small training system for cleaner WPM gains.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-comment sm:text-base">
              TypeDash is not only a stopwatch. Use these drills to turn raw typing tests into repeatable practice.
            </p>
          </div>
          <Link href="/" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan px-5 text-sm font-semibold text-background shadow-lg shadow-cyan/20">
            Open test
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
              <h2 className="text-xl font-semibold text-foreground">Recommended loop</h2>
              <p className="mt-2 text-sm leading-6 text-comment">
                Warm up with one slow accurate run, complete three timed tests, then review the dashboard before changing speed goals.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

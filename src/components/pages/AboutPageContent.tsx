"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Keyboard, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Header } from "@/src/components/main/Header";
import { useLanguage } from "@/src/context/LanguageContext";

const pillarIcons = [Keyboard, BarChart3, Trophy];

export function AboutPageContent() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24 text-foreground lg:pb-0">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-6 sm:px-6 sm:py-10">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-comment">
                {t.aboutPage.badge}
              </p>
              <h1 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
                {t.aboutPage.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-comment">
                {t.aboutPage.subtitle}
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-4 py-3 text-sm font-semibold text-background shadow-lg shadow-purple/20 transition-transform hover:-translate-y-0.5"
              >
                {t.aboutPage.startTest}
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com/emanuelVINI01/typedash"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-current-line px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-purple hover:text-purple"
              >
                <FaGithub className="h-4 w-4" />
                {t.common.github}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-current-line bg-current-line/10 shadow-2xl shadow-black/20">
            <Image
              src="/dash_image.png"
              alt={t.aboutPage.heroImageAlt}
              width={1080}
              height={630}
              className="h-auto w-full"
              priority
            />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {t.aboutPage.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];

            return (
              <motion.article
                key={pillar.title}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-current-line bg-current-line/20 p-5 transition-colors hover:border-purple/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/10 text-purple">
                  <Icon size={20} />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-comment">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-comment">
              {t.aboutPage.engineeringLabel}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">
              {t.aboutPage.engineeringTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-comment">
              {t.aboutPage.engineeringText}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-current-line bg-current-line/10 p-5 transition-colors hover:border-purple/40"
            >
              <ShieldCheck className="h-6 w-6 text-green" />
              <h3 className="mt-4 font-semibold text-foreground">
                {t.aboutPage.userDataTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-comment">
                {t.aboutPage.userDataText}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-current-line bg-current-line/10 p-5 transition-colors hover:border-purple/40"
            >
              <Sparkles className="h-6 w-6 text-cyan" />
              <h3 className="mt-4 font-semibold text-foreground">
                {t.aboutPage.technicalBaseTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-comment">
                {t.aboutPage.technicalBaseText}
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

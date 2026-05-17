"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

export function HomeIntroSection() {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mt-6 flex flex-col gap-6 rounded-2xl border border-current-line/60 bg-current-line/10 p-6 backdrop-blur-md sm:p-8"
    >
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan">
          <Sparkles className="h-4 w-4" />
          {t.home.aboutBadge}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t.home.aboutTitle}
        </h2>
        <p className="text-sm leading-7 text-comment sm:text-base">
          {t.home.aboutText}
        </p>
      </div>
    </motion.section>
  );
}

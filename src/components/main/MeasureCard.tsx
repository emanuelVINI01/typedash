"use client";

import { motion } from "framer-motion";
import { Keyboard } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

export function MeasureCard() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
      className="relative w-full overflow-hidden rounded-2xl border border-current-line/70 bg-current-line/20 p-5 backdrop-blur-md"
    >
      <div
        aria-hidden
        className="waveform-motif pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-10"
      />
      <div className="relative mb-5 inline-flex items-center gap-2 rounded-full border border-purple/25 bg-purple/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-purple sm:text-xs">
        <Keyboard className="h-3.5 w-3.5" />
        {t.home.badge}
      </div>
      <h1 className="relative max-w-4xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-3xl xl:text-4xl">
        {t.home.title}
      </h1>
      <p className="relative mt-5 max-w-4xl text-sm leading-7 text-comment sm:text-base lg:text-sm">
        {t.home.description}
      </p>
    </motion.div>
  );
}

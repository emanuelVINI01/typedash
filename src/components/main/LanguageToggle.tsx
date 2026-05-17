"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

export function LanguageToggle() {
  const { language, t, toggleLanguage } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={toggleLanguage}
      whileTap={{ scale: 0.94 }}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-current-line bg-current-line/30 px-2.5 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-purple/50 hover:text-purple sm:px-3"
      title={t.common.toggleLanguage}
      aria-label={t.common.toggleLanguage}
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{language.toUpperCase()}</span>
    </motion.button>
  );
}

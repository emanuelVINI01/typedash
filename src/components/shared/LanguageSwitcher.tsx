"use client";

import { motion } from "framer-motion";
import { Flag } from "@/src/components/shared/Flag";
import { useLanguage } from "@/src/context/LanguageContext";
import type { Language } from "@/src/i18n/dictionaries";

const LOCALES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
];

export function LanguageSwitcher() {
  const { language, t, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.common.toggleLanguage}
      className="inline-flex items-center gap-1 rounded-lg border border-current-line bg-current-line/30 p-1"
    >
      {LOCALES.map(({ code, label }) => {
        const isActive = language === code;

        return (
          <motion.button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            whileTap={{ scale: 0.9 }}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 ${isActive
              ? "bg-purple/15 ring-1 ring-purple/60"
              : "opacity-50 hover:opacity-90"
              }`}
          >
            <Flag locale={code} size={16} />
          </motion.button>
        );
      })}
    </div>
  );
}

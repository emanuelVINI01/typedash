"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";

const stepStyles = [
  "bg-purple/10 border-purple/35 text-purple",
  "bg-pink-500/10 border-[#ff79c6]/35 text-[#ff79c6]",
  "bg-cyan/10 border-cyan/35 text-cyan",
] as const;

export function HomeTrainingSteps() {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-6 flex flex-col gap-6 rounded-2xl border border-current-line/60 bg-current-line/10 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {t.home.trainingTitle}
        </h3>
        <p className="text-xs text-comment sm:text-sm">
          {t.home.trainingSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {t.home.steps.map((step, index) => (
          <div
            key={step.title}
            className="relative flex flex-col gap-2 rounded-xl bg-current-line/5 p-4 md:bg-transparent md:p-0"
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold ${stepStyles[index]}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground sm:text-base">
                {step.title}
              </h4>
            </div>
            <p className="mt-1 pl-0 text-xs leading-5 text-comment sm:text-sm md:pl-11">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

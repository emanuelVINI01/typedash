"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export type ResultStatTone = "accent" | "success" | "error";

const TONE_CLASSES: Record<ResultStatTone, { chip: string; icon: string; value: string }> = {
  accent: { chip: "bg-purple/10", icon: "text-purple", value: "text-purple" },
  success: { chip: "bg-green/10", icon: "text-green", value: "text-green" },
  error: { chip: "bg-red/10", icon: "text-red", value: "text-red" },
};

interface ResultStatCardProps {
  tone: ResultStatTone;
  icon: ReactNode;
  label: string;
  large?: boolean;
  value: string | number;
}

export function ResultStatCard({
  tone,
  icon,
  label,
  large = false,
  value,
}: ResultStatCardProps) {
  const toneClass = TONE_CLASSES[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="stat-card flex h-28 flex-col items-center justify-center gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 transition-colors hover:border-purple/50 sm:h-32 sm:p-4 lg:h-[6.75rem]"
    >
      <div
        className={`flex items-center justify-center rounded-xl ${large ? "h-11 w-11" : "h-9 w-9"} ${toneClass.chip} ${toneClass.icon}`}
      >
        {icon}
      </div>
      <span
        className={`font-mono font-bold tabular-nums tracking-tight ${toneClass.value} ${large ? "text-4xl sm:text-5xl lg:text-4xl" : "text-2xl sm:text-3xl"}`}
      >
        {value}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--fg-subtle)] sm:text-xs">
        {label}
      </span>
    </motion.div>
  );
}

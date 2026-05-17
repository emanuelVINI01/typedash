"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ResultStatCardProps {
  color: string;
  icon: ReactNode;
  label: string;
  large?: boolean;
  value: string | number;
}

export function ResultStatCard({
  color,
  icon,
  label,
  large = false,
  value,
}: ResultStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="stat-card flex h-28 flex-col items-center justify-center gap-1.5 rounded-2xl border border-current-line/70 p-3 sm:h-32 sm:p-4 lg:h-[6.75rem]"
      style={{ background: "#21222c" }}
    >
      <div style={{ color }}>{icon}</div>
      <span className="text-[10px] uppercase tracking-widest sm:text-xs" style={{ color: "#6272a4" }}>
        {label}
      </span>
      <span
        className={`font-bold tabular-nums ${large ? "text-4xl sm:text-5xl lg:text-4xl" : "text-2xl sm:text-3xl"}`}
        style={{ color }}
      >
        {value}
      </span>
    </motion.div>
  );
}

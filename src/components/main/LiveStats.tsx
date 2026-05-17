"use client";

import { motion } from "framer-motion";
import { Activity, Timer, Zap } from "lucide-react";
import { Phase } from "@/src/types/typing";

interface LiveStatsProps {
  timeLeft: number;
  wpm: number;
  accuracy: number;
  phase: Phase;
}

export function LiveStats({ timeLeft, wpm, accuracy, phase }: LiveStatsProps) {
  const timerColor =
    timeLeft <= 5
      ? "text-red"
      : timeLeft <= 10
      ? "text-[var(--dracula-orange)]"
      : "text-cyan";

  const cards = [
    { icon: Timer, label: "time", value: timeLeft, color: timerColor },
    { icon: Zap, label: "wpm", value: wpm, color: phase === "idle" ? "text-comment" : "text-purple" },
    { icon: Activity, label: "accuracy", value: `${accuracy}%`, color: phase === "idle" ? "text-comment" : "text-green" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {cards.map(({ icon: Icon, label, value, color }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.28, ease: "easeOut" }}
          className="stat-card rounded-xl border border-current-line/80 bg-current-line/35 p-3 text-center backdrop-blur sm:p-5"
        >
          <div className="mb-2 flex items-center justify-center gap-1.5 text-comment">
            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-[10px] font-semibold uppercase tracking-widest sm:text-xs">{label}</span>
          </div>
          <span className={`font-mono text-3xl font-bold tabular-nums transition-colors duration-300 sm:text-4xl ${color}`}>
            {value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

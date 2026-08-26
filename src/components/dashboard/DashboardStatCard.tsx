"use client";

import { motion } from "framer-motion";

interface DashboardStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function DashboardStatCard({ icon, label, value }: DashboardStatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="stat-card flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-purple/50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/10 text-purple">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-3xl font-bold tracking-tight text-[var(--fg)]">
          {value}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--fg-subtle)]">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

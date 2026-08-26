"use client";

import { Trophy, Activity, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { WpmDataPoint } from "@/src/types/typing";
import { useLanguage } from "@/src/context/LanguageContext";
import { ResultStatCard } from "@/src/components/main/results/ResultStatCard";
import { ResultsChartTooltip } from "@/src/components/main/results/ResultsChartTooltip";

interface ResultsScreenProps {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  wpmHistory: WpmDataPoint[];
  onReset: () => void;
}

export function ResultsScreen({
  wpm,
  accuracy,
  correct,
  incorrect,
  wpmHistory,
  onReset,
}: ResultsScreenProps) {
  const { t } = useLanguage();

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid w-full gap-4 lg:grid-cols-[9rem_1fr]">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1">
        <ResultStatCard
          icon={<Trophy className="h-7 w-7" />}
          label="WPM"
          value={wpm}
          tone="accent"
          large
        />
        <ResultStatCard
          icon={<Activity className="h-5 w-5" />}
          label={t.results.accuracy}
          value={`${accuracy}%`}
          tone="success"
        />
        <ResultStatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label={t.results.correct}
          value={correct}
          tone="success"
        />
        <ResultStatCard
          icon={<XCircle className="h-5 w-5" />}
          label={t.results.incorrect}
          value={incorrect}
          tone="error"
        />
      </div>

      {/* WPM Chart */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6"
      >
        <div
          aria-hidden
          className="waveform-motif pointer-events-none absolute inset-x-0 top-0 h-20 opacity-10"
        />
        <div className="relative mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-widest text-[var(--fg-subtle)]">
            {t.results.chartTitle}
          </p>
          <p className="font-mono text-xs font-semibold tracking-tight text-purple">
            {wpm} WPM · {accuracy}% ACC
          </p>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={wpmHistory} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="second"
              tick={{ fill: "var(--fg-subtle)", fontSize: 11 }}
              tickFormatter={(v) => `${v}s`}
            />
            <YAxis tick={{ fill: "var(--fg-subtle)", fontSize: 11 }} />
            <Tooltip content={<ResultsChartTooltip />} />
            <Line
              type="monotone"
              dataKey="wpm"
              stroke="var(--accent)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "var(--accent)", stroke: "var(--card)" }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="relative flex justify-center pt-6">
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl bg-purple px-8 py-3 text-sm font-semibold tracking-wide text-background transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            {t.results.retry}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

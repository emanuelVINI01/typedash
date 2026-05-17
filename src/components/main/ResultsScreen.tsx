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
          color="#bd93f9"
          large
        />
        <ResultStatCard
          icon={<Activity className="h-5 w-5" />}
          label={t.results.accuracy}
          value={`${accuracy}%`}
          color="#50fa7b"
        />
        <ResultStatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label={t.results.correct}
          value={correct}
          color="#50fa7b"
        />
        <ResultStatCard
          icon={<XCircle className="h-5 w-5" />}
          label={t.results.incorrect}
          value={incorrect}
          color="#ff5555"
        />
      </div>

      {/* WPM Chart */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="rounded-2xl border border-current-line/70 p-4 sm:p-6"
        style={{ background: "#21222c" }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "#6272a4" }}
        >
          {t.results.chartTitle}
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={wpmHistory} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#44475a" strokeDasharray="3 3" />
            <XAxis
              dataKey="second"
              tick={{ fill: "#6272a4", fontSize: 11 }}
              tickFormatter={(v) => `${v}s`}
            />
            <YAxis tick={{ fill: "#6272a4", fontSize: 11 }} />
            <Tooltip content={<ResultsChartTooltip />} />
            <Line
              type="monotone"
              dataKey="wpm"
              stroke="#bd93f9"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#bd93f9", stroke: "#282a36" }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex justify-center pt-6">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "#bd93f9", color: "#282a36" }}
          >
            <RotateCcw className="w-4 h-4" />
            {t.results.retry}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { Trophy, Activity, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
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

interface ResultsScreenProps {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  wpmHistory: WpmDataPoint[];
  onReset: () => void;
}

function StatCard({
  icon,
  label,
  value,
  color,
  large,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  large?: boolean;
}) {
  return (
    <div
      className="stat-card flex flex-col items-center justify-center gap-2 rounded-2xl p-6"
      style={{ background: "#21222c" }}
    >
      <div style={{ color }}>{icon}</div>
      <span className="text-xs uppercase tracking-widest" style={{ color: "#6272a4" }}>
        {label}
      </span>
      <span
        className={`font-bold tabular-nums ${large ? "text-6xl" : "text-3xl"}`}
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 text-sm"
        style={{ background: "#44475a", color: "#f8f8f2" }}
      >
        <p style={{ color: "#6272a4" }}>{`${label}s`}</p>
        <p style={{ color: "#bd93f9" }}>{`${payload[0].value} WPM`}</p>
      </div>
    );
  }
  return null;
};

export function ResultsScreen({
  wpm,
  accuracy,
  correct,
  incorrect,
  wpmHistory,
  onReset,
}: ResultsScreenProps) {
  return (
    <div className="fade-in w-full flex flex-col gap-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Trophy className="w-8 h-8" />}
          label="WPM"
          value={wpm}
          color="#bd93f9"
          large
          />
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          label="Precisão"
          value={`${accuracy}%`}
          color="#50fa7b"
          />
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6" />}
          label="Acertos"
          value={correct}
          color="#50fa7b"
          />
        <StatCard
          icon={<XCircle className="w-6 h-6" />}
          label="Erros"
          value={incorrect}
          color="#ff5555"
          />
      </div>

      {/* WPM Chart */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "#21222c" }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "#6272a4" }}
        >
          WPM ao longo do tempo
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
            <Tooltip content={<CustomTooltip />} />
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
      </div>

      {/* Reset button */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: "#bd93f9", color: "#282a36" }}
        >
          <RotateCcw className="w-4 h-4" />
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}

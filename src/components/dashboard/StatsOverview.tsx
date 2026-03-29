"use client";

import { TypingMetric } from "@/src/types/typing";
import { Zap, Target, Clock, BarChart2 } from "lucide-react";

interface Props {
  metrics: TypingMetric[];
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div
      className="stat-card flex flex-col gap-3 rounded-xl p-5 border"
      style={{
        background: "#21222c",
        borderColor: "#44475a",
      }}
    >
      <div className="flex items-center gap-2" style={{ color }}>
        {icon}
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#6272a4" }}>
          {label}
        </span>
      </div>
      <span className="text-3xl font-bold font-mono" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

export function StatsOverview({ metrics }: Props) {
  const total = metrics.length;

  const bestWpm = total > 0 ? Math.max(...metrics.map((m) => m.wpm)) : 0;
  const avgWpm =
    total > 0 ? Math.round(metrics.reduce((s, m) => s + m.wpm, 0) / total) : 0;
  const avgAccuracy =
    total > 0
      ? Math.round(metrics.reduce((s, m) => s + m.accuracy, 0) / total)
      : 0;

  const cards: StatCardProps[] = [
    {
      icon: <Zap size={16} />,
      label: "Melhor WPM",
      value: `${bestWpm}`,
      color: "#bd93f9",
    },
    {
      icon: <BarChart2 size={16} />,
      label: "WPM Médio",
      value: `${avgWpm}`,
      color: "#ff79c6",
    },
    {
      icon: <Target size={16} />,
      label: "Acurácia Média",
      value: `${avgAccuracy}%`,
      color: "#50fa7b",
    },
    {
      icon: <Clock size={16} />,
      label: "Testes Realizados",
      value: `${total}`,
      color: "#8be9fd",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

"use client";

import { TypingMetric } from "@/src/types/typing";
import { Zap, Target, Clock, BarChart2 } from "lucide-react";
import { DashboardStatCard } from "@/src/components/dashboard/DashboardStatCard";
import { useLanguage } from "@/src/context/LanguageContext";
import { getDashboardStats } from "@/src/utils/dashboard";

interface Props {
  metrics: TypingMetric[];
}

export function StatsOverview({ metrics }: Props) {
  const { t } = useLanguage();
  const stats = getDashboardStats(metrics);

  const cards = [
    {
      icon: <Zap size={16} />,
      label: t.dashboardPage.stats.bestWpm,
      value: `${stats.bestWpm}`,
    },
    {
      icon: <BarChart2 size={16} />,
      label: t.dashboardPage.stats.averageWpm,
      value: `${stats.averageWpm}`,
    },
    {
      icon: <Target size={16} />,
      label: t.dashboardPage.stats.averageAccuracy,
      value: `${stats.averageAccuracy}%`,
    },
    {
      icon: <Clock size={16} />,
      label: t.dashboardPage.stats.completedTests,
      value: `${stats.completedTests}`,
    },
  ];

  return (
    <div className="relative">
      <div
        aria-hidden
        className="waveform-motif pointer-events-none absolute -inset-x-2 -top-6 h-16 opacity-10"
      />
      {metrics.length > 0 && (
        <p className="relative mb-3 font-mono text-xs font-semibold tracking-tight text-purple">
          {stats.bestWpm} WPM · {stats.averageAccuracy}% ACC
        </p>
      )}
      <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <DashboardStatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}

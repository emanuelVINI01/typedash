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
      color: "#bd93f9",
    },
    {
      icon: <BarChart2 size={16} />,
      label: t.dashboardPage.stats.averageWpm,
      value: `${stats.averageWpm}`,
      color: "#ff79c6",
    },
    {
      icon: <Target size={16} />,
      label: t.dashboardPage.stats.averageAccuracy,
      value: `${stats.averageAccuracy}%`,
      color: "#50fa7b",
    },
    {
      icon: <Clock size={16} />,
      label: t.dashboardPage.stats.completedTests,
      value: `${stats.completedTests}`,
      color: "#8be9fd",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <DashboardStatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

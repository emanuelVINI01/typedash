"use client";

import { TypingMetric } from "@/src/types/typing";
import { DashboardChartCard } from "@/src/components/dashboard/DashboardChartCard";
import { useLanguage } from "@/src/context/LanguageContext";
import {
  getPerformanceChartSeries,
  getSeriesMax,
} from "@/src/utils/dashboard";

interface Props {
  metrics: TypingMetric[];
}

export function PerformanceCharts({ metrics }: Props) {
  const { t } = useLanguage();

  if (metrics.length < 2) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] py-10 text-sm text-[var(--fg-subtle)]">
        {t.dashboardPage.chartsEmpty}
      </div>
    );
  }

  const series = getPerformanceChartSeries(metrics);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--fg-subtle)]">
        {t.dashboardPage.performanceOverTime}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DashboardChartCard
          title={t.dashboardPage.chartCards.wpm.title}
          subtitle={t.dashboardPage.chartCards.wpm.subtitle}
          data={series.wpm}
          color="var(--accent)"
          domain={[0, getSeriesMax(series.wpm, 10)]}
        />
        <DashboardChartCard
          title={t.dashboardPage.chartCards.accuracy.title}
          subtitle={t.dashboardPage.chartCards.accuracy.subtitle}
          data={series.accuracy}
          color="var(--info)"
          unit="%"
          domain={[0, 100]}
        />
        <DashboardChartCard
          title={t.dashboardPage.chartCards.duration.title}
          subtitle={t.dashboardPage.chartCards.duration.subtitle}
          data={series.duration}
          color="var(--success)"
          unit="s"
          domain={[0, getSeriesMax(series.duration, 5)]}
        />
      </div>
    </div>
  );
}

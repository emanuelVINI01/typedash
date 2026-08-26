import type { Language } from "@/src/i18n/dictionaries";
import type { TypingMetric } from "@/src/types/typing";

export type SortKey =
  | "recent"
  | "wpm_desc"
  | "wpm_asc"
  | "accuracy_desc"
  | "accuracy_asc"
  | "duration_desc";

export interface DashboardStatValue {
  averageAccuracy: number;
  averageWpm: number;
  bestWpm: number;
  completedTests: number;
}

export interface DashboardChartPoint {
  index: number;
  value: number;
}

export interface DashboardChartSeries {
  accuracy: DashboardChartPoint[];
  duration: DashboardChartPoint[];
  wpm: DashboardChartPoint[];
}

export function sortMetrics(metrics: TypingMetric[], key: SortKey): TypingMetric[] {
  const sorted = [...metrics];

  switch (key) {
    case "recent":
      return sorted.sort(
        (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
      );
    case "wpm_desc":
      return sorted.sort((left, right) => right.wpm - left.wpm);
    case "wpm_asc":
      return sorted.sort((left, right) => left.wpm - right.wpm);
    case "accuracy_desc":
      return sorted.sort((left, right) => right.accuracy - left.accuracy);
    case "accuracy_asc":
      return sorted.sort((left, right) => left.accuracy - right.accuracy);
    case "duration_desc":
      return sorted.sort((left, right) => right.duration - left.duration);
    default:
      return sorted;
  }
}

export function getDashboardStats(metrics: TypingMetric[]): DashboardStatValue {
  const completedTests = metrics.length;

  if (completedTests === 0) {
    return {
      averageAccuracy: 0,
      averageWpm: 0,
      bestWpm: 0,
      completedTests,
    };
  }

  return {
    averageAccuracy: Math.round(metrics.reduce((sum, metric) => sum + metric.accuracy, 0) / completedTests),
    averageWpm: Math.round(metrics.reduce((sum, metric) => sum + metric.wpm, 0) / completedTests),
    bestWpm: Math.max(...metrics.map((metric) => metric.wpm)),
    completedTests,
  };
}

export function getPerformanceChartSeries(metrics: TypingMetric[]): DashboardChartSeries {
  const chronological = [...metrics].sort(
    (left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime(),
  );

  return {
    wpm: chronological.map((metric, index) => ({ index: index + 1, value: metric.wpm })),
    accuracy: chronological.map((metric, index) => ({
      index: index + 1,
      value: Number(metric.accuracy.toFixed(1)),
    })),
    duration: chronological.map((metric, index) => ({
      index: index + 1,
      value: Number(metric.duration.toFixed(1)),
    })),
  };
}

export function getSeriesMax(series: DashboardChartPoint[], offset: number) {
  return Math.max(...series.map((point) => point.value)) + offset;
}

export function formatDashboardMetricDate(language: Language, createdAt: string) {
  return new Date(createdAt).toLocaleString(language === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getHistoryWpmColor(wpm: number) {
  if (wpm >= 80) {
    return "var(--success)";
  }

  if (wpm >= 50) {
    return "var(--warning)";
  }

  return "var(--error)";
}

export function getHistoryAccuracyColor(accuracy: number) {
  if (accuracy >= 95) {
    return "var(--success)";
  }

  if (accuracy >= 80) {
    return "var(--warning)";
  }

  return "var(--error)";
}

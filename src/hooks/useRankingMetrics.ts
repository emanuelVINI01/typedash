"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { RankingPeriod, TypingMetric } from "@/src/types/typing";
import { useLanguage } from "@/src/context/LanguageContext";

interface RankingPeriodOption {
  description: string;
  label: string;
  value: RankingPeriod;
}

interface UseRankingMetricsResult {
  loading: boolean;
  period: RankingPeriod;
  periodOptions: RankingPeriodOption[];
  ranking: TypingMetric[];
  refresh: () => Promise<void>;
  selectedPeriod: RankingPeriodOption;
  setPeriod: (period: RankingPeriod) => void;
}

export function useRankingMetrics(limit: number): UseRankingMetricsResult {
  const { t } = useLanguage();
  const [ranking, setRanking] = useState<TypingMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<RankingPeriod>("all");

  const periodOptions = useMemo<RankingPeriodOption[]>(
    () => [
      { value: "day", label: t.ranking.periods.day, description: t.ranking.periodDescriptions.day },
      { value: "week", label: t.ranking.periods.week, description: t.ranking.periodDescriptions.week },
      { value: "month", label: t.ranking.periods.month, description: t.ranking.periodDescriptions.month },
      { value: "all", label: t.ranking.periods.all, description: t.ranking.periodDescriptions.all },
    ],
    [t],
  );

  const selectedPeriod = useMemo(
    () => periodOptions.find((item) => item.value === period) ?? periodOptions[periodOptions.length - 1],
    [period, periodOptions],
  );

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/metrics/ranking?limit=${limit}&period=${period}`);
      const data = await response.json();
      setRanking(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch ranking:", error);
      setRanking([]);
    } finally {
      setLoading(false);
    }
  }, [limit, period]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    loading,
    period,
    periodOptions,
    ranking,
    refresh,
    selectedPeriod,
    setPeriod,
  };
}

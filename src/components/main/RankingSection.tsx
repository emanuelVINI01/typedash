"use client";

import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import type { RankingPeriod, TypingMetric } from "@/src/types/typing";
import { RankingTable } from "./RankingTable";
import { Trophy } from "lucide-react";

export interface RankingSectionHandle {
  refresh: () => void;
}

const periods: { value: RankingPeriod; label: string; description: string }[] = [
  { value: "day", label: "Hoje", description: "Ranking diário" },
  { value: "week", label: "Semana", description: "Ranking semanal" },
  { value: "month", label: "Mês", description: "Ranking mensal" },
  { value: "all", label: "Geral", description: "Ranking geral" },
];

export const RankingSection = forwardRef<RankingSectionHandle>((_, ref) => {
  const [ranking, setRanking] = useState<TypingMetric[]>([]);
  const [rankingLoading, setRankingLoading] = useState(true);
  const [period, setPeriod] = useState<RankingPeriod>("all");

  const selectedPeriod = periods.find((item) => item.value === period) ?? periods[3];

  const fetchRanking = useCallback(async () => {
    setRankingLoading(true);
    try {
      const res = await fetch(`/api/metrics/ranking?limit=10&period=${period}`);
      const data = await res.json();
      setRanking(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch ranking:", error);
    } finally {
      setRankingLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  useImperativeHandle(ref, () => ({
    refresh: fetchRanking
  }));

  return (
    <div className="w-full max-w-4xl mt-16 fade-in">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-comment">
              <Trophy size={16} className="text-purple" />
              Ranking
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              Melhores resultados
            </h2>
            <p className="mt-1 text-sm text-comment">
              Um resultado por pessoa, usando a melhor marca dentro do período.
            </p>
          </div>

          <div
            className="grid grid-cols-2 gap-1 rounded-lg border border-current-line bg-current-line/10 p-1 sm:inline-grid sm:grid-cols-4"
            role="tablist"
            aria-label="Período do ranking"
          >
            {periods.map((item) => {
              const isActive = item.value === period;

              return (
                <button
                  key={item.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  title={item.description}
                  onClick={() => setPeriod(item.value)}
                  className={`min-w-20 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-purple text-background"
                      : "text-comment hover:bg-current-line/40 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <RankingTable
          metrics={ranking}
          loading={rankingLoading}
          periodLabel={selectedPeriod.label}
        />
      </div>
    </div>
  );
});

RankingSection.displayName = "RankingSection";

"use client";

import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import type { RankingPeriod, TypingMetric } from "@/src/types/typing";
import { RankingTable } from "./RankingTable";
import { Trophy } from "lucide-react";

export interface RankingSectionHandle {
  refresh: () => void;
}

interface RankingSectionProps {
  compact?: boolean;
}

const periods: { value: RankingPeriod; label: string; description: string }[] = [
  { value: "day", label: "Today", description: "Daily ranking" },
  { value: "week", label: "Week", description: "Weekly ranking" },
  { value: "month", label: "Month", description: "Monthly ranking" },
  { value: "all", label: "All", description: "All-time ranking" },
];

export const RankingSection = forwardRef<RankingSectionHandle, RankingSectionProps>(({ compact = false }, ref) => {
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
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className={`${compact ? "mt-0 max-w-none" : "mt-16 max-w-4xl"} w-full min-w-0`}
    >
      <div className="flex flex-col gap-5">
        <div className={`${compact ? "flex-col" : "flex-col md:flex-row md:items-end md:justify-between"} flex gap-4`}>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-comment">
              <Trophy size={16} className="text-purple" />
              Ranking
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              Best results
            </h2>
            <p className="mt-1 text-sm text-comment">
              One result per person, using the best score for the selected period.
            </p>
          </div>

          <div
            className={`${compact ? "grid-cols-4" : "grid-cols-2 sm:inline-grid sm:w-auto sm:grid-cols-4"} grid w-full gap-1 rounded-lg border border-current-line bg-current-line/10 p-1`}
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
                  className={`${compact ? "px-2" : "px-3 sm:min-w-20"} min-w-0 rounded-md py-2 text-sm font-semibold transition-colors ${
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
    </motion.div>
  );
});

RankingSection.displayName = "RankingSection";

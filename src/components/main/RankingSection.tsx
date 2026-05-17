"use client";

import { useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import { RankingTable } from "./RankingTable";
import { RankingCards } from "./RankingCards";
import { Trophy } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { useRankingMetrics } from "@/src/hooks/useRankingMetrics";

export interface RankingSectionHandle {
  refresh: () => void;
}

interface RankingSectionProps {
  compact?: boolean;
  display?: "cards" | "table";
  limit?: number;
}

export const RankingSection = forwardRef<RankingSectionHandle, RankingSectionProps>(({
  compact = false,
  display = "table",
  limit = 10,
}, ref) => {
  const { t } = useLanguage();
  const { loading, period, periodOptions, ranking, refresh, selectedPeriod, setPeriod } = useRankingMetrics(limit);

  useImperativeHandle(ref, () => ({
    refresh,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className={`${compact ? "mt-0" : ""} w-full min-w-0`}
    >
      <div className="flex flex-col gap-5">
        <div className={`${compact ? "flex-col" : "flex-col md:flex-row md:items-end md:justify-between"} flex gap-4`}>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-comment">
              <Trophy size={16} className="text-purple" />
              {t.ranking.sectionLabel}
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {t.ranking.title}
            </h2>
            <p className="mt-1 text-sm text-comment">
              {t.ranking.subtitle}
            </p>
          </div>

          <div
            className={`${compact ? "grid-cols-4" : "grid-cols-2 sm:inline-grid sm:w-auto sm:grid-cols-4"} grid w-full gap-1 rounded-lg border border-current-line bg-current-line/10 p-1`}
            role="tablist"
            aria-label="Período do ranking"
          >
            {periodOptions.map((item) => {
              const isActive = item.value === period;

              return (
                <button
                  key={item.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  title={item.description}
                  onClick={() => setPeriod(item.value)}
                  className={`${compact ? "px-2" : "px-3 sm:min-w-20"} min-w-0 rounded-md py-2 text-sm font-semibold transition-colors ${isActive
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

        {display === "cards" ? (
          <RankingCards
            metrics={ranking}
            loading={loading}
            periodLabel={selectedPeriod.label}
          />
        ) : (
          <RankingTable
            metrics={ranking}
            loading={loading}
            periodLabel={selectedPeriod.label}
          />
        )}
      </div>
    </motion.div>
  );
});

RankingSection.displayName = "RankingSection";

"use client";

import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import { TypingMetric } from "@/src/types/typing";
import { RankingTable } from "./RankingTable";

export interface RankingSectionHandle {
  refresh: () => void;
}

export const RankingSection = forwardRef<RankingSectionHandle>((_, ref) => {
  const [ranking, setRanking] = useState<TypingMetric[]>([]);
  const [rankingLoading, setRankingLoading] = useState(true);

  const fetchRanking = useCallback(async () => {
    try {
      const res = await fetch("/api/metrics/ranking?limit=10");
      const data = await res.json();
      setRanking(data);
    } catch (error) {
      console.error("Failed to fetch ranking:", error);
    } finally {
      setRankingLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  useImperativeHandle(ref, () => ({
    refresh: fetchRanking
  }));

  return (
    <div className="w-full max-w-4xl mt-16 fade-in">
      <RankingTable metrics={ranking} loading={rankingLoading} />
    </div>
  );
});

RankingSection.displayName = "RankingSection";

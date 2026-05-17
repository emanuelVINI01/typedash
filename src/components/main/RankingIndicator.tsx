"use client";

import { Medal } from "lucide-react";
import { getRankingIndicatorValue } from "@/src/utils/ranking";

interface RankingIndicatorProps {
  index: number;
}

export function RankingIndicator({ index }: RankingIndicatorProps) {
  const indicator = getRankingIndicatorValue(index);

  if (indicator.medalClassName) {
    return <Medal size={16} className={indicator.medalClassName} />;
  }

  return <span className="text-xs font-semibold text-comment">{indicator.label}</span>;
}

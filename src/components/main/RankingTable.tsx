"use client";

import type { TypingMetric } from "@/src/types/typing";
import { User } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { RankingIndicator } from "@/src/components/main/RankingIndicator";
import { formatRankingDate, getRankingWpmColorClass } from "@/src/utils/ranking";

interface Props {
  metrics: TypingMetric[];
  loading?: boolean;
  periodLabel: string;
}

export function RankingTable({ metrics, loading, periodLabel }: Props) {
  const { language, t } = useLanguage();

  if (loading) {
    return (
      <div className="flex h-28 items-center justify-center rounded-xl border border-current-line bg-current-line/10 px-6 text-center text-sm text-comment animate-pulse">
        {t.ranking.loading}
      </div>
    );
  }

  if (metrics.length === 0) {
    return (
      <div className="flex h-28 items-center justify-center rounded-xl border border-current-line bg-current-line/5 px-6 text-center text-sm text-comment">
        {t.ranking.emptyStart} {periodLabel.toLowerCase()} {t.ranking.emptyEnd}
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <div className="flex min-w-0 items-center justify-between gap-4 text-xs text-comment">
        <span className="font-semibold uppercase tracking-widest">
          {periodLabel}
        </span>
        <span>{metrics.length} {t.common.competitors}</span>
      </div>

      <div className="w-full max-w-full overflow-x-auto rounded-xl border border-current-line shadow-xl shadow-black/10">
        <table className="w-full min-w-[560px] bg-current-line/5 text-sm">
          <thead>
            <tr className="border-b border-current-line">
              {["#", t.ranking.headers.user, "WPM", t.ranking.headers.accuracy, t.ranking.headers.date].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-comment"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => {
              const isEven = i % 2 === 0;
              const date = formatRankingDate(language, m.createdAt);
              const wpmColor = getRankingWpmColorClass(m.wpm);

              return (
                <tr
                  key={m.id}
                  className={`transition-colors duration-150 ${
                    isEven ? "bg-background/20" : "bg-transparent"
                  } hover:bg-current-line/20`}
                >
                  <td className="px-4 py-3 font-mono font-bold">
                    <div className="flex items-center justify-center">
                      <RankingIndicator index={i} />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    <div className="flex min-w-0 items-center gap-2">
                      <User size={14} className="text-comment" />
                      <span className="min-w-0 truncate">{m.userName}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-3 font-mono font-bold ${wpmColor}`}>
                    {m.wpm}
                  </td>
                  <td className="px-4 py-3 font-mono text-foreground/80">
                    {m.accuracy.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-comment text-xs">
                    {date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

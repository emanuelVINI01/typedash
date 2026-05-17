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

export function RankingCards({ metrics, loading, periodLabel }: Props) {
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
        <span>{t.common.top} {metrics.length}</span>
      </div>

      <div
        className="hidden w-full overflow-hidden rounded-xl border border-current-line bg-background/35 sm:grid"
        style={{ gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))` }}
      >
        {metrics.map((metric, index) => {
          const date = formatRankingDate(language, metric.createdAt);
          const wpmColor = getRankingWpmColorClass(metric.wpm);
          const isLast = index === metrics.length - 1;

          return (
            <article
              key={metric.id}
              className={`flex w-full flex-col gap-2 p-2.5 ${!isLast ? "border-r border-current-line" : ""}`}
            >
              {/* Header: medalha + ícone user + nome */}
              <div className="flex min-w-0 items-center gap-1.5">
                <RankingIndicator index={index} />
                <User size={11} className="shrink-0 text-comment/60" />
                <p className="min-w-0 truncate text-xs font-semibold text-foreground">
                  {metric.userName}
                </p>
              </div>

              {/* Separador */}
              <div className="h-px w-full bg-current-line/40" />

              {/* WPM + Precisão em row */}
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-comment">
                    WPM
                  </p>
                  <p className={`font-mono text-base font-bold leading-tight ${wpmColor}`}>
                    {metric.wpm}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-comment">
                    {t.ranking.cardLabels.accuracy}
                  </p>
                  <p className="font-mono text-sm font-semibold leading-tight text-foreground">
                    {metric.accuracy.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Data */}
              <p className="text-[9px] text-comment/70">{date}</p>
            </article>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-current-line shadow-xl shadow-black/10 sm:hidden">
        <table className="w-full bg-current-line/5 text-xs">
          <thead>
            <tr className="border-b border-current-line">
              {["#", t.ranking.headers.user, "WPM", t.ranking.headers.acc].map((heading) => (
                <th
                  key={heading}
                  className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-widest text-comment"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, index) => {
              const wpmColor = getRankingWpmColorClass(metric.wpm);

              return (
                <tr
                  key={metric.id}
                  className="border-b border-current-line/60 bg-background/20 last:border-b-0"
                >
                  <td className="px-3 py-2 font-mono font-bold text-comment">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2 font-medium text-foreground">
                    <span className="block truncate">{metric.userName}</span>
                  </td>
                  <td className={`px-3 py-2 font-mono font-bold ${wpmColor}`}>
                    {metric.wpm}
                  </td>
                  <td className="px-3 py-2 font-mono text-foreground/80">
                    {metric.accuracy.toFixed(1)}%
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

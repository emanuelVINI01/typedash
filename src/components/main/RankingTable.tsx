"use client";

import type { TypingMetric } from "@/src/types/typing";
import { Medal, User } from "lucide-react";

interface Props {
  metrics: TypingMetric[];
  loading?: boolean;
  periodLabel: string;
}

export function RankingTable({ metrics, loading, periodLabel }: Props) {
  if (loading) {
    return (
      <div className="flex h-28 items-center justify-center rounded-xl border border-current-line bg-current-line/10 px-6 text-center text-sm text-comment animate-pulse">
        Loading ranking...
      </div>
    );
  }

  if (metrics.length === 0) {
    return (
      <div className="flex h-28 items-center justify-center rounded-xl border border-current-line bg-current-line/5 px-6 text-center text-sm text-comment">
        No results in the {periodLabel.toLowerCase()} ranking yet. Be the first.
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <div className="flex min-w-0 items-center justify-between gap-4 text-xs text-comment">
        <span className="font-semibold uppercase tracking-widest">
          {periodLabel}
        </span>
        <span>{metrics.length} competitors</span>
      </div>

      <div className="w-full max-w-full overflow-x-auto rounded-xl border border-current-line shadow-xl shadow-black/10">
        <table className="w-full min-w-[560px] bg-current-line/5 text-sm">
          <thead>
            <tr className="border-b border-current-line">
              {["#", "User", "WPM", "Accuracy", "Date"].map((h) => (
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
              const date = new Date(m.createdAt).toLocaleDateString("pt-BR");

              const wpmColor =
                m.wpm >= 100 ? "text-green" : m.wpm >= 70 ? "text-cyan" : "text-purple";
              
              const rankIcon = i === 0 ? (
                <Medal size={16} className="text-yellow-400" />
              ) : i === 1 ? (
                <Medal size={16} className="text-slate-300" />
              ) : i === 2 ? (
                <Medal size={16} className="text-amber-600" />
              ) : (
                <span className="text-comment">{i + 1}</span>
              );

              return (
                <tr
                  key={m.id}
                  className={`transition-colors duration-150 ${
                    isEven ? "bg-background/20" : "bg-transparent"
                  } hover:bg-current-line/20`}
                >
                  <td className="px-4 py-3 font-mono font-bold">
                    <div className="flex items-center justify-center">
                      {rankIcon}
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

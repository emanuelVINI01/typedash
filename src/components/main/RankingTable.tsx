"use client";

import { TypingMetric } from "@/src/types/typing";
import { Trophy, Medal, User } from "lucide-react";

interface Props {
  metrics: TypingMetric[];
  loading?: boolean;
}

export function RankingTable({ metrics, loading }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="h-8 w-48 bg-current-line/20 animate-pulse rounded" />
        <div className="rounded-xl border border-current-line h-64 animate-pulse bg-current-line/10" />
      </div>
    );
  }

  if (metrics.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-comment flex items-center gap-2">
          <Trophy size={16} /> Global Ranking
        </h2>
        <div className="flex items-center justify-center rounded-xl border border-current-line py-12 text-sm text-comment bg-current-line/5">
          Nenhum resultado no ranking ainda. Seja o primeiro!
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-comment flex items-center gap-2">
        <Trophy size={16} className="text-purple" /> Global Ranking
      </h2>

      <div className="overflow-x-auto rounded-xl border border-current-line shadow-xl">
        <table className="w-full text-sm bg-current-line/5">
          <thead>
            <tr className="border-b border-current-line">
              {["#", "Usuário", "WPM", "Acurácia", "Data"].map((h) => (
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
              const isTop3 = i < 3;

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
                  <td className="px-4 py-3 font-mono font-bold flex items-center justify-center">
                    {rankIcon}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-comment" />
                      {m.userName}
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

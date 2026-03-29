"use client";

import { useState } from "react";
import { TypingMetric } from "@/src/types/typing";

interface Props {
  metrics: TypingMetric[];
}

const PAGE_SIZE = 10;

export function HistoryTable({ metrics }: Props) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = metrics.slice(0, visible);
  const hasMore = visible < metrics.length;

  if (metrics.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border py-12 text-sm"
        style={{ background: "#21222c", borderColor: "#44475a", color: "#6272a4" }}
      >
        Nenhum teste encontrado. Complete um teste para ver seu histórico.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#44475a" }}>
        <table className="w-full text-sm" style={{ background: "#21222c" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #44475a" }}>
              {["#", "Data", "WPM", "Precisão", "Duração"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#6272a4" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((m, i) => {
              const isEven = i % 2 === 0;
              const date = new Date(m.createdAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });

              const wpmColor =
                m.wpm >= 80 ? "#50fa7b" : m.wpm >= 50 ? "#f1fa8c" : "#ff5555";
              const accColor =
                m.accuracy >= 95
                  ? "#50fa7b"
                  : m.accuracy >= 80
                  ? "#f1fa8c"
                  : "#ff5555";

              return (
                <tr
                  key={m.id}
                  className="transition-colors duration-150"
                  style={{
                    background: isEven ? "#21222c" : "#282a36",
                    borderBottom: "1px solid #44475a22",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "#44475a33";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background =
                      isEven ? "#21222c" : "#282a36";
                  }}
                >
                  <td className="px-4 py-3 font-mono" style={{ color: "#6272a4" }}>
                    {i + 1}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#f8f8f2" }}>
                    {date}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold" style={{ color: wpmColor }}>
                    {m.wpm}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold" style={{ color: accColor }}>
                    {m.accuracy.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 font-mono" style={{ color: "#8be9fd" }}>
                    {m.duration.toFixed(1)}s
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="self-center px-6 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 cursor-pointer"
          style={{
            background: "transparent",
            borderColor: "#44475a",
            color: "#6272a4",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#bd93f9";
            (e.currentTarget as HTMLButtonElement).style.color = "#bd93f9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#44475a";
            (e.currentTarget as HTMLButtonElement).style.color = "#6272a4";
          }}
        >
          Exibir mais ({metrics.length - visible} restantes)
        </button>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { TypingMetric } from "@/src/types/typing";
import { useLanguage } from "@/src/context/LanguageContext";
import {
  formatDashboardMetricDate,
  getHistoryAccuracyColor,
  getHistoryWpmColor,
} from "@/src/utils/dashboard";

interface Props {
  metrics: TypingMetric[];
}

const PAGE_SIZE = 10;
const HOVERED_ROW_CLASS_NAME = "hover:bg-[#44475a33]";
const PRIMARY_BUTTON_CLASS_NAME = "cursor-pointer self-center rounded-lg border px-6 py-2 text-sm font-semibold transition-all duration-200";

export function HistoryTable({ metrics }: Props) {
  const { language, t } = useLanguage();
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = metrics.slice(0, visible);
  const hasMore = visible < metrics.length;

  if (metrics.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border py-12 text-sm"
        style={{ background: "#21222c", borderColor: "#44475a", color: "#6272a4" }}
      >
        {t.dashboardPage.emptyHistory}
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <div className="w-full max-w-full overflow-x-auto rounded-xl border" style={{ borderColor: "#44475a" }}>
        <table className="w-full min-w-[560px] text-sm" style={{ background: "#21222c" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #44475a" }}>
              {["#", t.common.date, "WPM", t.common.accuracy, t.common.duration].map((h) => (
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
              const date = formatDashboardMetricDate(language, m.createdAt);
              const wpmColor = getHistoryWpmColor(m.wpm);
              const accColor = getHistoryAccuracyColor(m.accuracy);
              const rowBackgroundClassName = i % 2 === 0 ? "bg-[#21222c]" : "bg-[#282a36]";

              return (
                <tr
                  key={m.id}
                  className={`${rowBackgroundClassName} ${HOVERED_ROW_CLASS_NAME} transition-colors duration-150`}
                  style={{
                    borderBottom: "1px solid #44475a22",
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
          className={`${PRIMARY_BUTTON_CLASS_NAME} hover:border-[#bd93f9] hover:text-[#bd93f9]`}
          style={{
            background: "transparent",
            borderColor: "#44475a",
            color: "#6272a4",
          }}
        >
          {t.common.showMore} ({metrics.length - visible} {t.common.remaining})
        </button>
      )}
    </div>
  );
}

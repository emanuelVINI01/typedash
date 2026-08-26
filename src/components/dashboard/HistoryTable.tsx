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
const HOVERED_ROW_CLASS_NAME = "hover:bg-[var(--card-hover)]";
const PRIMARY_BUTTON_CLASS_NAME = "cursor-pointer self-center rounded-lg border border-[var(--border)] bg-transparent px-6 py-2 text-sm font-semibold text-[var(--fg-subtle)] transition-all duration-200";

export function HistoryTable({ metrics }: Props) {
  const { language, t } = useLanguage();
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = metrics.slice(0, visible);
  const hasMore = visible < metrics.length;

  if (metrics.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] py-12 text-sm text-[var(--fg-subtle)]">
        {t.dashboardPage.emptyHistory}
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <div className="w-full max-w-full overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[560px] bg-[var(--card)] text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["#", t.common.date, "WPM", t.common.accuracy, t.common.duration].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[var(--fg-subtle)]"
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
              const rowBackgroundClassName = i % 2 === 0 ? "bg-[var(--surface)]" : "bg-[var(--card)]";

              return (
                <tr
                  key={m.id}
                  className={`${rowBackgroundClassName} ${HOVERED_ROW_CLASS_NAME} border-b border-[var(--border-soft)] transition-colors duration-150`}
                >
                  <td className="px-4 py-3 font-mono text-[var(--fg-subtle)]">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 text-[var(--fg)]">
                    {date}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold" style={{ color: wpmColor }}>
                    {m.wpm}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold" style={{ color: accColor }}>
                    {m.accuracy.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 font-mono text-info">
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
          className={`${PRIMARY_BUTTON_CLASS_NAME} hover:border-purple hover:text-purple`}
        >
          {t.common.showMore} ({metrics.length - visible} {t.common.remaining})
        </button>
      )}
    </div>
  );
}

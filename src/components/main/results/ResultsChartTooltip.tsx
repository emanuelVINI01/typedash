"use client";

interface ResultsChartTooltipProps {
  active?: boolean;
  label?: number;
  payload?: Array<{ value: number }>;
}

export function ResultsChartTooltip({
  active,
  label,
  payload,
}: ResultsChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card-hover)] px-3 py-2 text-sm text-[var(--fg)]">
      <p className="text-[var(--fg-subtle)]">{`${label}s`}</p>
      <p className="font-semibold text-purple">{`${payload[0].value} WPM`}</p>
    </div>
  );
}

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
    <div
      className="rounded-lg px-3 py-2 text-sm"
      style={{ background: "#44475a", color: "#f8f8f2" }}
    >
      <p style={{ color: "#6272a4" }}>{`${label}s`}</p>
      <p style={{ color: "#bd93f9" }}>{`${payload[0].value} WPM`}</p>
    </div>
  );
}

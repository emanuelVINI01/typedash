"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TypingMetric } from "@/src/types/typing";

interface Props {
  metrics: TypingMetric[];
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  data: { index: number; value: number }[];
  color: string;
  unit?: string;
  domain?: [number, number];
}

function ChartCard({ title, subtitle, data, color, unit = "", domain }: ChartCardProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-xl border p-5"
      style={{ background: "#21222c", borderColor: "#44475a" }}
    >
      <div>
        <h3 className="text-sm font-semibold" style={{ color: "#f8f8f2" }}>
          {title}
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "#6272a4" }}>
          {subtitle}
        </p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#44475a" vertical={false} />
          <XAxis
            dataKey="index"
            tick={{ fill: "#6272a4", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            label={{ value: "Teste", position: "insideBottom", offset: -2, fill: "#6272a4", fontSize: 10 }}
          />
          <YAxis
            tick={{ fill: "#6272a4", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            domain={domain}
            tickFormatter={(v: number) => `${v}${unit}`}
          />
          <Tooltip
            contentStyle={{
              background: "#282a36",
              border: "1px solid #44475a",
              borderRadius: "8px",
              color: "#f8f8f2",
              fontSize: 12,
            }}
            itemStyle={{ color }}
            formatter={(v: unknown) => [`${v}${unit}`, title]}
            labelFormatter={(i: unknown) => `Teste #${i}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={data.length <= 20 ? { fill: color, r: 3, strokeWidth: 0 } : false}
            activeDot={{ fill: color, r: 5, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PerformanceCharts({ metrics }: Props) {
  if (metrics.length < 2) {
    return (
      <div
        className="rounded-xl border flex items-center justify-center py-10 text-sm"
        style={{ background: "#21222c", borderColor: "#44475a", color: "#6272a4" }}
      >
        Complete pelo menos 2 testes para ver os gráficos de performance.
      </div>
    );
  }

  // Chronological order for charts
  const chronological = [...metrics].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const wpmData = chronological.map((m, i) => ({ index: i + 1, value: m.wpm }));
  const accData = chronological.map((m, i) => ({ index: i + 1, value: parseFloat(m.accuracy.toFixed(1)) }));
  const durData = chronological.map((m, i) => ({ index: i + 1, value: parseFloat(m.duration.toFixed(1)) }));

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#6272a4" }}>
        Evolução ao Longo do Tempo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartCard
          title="WPM"
          subtitle="Palavras por minuto"
          data={wpmData}
          color="#bd93f9"
          domain={[0, Math.max(...wpmData.map((d) => d.value)) + 10]}
        />
        <ChartCard
          title="Acurácia"
          subtitle="Percentagem de acertos"
          data={accData}
          color="#8be9fd"
          unit="%"
          domain={[0, 100]}
        />
        <ChartCard
          title="Duração"
          subtitle="Tempo do teste em segundos"
          data={durData}
          color="#50fa7b"
          unit="s"
          domain={[0, Math.max(...durData.map((d) => d.value)) + 5]}
        />
      </div>
    </div>
  );
}

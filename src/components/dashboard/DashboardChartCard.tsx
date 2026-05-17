"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLanguage } from "@/src/context/LanguageContext";
import type { DashboardChartPoint } from "@/src/utils/dashboard";

interface DashboardChartCardProps {
  color: string;
  data: DashboardChartPoint[];
  domain?: [number, number];
  subtitle: string;
  title: string;
  unit?: string;
}

export function DashboardChartCard({
  color,
  data,
  domain,
  subtitle,
  title,
  unit = "",
}: DashboardChartCardProps) {
  const { t } = useLanguage();

  return (
    <div
      className="flex flex-col gap-3 rounded-xl border p-5"
      style={{ background: "#21222c", borderColor: "#44475a" }}
    >
      <div>
        <h3 className="text-sm font-semibold" style={{ color: "#f8f8f2" }}>
          {title}
        </h3>
        <p className="mt-0.5 text-xs" style={{ color: "#6272a4" }}>
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
            label={{
              value: t.dashboardPage.chartAxisTest,
              position: "insideBottom",
              offset: -2,
              fill: "#6272a4",
              fontSize: 10,
            }}
          />
          <YAxis
            tick={{ fill: "#6272a4", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            domain={domain}
            tickFormatter={(value: number) => `${value}${unit}`}
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
            formatter={(value: unknown) => [`${value}${unit}`, title]}
            labelFormatter={(index: unknown) => `${t.dashboardPage.chartLabel}${index}`}
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

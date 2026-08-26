"use client";

import { motion } from "framer-motion";
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
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-purple/40"
    >
      <div>
        <h3 className="text-sm font-semibold text-[var(--fg)]">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
          {subtitle}
        </p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="index"
            tick={{ fill: "var(--fg-subtle)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            label={{
              value: t.dashboardPage.chartAxisTest,
              position: "insideBottom",
              offset: -2,
              fill: "var(--fg-subtle)",
              fontSize: 10,
            }}
          />
          <YAxis
            tick={{ fill: "var(--fg-subtle)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            domain={domain}
            tickFormatter={(value: number) => `${value}${unit}`}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card-hover)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--fg)",
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
    </motion.div>
  );
}

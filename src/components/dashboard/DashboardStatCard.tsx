"use client";

interface DashboardStatCardProps {
  color: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function DashboardStatCard({ color, icon, label, value }: DashboardStatCardProps) {
  return (
    <div
      className="stat-card flex flex-col gap-3 rounded-xl border p-5"
      style={{
        background: "#21222c",
        borderColor: "#44475a",
      }}
    >
      <div className="flex items-center gap-2" style={{ color }}>
        {icon}
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#6272a4" }}>
          {label}
        </span>
      </div>
      <span className="font-mono text-3xl font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

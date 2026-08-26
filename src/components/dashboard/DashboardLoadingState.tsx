"use client";

export function DashboardLoadingState() {
  return (
    <div className="flex flex-col gap-4 fade-in">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
          />
        ))}
      </div>
      <div className="h-56 animate-pulse rounded-xl border border-[var(--border)] bg-[var(--card)]" />
    </div>
  );
}

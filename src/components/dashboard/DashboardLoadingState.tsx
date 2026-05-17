"use client";

export function DashboardLoadingState() {
  return (
    <div className="flex flex-col gap-4 fade-in">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-24 rounded-xl border p-5 animate-pulse"
            style={{ background: "#21222c", borderColor: "#44475a" }}
          />
        ))}
      </div>
      <div
        className="h-56 rounded-xl border animate-pulse"
        style={{ background: "#21222c", borderColor: "#44475a" }}
      />
    </div>
  );
}

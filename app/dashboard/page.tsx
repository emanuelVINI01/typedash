"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/src/components/main/Header";
import { StatsOverview } from "@/src/components/dashboard/StatsOverview";
import { FilterBar, SortKey } from "@/src/components/dashboard/FilterBar";
import { HistoryTable } from "@/src/components/dashboard/HistoryTable";
import { PerformanceCharts } from "@/src/components/dashboard/PerformanceCharts";
import { TypingMetric } from "@/src/types/typing";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function sortMetrics(metrics: TypingMetric[], key: SortKey): TypingMetric[] {
  const sorted = [...metrics];
  switch (key) {
    case "recent":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "wpm_desc":
      return sorted.sort((a, b) => b.wpm - a.wpm);
    case "wpm_asc":
      return sorted.sort((a, b) => a.wpm - b.wpm);
    case "accuracy_desc":
      return sorted.sort((a, b) => b.accuracy - a.accuracy);
    case "accuracy_asc":
      return sorted.sort((a, b) => a.accuracy - b.accuracy);
    case "duration_desc":
      return sorted.sort((a, b) => b.duration - a.duration);
    default:
      return sorted;
  }
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<TypingMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("recent");

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "loading") {
      return;
    }

    if (session.status === "unauthenticated") {
      router.push("/login")
      return;
    }
    async function load() {
      try {
        const res = await fetch("/api/metrics/me?limit=100");
        if (!res.ok) {
          if (res.status === 401) {
            setError("You need to be authenticated to view your history.");
          } else {
            setError("Could not load metrics. Try again.");
          }
          return;
        }
        const data: TypingMetric[] = await res.json();
        setMetrics(data);
      } catch {
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router, session.status]);

  const sortedMetrics = useMemo(() => sortMetrics(metrics, sortKey), [metrics, sortKey]);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24 text-foreground lg:pb-0">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-6 md:px-8 md:py-8">
        {/* Page Title */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "#f8f8f2" }}
          >
            Performance{" "}
            <span style={{ color: "#bd93f9" }}>Dashboard</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6272a4" }}>
            Personal test history, WPM trends and accuracy consistency.
          </p>
        </motion.div>

        {loading && (
          <div className="flex flex-col gap-4 fade-in">
            {/* Skeleton cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-5 h-24 animate-pulse"
                  style={{ background: "#21222c", borderColor: "#44475a" }}
                />
              ))}
            </div>
            {/* Skeleton chart */}
            <div
              className="rounded-xl border h-56 animate-pulse"
              style={{ background: "#21222c", borderColor: "#44475a" }}
            />
          </div>
        )}

        {error && !loading && (
          <div
            className="rounded-xl border px-6 py-8 text-center fade-in"
            style={{ background: "#21222c", borderColor: "#ff5555" }}
          >
            <p className="text-sm font-medium" style={{ color: "#ff5555" }}>
              {error}
            </p>
            {error.includes("authenticated") && (
              <a
                href="/login"
                className="inline-block mt-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ background: "#bd93f9", color: "#282a36" }}
              >
                Login
              </a>
            )}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats Overview */}
            <section className="fade-in">
              <StatsOverview metrics={metrics} />
            </section>

            {/* Charts */}
            <section className="fade-in">
              <PerformanceCharts metrics={metrics} />
            </section>

            {/* History */}
            <section className="flex flex-col gap-4 fade-in">
              <h2
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "#6272a4" }}
              >
                Test History
              </h2>
              <FilterBar value={sortKey} onChange={setSortKey} />
              <HistoryTable metrics={sortedMetrics} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

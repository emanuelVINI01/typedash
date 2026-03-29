"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/src/components/main/Header";
import { StatsOverview } from "@/src/components/dashboard/StatsOverview";
import { FilterBar, SortKey } from "@/src/components/dashboard/FilterBar";
import { HistoryTable } from "@/src/components/dashboard/HistoryTable";
import { PerformanceCharts } from "@/src/components/dashboard/PerformanceCharts";
import { TypingMetric } from "@/src/types/typing";

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

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/metrics/me?limit=100");
        if (!res.ok) {
          if (res.status === 401) {
            setError("Você precisa estar autenticado para ver seu histórico.");
          } else {
            setError("Erro ao carregar métricas. Tente novamente.");
          }
          return;
        }
        const data: TypingMetric[] = await res.json();
        setMetrics(data);
      } catch {
        setError("Falha na conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sortedMetrics = useMemo(() => sortMetrics(metrics, sortKey), [metrics, sortKey]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#282a36" }}>
      <Header />

      <main className="flex-1 flex flex-col px-4 md:px-8 py-8 max-w-7xl mx-auto w-full gap-8">
        {/* Page Title */}
        <div className="fade-in">
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "#f8f8f2" }}
          >
            Meu{" "}
            <span style={{ color: "#bd93f9" }}>Dashboard</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6272a4" }}>
            Seu histórico de testes e evolução ao longo do tempo.
          </p>
        </div>

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
            {error.includes("autenticado") && (
              <a
                href="/login"
                className="inline-block mt-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ background: "#bd93f9", color: "#282a36" }}
              >
                Entrar
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
                Histórico de Testes
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

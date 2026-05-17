"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardErrorState } from "@/src/components/dashboard/DashboardErrorState";
import { DashboardLoadingState } from "@/src/components/dashboard/DashboardLoadingState";
import { Header } from "@/src/components/main/Header";
import { StatsOverview } from "@/src/components/dashboard/StatsOverview";
import { FilterBar } from "@/src/components/dashboard/FilterBar";
import { HistoryTable } from "@/src/components/dashboard/HistoryTable";
import { PerformanceCharts } from "@/src/components/dashboard/PerformanceCharts";
import { useLanguage } from "@/src/context/LanguageContext";
import { useDashboardMetrics } from "@/src/hooks/useDashboardMetrics";
import type { SortKey } from "@/src/utils/dashboard";

export default function DashboardPage() {
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const { t } = useLanguage();
  const { error, loading, metrics, sortedMetrics } = useDashboardMetrics(sortKey);

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
            {t.dashboardPage.title}
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6272a4" }}>
            {t.dashboardPage.subtitle}
          </p>
        </motion.div>

        {loading && <DashboardLoadingState />}

        {error && !loading && <DashboardErrorState error={error} />}

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
                {t.dashboardPage.historyTitle}
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

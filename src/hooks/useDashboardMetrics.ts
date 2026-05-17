"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { TypingMetric } from "@/src/types/typing";
import { sortMetrics, type SortKey } from "@/src/utils/dashboard";

export type DashboardError = "auth" | "load" | "network" | null;

export function useDashboardMetrics(sortKey: SortKey) {
  const [metrics, setMetrics] = useState<TypingMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DashboardError>(null);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "loading") {
      return;
    }

    if (session.status === "unauthenticated") {
      router.push("/login");
      return;
    }

    async function loadMetrics() {
      try {
        const response = await fetch("/api/metrics/me?limit=100");

        if (!response.ok) {
          setError(response.status === 401 ? "auth" : "load");
          return;
        }

        const data: TypingMetric[] = await response.json();
        setMetrics(data);
      } catch {
        setError("network");
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, [router, session.status]);

  const sortedMetrics = useMemo(() => sortMetrics(metrics, sortKey), [metrics, sortKey]);

  return {
    error,
    loading,
    metrics,
    sortedMetrics,
  };
}

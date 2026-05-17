"use client";

import { useLanguage } from "@/src/context/LanguageContext";
import type { DashboardError } from "@/src/hooks/useDashboardMetrics";

interface DashboardErrorStateProps {
  error: Exclude<DashboardError, null>;
}

export function DashboardErrorState({ error }: DashboardErrorStateProps) {
  const { t } = useLanguage();

  return (
    <div
      className="rounded-xl border px-6 py-8 text-center fade-in"
      style={{ background: "#21222c", borderColor: "#ff5555" }}
    >
      <p className="text-sm font-medium" style={{ color: "#ff5555" }}>
        {error === "auth"
          ? t.dashboardPage.loadingAuth
          : error === "load"
            ? t.dashboardPage.loadingError
            : t.dashboardPage.networkError}
      </p>
      {error === "auth" && (
        <a
          href="/login"
          className="inline-block mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition-all"
          style={{ background: "#bd93f9", color: "#282a36" }}
        >
          {t.dashboardPage.loginCta}
        </a>
      )}
    </div>
  );
}

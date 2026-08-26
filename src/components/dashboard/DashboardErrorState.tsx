"use client";

import { useLanguage } from "@/src/context/LanguageContext";
import type { DashboardError } from "@/src/hooks/useDashboardMetrics";

interface DashboardErrorStateProps {
  error: Exclude<DashboardError, null>;
}

export function DashboardErrorState({ error }: DashboardErrorStateProps) {
  const { t } = useLanguage();

  return (
    <div className="fade-in rounded-xl border border-red/40 bg-[var(--card)] px-6 py-8 text-center">
      <p className="text-sm font-medium text-red">
        {error === "auth"
          ? t.dashboardPage.loadingAuth
          : error === "load"
            ? t.dashboardPage.loadingError
            : t.dashboardPage.networkError}
      </p>
      {error === "auth" && (
        <a
          href="/login"
          className="mt-4 inline-block rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-background transition-all"
        >
          {t.dashboardPage.loginCta}
        </a>
      )}
    </div>
  );
}

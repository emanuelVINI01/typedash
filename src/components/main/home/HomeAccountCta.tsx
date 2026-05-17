"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, UserCheck } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

export function HomeAccountCta() {
  const { data: session } = useSession();
  const { t } = useLanguage();

  const userName = session?.user?.name ?? t.home.fallbackPilot;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative mt-6 overflow-hidden rounded-2xl border border-purple/30 bg-purple/5 p-6 text-center sm:p-8"
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-32 w-32 rounded-full bg-purple/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-cyan/10 blur-2xl" />

      {session ? (
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green/30 bg-green/10 text-green">
            <UserCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground sm:text-xl">
            {t.home.loggedInTitle(userName)}
          </h3>
          <p className="max-w-xl text-xs text-comment sm:text-sm">
            {t.home.ctaLoggedInText}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/practice"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-purple/30 bg-purple px-4 text-xs font-semibold uppercase tracking-widest text-background shadow-lg shadow-purple/20 transition-transform hover:-translate-y-0.5"
            >
              {t.home.practiceMode}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-current-line bg-current-line/40 px-4 text-xs font-semibold uppercase tracking-widest text-foreground transition-transform hover:-translate-y-0.5"
            >
              {t.home.viewDashboard}
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-purple/35 bg-purple/10 text-purple">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-foreground sm:text-xl">
            {t.home.ctaLoggedOutTitle}
          </h3>
          <p className="max-w-xl text-xs text-comment sm:text-sm">
            {t.home.ctaLoggedOutText}
          </p>
          <Link
            href="/login"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-purple/30 bg-purple px-5 text-xs font-semibold uppercase tracking-widest text-background shadow-lg shadow-purple/20 transition-transform hover:-translate-y-0.5"
          >
            {t.home.ctaLoggedOutButton}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </motion.section>
  );
}

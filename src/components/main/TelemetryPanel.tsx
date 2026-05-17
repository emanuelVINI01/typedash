"use client";

import type { Ref } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Target, Trophy } from "lucide-react";
import {
  RankingSection,
  type RankingSectionHandle,
} from "@/src/components/main/RankingSection";
import { useLanguage } from "@/src/context/LanguageContext";

interface TelemetryPanelProps {
  duration: number;
  rankingRef: Ref<RankingSectionHandle>;
}

export function TelemetryPanel({ duration, rankingRef }: TelemetryPanelProps) {
  const { data: session } = useSession();
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08, duration: 0.42 }}
      className="flex w-full flex-col gap-5 rounded-2xl border border-current-line/70 bg-current-line/20 p-4 lg:flex-1"
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: Target, label: t.telemetry.duration, value: `${duration}s`, color: "text-cyan" },
            { icon: BarChart3, label: t.telemetry.telemetry, value: t.telemetry.live, color: "text-green" },
            { icon: Trophy, label: t.telemetry.ranking, value: t.telemetry.global, color: "text-purple" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="min-w-0 rounded-xl border border-current-line bg-background/35 p-4">
              <Icon className={`h-5 w-5 ${color}`} />
              <p className="mt-3 text-xs uppercase tracking-widest text-comment">{label}</p>
              <p className="mt-1 font-mono text-xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {!session?.user && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-purple/25 bg-purple/10 px-4 py-3 text-sm leading-6 text-comment"
          >
            <ShieldCheck className="mr-2 inline h-4 w-4 text-purple" />
            {t.telemetry.loginNotice}
            <Link href="/login" className="ml-1 font-semibold text-cyan">{t.telemetry.loginCta}</Link>.
          </motion.div>
        )}
      </div>

      <RankingSection ref={rankingRef} compact display="cards" limit={5} />
    </motion.div>
  );
}

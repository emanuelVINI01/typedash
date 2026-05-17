import type { Language } from "@/src/i18n/dictionaries";

export interface RankingIndicatorValue {
  label: string;
  medalClassName?: string;
}

export function formatRankingDate(language: Language, createdAt: string) {
  return new Date(createdAt).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US");
}

export function getRankingWpmColorClass(wpm: number) {
  if (wpm >= 100) {
    return "text-green";
  }

  if (wpm >= 70) {
    return "text-cyan";
  }

  return "text-purple";
}

export function getRankingIndicatorValue(index: number): RankingIndicatorValue {
  if (index === 0) {
    return { label: "1", medalClassName: "text-yellow-400" };
  }

  if (index === 1) {
    return { label: "2", medalClassName: "text-slate-300" };
  }

  if (index === 2) {
    return { label: "3", medalClassName: "text-amber-600" };
  }

  return { label: `#${index + 1}` };
}

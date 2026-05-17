import { en } from "@/src/i18n/locales/en";
import { pt } from "@/src/i18n/locales/pt";
import type { Language, WidenLiterals } from "@/src/i18n/types";

export type { Language } from "@/src/i18n/types";
export type Dictionary = WidenLiterals<typeof pt>;

export const dictionaries: Record<Language, Dictionary> = {
  pt,
  en,
};

import type { CharStatus, WpmDataPoint } from "@/src/types/typing";

const MODIFIER_KEYS = new Set(["Shift", "Control", "Alt", "Meta"]);

export function buildTypingText(words: string[]) {
  return words.join(" ");
}

export function createPendingStatuses(text: string): CharStatus[] {
  return new Array(text.length).fill("pending");
}

export function isModifierKey(key: string) {
  return MODIFIER_KEYS.has(key);
}

export function calculateAccuracy(correct: number, incorrect: number) {
  const total = correct + incorrect;
  return total === 0 ? 100 : Math.round((correct / total) * 100);
}

export function calculateWpm(correct: number, elapsedMinutes: number) {
  if (correct === 0 || elapsedMinutes <= 0) return 0;
  return Math.round(correct / 5 / elapsedMinutes);
}

export function getFinalWpm(history: WpmDataPoint[]) {
  return history.length === 0 ? 0 : history[history.length - 1].wpm;
}

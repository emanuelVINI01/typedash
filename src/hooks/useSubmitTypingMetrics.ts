"use client";

import { useEffect } from "react";
import type { Phase, TypingEvent } from "@/src/types/typing";

interface UseSubmitTypingMetricsOptions {
  consumeTypingLog: () => TypingEvent[];
  onSubmitted?: () => void;
  phase: Phase;
  words: string[];
  wordsSignature: string;
}

export function useSubmitTypingMetrics({
  consumeTypingLog,
  onSubmitted,
  phase,
  words,
  wordsSignature,
}: UseSubmitTypingMetricsOptions) {
  useEffect(() => {
    if (phase !== "results") return;

    const payload = consumeTypingLog();
    if (payload.length === 0) return;

    fetch("/api/metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ log: payload, words, signature: wordsSignature }),
    })
      .then(() => onSubmitted?.())
      .catch((error) => console.error("Erro ao enviar telemetria:", error));
  }, [consumeTypingLog, onSubmitted, phase, words, wordsSignature]);
}

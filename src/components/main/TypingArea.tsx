"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import type { CharStatus, Phase, TypingInputEvent } from "@/src/types/typing";
import { useLanguage } from "@/src/context/LanguageContext";

interface TypingAreaProps {
  words: string[];
  charStatuses: CharStatus[];
  cursorPos: number;
  onKey: (e: TypingInputEvent) => void;
  phase: Phase;
}

export function TypingArea({
  words,
  charStatuses,
  cursorPos,
  onKey,
  phase,
}: TypingAreaProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Focus on mount / phase change
  useEffect(() => {
    inputRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => onKey(e);
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [onKey]);

  // Flatten words into chars with word boundaries tracked
  const chars = useMemo(() => {
    const result: { char: string; globalIdx: number }[] = [];
    let idx = 0;
    for (let w = 0; w < words.length; w++) {
      for (let c = 0; c < words[w].length; c++) {
        result.push({ char: words[w][c], globalIdx: idx++ });
      }
      if (w < words.length - 1) {
        result.push({ char: " ", globalIdx: idx++ });
      }
    }
    return result;
  }, [words]);

  return (
    <motion.div
      ref={inputRef}
      tabIndex={0}
      initial={{ opacity: 0, y: 18, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="relative cursor-text select-none overflow-hidden rounded-2xl border border-current-line/80 bg-[var(--card)] p-4 outline-none shadow-2xl shadow-black/20 sm:p-6"
      aria-label={t.typingArea.ariaLabel}
    >
      {phase === "idle" && (
        <div
          onClick={() =>
            onKey({
              altKey: false,
              ctrlKey: false,
              key: "Click",
              metaKey: false,
              preventDefault: () => {},
            })
          }
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-2xl bg-[var(--card)]/80 px-5 text-center text-xs uppercase tracking-widest text-comment backdrop-blur-sm transition-all duration-300 hover:bg-black/20 sm:text-sm"
        >
          {t.typingArea.overlay}
        </div>
      )}

      <div
        className="break-words font-mono text-xl leading-relaxed tracking-wide transition-all duration-500 sm:text-2xl"
        style={{
          lineHeight: "2.65rem",
          filter: phase === "idle" ? "blur(10px)" : "none",
          opacity: phase === "idle" ? 0.3 : 1,
        }}
      >
        {chars.map(({ char, globalIdx }) => {
          const status = charStatuses[globalIdx];
          const isCursor = globalIdx === cursorPos;

          let color = "var(--fg-subtle)"; // pending
          if (status === "correct") color = "var(--success)";
          if (status === "incorrect") color = "var(--error)";

          return (
            <span key={globalIdx} className="relative">
              {/* Cursor */}
              {isCursor && (
                <span
                  className="cursor-blink absolute -left-0.5 top-0 bottom-0 w-0.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
              <span
                style={{
                  color,
                  transition: "color 0.1s",
                  background:
                    status === "incorrect" && char === " "
                      ? "rgba(255,85,85,0.3)"
                      : undefined,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

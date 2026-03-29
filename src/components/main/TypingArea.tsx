"use client";

import { useEffect, useRef, useMemo } from "react";
import { Phase, CharStatus } from "@/src/types/typing";

interface TypingAreaProps {
  words: string[];
  charStatuses: CharStatus[];
  cursorPos: number;
  onKey: (e: KeyboardEvent) => void;
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
    <div
      ref={inputRef}
      tabIndex={0}
      className="relative outline-none rounded-2xl p-6 cursor-text select-none"
      style={{ background: "#21222c" }}
      aria-label="Typing area – start typing to begin the test"
    >
      {phase === "idle" && (
        <div
          onClick={() => onKey({ key: "Click", preventDefault: () => {} } as any)}
          className="absolute inset-0 flex items-center justify-center rounded-2xl text-sm tracking-widest uppercase z-10 cursor-pointer transition-all duration-300 hover:bg-black/20"
          style={{ color: "#6272a4", background: "rgba(33,34,44,0.7)" }}
        >
          Clique aqui, pressione Enter ou comece a digitar para começar...
        </div>
      )}

      <div
        className="font-mono text-lg leading-relaxed tracking-wide break-all transition-all duration-500"
        style={{
          lineHeight: "2.5rem",
          filter: phase === "idle" ? "blur(10px)" : "none",
          opacity: phase === "idle" ? 0.3 : 1,
        }}
      >
        {chars.map(({ char, globalIdx }) => {
          const status = charStatuses[globalIdx];
          const isCursor = globalIdx === cursorPos;

          let color = "#6272a4"; // pending
          if (status === "correct") color = "#50fa7b";
          if (status === "incorrect") color = "#ff5555";

          return (
            <span key={globalIdx} className="relative">
              {/* Cursor */}
              {isCursor && (
                <span
                  className="cursor-blink absolute -left-0.5 top-0 bottom-0 w-0.5 rounded-full"
                  style={{ background: "#bd93f9" }}
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
    </div>
  );
}

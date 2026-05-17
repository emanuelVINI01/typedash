"use client";

import { LiveStats } from "@/src/components/main/LiveStats";
import { ResultsScreen } from "@/src/components/main/ResultsScreen";
import { TypingArea } from "@/src/components/main/TypingArea";
import type {
  CharStatus,
  Phase,
  TypingInputEvent,
  WpmDataPoint,
} from "@/src/types/typing";

interface TypingWorkbenchProps {
  accuracy: number;
  charStatuses: CharStatus[];
  correctCount: number;
  cursorPos: number;
  finalWpm: number;
  incorrectCount: number;
  onKey: (event: TypingInputEvent) => void;
  onReset: () => void;
  phase: Phase;
  timeLeft: number;
  words: string[];
  wpm: number;
  wpmHistory: WpmDataPoint[];
}

export function TypingWorkbench({
  accuracy,
  charStatuses,
  correctCount,
  cursorPos,
  finalWpm,
  incorrectCount,
  onKey,
  onReset,
  phase,
  timeLeft,
  words,
  wpm,
  wpmHistory,
}: TypingWorkbenchProps) {
  return (
    <section className="flex w-full flex-col gap-5 lg:flex-1">
      {phase !== "results" ? (
        <div className="flex flex-col gap-5">
          <LiveStats timeLeft={timeLeft} wpm={wpm} accuracy={accuracy} phase={phase} />

          <TypingArea
            words={words}
            charStatuses={charStatuses}
            cursorPos={cursorPos}
            onKey={onKey}
            phase={phase}
          />
        </div>
      ) : (
        <ResultsScreen
          wpm={finalWpm}
          accuracy={accuracy}
          correct={correctCount}
          incorrect={incorrectCount}
          wpmHistory={wpmHistory}
          onReset={onReset}
        />
      )}

    </section>
  );
}

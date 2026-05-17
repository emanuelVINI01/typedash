"use client";

import { useCallback, useRef } from "react";
import { TEST_DURATION } from "@/src/constants/typing-test";
import { useSubmitTypingMetrics } from "@/src/hooks/useSubmitTypingMetrics";
import { useTypingTest } from "@/src/hooks/useTypingTest";
import { MeasureCard } from "@/src/components/main/MeasureCard";
import { TelemetryPanel } from "@/src/components/main/TelemetryPanel";
import { TypingWorkbench } from "@/src/components/main/TypingWorkbench";
import type { RankingSectionHandle } from "@/src/components/main/RankingSection";

export function TypeDashHome() {
  const typingTest = useTypingTest();
  const rankingRef = useRef<RankingSectionHandle>(null);

  const refreshRanking = useCallback(() => {
    rankingRef.current?.refresh();
  }, []);

  useSubmitTypingMetrics({
    consumeTypingLog: typingTest.consumeTypingLog,
    onSubmitted: refreshRanking,
    phase: typingTest.phase,
  });

  return (
    <main className="mx-auto flex w-full max-w-[86rem] flex-1 flex-col px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex w-full flex-col items-stretch justify-center gap-3">
        <div className="flex w-full flex-col items-stretch justify-center gap-3 lg:flex-row">
          <TypingWorkbench
            accuracy={typingTest.liveAccuracy}
            charStatuses={typingTest.charStatuses}
            correctCount={typingTest.correctCount}
            cursorPos={typingTest.cursorPos}
            duration={TEST_DURATION}
            finalWpm={typingTest.finalWpm}
            incorrectCount={typingTest.incorrectCount}
            onKey={typingTest.handleKey}
            onReset={typingTest.reset}
            phase={typingTest.phase}
            timeLeft={typingTest.timeLeft}
            words={typingTest.words}
            wpm={typingTest.liveWpm}
            wpmHistory={typingTest.wpmHistory}
          />

          <TelemetryPanel duration={TEST_DURATION} rankingRef={rankingRef} />
        </div>

        <MeasureCard />
      </div>
    </main>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TEST_DURATION } from "@/src/constants/typing-test";
import type {
  CharStatus,
  Phase,
  TypingEvent,
  TypingInputEvent,
  WpmDataPoint,
} from "@/src/types/typing";
import {
  buildTypingText,
  calculateAccuracy,
  calculateWpm,
  createPendingStatuses,
  getFinalWpm,
  isModifierKey,
} from "@/src/utils/typing-test";

export function useTypingTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [words, setWords] = useState<string[]>([]);
  const [wordsSignature, setWordsSignature] = useState<string>("");
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>([]);
  const [cursorPos, setCursorPos] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [wpmHistory, setWpmHistory] = useState<WpmDataPoint[]>([]);
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const correctRef = useRef(0);
  const incorrectRef = useRef(0);
  const startTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wpmHistoryRef = useRef<WpmDataPoint[]>([]);
  const secondRef = useRef(0);
  const typingLogRef = useRef<TypingEvent[]>([]);

  const fullText = useMemo(() => buildTypingText(words), [words]);
  const finalWpm = useMemo(() => getFinalWpm(wpmHistory), [wpmHistory]);

  const resetTypingState = useCallback((nextWords: string[], nextSignature: string) => {
    const text = buildTypingText(nextWords);

    setWords(nextWords);
    setWordsSignature(nextSignature);
    setCharStatuses(createPendingStatuses(text));
    setCursorPos(0);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setCorrectCount(0);
    setIncorrectCount(0);
    correctRef.current = 0;
    incorrectRef.current = 0;
  }, []);

  const fetchWords = useCallback(async () => {
    try {
      const res = await fetch("/api/words");
      const data = await res.json();
      const nextWords = Array.isArray(data?.words) ? data.words : [];
      const nextSignature = typeof data?.signature === "string" ? data.signature : "";
      resetTypingState(nextWords, nextSignature);
    } catch (error) {
      console.error("Failed to fetch words:", error);
    }
  }, [resetTypingState]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchWords();
  }, [fetchWords]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const updateLiveStats = useCallback(() => {
    setCorrectCount(correctRef.current);
    setIncorrectCount(incorrectRef.current);
    setLiveAccuracy(calculateAccuracy(correctRef.current, incorrectRef.current));

    const elapsedMinutes = (Date.now() - startTimeRef.current) / 1000 / 60;
    setLiveWpm(calculateWpm(correctRef.current, elapsedMinutes));
  }, []);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    secondRef.current = 0;
    wpmHistoryRef.current = [];
    typingLogRef.current = [];

    timerRef.current = setInterval(() => {
      secondRef.current += 1;

      const elapsedMinutes = secondRef.current / 60;
      const wpm = calculateWpm(correctRef.current, elapsedMinutes);
      wpmHistoryRef.current.push({ second: secondRef.current, wpm });
      setLiveWpm(wpm);

      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setWpmHistory([...wpmHistoryRef.current]);
          setPhase("results");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    void fetchWords();
    setPhase("idle");
    setTimeLeft(TEST_DURATION);
    setWpmHistory([]);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setCorrectCount(0);
    setIncorrectCount(0);
    correctRef.current = 0;
    incorrectRef.current = 0;
    secondRef.current = 0;
    wpmHistoryRef.current = [];
    typingLogRef.current = [];
  }, [fetchWords]);

  const consumeTypingLog = useCallback(() => {
    const payload = [...typingLogRef.current];
    typingLogRef.current = [];
    return payload;
  }, []);

  const handleKey = useCallback(
    (event: TypingInputEvent) => {
      if (phase === "results" || event.metaKey || event.ctrlKey || event.altKey) return;

      const { key } = event;

      if (phase === "idle") {
        if (isModifierKey(key)) return;

        setPhase("typing");
        setTimeLeft(TEST_DURATION);
        startTimer();

        if (key === "Click" || key === "Enter") return;
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        if (cursorPos === 0) return;

        const previousStatus = charStatuses[cursorPos - 1];
        if (previousStatus === "correct") {
          correctRef.current = Math.max(0, correctRef.current - 1);
        }
        if (previousStatus === "incorrect") {
          incorrectRef.current = Math.max(0, incorrectRef.current - 1);
        }

        typingLogRef.current.push({
          key: "Backspace",
          time: Date.now(),
          expected: fullText[cursorPos - 1],
        });

        setCharStatuses((statuses) => {
          const updated = [...statuses];
          updated[cursorPos - 1] = "pending";
          return updated;
        });
        setCursorPos(cursorPos - 1);
        updateLiveStats();
        return;
      }

      if (key.length !== 1 || cursorPos >= fullText.length) return;

      event.preventDefault();

      const expected = fullText[cursorPos];
      const isCorrect = key === expected;

      typingLogRef.current.push({
        key,
        time: Date.now(),
        expected,
      });

      if (isCorrect) correctRef.current += 1;
      else incorrectRef.current += 1;

      updateLiveStats();

      setCharStatuses((statuses) => {
        const updated = [...statuses];
        updated[cursorPos] = isCorrect ? "correct" : "incorrect";
        return updated;
      });

      const nextPos = cursorPos + 1;
      setCursorPos(nextPos);

      if (nextPos === fullText.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setWpmHistory([...wpmHistoryRef.current]);
        setPhase("results");
      }
    },
    [charStatuses, cursorPos, fullText, phase, startTimer, updateLiveStats],
  );

  return {
    charStatuses,
    consumeTypingLog,
    correctCount,
    cursorPos,
    finalWpm,
    handleKey,
    incorrectCount,
    liveAccuracy,
    liveWpm,
    phase,
    reset,
    timeLeft,
    words,
    wordsSignature,
    wpmHistory,
  };
}

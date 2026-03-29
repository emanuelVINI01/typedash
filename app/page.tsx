"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Header } from "@/src/components/main/Header";
import { LiveStats } from "@/src/components/main/LiveStats";
import { TypingArea } from "@/src/components/main/TypingArea";
import { ResultsScreen } from "@/src/components/main/ResultsScreen";
import { Phase, CharStatus, WpmDataPoint, TypingEvent } from "@/src/types/typing";
import { RankingSection, RankingSectionHandle } from "@/src/components/main/RankingSection";

// ─── Constants & Types ──────────────────────────────────────────────────────



const TEST_DURATION = 30; // seconds

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function TypeDashPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [words, setWords] = useState<string[]>([]);
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>([]);
  const [cursorPos, setCursorPos] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [wpmHistory, setWpmHistory] = useState<WpmDataPoint[]>([]);
  const rankingRef = useRef<RankingSectionHandle>(null);

  // Track correct/incorrect key presses
  const correctRef = useRef(0);
  const incorrectRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wpmHistoryRef = useRef<WpmDataPoint[]>([]);
  const secondRef = useRef(0);

  // Array do log de telemetria
  const typingLogRef = useRef<TypingEvent[]>([]);

  const fetchWords = useCallback(async () => {
    try {
      const res = await fetch("/api/words");
      const data = await res.json();
      setWords(data);
    } catch (error) {
      console.error("Failed to fetch words:", error);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  // Flatten the text into a single string for cursor logic
  const fullText = useMemo(() => words.join(" "), [words]);

  // Compute live WPM
  const liveWpm = useMemo(() => {
    if (phase !== "typing" || correctRef.current === 0) return 0;
    const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
    if (elapsed === 0) return 0;
    return Math.round(correctRef.current / 5 / elapsed);
  }, [phase, cursorPos]); // cursorPos triggers recompute

  // Compute live accuracy
  const liveAccuracy = useMemo(() => {
    const total = correctRef.current + incorrectRef.current;
    if (total === 0) return 100;
    return Math.round((correctRef.current / total) * 100);
  }, [cursorPos]);

  // Initialize charStatuses when words change
  useEffect(() => {
    const text = words.join(" ");
    setCharStatuses(new Array(text.length).fill("pending"));
    setCursorPos(0);
    correctRef.current = 0;
    incorrectRef.current = 0;
  }, [words]);

  // Timer logic
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    secondRef.current = 0;
    wpmHistoryRef.current = [];
    typingLogRef.current = []; // Reinicia os logs

    timerRef.current = setInterval(() => {
      secondRef.current += 1;

      // Record WPM snapshot every second
      const elapsed = secondRef.current / 60;
      const snap =
        elapsed > 0 ? Math.round(correctRef.current / 5 / elapsed) : 0;
      wpmHistoryRef.current.push({ second: secondRef.current, wpm: snap });

      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setWpmHistory([...wpmHistoryRef.current]);
          setPhase("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (phase === "results") return;

      // Ignore modifier keys
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key;

      // Handle start triggers
      if (phase === "idle") {
        if (key === "Shift" || key === "Control" || key === "Alt" || key === "Meta") return;
        
        setPhase("typing");
        setTimeLeft(TEST_DURATION);
        startTimer();

        // If it was a click, Enter, or the user specifically wants to "erase" the first char
        // we return here without processing the key as part of the typing test.
        if (key === "Click" || key === "Enter") return;
        
        // "Apagar o primeiro caractere" - skipping the first key press as requested
        return;
      }

      // Backspace logic (only when typing)
      if (key === "Backspace") {
        e.preventDefault();
        if (cursorPos === 0) return;

        typingLogRef.current.push({
          key: "Backspace",
          time: Date.now(),
          expected: fullText[cursorPos - 1], // expected character that was there
        });

        setCursorPos((prev) => {
          const newPos = prev - 1;
          setCharStatuses((statuses) => {
            const updated = [...statuses];
            const prev_status = updated[newPos];
            if (prev_status === "correct") correctRef.current = Math.max(0, correctRef.current - 1);
            if (prev_status === "incorrect") incorrectRef.current = Math.max(0, incorrectRef.current - 1);
            updated[newPos] = "pending";
            return updated;
          });
          return newPos;
        });
        return;
      }

      // Only handle printable single chars
      if (key.length !== 1) return;

      e.preventDefault();

      if (cursorPos >= fullText.length) return;

      const expected = fullText[cursorPos];
      const isCorrect = key === expected;

      typingLogRef.current.push({
        key,
        time: Date.now(),
        expected,
      });

      if (isCorrect) correctRef.current += 1;
      else incorrectRef.current += 1;

      setCharStatuses((statuses) => {
        const updated = [...statuses];
        updated[cursorPos] = isCorrect ? "correct" : "incorrect";
        return updated;
      });

      const nextPos = cursorPos + 1;
      setCursorPos(nextPos);

      // Detecta quando o último caractere do texto foi processado
      if (nextPos === fullText.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setWpmHistory([...wpmHistoryRef.current]);
        setPhase("results"); // Alterar a fase aciona o useEffect que faz o envio POST
      }
    },
    [phase, cursorPos, fullText, startTimer]
  );

  const handleReset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    fetchWords();
    setPhase("idle");
    setTimeLeft(TEST_DURATION);
    setWpmHistory([]);
    correctRef.current = 0;
    incorrectRef.current = 0;
    secondRef.current = 0;
    wpmHistoryRef.current = [];
    typingLogRef.current = [];
  }, [fetchWords]);

  // Envio da Telemetria
  useEffect(() => {
    // Garante que o trigger ocorra somente quando o resultado fecha e há logs não processados
    if (phase === "results" && typingLogRef.current.length > 0) {
      const payload = typingLogRef.current;
      typingLogRef.current = []; // Prevenção contra múltiplos disparos (StrictMode/Double mount)

      fetch("/api/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ log: payload }),
      })
        .then(() => rankingRef.current?.refresh()) // Atualiza o ranking via ref
        .catch((err) => console.error("Erro ao enviar telemetria:", err));
    }
  }, [phase]);

  // Final stats (frozen at end)
  const finalWpm = useMemo(() => {
    if (wpmHistory.length === 0) return 0;
    return wpmHistory[wpmHistory.length - 1].wpm;
  }, [wpmHistory]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#282a36" }}
    >
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl flex flex-col gap-6">
          {/* Live Stats – always visible */}
          <LiveStats
            timeLeft={timeLeft}
            wpm={liveWpm}
            accuracy={liveAccuracy}
            phase={phase}
          />
          <p className="text-center text-purple font-bold text-lg">
            Seus resultados não serão salvos se você não estiver logado. 
            <a href="/auth/login" className="text-blue-300"> Entre para salvar</a>.
          </p>
          {/* Typing Area OR Results */}
          {phase !== "results" ? (
            <TypingArea
              words={words}
              charStatuses={charStatuses}
              cursorPos={cursorPos}
              onKey={handleKey}
              phase={phase}
            />
          ) : (
            <ResultsScreen
              wpm={finalWpm}
              accuracy={liveAccuracy}
              correct={correctRef.current}
              incorrect={incorrectRef.current}
              wpmHistory={wpmHistory}
              onReset={handleReset}
            />
          )}

          {/* Hint */}
          {phase !== "results" && (
            <p className="text-center text-xs" style={{ color: "#44475a" }}>
              Pressione <kbd className="px-1.5 py-0.5 rounded" style={{ background: "#44475a", color: "#6272a4" }}>Backspace</kbd> para corrigir · O teste reinicia automaticamente após{" "}
              <span style={{ color: "#6272a4" }}>{TEST_DURATION}s</span>
            </p>
          )}
        </div>

        {/* Global Ranking Table Componentizado */}
        <RankingSection ref={rankingRef} />
      </main>
    </div>
  );
}

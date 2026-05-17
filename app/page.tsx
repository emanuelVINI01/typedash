"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, Keyboard, ShieldCheck, Target, Trophy } from "lucide-react";
import { Header } from "@/src/components/main/Header";
import { LiveStats } from "@/src/components/main/LiveStats";
import { TypingArea } from "@/src/components/main/TypingArea";
import { ResultsScreen } from "@/src/components/main/ResultsScreen";
import type { Phase, CharStatus, WpmDataPoint, TypingEvent, TypingInputEvent } from "@/src/types/typing";
import { RankingSection, RankingSectionHandle } from "@/src/components/main/RankingSection";
import { useSession } from "next-auth/react";

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
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const rankingRef = useRef<RankingSectionHandle>(null);

  const { data: session } = useSession();

  // Track correct/incorrect key presses
  const correctRef = useRef(0);
  const incorrectRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wpmHistoryRef = useRef<WpmDataPoint[]>([]);
  const secondRef = useRef(0);

  // Array do log de telemetria
  const typingLogRef = useRef<TypingEvent[]>([]);

  const resetTypingState = useCallback((nextWords: string[]) => {
    const text = nextWords.join(" ");
    setWords(nextWords);
    setCharStatuses(new Array(text.length).fill("pending"));
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
      resetTypingState(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch words:", error);
    }
  }, [resetTypingState]);

  // Initial fetch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWords();
  }, [fetchWords]);

  // Flatten the text into a single string for cursor logic
  const fullText = useMemo(() => words.join(" "), [words]);

  const updateLiveStats = useCallback(() => {
    setCorrectCount(correctRef.current);
    setIncorrectCount(incorrectRef.current);

    const total = correctRef.current + incorrectRef.current;
    setLiveAccuracy(total === 0 ? 100 : Math.round((correctRef.current / total) * 100));

    if (correctRef.current === 0 || startTimeRef.current === 0) {
      setLiveWpm(0);
      return;
    }

    const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
    setLiveWpm(elapsed > 0 ? Math.round(correctRef.current / 5 / elapsed) : 0);
  }, []);

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
      setLiveWpm(snap);

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
    (e: TypingInputEvent) => {
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
          expected: fullText[cursorPos - 1], // expected character that was there
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
      updateLiveStats();

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
    [phase, cursorPos, charStatuses, fullText, startTimer, updateLiveStats]
  );

  const handleReset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    fetchWords();
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
    <div className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10">
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple/25 bg-purple/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-purple sm:text-xs">
              <Keyboard className="h-3.5 w-3.5" />
              Dracula typing cockpit
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Measure speed, accuracy and consistency in one mobile-first flow.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-comment sm:text-base">
              TypeDash turns keystrokes into product metrics: WPM, accuracy, correction behavior, personal history and global rankings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.42 }}
            className="grid gap-3 rounded-2xl border border-current-line/70 bg-current-line/20 p-4 sm:grid-cols-3"
          >
            {[
              { icon: Target, label: "Duration", value: `${TEST_DURATION}s`, color: "text-cyan" },
              { icon: BarChart3, label: "Telemetry", value: "live", color: "text-green" },
              { icon: Trophy, label: "Ranking", value: "global", color: "text-purple" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="rounded-xl border border-current-line bg-background/35 p-4">
                <Icon className={`h-5 w-5 ${color}`} />
                <p className="mt-3 text-xs uppercase tracking-widest text-comment">{label}</p>
                <p className="mt-1 font-mono text-xl font-bold text-foreground">{value}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section className="mx-auto flex w-full max-w-4xl flex-col gap-5">
          <LiveStats timeLeft={timeLeft} wpm={liveWpm} accuracy={liveAccuracy} phase={phase} />

          {!session?.user && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-purple/25 bg-purple/10 px-4 py-3 text-sm leading-6 text-comment"
            >
              <ShieldCheck className="mr-2 inline h-4 w-4 text-purple" />
              Results are only saved when you are logged in.
              <Link href="/login" className="ml-1 font-semibold text-cyan">Login to save progress</Link>.
            </motion.div>
          )}

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
              correct={correctCount}
              incorrect={incorrectCount}
              wpmHistory={wpmHistory}
              onReset={handleReset}
            />
          )}

          {phase !== "results" && (
            <p className="text-center text-xs text-comment">
              Press <kbd className="rounded border border-current-line bg-current-line px-1.5 py-0.5 text-comment">Backspace</kbd> to correct. The test ends after{" "}
              <span className="text-cyan">{TEST_DURATION}s</span>.
            </p>
          )}
        </section>

        <section className="mx-auto grid w-full max-w-4xl gap-3 sm:grid-cols-3">
          {[
            ["Focus", "Short 30-second sessions keep feedback fast on mobile."],
            ["Fairness", "Backspace corrections adjust correct and incorrect counters."],
            ["Progress", "Authenticated tests feed the dashboard and ranking views."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-xl border border-current-line/70 bg-current-line/20 p-4">
              <h2 className="font-semibold text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-comment">{text}</p>
            </article>
          ))}
        </section>

        <RankingSection ref={rankingRef} />
      </main>
    </div>
  );
}

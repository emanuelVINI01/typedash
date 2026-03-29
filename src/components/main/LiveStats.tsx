"use client";

import { Timer, Zap, Activity } from "lucide-react";
import { Phase } from "@/src/types/typing";

interface LiveStatsProps {
  timeLeft: number;
  wpm: number;
  accuracy: number;
  phase: Phase;
}

export function LiveStats({ timeLeft, wpm, accuracy, phase }: LiveStatsProps) {
  const timerColor =
    timeLeft <= 5
      ? "#ff5555"
      : timeLeft <= 10
      ? "#ffb86c"
      : "#8be9fd";

  return (
    <div className="flex items-center justify-center gap-8 mb-8">
      {/* Timer */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5" style={{ color: "#6272a4" }}>
          <Timer className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest">time</span>
        </div>
        <span
          className="text-4xl font-bold tabular-nums transition-colors duration-300"
          style={{ color: timerColor }}
        >
          {timeLeft}
        </span>
      </div>

      {/* Divider */}
      <div className="h-12 w-px" style={{ background: "#44475a" }} />

      {/* WPM */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5" style={{ color: "#6272a4" }}>
          <Zap className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest">wpm</span>
        </div>
        <span
          className="text-4xl font-bold tabular-nums"
          style={{ color: phase === "idle" ? "#6272a4" : "#bd93f9" }}
        >
          {wpm}
        </span>
      </div>

      {/* Divider */}
      <div className="h-12 w-px" style={{ background: "#44475a" }} />

      {/* Accuracy */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5" style={{ color: "#6272a4" }}>
          <Activity className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest">acc</span>
        </div>
        <span
          className="text-4xl font-bold tabular-nums"
          style={{ color: phase === "idle" ? "#6272a4" : "#50fa7b" }}
        >
          {accuracy}%
        </span>
      </div>
    </div>
  );
}

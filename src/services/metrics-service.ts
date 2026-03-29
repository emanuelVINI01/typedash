import { TypingEvent } from "../types/typing";
import { prisma } from "@/src/prisma";
import crypto from "crypto";

export function calculateWpm(metrics: TypingEvent[]) {
    if (metrics.length < 2) return 0;

    // 1. Calcular o tempo decorrido em minutos
    const startTime = metrics[0].time;
    const endTime = metrics[metrics.length - 1].time;
    const elapsedMinutes = (endTime - startTime) / 1000 / 60;

    if (elapsedMinutes <= 0) return 0;

    // 2. Simular o estado final para contar apenas caracteres corretos (net)
    // Isso evita contar caracteres que foram apagados no meio do caminho.
    let correctCount = 0;
    const statusStack: ("correct" | "incorrect")[] = [];

    for (const event of metrics) {
        if (event.key === "Backspace") {
            const last = statusStack.pop();
            if (last === "correct") correctCount = Math.max(0, correctCount - 1);
        } else {
            const isCorrect = event.key === event.expected;
            if (isCorrect) correctCount++;
            statusStack.push(isCorrect ? "correct" : "incorrect");
        }
    }

    // 3. WPM padrão = (Caracteres Corretos / 5) / Tempo em Minutos
    const wpm = (correctCount / 5) / elapsedMinutes;

    return Math.round(wpm);
}


export function calculateAccuracy(metrics: TypingEvent[]) {
  if (metrics.length === 0) return 100;

  let correctCount = 0;
  let incorrectCount = 0;
  const stack: boolean[] = [];

  for (const event of metrics) {
    if (event.key === "Backspace") {
      const wasCorrect = stack.pop();
      if (wasCorrect === true) correctCount = Math.max(0, correctCount - 1);
      else if (wasCorrect === false)
        incorrectCount = Math.max(0, incorrectCount - 1);
    } else {
      const isCorrect = event.key === event.expected;
      if (isCorrect) correctCount++;
      else incorrectCount++;
      stack.push(isCorrect);
    }
  }

  const total = correctCount + incorrectCount;
  if (total === 0) return 100;
  return (correctCount / total) * 100;
}

export function getCorrectKeys(metrics: TypingEvent[]) {
  return metrics.filter(
    (event) => event.key !== "Backspace" && event.key === event.expected
  ).length;
}

/**
 * Prepara o objeto Metric pronto para ser salvo via Prisma.
 */
export function prepareMetric(userId: string, userName: string, metrics: TypingEvent[]) {
  const wpm = calculateWpm(metrics);
  const accuracy = calculateAccuracy(metrics);

  // Calcular a duração em segundos
  const startTime = metrics[0]?.time ?? 0;
  const endTime = metrics[metrics.length - 1]?.time ?? 0;
  const duration = (endTime - startTime) / 1000;

  // Gerar um hash simples para o log
  const logString = JSON.stringify(metrics);
  const logHash = crypto.createHash("sha256").update(logString).digest("hex");

  return {
    userId,
    wpm,
    accuracy,
    duration,
    logHash,
    userName,
    events: metrics as any, // Prisma Json field
  };
}


export async function saveMetric(userId: string, userName: string, metrics: TypingEvent[]) {
  const data = prepareMetric(userId, userName, metrics);

  return await prisma.typingMetric.create({
    data,
  });
}
export async function getMetricsRanking(limit: number) {
  return (await prisma.typingMetric.findMany({
    orderBy: {
      wpm: "desc",
    },
    take: limit,
  }))
}

export async function getUserMetrics(userId: string, limit: number) {
  return await prisma.typingMetric.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}
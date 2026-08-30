import { Prisma, type TypingMetric as PrismaTypingMetric } from "@/prisma/generated/client";
import type { RankingPeriod, TypingEvent } from "../types/typing";
import { prisma } from "@/src/prisma";
import crypto from "crypto";

/**
 * Tracks the authoritative cursor position in `fullText` as the log is replayed,
 * so scoring never trusts the client-supplied `event.expected` field.
 */
function nextPosition(positionStack: number[], currentPosition: number): number {
  positionStack.push(currentPosition);
  return currentPosition + 1;
}

export function calculateWpm(metrics: TypingEvent[], fullText: string) {
    if (metrics.length < 2) return 0;

    // 1. Calcular o tempo decorrido em minutos
    const startTime = metrics[0].time;
    const endTime = metrics[metrics.length - 1].time;
    const elapsedMinutes = (endTime - startTime) / 1000 / 60;

    if (elapsedMinutes <= 0) return 0;

    // 2. Simular o estado final para contar apenas caracteres corretos (net)
    // Isso evita contar caracteres que foram apagados no meio do caminho.
    // A posição/expected vêm de `fullText` (assinado pelo servidor), nunca do cliente.
    let correctCount = 0;
    let position = 0;
    const statusStack: ("correct" | "incorrect")[] = [];
    const positionStack: number[] = [];

    for (const event of metrics) {
        if (event.key === "Backspace") {
            const last = statusStack.pop();
            const lastPosition = positionStack.pop();
            if (last === "correct") correctCount = Math.max(0, correctCount - 1);
            if (lastPosition !== undefined) position = lastPosition;
        } else {
            const expected = fullText[position];
            const isCorrect = expected !== undefined && event.key === expected;
            if (isCorrect) correctCount++;
            statusStack.push(isCorrect ? "correct" : "incorrect");
            position = nextPosition(positionStack, position);
        }
    }

    // 3. WPM padrão = (Caracteres Corretos / 5) / Tempo em Minutos
    const wpm = (correctCount / 5) / elapsedMinutes;

    return Math.round(wpm);
}


export function calculateAccuracy(metrics: TypingEvent[], fullText: string) {
  if (metrics.length === 0) return 100;

  let correctCount = 0;
  let incorrectCount = 0;
  let position = 0;
  const stack: boolean[] = [];
  const positionStack: number[] = [];

  for (const event of metrics) {
    if (event.key === "Backspace") {
      const wasCorrect = stack.pop();
      const lastPosition = positionStack.pop();
      if (wasCorrect === true) correctCount = Math.max(0, correctCount - 1);
      else if (wasCorrect === false)
        incorrectCount = Math.max(0, incorrectCount - 1);
      if (lastPosition !== undefined) position = lastPosition;
    } else {
      const expected = fullText[position];
      const isCorrect = expected !== undefined && event.key === expected;
      if (isCorrect) correctCount++;
      else incorrectCount++;
      stack.push(isCorrect);
      position = nextPosition(positionStack, position);
    }
  }

  const total = correctCount + incorrectCount;
  if (total === 0) return 100;
  return (correctCount / total) * 100;
}

export function getCorrectKeys(metrics: TypingEvent[], fullText: string) {
  let position = 0;
  let count = 0;

  for (const event of metrics) {
    if (event.key === "Backspace") {
      position = Math.max(0, position - 1);
      continue;
    }

    const expected = fullText[position];
    if (expected !== undefined && event.key === expected) count++;
    position++;
  }

  return count;
}

/**
 * Prepara o objeto Metric pronto para ser salvo via Prisma.
 * `fullText` é derivado de `words`, cuja assinatura já foi validada pelo caller.
 */
export function prepareMetric(userId: string, userName: string, metrics: TypingEvent[], fullText: string) {
  const wpm = calculateWpm(metrics, fullText);
  const accuracy = calculateAccuracy(metrics, fullText);

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
    events: metrics as unknown as Prisma.InputJsonValue,
  };
}


export async function saveMetric(userId: string, userName: string, metrics: TypingEvent[], fullText: string) {
  const data = prepareMetric(userId, userName, metrics, fullText);

  return await prisma.typingMetric.create({
    data,
  });
}

function getRankingStartDate(period: RankingPeriod) {
  if (period === "all") return null;

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  if (period === "week") {
    const weekday = start.getDay();
    const daysSinceMonday = weekday === 0 ? 6 : weekday - 1;
    start.setDate(start.getDate() - daysSinceMonday);
  }

  if (period === "month") {
    start.setDate(1);
  }

  return start;
}

export async function getMetricsRanking(limit: number, period: RankingPeriod = "all") {
  const startDate = getRankingStartDate(period);

  return await prisma.$queryRaw<PrismaTypingMetric[]>`
    SELECT *
    FROM (
      SELECT DISTINCT ON ("userId")
        "id",
        "wpm",
        "accuracy",
        "duration",
        "events",
        "logHash",
        "createdAt",
        "userName",
        "userId"
      FROM "TypingMetric"
      ${startDate ? Prisma.sql`WHERE "createdAt" >= ${startDate}` : Prisma.empty}
      ORDER BY "userId", "wpm" DESC, "accuracy" DESC, "createdAt" ASC
    ) AS best_by_user
    ORDER BY "wpm" DESC, "accuracy" DESC, "createdAt" ASC
    LIMIT ${limit}
  `;
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

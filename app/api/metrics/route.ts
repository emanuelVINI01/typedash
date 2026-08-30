import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/src/auth";
import { saveMetric } from "@/src/services/metrics-service";
import { verifyWordsSignature } from "@/src/utils/words-signature";

const TypingEventSchema = z.object({
  key: z.string(),
  time: z.number(),
  // Mantido por compatibilidade de payload, mas ignorado nos cálculos: a
  // fonte da verdade do texto esperado agora é `words`, validado por assinatura.
  expected: z.string(),
});

const LogSchema = z.array(TypingEventSchema);

const MetricsPayloadSchema = z.object({
  log: LogSchema,
  words: z.array(z.string()).min(1),
  signature: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validação rigorosa com Zod
    const { log: validatedLog, words, signature } = MetricsPayloadSchema.parse(body);

    const fullText = words.join(" ");
    if (!verifyWordsSignature(fullText, signature)) {
      return NextResponse.json({ error: "Invalid words signature" }, { status: 400 });
    }

    const result = await saveMetric(session.user.id, session.user.name ?? "Unknown", validatedLog, fullText);

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid log format", details: error.issues },
        { status: 400 }
      );
    }

    // Captura erros de JSON malformado ou erros internos
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 500 }
    );
  }
}

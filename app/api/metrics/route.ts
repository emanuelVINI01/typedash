import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/src/auth";
import { saveMetric } from "@/src/services/metrics-service";

const TypingEventSchema = z.object({
  key: z.string(),
  time: z.number(),
  expected: z.string(),
});

const LogSchema = z.array(TypingEventSchema);

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Validar se o log existe e é um array
    if (!body.log || !Array.isArray(body.log)) {
      return NextResponse.json({ error: "Missing or invalid log" }, { status: 400 });
    }

    // Validação rigorosa com Zod
    const validatedLog = LogSchema.parse(body.log);

    const result = await saveMetric(session.user.id, session.user.name ?? "Unknown", validatedLog);

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

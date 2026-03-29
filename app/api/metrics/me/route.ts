import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/src/auth";
import { getUserMetrics } from "@/src/services/metrics-service";

const querySchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10),
});

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    // Validar e extrair o limite da query string
    const result = querySchema.safeParse({
      limit: searchParams.get("limit") ?? undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: result.error.issues },
        { status: 400 }
      );
    }

    const metrics = await getUserMetrics(session.user.id, result.data.limit);

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("User Metrics API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

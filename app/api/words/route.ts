import { NextResponse } from "next/server";
import { generate } from "random-words";
import { signWords } from "@/src/utils/words-signature";

export async function GET() {
  // Pick 50 unique random words
  const raw = generate(50);
  const words = Array.isArray(raw) ? raw : [raw];
  const fullText = words.join(" ");
  const signature = signWords(fullText);

  return NextResponse.json({ words, signature });
}

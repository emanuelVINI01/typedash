import { NextResponse } from "next/server";
import { generate } from "random-words";

export async function GET() {


  // Pick 50 unique random word

  // Shuffle the result for extra randomness
  const words = generate(50)
  return NextResponse.json(words);
}

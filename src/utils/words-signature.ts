import crypto from "crypto";

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set — required to sign/verify typing test words.");
  }
  return secret;
}

export function signWords(fullText: string): string {
  return crypto.createHmac("sha256", getSecret()).update(fullText).digest("hex");
}

export function verifyWordsSignature(fullText: string, signature: string): boolean {
  const expected = signWords(fullText);
  const expectedBuf = Buffer.from(expected, "hex");
  const actualBuf = Buffer.from(signature, "hex");

  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

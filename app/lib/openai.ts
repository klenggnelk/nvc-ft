import OpenAI from "openai";

// Created on first use so the app still builds and runs without a key (AI features just return an error).
let client: OpenAI | null = null;

export const AI_MODEL = "gpt-5-mini";

/**
 * Reads the key and forgives common paste mistakes in Vercel / .env.local:
 * spaces or line breaks, surrounding quotes, or the whole line "OPENAI_API_KEY=sk-…" pasted as the value.
 */
function readApiKey(): string | null {
  let key = (process.env.OPENAI_API_KEY ?? "").trim();
  key = key.replace(/^OPENAI_API_KEY\s*=\s*/, "").trim();
  key = key.replace(/^["']|["']$/g, "").trim();
  return key || null;
}

export function getOpenAI(): OpenAI | null {
  const apiKey = readApiKey();
  if (!apiKey) return null;
  client ??= new OpenAI({ apiKey });
  return client;
}

import OpenAI from "openai";

// Created on first use so the app still builds and runs without a key (AI features just return an error).
let client: OpenAI | null = null;

export const AI_MODEL = "gpt-5-mini";

export function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

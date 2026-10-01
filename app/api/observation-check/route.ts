import { NextResponse } from "next/server";
import { AI_MODEL, getOpenAI } from "@/app/lib/openai";
import {
  OBSERVATION_CHECK_PROMPT,
  OBSERVATION_CHECK_SCHEMA,
  type ObservationCheckResult,
} from "@/app/lib/prompts/observationCheckPrompt";

const MAX_LENGTH = 500;

function isResult(value: unknown): value is ObservationCheckResult {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.isObservation === "boolean" &&
    Array.isArray(v.evaluativeWords) &&
    v.evaluativeWords.every((w) => typeof w === "string") &&
    typeof v.feedback === "string" &&
    typeof v.suggestion === "string"
  );
}

export async function POST(request: Request) {
  let text: unknown;
  try {
    ({ text } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Please write a sentence first." }, { status: 400 });
  }
  if (text.length > MAX_LENGTH) {
    return NextResponse.json({ error: `Please keep it under ${MAX_LENGTH} characters.` }, { status: 400 });
  }

  const openai = getOpenAI();
  if (!openai) {
    return NextResponse.json({ error: "AI feedback is not configured (missing OPENAI_API_KEY)." }, { status: 503 });
  }

  try {
    const response = await openai.responses.create({
      model: AI_MODEL,
      input: [
        { role: "system", content: OBSERVATION_CHECK_PROMPT },
        { role: "user", content: text.trim() },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "observation_check",
          schema: OBSERVATION_CHECK_SCHEMA,
          strict: true,
        },
      },
    });

    const parsed: unknown = JSON.parse(response.output_text);
    if (!isResult(parsed)) {
      return NextResponse.json({ error: "Unexpected answer from the AI. Please try again." }, { status: 502 });
    }
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("observation-check failed", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

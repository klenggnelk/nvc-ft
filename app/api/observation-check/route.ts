import { NextResponse } from "next/server";
import OpenAI from "openai";
import { AI_MODEL, getOpenAI } from "@/app/lib/openai";
import {
  OBSERVATION_CHECK_PROMPT,
  OBSERVATION_CHECK_SCHEMA,
  type ObservationCheckResult,
} from "@/app/lib/prompts/observationCheckPrompt";

const MAX_LENGTH = 500;

// Short, non-sensitive hints for the most common OpenAI setup problems.
const OPENAI_ERROR_HINTS: Record<number, string> = {
  401: "AI feedback isn't available: the OpenAI API key isn't valid.",
  403: "AI feedback isn't available: this OpenAI key has no access to the model.",
  404: "AI feedback isn't available: the AI model wasn't found for this OpenAI account.",
  429: "AI feedback isn't available right now: OpenAI usage limit or credit reached.",
};

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
    // Log only status/code/message — never the participant's text.
    if (error instanceof OpenAI.APIError) {
      console.error("observation-check failed", { status: error.status, code: error.code, message: error.message });
      const hint = OPENAI_ERROR_HINTS[error.status ?? 0];
      if (hint) return NextResponse.json({ error: hint }, { status: 502 });
    } else {
      console.error("observation-check failed", error instanceof Error ? error.message : error);
    }
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

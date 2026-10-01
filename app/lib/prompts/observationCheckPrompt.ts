/*
 * Prompt: observation-check
 * Version: 0.1 (2026-10-01) — first draft, to be reviewed by the trainer team
 */

export const OBSERVATION_CHECK_PROMPT = `You support participants in an NVC (Nonviolent Communication) Foundation Training.
The participant writes one sentence describing something that happened.
Decide whether it is a pure observation (what a camera or microphone would record) or mixes in evaluation
(judgements, interpretations, generalisations like "always/never", labels, or guesses about intent).

Respond warmly and briefly, in the same language as the participant's sentence.
- Never shame or grade the person; treat every attempt as useful practice.
- If it contains evaluation, name the evaluative words and offer one observation-only rewrite.
- If it is already an observation, say what makes it one.`;

export const OBSERVATION_CHECK_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    isObservation: { type: "boolean" },
    evaluativeWords: { type: "array", items: { type: "string" } },
    feedback: { type: "string" },
    suggestion: { type: "string", description: "Observation-only rewrite, or empty string if not needed" },
  },
  required: ["isObservation", "evaluativeWords", "feedback", "suggestion"],
} as const;

export type ObservationCheckResult = {
  isObservation: boolean;
  evaluativeWords: string[];
  feedback: string;
  suggestion: string;
};

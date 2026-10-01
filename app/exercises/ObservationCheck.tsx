"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, type Language } from "@/app/lib/language";
import type { ObservationCheckResult } from "@/app/lib/prompts/observationCheckPrompt";

const copyByLanguage: Record<
  Language,
  { placeholder: string; submit: string; working: string; observation: string; mixed: string; suggestion: string }
> = {
  en: {
    placeholder: "e.g. You're always late to our meetings.",
    submit: "Get feedback",
    working: "Thinking…",
    observation: "That's an observation",
    mixed: "Some evaluation crept in",
    suggestion: "Observation-only version",
  },
  no: {
    placeholder: "f.eks. Du kommer alltid for sent til møtene våre.",
    submit: "Få tilbakemelding",
    working: "Tenker…",
    observation: "Det er en observasjon",
    mixed: "Litt vurdering snek seg inn",
    suggestion: "Ren observasjon",
  },
};

export default function ObservationCheck() {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ObservationCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/observation-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setResult(data as ObservationCheckResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={copy.placeholder}
          rows={3}
          maxLength={500}
          className="w-full rounded-lg border border-border bg-background p-3 text-sm focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50 dark:text-background"
        >
          {loading ? copy.working : copy.submit}
        </button>
      </form>

      {error && <p className="text-sm text-muted">{error}</p>}

      {result && (
        <div className="space-y-2 rounded-lg bg-accent-soft p-4 text-sm">
          <p className="font-medium">{result.isObservation ? copy.observation : copy.mixed}</p>
          <p>{result.feedback}</p>
          {result.suggestion && (
            <p>
              <span className="text-muted">{copy.suggestion}: </span>
              {result.suggestion}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

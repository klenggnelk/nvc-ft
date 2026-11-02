"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { localize } from "@/app/lib/language";
import type { ResponseExamples } from "@/content/sessions";

/** A box with one situation and example replies to it, ending with an empathic reply for contrast. */
export default function ResponseExamplesBox({ data }: { data: ResponseExamples }) {
  const { language } = useLanguage();

  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{localize(data.title, language)}</h2>
        <p className="max-w-prose text-sm text-muted">{localize(data.intro, language)}</p>
      </div>

      <p className="rounded-lg bg-accent-soft p-4 font-medium">{localize(data.situation, language)}</p>

      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {data.examples.map((example) => (
          <div key={example.label.en}>
            <dt className="text-sm font-semibold">{localize(example.label, language)}</dt>
            <dd className="text-sm italic text-muted">{localize(example.response, language)}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-lg border-2 border-accent p-4">
        <p className="text-sm font-semibold text-accent">{localize(data.empathy.label, language)}</p>
        <p className="italic">{localize(data.empathy.response, language)}</p>
      </div>

      {data.note && <p className="text-sm text-muted">{localize(data.note, language)}</p>}
    </section>
  );
}

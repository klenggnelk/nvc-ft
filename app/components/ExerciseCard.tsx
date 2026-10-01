"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { localize } from "@/app/lib/language";
import ObservationCheck from "@/app/exercises/ObservationCheck";
import type { Exercise } from "@/content/sessions";

/** One practice exercise, with its AI helper when the exercise has one. */
export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const { language } = useLanguage();

  return (
    <article className="space-y-3 rounded-xl border border-border bg-card p-5">
      <h3 className="font-medium">{localize(exercise.title, language)}</h3>
      <p className="text-sm leading-relaxed text-muted">{localize(exercise.instructions, language)}</p>
      {exercise.aiTask === "observation-check" && <ObservationCheck />}
    </article>
  );
}

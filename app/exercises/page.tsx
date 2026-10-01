"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, type Language } from "@/app/lib/language";
import { sessions } from "@/content/sessions";
import ObservationCheck from "./ObservationCheck";

const copyByLanguage: Record<Language, { title: string; intro: string; session: string }> = {
  en: {
    title: "Exercises",
    intro: "Practise between sessions at your own pace. There are no wrong answers here — only practice.",
    session: "Session",
  },
  no: {
    title: "Øvelser",
    intro: "Øv mellom samlingene i ditt eget tempo. Her finnes ingen feil svar — bare øving.",
    session: "Samling",
  },
};

export default function ExercisesPage() {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);
  const withExercises = sessions.filter((session) => session.exercises.length > 0);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="text-muted">{copy.intro}</p>
      </header>
      {withExercises.map((session) => (
        <section key={session.number} className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
            {copy.session} {session.number}: {session.title[language]}
          </h2>
          {session.exercises.map((exercise) => (
            <article key={exercise.id} className="space-y-3 rounded-xl border border-border bg-card p-5">
              <h3 className="font-medium">{exercise.title[language]}</h3>
              <p className="text-sm text-muted">{exercise.instructions[language]}</p>
              {exercise.aiTask === "observation-check" && <ObservationCheck />}
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}

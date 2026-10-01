"use client";

import Link from "next/link";
import ExerciseCard from "@/app/components/ExerciseCard";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, localize, type Language } from "@/app/lib/language";
import { sessions } from "@/content/sessions";

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
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="text-muted">{copy.intro}</p>
      </header>
      {withExercises.map((session) => (
        <section key={session.number} className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
            <Link href={`/sessions/${session.number}`} className="hover:text-accent">
              {copy.session} {session.number}: {localize(session.title, language)}
            </Link>
          </h2>
          {session.exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </section>
      ))}
    </div>
  );
}

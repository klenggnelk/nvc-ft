"use client";

import Link from "next/link";
import ExerciseCard from "@/app/components/ExerciseCard";
import { useLanguage } from "@/app/context/LanguageContext";
import { formatSessionDate, getCopy, localize, type Language } from "@/app/lib/language";
import { course, getSession, sessionDate, sessionFlow, sessions } from "@/content/sessions";

const copyByLanguage: Record<
  Language,
  {
    back: string;
    sessionOf: (n: number, total: number) => string;
    explore: string;
    recording: string;
    recordingLink: string;
    recordingSoon: string;
    read: string;
    practise: string;
    practiseIntro: string;
    flow: string;
    min: string;
    previous: string;
    next: string;
  }
> = {
  en: {
    back: "All sessions",
    sessionOf: (n, total) => `Session ${n} of ${total}`,
    explore: "What we'll explore",
    recording: "Missed the session?",
    recordingLink: "Watch the recording of the topics and exercise instructions",
    recordingSoon: "The recording of the topics and exercise instructions will appear here after the session.",
    read: "Suggested reading",
    practise: "Practise this week",
    practiseIntro: "Small practices for the days between sessions. There are no wrong answers — only practice.",
    flow: "How each session runs",
    min: "min",
    previous: "Previous session",
    next: "Next session",
  },
  no: {
    back: "Alle samlinger",
    sessionOf: (n, total) => `Samling ${n} av ${total}`,
    explore: "Dette utforsker vi",
    recording: "Gikk du glipp av samlingen?",
    recordingLink: "Se opptaket av temaene og øvelsesinstruksjonene",
    recordingSoon: "Opptaket av temaene og øvelsesinstruksjonene kommer her etter samlingen.",
    read: "Forslag til lesing",
    practise: "Øv denne uken",
    practiseIntro: "Små øvelser for dagene mellom samlingene. Her finnes ingen feil svar — bare øving.",
    flow: "Slik foregår hver samling",
    min: "min",
    previous: "Forrige samling",
    next: "Neste samling",
  },
};

export default function SessionView({ sessionNumber }: { sessionNumber: number }) {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);
  const session = getSession(sessionNumber);
  if (!session) return null;

  const date = sessionDate(session.number);
  const previous = getSession(session.number - 1);
  const next = getSession(session.number + 1);

  return (
    <div className="space-y-8">
      <Link href="/" className="text-sm text-muted hover:text-foreground">
        ← {copy.back}
      </Link>

      <header className="space-y-2">
        <p className="text-sm font-medium text-accent">
          {copy.sessionOf(session.number, sessions.length)}
          {date && <span className="text-muted"> · {formatSessionDate(date, language)}</span>}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{localize(session.title, language)}</h1>
        <p className="text-lg text-muted">{localize(session.subtitle, language)}</p>
        {!date && <p className="text-sm text-muted">{localize(course.schedule, language)}</p>}
      </header>

      <p className="max-w-prose leading-relaxed">{localize(session.description, language)}</p>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">{copy.explore}</h2>
        <ul className="list-disc space-y-1 pl-5">
          {session.topics.map((topic) => (
            <li key={topic.en}>{localize(topic, language)}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 rounded-xl bg-accent-soft p-5">
        <h2 className="font-semibold">{copy.recording}</h2>
        {session.recordingUrl ? (
          <a href={session.recordingUrl} className="text-accent underline underline-offset-2">
            {copy.recordingLink}
          </a>
        ) : (
          <p className="text-sm text-muted">{copy.recordingSoon}</p>
        )}
      </section>

      {session.resources.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">{copy.read}</h2>
          <ul className="space-y-1">
            {session.resources.map((resource) => (
              <li key={resource.id}>
                {resource.url ? (
                  <a href={resource.url} className="text-accent underline-offset-2 hover:underline">
                    {localize(resource.title, language)}
                  </a>
                ) : (
                  localize(resource.title, language)
                )}
                {resource.note && <span className="text-sm text-muted"> — {localize(resource.note, language)}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {session.exercises.length > 0 && (
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{copy.practise}</h2>
            <p className="text-sm text-muted">{copy.practiseIntro}</p>
          </div>
          {session.exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </section>
      )}

      <details className="rounded-xl border border-border bg-card p-5">
        <summary className="cursor-pointer font-medium">{copy.flow}</summary>
        <ol className="mt-3 space-y-1 text-sm">
          {sessionFlow.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="w-12 shrink-0 text-muted">
                {step.minutes} {copy.min}
              </span>
              <span>{localize(step.label, language)}</span>
            </li>
          ))}
        </ol>
      </details>

      <nav className="flex justify-between gap-4 border-t border-border pt-4 text-sm">
        {previous ? (
          <Link href={`/sessions/${previous.number}`} className="text-muted hover:text-foreground">
            ← {copy.previous}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/sessions/${next.number}`} className="text-right text-muted hover:text-foreground">
            {copy.next} →
          </Link>
        )}
      </nav>
    </div>
  );
}

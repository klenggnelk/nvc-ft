"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { formatSessionDate, getCopy, localize, type Language } from "@/app/lib/language";
import { course, sessionDate, sessions } from "@/content/sessions";

const copyByLanguage: Record<
  Language,
  {
    title: string;
    intro: string;
    sessionsTitle: string;
    session: string;
    areasTitle: string;
    cards: { href: string; title: string; text: string }[];
  }
> = {
  en: {
    title: "NVC Foundation Training",
    intro:
      "A companion for the ten sessions. Find what each session is about, watch a recording if you missed one, and practise between sessions.",
    sessionsTitle: "The ten sessions",
    session: "Session",
    areasTitle: "Across all sessions",
    cards: [
      { href: "/resources", title: "Resources", text: "Readings and recordings for every session in one place." },
      { href: "/exercises", title: "Exercises", text: "All the practices, some with gentle AI feedback." },
      { href: "/check", title: "Check yourself", text: "Short self-checks to notice what you've integrated." },
    ],
  },
  no: {
    title: "IK grunnkurs",
    intro:
      "En følgesvenn gjennom de ti samlingene. Se hva hver samling handler om, se opptaket hvis du gikk glipp av en, og øv mellom samlingene.",
    sessionsTitle: "De ti samlingene",
    session: "Samling",
    areasTitle: "På tvers av samlingene",
    cards: [
      { href: "/resources", title: "Ressurser", text: "Lesestoff og opptak for alle samlingene på ett sted." },
      { href: "/exercises", title: "Øvelser", text: "Alle øvelsene, noen med vennlig KI-tilbakemelding." },
      { href: "/check", title: "Sjekk deg selv", text: "Korte selvsjekker for å merke hva du har tatt inn." },
    ],
  },
};

export default function Home() {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="max-w-prose text-muted">{copy.intro}</p>
        <p className="text-sm text-muted">{localize(course.schedule, language)}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">{copy.sessionsTitle}</h2>
        <ol className="space-y-2">
          {sessions.map((session) => {
            const date = sessionDate(session.number);
            return (
              <li key={session.number}>
                <Link
                  href={`/sessions/${session.number}`}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent"
                >
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-medium text-accent"
                  >
                    {session.number}
                  </span>
                  <span className="space-y-0.5">
                    <span className="sr-only">
                      {copy.session} {session.number}:{" "}
                    </span>
                    <span className="block font-medium">{localize(session.title, language)}</span>
                    <span className="block text-sm text-muted">
                      {localize(session.subtitle, language)}
                      {date && <> · {formatSessionDate(date, language)}</>}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">{copy.areasTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {copy.cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <h3 className="font-medium">{card.title}</h3>
              <p className="mt-1 text-sm text-muted">{card.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

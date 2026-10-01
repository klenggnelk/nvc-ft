"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, localize, type Language } from "@/app/lib/language";
import { sessions } from "@/content/sessions";

const copyByLanguage: Record<
  Language,
  { title: string; intro: string; session: string; recording: string; empty: string }
> = {
  en: {
    title: "Resources",
    intro: "Readings and recordings for each session. Recordings are added after each session.",
    session: "Session",
    recording: "Recording of the topics and exercise instructions",
    empty: "Nothing here yet.",
  },
  no: {
    title: "Ressurser",
    intro: "Lesestoff og opptak for hver samling. Opptakene legges ut etter hver samling.",
    session: "Samling",
    recording: "Opptak av temaene og øvelsesinstruksjonene",
    empty: "Ingenting her ennå.",
  },
};

export default function ResourcesPage() {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="text-muted">{copy.intro}</p>
      </header>
      <ol className="space-y-3">
        {sessions.map((session) => {
          const hasContent = session.recordingUrl || session.resources.length > 0;
          return (
            <li key={session.number} className="rounded-xl border border-border bg-card p-4">
              <h2 className="font-medium">
                <Link href={`/sessions/${session.number}`} className="hover:text-accent">
                  {copy.session} {session.number}: {localize(session.title, language)}
                </Link>
              </h2>
              {!hasContent ? (
                <p className="mt-1 text-sm text-muted">{copy.empty}</p>
              ) : (
                <ul className="mt-2 space-y-1 text-sm">
                  {session.recordingUrl && (
                    <li>
                      <a href={session.recordingUrl} className="text-accent underline-offset-2 hover:underline">
                        {copy.recording}
                      </a>
                    </li>
                  )}
                  {session.resources.map((resource) => (
                    <li key={resource.id}>
                      {resource.url ? (
                        <a href={resource.url} className="text-accent underline-offset-2 hover:underline">
                          {localize(resource.title, language)}
                        </a>
                      ) : (
                        localize(resource.title, language)
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

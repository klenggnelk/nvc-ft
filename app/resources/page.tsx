"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, type Language } from "@/app/lib/language";
import { sessions } from "@/content/sessions";

const copyByLanguage: Record<Language, { title: string; intro: string; session: string; empty: string }> = {
  en: {
    title: "Resources",
    intro: "Material for each session. More is added as the training goes along.",
    session: "Session",
    empty: "Nothing here yet.",
  },
  no: {
    title: "Ressurser",
    intro: "Materiell for hver samling. Mer kommer etter hvert.",
    session: "Samling",
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
        {sessions.map((session) => (
          <li key={session.number} className="rounded-xl border border-border bg-card p-4">
            <h2 className="font-medium">
              {copy.session} {session.number}: {session.title[language]}
            </h2>
            {session.resources.length === 0 ? (
              <p className="mt-1 text-sm text-muted">{copy.empty}</p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm">
                {session.resources.map((resource) => (
                  <li key={resource.id}>
                    {resource.url ? (
                      <a href={resource.url} className="text-accent underline-offset-2 hover:underline">
                        {resource.title[language]}
                      </a>
                    ) : (
                      resource.title[language]
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

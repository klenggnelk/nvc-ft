"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, localize, type Language } from "@/app/lib/language";
import { generalResources, sessions, type Resource } from "@/content/sessions";

const copyByLanguage: Record<
  Language,
  {
    title: string;
    intro: string;
    general: string;
    session: string;
    recording: string;
    empty: string;
    podcast: string;
  }
> = {
  en: {
    title: "Resources",
    intro: "Readings, podcasts and recordings for each session. Recordings are added after each session.",
    general: "For the whole training",
    session: "Session",
    recording: "Recording of the topics and exercise instructions",
    empty: "Nothing here yet.",
    podcast: "Podcast",
  },
  no: {
    title: "Ressurser",
    intro: "Lesestoff, podkaster og opptak for hver samling. Opptakene legges ut etter hver samling.",
    general: "For hele kurset",
    session: "Samling",
    recording: "Opptak av temaene og øvelsesinstruksjonene",
    empty: "Ingenting her ennå.",
    podcast: "Podkast",
  },
};

function ResourceItem({ resource, language }: { resource: Resource; language: Language }) {
  const copy = getCopy(copyByLanguage, language);
  const external = resource.url?.startsWith("http");

  return (
    <li>
      {resource.kind === "podcast" && (
        <span className="mr-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">{copy.podcast}</span>
      )}
      {resource.url ? (
        <a
          href={resource.url}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-accent underline-offset-2 hover:underline"
        >
          {localize(resource.title, language)}
        </a>
      ) : (
        localize(resource.title, language)
      )}
      {resource.note && <p className="text-muted">{localize(resource.note, language)}</p>}
    </li>
  );
}

export default function ResourcesPage() {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="text-muted">{copy.intro}</p>
      </header>

      {generalResources.length > 0 && (
        <section className="rounded-xl border border-accent bg-card p-4">
          <h2 className="font-medium">{copy.general}</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {generalResources.map((resource) => (
              <ResourceItem key={resource.id} resource={resource} language={language} />
            ))}
          </ul>
        </section>
      )}

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
                <ul className="mt-2 space-y-2 text-sm">
                  {session.recordingUrl && (
                    <li>
                      <a href={session.recordingUrl} className="text-accent underline-offset-2 hover:underline">
                        {copy.recording}
                      </a>
                    </li>
                  )}
                  {session.resources.map((resource) => (
                    <ResourceItem key={resource.id} resource={resource} language={language} />
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

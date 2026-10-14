"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, type Language } from "@/app/lib/language";
import type { Song } from "@/content/sessions";

const copyByLanguage: Record<Language, { heading: string; intro: string; open: string }> = {
  en: {
    heading: "Listen: the session in a song",
    intro: "A song about this session's learnings, told through an everyday situation.",
    open: "Open in Suno",
  },
  no: {
    heading: "Lytt: samlingen i en sang",
    intro: "En sang om det vi lærer i denne samlingen, fortalt gjennom en hverdagssituasjon.",
    open: "Åpne i Suno",
  },
};

/** Embedded Suno player for a session song, with a plain link as fallback. */
export default function SongPlayer({ song }: { song: Song }) {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{copy.heading}</h2>
        <p className="text-sm text-muted">{copy.intro}</p>
      </div>
      <iframe
        src={`https://suno.com/embed/${song.sunoId}`}
        title={song.title}
        loading="lazy"
        allow="autoplay; encrypted-media"
        className="h-60 w-full rounded-xl border border-border bg-card"
      />
      <p className="text-sm">
        <span className="font-medium">{song.title}</span>
        {" · "}
        <a
          href={song.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          {copy.open}
        </a>
      </p>
    </section>
  );
}

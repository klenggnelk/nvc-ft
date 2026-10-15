"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, type Language } from "@/app/lib/language";
import type { Song } from "@/content/sessions";

const copyByLanguage: Record<
  Language,
  { heading: string; intro: string; play: string; pause: string; seek: string; chorus: string; madeWith: string; open: string }
> = {
  en: {
    heading: "Listen: the session in a song",
    intro: "A song about this session's learnings, told through an everyday situation.",
    play: "Play",
    pause: "Pause",
    seek: "Position in the song",
    chorus: "Chorus",
    madeWith: "Made with Suno",
    open: "Open in Suno",
  },
  no: {
    heading: "Lytt: samlingen i en sang",
    intro: "En sang om det vi lærer i denne samlingen, fortalt gjennom en hverdagssituasjon.",
    play: "Spill av",
    pause: "Pause",
    seek: "Posisjon i sangen",
    chorus: "Refreng",
    madeWith: "Laget med Suno",
    open: "Åpne i Suno",
  },
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Compact player for a session song: our own play button and progress bar (no artwork),
 * a small Suno credit, and the chorus in a fold-out.
 * Plays Suno's audio file directly; if that can't load, falls back to Suno's embedded player.
 */
export default function SongPlayer({ song }: { song: Song }) {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setFailed(true));
    } else {
      audio.pause();
    }
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setTime(value);
  }

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{copy.heading}</h2>
        <p className="text-sm text-muted">{copy.intro}</p>
      </div>

      {failed ? (
        <iframe
          src={`https://suno.com/embed/${song.sunoId}`}
          title={song.title}
          loading="lazy"
          allow="autoplay; encrypted-media"
          className="h-60 w-full rounded-xl border border-border bg-card"
        />
      ) : (
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
          <audio
            ref={audioRef}
            src={`https://cdn1.suno.ai/${song.sunoId}.mp3`}
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onError={() => setFailed(true)}
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? copy.pause : copy.play}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:opacity-90 dark:text-background"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            )}
          </button>
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="truncate font-medium">{song.title}</p>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={time}
              onChange={(event) => seek(Number(event.target.value))}
              aria-label={copy.seek}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-xs text-muted">
              <span>
                {formatTime(time)} / {formatTime(duration)}
              </span>
              <a
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-accent hover:underline"
              >
                {copy.madeWith} · {copy.open}
              </a>
            </div>
          </div>
        </div>
      )}

      {song.chorus && song.chorus.length > 0 && (
        <details className="rounded-xl border border-border bg-card p-4">
          <summary className="cursor-pointer font-medium">{copy.chorus}</summary>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">{song.chorus.join("\n")}</p>
        </details>
      )}
    </section>
  );
}

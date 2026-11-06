"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, localize, type Language, type Localized } from "@/app/lib/language";
import type { Slide, SlideIcon } from "@/content/slides";

const copyByLanguage: Record<
  Language,
  { heading: string; intro: string; fullscreen: string; exit: string; previous: string; next: string; slide: string }
> = {
  en: {
    heading: "Slides",
    intro: "Simple visuals to support the presentation of this session.",
    fullscreen: "Full screen",
    exit: "Exit full screen",
    previous: "Previous slide",
    next: "Next slide",
    slide: "Slide",
  },
  no: {
    heading: "Lysbilder",
    intro: "Enkle bilder som støtte når innholdet i samlingen presenteres.",
    fullscreen: "Fullskjerm",
    exit: "Avslutt fullskjerm",
    previous: "Forrige lysbilde",
    next: "Neste lysbilde",
    slide: "Lysbilde",
  },
  fr: {
    heading: "Diapositives",
    intro: "Des visuels simples pour soutenir la présentation de cette séance.",
    fullscreen: "Plein écran",
    exit: "Quitter le plein écran",
    previous: "Diapositive précédente",
    next: "Diapositive suivante",
    slide: "Diapositive",
  },
  ro: {
    heading: "Slide-uri",
    intro: "Imagini simple care sprijină prezentarea acestei sesiuni.",
    fullscreen: "Ecran complet",
    exit: "Ieși din ecran complet",
    previous: "Slide-ul anterior",
    next: "Slide-ul următor",
    slide: "Slide",
  },
  sw: {
    heading: "Slaidi",
    intro: "Picha rahisi za kusaidia uwasilishaji wa kikao hiki.",
    fullscreen: "Skrini nzima",
    exit: "Toka kwenye skrini nzima",
    previous: "Slaidi iliyopita",
    next: "Slaidi inayofuata",
    slide: "Slaidi",
  },
  am: {
    heading: "ስላይዶች",
    intro: "የዚህን ክፍለ ጊዜ አቀራረብ የሚደግፉ ቀላል ምስሎች።",
    fullscreen: "ሙሉ ማያ ገጽ",
    exit: "ከሙሉ ማያ ገጽ ውጣ",
    previous: "ያለፈው ስላይድ",
    next: "ቀጣዩ ስላይድ",
    slide: "ስላይድ",
  },
  pa: {
    heading: "سلائیڈاں",
    intro: "ایس سیشن دی پیشکاری وچ مدد لئی سادہ تصویراں۔",
    fullscreen: "پوری سکرین",
    exit: "پوری سکرین توں باہر",
    previous: "پچھلی سلائیڈ",
    next: "اگلی سلائیڈ",
    slide: "سلائیڈ",
  },
};

function Icon({ name, className }: { name: SlideIcon; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  switch (name) {
    case "camera":
      return (
        <svg {...common}>
          <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
          <circle cx="12" cy="13.5" r="3.5" />
        </svg>
      );
    case "thought":
      return (
        <svg {...common}>
          <path d="M7 16a4 4 0 0 1-.5-8 5 5 0 0 1 9.5-1 4 4 0 0 1 1.5 7.8A3 3 0 0 1 14 16z" />
          <circle cx="8" cy="19" r="1" />
          <circle cx="5.5" cy="21.5" r="0.6" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        </svg>
      );
    case "door":
      return (
        <svg {...common}>
          <path d="M5 21h14M7 21V4h8v17" />
          <path d="M15 4l3 1.5V21" />
          <circle cx="12.5" cy="12.5" r="0.6" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.5" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
  }
}

/** Arrow pointing in reading direction (flips in right-to-left languages). */
function Arrow({ className = "text-muted", back = false }: { className?: string; back?: boolean }) {
  return (
    <span aria-hidden className={`inline-block shrink-0 rtl:-scale-x-100 ${className}`}>
      {back ? "←" : "→"}
    </span>
  );
}

const chipStrong = "rounded-[1.2cqw] bg-accent-soft px-[1.6cqw] py-[1.2cqw] text-center font-semibold text-accent";
const chipMuted = "rounded-[1.2cqw] border border-border px-[1.6cqw] py-[1.2cqw] text-center text-muted";

function SlideBody({ slide, language }: { slide: Slide; language: Language }) {
  const l = (text: Localized) => localize(text, language);

  switch (slide.kind) {
    case "contrast":
      return (
        <div className="grid flex-1 grid-cols-2 gap-[3cqw]">
          {[slide.left, slide.right].map((side, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center gap-[1.5cqw] rounded-[2cqw] p-[2cqw] text-center ${
                i === 0 ? "bg-accent-soft text-accent" : "border border-border text-muted"
              }`}
            >
              {side.icon && <Icon name={side.icon} className="h-[9cqw] w-[9cqw]" />}
              <span className="text-[5cqw] font-semibold leading-tight">{l(side.label)}</span>
              {side.sub && <span className="text-[2.6cqw] leading-snug">{l(side.sub)}</span>}
            </div>
          ))}
        </div>
      );

    case "steps": {
      const arrows = slide.arrows !== false;
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-[2cqw]">
          <div className="flex w-full items-center justify-center gap-[1.5cqw]">
            {slide.items.map((item, i) => (
              <div key={i} className="contents">
                {i > 0 && arrows && <Arrow className="text-[4cqw] text-muted" />}
                <div
                  className={`flex min-h-[15cqw] flex-1 flex-col items-center justify-center gap-[1cqw] text-[3.2cqw] leading-tight ${
                    slide.muted ? chipMuted : chipStrong
                  }`}
                >
                  {arrows && !slide.muted && (
                    <span className="text-[2cqw] font-normal opacity-70">{i + 1}</span>
                  )}
                  <span>{l(item)}</span>
                </div>
              </div>
            ))}
          </div>
          {slide.loop && <span aria-hidden className="text-[4.5cqw] text-muted">↻</span>}
        </div>
      );
    }

    case "rows":
      return (
        <div className="flex flex-1 flex-col justify-center gap-[2.5cqw]">
          {[slide.top, slide.bottom].map((row, r) => (
            <div key={r} className="space-y-[1cqw]">
              <span className={`block text-[2.2cqw] uppercase tracking-wide ${r === 0 ? "text-accent" : "text-muted"}`}>
                {l(row.label)}
              </span>
              <div className="flex items-center gap-[1.5cqw]">
                {row.items.map((item, i) => (
                  <div key={i} className="contents">
                    {i > 0 &&
                      (row.arrows ? (
                        <Arrow className={`text-[3.5cqw] ${r === 0 ? "text-accent" : "text-muted"}`} />
                      ) : (
                        <span aria-hidden className="w-[3.5cqw] shrink-0" />
                      ))}
                    <span className={`min-w-0 flex-1 text-[2.5cqw] ${r === 0 ? chipStrong : chipMuted}`}>{l(item)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "twoWay":
      return (
        <div className="flex flex-1 flex-col justify-center gap-[2cqw]">
          <div className="flex items-center gap-[1.5cqw] text-[2.6cqw] text-accent">
            <span className="font-semibold">{l(slide.forward)}</span>
            <span aria-hidden className="h-px flex-1 bg-accent" />
            <Arrow className="text-[3.5cqw] text-accent" />
          </div>
          <div className="grid gap-[1.5cqw]" style={{ gridTemplateColumns: `repeat(${slide.items.length}, 1fr)` }}>
            {slide.items.map((item, i) => (
              <span key={i} className={`text-[3cqw] ${chipStrong}`}>
                {l(item)}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-[1.5cqw] text-[2.6cqw] text-accent">
            <Arrow back className="text-[3.5cqw] text-accent" />
            <span aria-hidden className="h-px flex-1 bg-accent" />
            <span className="font-semibold">{l(slide.back)}</span>
          </div>
        </div>
      );

    case "roots":
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-[1.5cqw]">
          <div className="grid w-full gap-[1.5cqw]" style={{ gridTemplateColumns: `repeat(${slide.strategies.length}, 1fr)` }}>
            {slide.strategies.map((s, i) => (
              <span key={i} className={`text-[2.6cqw] ${chipMuted}`}>
                {l(s)}
              </span>
            ))}
          </div>
          <span aria-hidden className="text-[4cqw] leading-none text-muted">
            ↓ ↓ ↓
          </span>
          <span className="rounded-full bg-accent px-[4cqw] py-[1.8cqw] text-[4.2cqw] font-semibold text-white dark:text-background">
            {l(slide.need)}
          </span>
        </div>
      );

    case "orbit": {
      const half = Math.ceil(slide.around.length / 2);
      const ring = (list: Localized[]) => (
        <div className="grid gap-[1.2cqw]" style={{ gridTemplateColumns: `repeat(${list.length}, 1fr)` }}>
          {list.map((s, i) => (
            <span key={i} className={`text-[2.5cqw] ${chipMuted}`}>
              {l(s)}
            </span>
          ))}
        </div>
      );
      return (
        <div className="flex flex-1 flex-col justify-center gap-[2cqw]">
          {ring(slide.around.slice(0, half))}
          <div className="flex justify-center">
            <span className="rounded-full bg-accent px-[4cqw] py-[2cqw] text-center text-[3.6cqw] font-semibold text-white dark:text-background">
              {l(slide.center)}
            </span>
          </div>
          {ring(slide.around.slice(half))}
        </div>
      );
    }
  }
}

/**
 * A small slideshow for presenting a session: one slide at a time, arrows to move,
 * and a full-screen mode for sharing on Zoom. Text scales with the slide width.
 */
export default function SessionSlides({ slides }: { slides: Slide[] }) {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);
  const frameRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFull(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (slides.length === 0) return null;
  const slide = slides[Math.min(index, slides.length - 1)];
  const many = slides.length > 1;
  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);

  function toggleFull() {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else el.requestFullscreen?.().catch(() => {});
  }

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{copy.heading}</h2>
        <p className="text-sm text-muted">{copy.intro}</p>
      </div>

      <div
        ref={frameRef}
        tabIndex={-1}
        onKeyDown={(event) => {
          if (!many) return;
          const rtl = document.documentElement.dir === "rtl";
          if (event.key === "ArrowRight") go(rtl ? -1 : 1);
          if (event.key === "ArrowLeft") go(rtl ? 1 : -1);
        }}
        className={`flex flex-col gap-3 outline-none ${isFull ? "items-center justify-center bg-background p-6" : ""}`}
      >
        <div
          className={`@container relative flex aspect-video w-full flex-col overflow-hidden rounded-xl border border-border bg-card ${
            isFull ? "max-h-[85vh] max-w-[calc(85vh*16/9)]" : ""
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${copy.slide} ${index + 1} / ${slides.length}`}
        >
          <div className="flex flex-1 flex-col gap-[3cqw] p-[5cqw]">
            {slide.title && (
              <h3 className="text-center text-[4cqw] font-semibold leading-tight">{localize(slide.title, language)}</h3>
            )}
            <SlideBody slide={slide} language={language} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            {many && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={copy.previous}
                  className="rounded-lg border border-border px-3 py-1.5 hover:border-accent"
                >
                  <span aria-hidden className="inline-block rtl:-scale-x-100">←</span>
                </button>
                <span dir="ltr" className="text-muted">
                  {index + 1} / {slides.length}
                </span>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={copy.next}
                  className="rounded-lg border border-border px-3 py-1.5 hover:border-accent"
                >
                  <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
                </button>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={toggleFull}
            className="rounded-lg border border-border px-3 py-1.5 hover:border-accent"
          >
            {isFull ? copy.exit : copy.fullscreen}
          </button>
        </div>
      </div>
    </section>
  );
}

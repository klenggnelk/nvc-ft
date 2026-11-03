"use client";

import Link from "next/link";
import CheckGame from "@/app/components/CheckGame";
import ExerciseCard from "@/app/components/ExerciseCard";
import ResponseExamplesBox from "@/app/components/ResponseExamplesBox";
import SongPlayer from "@/app/components/SongPlayer";
import { useLanguage } from "@/app/context/LanguageContext";
import { formatSessionDate, getCopy, localize, type Language } from "@/app/lib/language";
import { checksForSession } from "@/content/checks";
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
    bring: string;
    read: string;
    podcast: string;
    takeaways: string;
    practise: string;
    practiseIntro: string;
    check: string;
    checkIntro: string;
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
    recordingLink: "Watch the recordings of the topics and exercise instructions.",
    recordingSoon: "The recording of the topics and exercise instructions will appear here after the session.",
    bring: "Bring to this session",
    read: "Read and listen",
    podcast: "Podcast",
    takeaways: "Key takeaways",
    check: "Check yourself",
    checkIntro: "A short game for after the session. Read each statement and choose what it is. It is for your own learning, not a grade.",
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
    recordingLink: "Se opptakene av temaene og øvelsesinstruksjonene.",
    recordingSoon: "Opptaket av temaene og øvelsesinstruksjonene kommer her etter samlingen.",
    bring: "Ta med til samlingen",
    read: "Les og lytt",
    podcast: "Podkast",
    takeaways: "Viktige poeng",
    check: "Sjekk deg selv",
    checkIntro: "Et kort spill til etter samlingen. Les hvert utsagn og velg hva det er. Det er for din egen læring, ikke en karakter.",
    practise: "Øv denne uken",
    practiseIntro: "Små øvelser for dagene mellom samlingene. Her finnes ingen feil svar — bare øving.",
    flow: "Slik foregår hver samling",
    min: "min",
    previous: "Forrige samling",
    next: "Neste samling",
  },
  sw: {
    back: "Vikao vyote",
    sessionOf: (n, total) => `Kikao ${n} kati ya ${total}`,
    explore: "Tutakachochunguza",
    recording: "Ulikosa kikao?",
    recordingLink: "Tazama rekodi za mada na maelekezo ya mazoezi.",
    recordingSoon: "Rekodi ya mada na maelekezo ya mazoezi itaonekana hapa baada ya kikao.",
    bring: "Leta kwenye kikao hiki",
    read: "Soma na usikilize",
    podcast: "Podikasti",
    takeaways: "Mafunzo makuu",
    check: "Jipime",
    checkIntro: "Mchezo mfupi wa baada ya kikao. Soma kila sentensi na uchague ni ipi. Ni kwa ajili ya ujifunzaji wako, si alama.",
    practise: "Jizoeze wiki hii",
    practiseIntro: "Mazoezi madogo kwa siku kati ya vikao. Hakuna majibu yasiyo sahihi — ni mazoezi tu.",
    flow: "Jinsi kila kikao kinavyoendeshwa",
    min: "dak",
    previous: "Kikao kilichopita",
    next: "Kikao kijacho",
  },
  pa: {
    back: "سارے سیشن",
    sessionOf: (n, total) => `سیشن ${n} (${total} وچوں)`,
    explore: "اسیں کی ویکھاں گے",
    recording: "سیشن رہ گیا؟",
    recordingLink: "موضوعاں تے مشقاں دیاں ہدایتاں دیاں ریکارڈنگاں ویکھو۔",
    recordingSoon: "موضوعاں تے مشقاں دیاں ہدایتاں دی ریکارڈنگ سیشن توں بعد ایتھے آ جاوے گی۔",
    bring: "ایس سیشن وچ نال لیاؤ",
    read: "پڑھو تے سنو",
    podcast: "پوڈکاسٹ",
    takeaways: "اہم سبق",
    check: "اپنے آپ نوں جانچو",
    checkIntro: "سیشن توں بعد لئی اک چھوٹی کھیڈ۔ ہر جملہ پڑھو تے چُنو کہ ایہہ کی اے۔ ایہہ تہاڈی اپنی سکھلائی لئی اے، نمبراں لئی نئیں۔",
    practise: "ایس ہفتے مشق کرو",
    practiseIntro: "سیشناں دے وچکار دے دناں لئی چھوٹیاں مشقاں۔ کوئی جواب غلط نئیں — بس مشق اے۔",
    flow: "ہر سیشن کداں چلدا اے",
    min: "منٹ",
    previous: "پچھلا سیشن",
    next: "اگلا سیشن",
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
  const sessionChecks = checksForSession(session.number);

  return (
    <div className="space-y-8">
      <Link href="/" className="text-sm text-muted hover:text-foreground">
        <span aria-hidden className="inline-block rtl:-scale-x-100">←</span> {copy.back}
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

      {session.bring && session.bring.length > 0 && (
        <section className="space-y-2 rounded-xl border-2 border-accent bg-card p-5">
          <h2 className="font-semibold">{copy.bring}</h2>
          <ul className="space-y-2">
            {session.bring.map((item) => (
              <li key={item.id}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent underline underline-offset-2"
                  >
                    {localize(item.title, language)}
                  </a>
                ) : (
                  <span className="font-medium">{localize(item.title, language)}</span>
                )}
                {item.note && <p className="text-sm text-muted">{localize(item.note, language)}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="max-w-prose leading-relaxed">{localize(session.description, language)}</p>

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

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">{copy.explore}</h2>
        <ul className="list-disc space-y-1 ps-5">
          {session.topics.map((topic) => (
            <li key={topic.en}>{localize(topic, language)}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 rounded-xl bg-accent-soft p-5">
        <h2 className="font-semibold">{copy.recording}</h2>
        {session.recordings && session.recordings.length > 0 ? (
          <>
            <p className="text-sm text-muted">{copy.recordingLink}</p>
            <div className="space-y-4 pt-1">
              {session.recordings.map((video) => (
                <figure key={video.youtubeId} className="space-y-1.5">
                  <div className="aspect-video overflow-hidden rounded-lg border border-border bg-card">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
                      title={localize(video.title, language)}
                      loading="lazy"
                      allow="encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="h-full w-full"
                    />
                  </div>
                  <figcaption className="text-sm font-medium">{localize(video.title, language)}</figcaption>
                </figure>
              ))}
            </div>
          </>
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
                {resource.kind === "podcast" && <span className="me-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">{copy.podcast}</span>}
                {resource.url ? (
                  <a
                    href={resource.url}
                    {...(resource.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {localize(resource.title, language)}
                  </a>
                ) : (
                  localize(resource.title, language)
                )}
                {resource.note && <span className="text-sm text-muted"> — {localize(resource.note, language)}</span>}
              </li>
            ))}
          </ul>
          {session.takeaways && (
            <div className="mt-3 space-y-1 rounded-lg bg-accent-soft p-4">
              <h3 className="text-sm font-semibold">{copy.takeaways}</h3>
              <p className="max-w-prose text-sm leading-relaxed">{localize(session.takeaways, language)}</p>
            </div>
          )}
        </section>
      )}

      {session.responseExamples && <ResponseExamplesBox data={session.responseExamples} />}

      {session.song && <SongPlayer song={session.song} />}

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

      {sessionChecks.length > 0 && (
        <section id="check" className="scroll-mt-6 space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{copy.check}</h2>
            <p className="text-sm text-muted">{copy.checkIntro}</p>
          </div>
          {sessionChecks.map((check) => (
            <CheckGame key={check.id} check={check} />
          ))}
        </section>
      )}

      <nav className="flex justify-between gap-4 border-t border-border pt-4 text-sm">
        {previous ? (
          <Link href={`/sessions/${previous.number}`} className="text-muted hover:text-foreground">
            <span aria-hidden className="inline-block rtl:-scale-x-100">←</span> {copy.previous}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/sessions/${next.number}`} className="text-end text-muted hover:text-foreground">
            {copy.next} <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
          </Link>
        )}
      </nav>
    </div>
  );
}

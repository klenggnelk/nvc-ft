"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, localize, type Language } from "@/app/lib/language";
import { generalResources, resourceUrl, sessions, type Resource } from "@/content/sessions";

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
    bring: string;
    takeaways: string;
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
    bring: "Bring to session",
    takeaways: "Key takeaways",
  },
  no: {
    title: "Ressurser",
    intro: "Lesestoff, podkaster og opptak for hver samling. Opptakene legges ut etter hver samling.",
    general: "For hele kurset",
    session: "Samling",
    recording: "Opptak av temaene og øvelsesinstruksjonene",
    empty: "Ingenting her ennå.",
    podcast: "Podkast",
    bring: "Ta med",
    takeaways: "Viktige poeng",
  },
  sw: {
    title: "Rasilimali",
    intro: "Masomo, podikasti na rekodi za kila kikao. Rekodi zinaongezwa baada ya kila kikao.",
    general: "Kwa mafunzo yote",
    session: "Kikao",
    recording: "Rekodi ya mada na maelekezo ya mazoezi",
    empty: "Bado hakuna kitu hapa.",
    podcast: "Podikasti",
    bring: "Leta kwenye kikao",
    takeaways: "Mafunzo makuu",
  },
  pa: {
    title: "وسیلے",
    intro: "ہر سیشن لئی پڑھن دا مواد، پوڈکاسٹ تے ریکارڈنگاں۔ ریکارڈنگاں ہر سیشن توں بعد پائیاں جاندیاں نیں۔",
    general: "پوری تربیت لئی",
    session: "سیشن",
    recording: "موضوعاں تے مشقاں دیاں ہدایتاں دی ریکارڈنگ",
    empty: "ایتھے اجے کجھ نئیں۔",
    podcast: "پوڈکاسٹ",
    bring: "سیشن وچ نال لیاؤ",
    takeaways: "اہم سبق",
  },
  fr: {
    title: "Ressources",
    intro: "Lectures, podcasts et enregistrements pour chaque séance. Les enregistrements sont ajoutés après chaque séance.",
    general: "Pour toute la formation",
    session: "Séance",
    recording: "Enregistrement des thèmes et des consignes d'exercices",
    empty: "Rien ici pour l'instant.",
    podcast: "Podcast",
    bring: "À apporter à la séance",
    takeaways: "Points clés",
  },
  ro: {
    title: "Resurse",
    intro: "Lecturi, podcasturi și înregistrări pentru fiecare sesiune. Înregistrările se adaugă după fiecare sesiune.",
    general: "Pentru toată formarea",
    session: "Sesiunea",
    recording: "Înregistrarea temelor și a instrucțiunilor pentru exerciții",
    empty: "Încă nu e nimic aici.",
    podcast: "Podcast",
    bring: "De adus la sesiune",
    takeaways: "Idei principale",
  },
  am: {
    title: "ሀብቶች",
    intro: "ለእያንዳንዱ ክፍለ ጊዜ ንባቦች፣ ፖድካስቶችና ቅጂዎች። ቅጂዎች ከእያንዳንዱ ክፍለ ጊዜ በኋላ ይጨመራሉ።",
    general: "ለጠቅላላው ሥልጠና",
    session: "ክፍለ ጊዜ",
    recording: "የርዕሶቹና የልምምድ መመሪያዎቹ ቅጂ",
    empty: "እዚህ ገና ምንም የለም።",
    podcast: "ፖድካስት",
    bring: "ወደ ክፍለ ጊዜው ይዘው ይምጡ",
    takeaways: "ዋና ዋና ትምህርቶች",
  },
};

function ResourceItem({ resource, language, bring = false }: { resource: Resource; language: Language; bring?: boolean }) {
  const copy = getCopy(copyByLanguage, language);
  const url = resourceUrl(resource, language);

  return (
    <li>
      {bring && (
        <span className="me-2 rounded-full border border-accent px-2 py-0.5 text-xs font-medium text-accent">{copy.bring}</span>
      )}
      {resource.kind === "podcast" && (
        <span className="me-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">{copy.podcast}</span>
      )}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
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
          const hasContent = (session.recordings?.length ?? 0) > 0 || session.resources.length > 0 || (session.bring?.length ?? 0) > 0;
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
                <>
                <ul className="mt-2 space-y-2 text-sm">
                  {session.recordings?.map((video) => (
                    <li key={video.youtubeId}>
                      <a
                        href={`https://youtu.be/${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        {localize(video.title, language)}
                      </a>
                    </li>
                  ))}
                  {session.bring?.map((item) => (
                    <ResourceItem key={item.id} resource={item} language={language} bring />
                  ))}
                  {session.resources.map((resource) => (
                    <ResourceItem key={resource.id} resource={resource} language={language} />
                  ))}
                </ul>
                {session.takeaways && (
                  <details className="mt-3 text-sm">
                    <summary className="cursor-pointer font-medium text-accent">{copy.takeaways}</summary>
                    <p className="mt-2 max-w-prose leading-relaxed">{localize(session.takeaways, language)}</p>
                  </details>
                )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

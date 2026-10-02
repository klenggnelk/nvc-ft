"use client";

import Link from "next/link";
import CheckGame from "@/app/components/CheckGame";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, localize, type Language } from "@/app/lib/language";
import { checksForSession } from "@/content/checks";
import { sessions } from "@/content/sessions";

const copyByLanguage: Record<Language, { title: string; intro: string; how: string; session: string }> = {
  en: {
    title: "Check yourself",
    intro: "Short games to notice what you've taken in — for your own learning, not a grade.",
    how: "Each round is about one key differentiation of NVC. Read a statement, choose what it is, and see how we would sort it and why.",
    session: "Session",
  },
  no: {
    title: "Sjekk deg selv",
    intro: "Korte spill for å merke hva du har tatt inn — for din egen læring, ikke en karakter.",
    how: "Hver runde handler om én nøkkeldifferensiering i IK. Les et utsagn, velg hva det er, og se hvordan vi ville sortert det og hvorfor.",
    session: "Samling",
  },
};

export default function CheckPage() {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);
  const withChecks = sessions
    .map((session) => ({ session, checks: checksForSession(session.number) }))
    .filter((entry) => entry.checks.length > 0);

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="text-muted">{copy.intro}</p>
        <p className="text-sm text-muted">{copy.how}</p>
      </header>
      {withChecks.map(({ session, checks }) => (
        <section key={session.number} className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
            <Link href={`/sessions/${session.number}`} className="hover:text-accent">
              {copy.session} {session.number}: {localize(session.title, language)}
            </Link>
          </h2>
          {checks.map((check) => (
            <CheckGame key={check.id} check={check} />
          ))}
        </section>
      ))}
    </div>
  );
}

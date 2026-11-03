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
    how: "Hver runde handler om én nøkkeldifferensiering i IVK. Les et utsagn, velg hva det er, og se hvordan vi ville sortert det og hvorfor.",
    session: "Samling",
  },
  sw: {
    title: "Jipime",
    intro: "Michezo mifupi ya kutambua ulichojifunza — kwa ajili ya ujifunzaji wako, si alama.",
    how: "Kila raundi inahusu tofauti moja muhimu ya NVC. Soma sentensi, chagua ni ipi, na uone jinsi sisi tungeipanga na kwa nini.",
    session: "Kikao",
  },
  pa: {
    title: "اپنے آپ نوں جانچو",
    intro: "چھوٹیاں کھیڈاں تاں جو پتہ لگے تسیں کی سکھیا اے — تہاڈی اپنی سکھلائی لئی، نمبراں لئی نئیں۔",
    how: "ہر راؤنڈ NVC دے اک اہم فرق بارے اے۔ اک جملہ پڑھو، چُنو کہ ایہہ کی اے، تے ویکھو کہ اسیں ایہنوں کداں ونڈاں گے تے کیوں۔",
    session: "سیشن",
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

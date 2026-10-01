"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, type Language } from "@/app/lib/language";

const copyByLanguage: Record<Language, { title: string; intro: string; soon: string }> = {
  en: {
    title: "Check yourself",
    intro: "Short self-checks to notice what you've taken in — for your own learning, not a grade.",
    soon: "The first self-checks are on their way.",
  },
  no: {
    title: "Sjekk deg selv",
    intro: "Korte selvsjekker for å merke hva du har tatt inn — for din egen læring, ikke en karakter.",
    soon: "De første selvsjekkene er på vei.",
  },
};

export default function CheckPage() {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="text-muted">{copy.intro}</p>
      </header>
      <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted">{copy.soon}</p>
    </div>
  );
}

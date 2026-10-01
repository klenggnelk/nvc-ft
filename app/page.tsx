"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, type Language } from "@/app/lib/language";

const copyByLanguage: Record<
  Language,
  { title: string; intro: string; cards: { href: string; title: string; text: string }[] }
> = {
  en: {
    title: "NVC Foundation Training",
    intro: "A companion for the ten sessions — find the material, practise between sessions, and see what has landed.",
    cards: [
      { href: "/resources", title: "Resources", text: "Readings, handouts and recordings for each session." },
      { href: "/exercises", title: "Exercises", text: "Practice between sessions, some with gentle AI feedback." },
      { href: "/check", title: "Check yourself", text: "Short self-checks to notice what you've integrated." },
    ],
  },
  no: {
    title: "IK grunnkurs",
    intro: "En følgesvenn gjennom de ti samlingene — finn materiellet, øv mellom samlingene og se hva som har satt seg.",
    cards: [
      { href: "/resources", title: "Ressurser", text: "Lesestoff, ark og opptak for hver samling." },
      { href: "/exercises", title: "Øvelser", text: "Øving mellom samlingene, noen med vennlig KI-tilbakemelding." },
      { href: "/check", title: "Sjekk deg selv", text: "Korte selvsjekker for å merke hva du har tatt inn." },
    ],
  },
};

export default function Home() {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="max-w-prose text-muted">{copy.intro}</p>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {copy.cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
          >
            <h2 className="font-medium">{card.title}</h2>
            <p className="mt-1 text-sm text-muted">{card.text}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

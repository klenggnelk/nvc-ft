"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type Language } from "@/app/lib/language";

const copyByLanguage: Record<Language, { home: string; resources: string; exercises: string; check: string; language: string }> = {
  en: { home: "Home", resources: "Resources", exercises: "Exercises", check: "Check yourself", language: "Language" },
  no: { home: "Hjem", resources: "Ressurser", exercises: "Øvelser", check: "Sjekk deg selv", language: "Språk" },
};

export default function SiteHeader() {
  const { language, setLanguage } = useLanguage();
  const copy = getCopy(copyByLanguage, language);
  const pathname = usePathname();

  const links = [
    { href: "/", label: copy.home },
    { href: "/resources", label: copy.resources },
    { href: "/exercises", label: copy.exercises },
    { href: "/check", label: copy.check },
  ];

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <nav className="flex flex-wrap gap-1 text-sm">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  active ? "bg-accent-soft text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="sr-only">{copy.language}</span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
            className="rounded-md border border-border bg-card px-2 py-1 text-foreground"
          >
            {SUPPORTED_LANGUAGES.map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_LABELS[code]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}

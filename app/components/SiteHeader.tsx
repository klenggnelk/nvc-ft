"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/components/Logo";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type Language } from "@/app/lib/language";

const copyByLanguage: Record<
  Language,
  { brand: string; home: string; resources: string; exercises: string; check: string; language: string }
> = {
  en: { brand: "NVC Edu", home: "Home", resources: "Resources", exercises: "Exercises", check: "Check yourself", language: "Language" },
  no: { brand: "NVC Edu", home: "Hjem", resources: "Ressurser", exercises: "Øvelser", check: "Sjekk deg selv", language: "Språk" },
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
      <div className="mx-auto w-full max-w-3xl space-y-2 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-11 w-auto shrink-0" />
            <span className="font-serif text-lg leading-tight tracking-wide text-foreground">{copy.brand}</span>
          </Link>
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
        <nav className="-ml-3 flex flex-wrap gap-1 text-sm">
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
      </div>
    </header>
  );
}

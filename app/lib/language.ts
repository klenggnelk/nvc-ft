// Shared language helper. Add a language here first, then add its copy to each page's copyByLanguage.

export const SUPPORTED_LANGUAGES = ["en", "no"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  no: "Norsk",
};

/** Turns anything ("nb", "NO", "en-GB", null) into a supported language code. */
export function normalizeLanguage(value: string | null | undefined): Language {
  if (!value) return DEFAULT_LANGUAGE;
  const code = value.toLowerCase().slice(0, 2);
  if (code === "nb" || code === "nn") return "no";
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(code)
    ? (code as Language)
    : DEFAULT_LANGUAGE;
}

/** Picks the copy for a language, falling back to English. */
export function getCopy<T>(copyByLanguage: Record<Language, T>, language: Language): T {
  return copyByLanguage[language] ?? copyByLanguage[DEFAULT_LANGUAGE];
}

/** Text that always has English and may have other languages (used for course content). */
export type Localized = { en: string } & Partial<Record<Language, string>>;

/** Picks a language from Localized text, falling back to English when it isn't translated yet. */
export function localize(text: Localized, language: Language): string {
  return text[language] ?? text.en;
}

/** Date-only formatting that gives the same result on the server and in every browser. */
export function formatSessionDate(date: Date, language: Language): string {
  return date.toLocaleDateString(language === "no" ? "nb-NO" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

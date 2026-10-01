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

// Shared language helper. Add a language here first, then add its copy to each page's copyByLanguage,
// and its course-content translations in content/i18n/.

import { contentTranslations } from "@/content/i18n";

export const SUPPORTED_LANGUAGES = ["en", "no", "sw", "pa"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  no: "Norsk",
  sw: "Kiswahili",
  pa: "پنجابی",
};

/** Writing direction per language (Punjabi is written in Shahmukhi script, right to left). */
export const LANGUAGE_DIR: Record<Language, "ltr" | "rtl"> = {
  en: "ltr",
  no: "ltr",
  sw: "ltr",
  pa: "rtl",
};

/** Value for <html lang>. */
export const HTML_LANG: Record<Language, string> = {
  en: "en",
  no: "nb",
  sw: "sw",
  pa: "pa-Arab",
};

const DATE_LOCALE: Record<Language, string> = {
  en: "en-GB",
  no: "nb-NO",
  sw: "sw-KE",
  pa: "pa-Arab-PK",
};

/** Turns anything ("nb", "NO", "en-GB", null) into a supported language code. */
export function normalizeLanguage(value: string | null | undefined): Language {
  if (!value) return DEFAULT_LANGUAGE;
  const lower = value.toLowerCase();
  if (lower.startsWith("pnb")) return "pa";
  const code = lower.slice(0, 2);
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

/**
 * Picks a language from Localized text: the text's own translation, else the translation file
 * for that language (content/i18n, keyed by the English text), else English.
 */
export function localize(text: Localized, language: Language): string {
  return text[language] ?? contentTranslations[language]?.[text.en] ?? text.en;
}

/** Date-only formatting that gives the same result on the server and in every browser. */
export function formatSessionDate(date: Date, language: Language): string {
  return date.toLocaleDateString(DATE_LOCALE[language], {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

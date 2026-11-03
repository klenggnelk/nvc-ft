// Course-content translations kept in separate files, keyed by the English text.
// Norwegian lives inline in content/sessions.ts and content/checks.ts; newer languages live here.
import pa from "./pa";
import sw from "./sw";

export const contentTranslations: Record<string, Record<string, string> | undefined> = { sw, pa };

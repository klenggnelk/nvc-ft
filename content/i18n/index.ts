// Course-content translations kept in separate files, keyed by the English text.
// Norwegian lives inline in content/sessions.ts and content/checks.ts; newer languages live here.
import am from "./am";
import fr from "./fr";
import pa from "./pa";
import ro from "./ro";
import sw from "./sw";

export const contentTranslations: Record<string, Record<string, string> | undefined> = { sw, pa, fr, ro, am };

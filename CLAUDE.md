# CLAUDE.md — NVC Foundation Training app (nvc-ft)

## What this is
A companion web app for participants in a 10-session online NVC Foundation Training (CNVC format, run on Zoom by a trainer team).
Three areas: **Resources** (material per session), **Exercises** (practice between sessions, some with AI feedback) and **Check yourself** (self-checks — for learning, never grading).
Sister app to Giraffe (`klenggnelk/nvc-coach`); same stack, kept fully separate.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · ESLint 9 · OpenAI Node SDK v7 (Responses API, `gpt-5-mini`) · deployed on Vercel. Node 22+.

## Layout
- `app/` — pages (`page.tsx` per route), `layout.tsx`, `globals.css` (colour tokens incl. dark mode)
- `app/api/<task>/route.ts` — one server route per AI task
- `app/lib/prompts/` — one prompt file per AI task, with a version header comment
- `app/lib/openai.ts` — shared OpenAI client + model name
- `app/lib/language.ts` — languages (EN, NO), `normalizeLanguage`, `getCopy`
- `app/context/LanguageContext.tsx` — current language, persisted to localStorage
- `app/components/` — shared UI
- `content/sessions.ts` — course content as data: schedule/start date, 2-hour session flow, the 10 sessions (from the trainer team's agenda) → topics, recording link, readings, practices
- `app/sessions/[number]/` — one page per session (the hub participants use each week)
- `content/checks.ts` — "Check yourself" rounds per session, built on the 25 CNVC key differentiations (statement → side A/B + short explanation). Played with `app/components/CheckGame.tsx` on each session page and on `/check`. Nothing is stored; no scores as judgement ("we see it the same way / differently").

## Conventions
- Participants are ~20 people from different countries who speak English as a second language: write content in plain, short English.
- Page UI text uses `copyByLanguage` per page (EN + NO). Course content uses `Localized` text (`{ en, no? }`) shown with `localize()`, falling back to English until translated.
- Small, controlled edits rather than rewrites. Explain what changed and why.
- API keys only on the server: call OpenAI from `app/api/.../route.ts`, never from a page or component.
- Structured JSON output (`json_schema`, `strict: true`) when the UI needs fields; validate the parsed result before returning it.
- Every page has a `copyByLanguage` dictionary and uses `getCopy(copyByLanguage, language)`. Add new text in all languages; machine translations get reviewed by a native speaker.
- Course content goes in `content/`, not in page code, so trainers' changes are low-risk.
- Calm, low-burden UI: no punitive colour coding or scores-as-judgement, warm wording, simple transitions, respect `prefers-reduced-motion`.
- AI feedback never shames or grades; it treats every attempt as practice.
- Participants' practice text is personal — don't log it or store it without a deliberate decision about privacy (GDPR).

## Commands
`npm run dev` (http://localhost:3000) · `npm run build` · `npm run lint`

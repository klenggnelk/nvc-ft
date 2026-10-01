# NVC Foundation Training app

Companion app for participants in the NVC Foundation Training: resources, exercises and self-checks for each of the ten sessions.

## First-time setup (on your computer)

You need **Node.js 22 or newer** (`node -v` to check) and git.

```bash
cd nvc-ft
npm install                     # downloads Next.js, React, Tailwind, OpenAI SDK
cp .env.example .env.local      # then put your OpenAI key in .env.local
npm run dev                     # open http://localhost:3000
```

The app runs without a key too — only the AI feedback in Exercises needs it.

## Put it on GitHub

Create an **empty** repo `klenggnelk/nvc-ft` on github.com (no README), then:

```bash
git add -A && git commit -m "Initial setup"   # skip if already committed
git branch -M main
git remote add origin https://github.com/klenggnelk/nvc-ft.git
git push -u origin main
```

## Deploy on Vercel

vercel.com → **Add New → Project** → import `nvc-ft` → under **Environment Variables** add `OPENAI_API_KEY` → **Deploy**.
After that, every push to `main` deploys automatically.

## Where things go

| You want to… | Edit |
|---|---|
| Change session titles, add readings or exercises | `content/sessions.ts` |
| Change page wording (EN/NO) | the `copyByLanguage` block at the top of each page |
| Change how the AI gives feedback | `app/lib/prompts/` |
| Add a language | `app/lib/language.ts`, then each page's `copyByLanguage` |

See `CLAUDE.md` for the working conventions.

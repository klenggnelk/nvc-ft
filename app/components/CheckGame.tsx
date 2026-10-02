"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCopy, localize, type Language } from "@/app/lib/language";
import type { Check, Side } from "@/content/checks";

const copyByLanguage: Record<
  Language,
  {
    keyLabel: (n: number) => string;
    start: (n: number) => string;
    question: string;
    progress: (i: number, total: number) => string;
    same: string;
    different: string;
    thisIs: string;
    next: string;
    finish: string;
    doneTitle: string;
    result: (same: number, total: number) => string;
    allSame: string;
    lookAgain: string;
    again: string;
    note: string;
  }
> = {
  en: {
    keyLabel: (n) => `Key differentiation ${n}`,
    start: (n) => `Start (${n} statements)`,
    question: "Which is it?",
    progress: (i, total) => `${i} of ${total}`,
    same: "Yes, we see it the same way.",
    different: "We see this one differently.",
    thisIs: "We would call this:",
    next: "Next",
    finish: "See summary",
    doneTitle: "Round complete",
    result: (same, total) => `You saw ${same} of ${total} the same way as we do.`,
    allSame: "You saw every statement the same way as we do.",
    lookAgain: "Worth another look:",
    again: "Play again",
    note: "This is practice, not a grade. If you see one differently, bring it to the session. It makes a good conversation.",
  },
  no: {
    keyLabel: (n) => `Nøkkeldifferensiering ${n}`,
    start: (n) => `Start (${n} utsagn)`,
    question: "Hva er dette?",
    progress: (i, total) => `${i} av ${total}`,
    same: "Ja, vi ser det på samme måte.",
    different: "Denne ser vi annerledes.",
    thisIs: "Vi ville kalt dette:",
    next: "Neste",
    finish: "Se oppsummering",
    doneTitle: "Runden er ferdig",
    result: (same, total) => `Du så ${same} av ${total} på samme måte som oss.`,
    allSame: "Du så alle utsagnene på samme måte som oss.",
    lookAgain: "Verdt å se på en gang til:",
    again: "Spill igjen",
    note: "Dette er øving, ikke en karakter. Ser du noe annerledes, ta det med til samlingen. Det blir en god samtale.",
  },
};

/** Returns the numbers 0..n-1 in random order. Only called from click handlers (never during render). */
function shuffledOrder(n: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

type Phase = "idle" | "playing" | "done";

/** One "Check yourself" round: sort statements into side A or side B of a key differentiation. */
export default function CheckGame({ check }: { check: Check }) {
  const { language } = useLanguage();
  const copy = getCopy(copyByLanguage, language);

  const [phase, setPhase] = useState<Phase>("idle");
  const [order, setOrder] = useState<number[]>([]);
  const [position, setPosition] = useState(0);
  const [choice, setChoice] = useState<Side | null>(null);
  const [different, setDifferent] = useState<number[]>([]);

  const total = check.statements.length;
  const sides: Side[] = ["a", "b"];

  function start() {
    setOrder(shuffledOrder(total));
    setPosition(0);
    setChoice(null);
    setDifferent([]);
    setPhase("playing");
  }

  function choose(side: Side) {
    if (choice) return;
    const statementIndex = order[position];
    setChoice(side);
    if (side !== check.statements[statementIndex].answer) {
      setDifferent((previous) => [...previous, statementIndex]);
    }
  }

  function next() {
    if (position + 1 >= total) {
      setPhase("done");
    } else {
      setPosition(position + 1);
      setChoice(null);
    }
  }

  const statement = phase === "playing" ? check.statements[order[position]] : null;

  return (
    <article className="space-y-4 rounded-xl border border-border bg-card p-5">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{copy.keyLabel(check.key)}</p>
        <h3 className="font-medium">{localize(check.title, language)}</h3>
        <p className="text-sm leading-relaxed text-muted">{localize(check.intro, language)}</p>
      </header>

      {phase === "idle" && (
        <button
          type="button"
          onClick={start}
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:text-background"
        >
          {copy.start(total)}
        </button>
      )}

      {phase === "playing" && statement && (
        <div className="space-y-4">
          <p className="text-xs text-muted">{copy.progress(position + 1, total)}</p>

          {check.situation && <p className="text-sm text-muted">{localize(check.situation, language)}</p>}

          <blockquote className="rounded-lg bg-background p-4 text-lg leading-relaxed">
            {localize(statement.text, language)}
          </blockquote>

          <div className="space-y-2">
            <p className="text-sm text-muted">{copy.question}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {sides.map((side) => {
                const isAnswer = choice !== null && statement.answer === side;
                const isOtherChoice = choice === side && statement.answer !== side;
                return (
                  <button
                    key={side}
                    type="button"
                    onClick={() => choose(side)}
                    disabled={choice !== null}
                    aria-pressed={choice === side}
                    className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isAnswer
                        ? "border-accent bg-accent-soft text-accent"
                        : isOtherChoice
                          ? "border-dashed border-muted text-muted"
                          : choice !== null
                            ? "border-border text-muted"
                            : "border-border hover:border-accent"
                    }`}
                  >
                    {localize(check.labels[side], language)}
                  </button>
                );
              })}
            </div>
          </div>

          <div aria-live="polite">
            {choice && (
              <div className="space-y-3 rounded-lg bg-accent-soft p-4 text-sm">
                <p className="font-medium">{choice === statement.answer ? copy.same : copy.different}</p>
                <p>
                  <span className="text-muted">{copy.thisIs} </span>
                  <span className="font-medium">{localize(check.labels[statement.answer], language)}</span>
                </p>
                <p className="leading-relaxed">{localize(statement.why, language)}</p>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full bg-accent px-4 py-2 font-medium text-white transition-opacity hover:opacity-90 dark:text-background"
                >
                  {position + 1 >= total ? copy.finish : copy.next}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-4" aria-live="polite">
          <div className="space-y-1 rounded-lg bg-accent-soft p-4 text-sm">
            <p className="font-medium">{copy.doneTitle}</p>
            <p>{different.length === 0 ? copy.allSame : copy.result(total - different.length, total)}</p>
          </div>

          {different.length > 0 && (
            <div className="space-y-2 text-sm">
              <p className="font-medium">{copy.lookAgain}</p>
              <ul className="space-y-3">
                {different.map((index) => {
                  const item = check.statements[index];
                  return (
                    <li key={index} className="space-y-1 border-l-2 border-border pl-3">
                      <p>{localize(item.text, language)}</p>
                      <p className="text-muted">
                        <span className="font-medium text-foreground">{localize(check.labels[item.answer], language)}.</span>{" "}
                        {localize(item.why, language)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <p className="text-sm text-muted">{copy.note}</p>

          <button
            type="button"
            onClick={start}
            className="rounded-full border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
          >
            {copy.again}
          </button>
        </div>
      )}
    </article>
  );
}

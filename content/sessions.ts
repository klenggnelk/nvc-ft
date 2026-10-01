// Course content lives here as plain data, so trainers' changes don't touch page code.
// PLACEHOLDER: the session titles below are a starting outline — replace them with the
// trainer team's agreed topics, and add resources/exercises per session as they are ready.

import type { Language } from "@/app/lib/language";

type Localized = Record<Language, string>;

export type ResourceKind = "reading" | "video" | "handout" | "link";

export type Resource = {
  id: string;
  kind: ResourceKind;
  title: Localized;
  url?: string;
  note?: Localized;
};

export type Exercise = {
  id: string;
  title: Localized;
  instructions: Localized;
  /** Name of an AI-assisted task in app/api/, if the exercise uses one */
  aiTask?: "observation-check";
};

export type Session = {
  number: number;
  title: Localized;
  resources: Resource[];
  exercises: Exercise[];
};

export const sessions: Session[] = [
  {
    number: 1,
    title: { en: "Welcome and the intention behind NVC", no: "Velkommen og intensjonen bak IK" },
    resources: [
      {
        id: "s1-book-ch1",
        kind: "reading",
        title: { en: "Rosenberg, NVC: A Language of Life — ch. 1", no: "Rosenberg, Ikkevoldskommunikasjon — kap. 1" },
      },
    ],
    exercises: [],
  },
  {
    number: 2,
    title: { en: "Observations without evaluation", no: "Observasjon uten vurdering" },
    resources: [
      {
        id: "s2-book-ch3",
        kind: "reading",
        title: { en: "Rosenberg — ch. 3", no: "Rosenberg — kap. 3" },
      },
    ],
    exercises: [
      {
        id: "s2-observation-check",
        title: { en: "Observation or evaluation?", no: "Observasjon eller vurdering?" },
        instructions: {
          en: "Write a sentence about something that happened. You'll get feedback on whether it's a pure observation.",
          no: "Skriv en setning om noe som skjedde. Du får tilbakemelding på om det er en ren observasjon.",
        },
        aiTask: "observation-check",
      },
    ],
  },
  { number: 3, title: { en: "Feelings", no: "Følelser" }, resources: [], exercises: [] },
  { number: 4, title: { en: "Needs", no: "Behov" }, resources: [], exercises: [] },
  { number: 5, title: { en: "Requests", no: "Anmodninger" }, resources: [], exercises: [] },
  { number: 6, title: { en: "Empathic listening", no: "Empatisk lytting" }, resources: [], exercises: [] },
  { number: 7, title: { en: "Self-empathy", no: "Selvempati" }, resources: [], exercises: [] },
  { number: 8, title: { en: "Anger and triggers", no: "Sinne og triggere" }, resources: [], exercises: [] },
  { number: 9, title: { en: "Gratitude and appreciation", no: "Takknemlighet og verdsettelse" }, resources: [], exercises: [] },
  { number: 10, title: { en: "Integration and next steps", no: "Integrering og veien videre" }, resources: [], exercises: [] },
];

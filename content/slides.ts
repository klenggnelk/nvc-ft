// Presentation slides per session: very little text, shown as simple diagrams on the session page.
// Norwegian is inline; the other languages come from content/i18n (keyed by the English text).
import type { Localized } from "@/app/lib/language";

const t = (en: string, no: string): Localized => ({ en, no });

export type SlideIcon = "camera" | "thought" | "heart" | "door" | "lock";

export type Slide =
  | {
      /** Two sides: the left one is the NVC side (highlighted), the right one is muted */
      kind: "contrast";
      title?: Localized;
      left: { label: Localized; sub?: Localized; icon?: SlideIcon };
      right: { label: Localized; sub?: Localized; icon?: SlideIcon };
    }
  | {
      /** A sequence, with arrows between the items (or a loop back to the start) */
      kind: "steps";
      title?: Localized;
      items: Localized[];
      arrows?: boolean;
      loop?: boolean;
      /** Show the items muted (for things that disconnect) */
      muted?: boolean;
    }
  | {
      /** Two aligned rows: what connects (top) and what disconnects (bottom) */
      kind: "rows";
      title?: Localized;
      top: { label: Localized; items: Localized[] };
      bottom: { label: Localized; items: Localized[] };
    }
  | {
      /** The same items used in two directions */
      kind: "twoWay";
      title?: Localized;
      items: Localized[];
      forward: Localized;
      back: Localized;
    }
  | {
      /** One need at the root of many strategies */
      kind: "roots";
      title?: Localized;
      need: Localized;
      strategies: Localized[];
    }
  | {
      /** The other person's feelings and needs in the centre; habitual responses around it, muted */
      kind: "orbit";
      title?: Localized;
      center: Localized;
      around: Localized[];
    };

export const slidesBySession: Record<number, Slide[]> = {
  1: [
    { kind: "contrast", title: t("Observation or judgment?", "Observasjon eller vurdering?"), left: { label: t("Observation", "Observasjon"), sub: t("What a camera sees", "Det et kamera ser"), icon: "camera" }, right: { label: t("Judgment", "Vurdering"), sub: t("What I add", "Det jeg legger til"), icon: "thought" } },
    { kind: "steps", title: t("Language that disconnects", "Språk som bryter kontakt"), items: [t("Diagnosis", "Diagnose"), t("Denial of responsibility", "Å fraskrive seg ansvar"), t("Deserve thinking", "Fortjeneste-tenkning"), t("Demands", "Krav")], arrows: false, muted: true },
  ],
  2: [
    { kind: "contrast", title: t("Feeling or thought?", "Følelse eller tanke?"), left: { label: t("Feeling", "Følelse"), sub: t("In the body", "I kroppen"), icon: "heart" }, right: { label: t("Thought", "Tanke"), sub: t("“I feel that you…”", "«Jeg føler at du…»"), icon: "thought" } },
    { kind: "roots", title: t("One need, many strategies", "Ett behov, mange strategier"), need: t("Connection", "Kontakt"), strategies: [t("A phone call", "En telefonsamtale"), t("A visit", "Et besøk"), t("A message", "En melding"), t("A hug", "En klem")] },
  ],
  3: [
    { kind: "steps", title: t("Empathic Listening", "Empatisk lytting"), items: [t("Be present", "Vær til stede"), t("Listen", "Lytt"), t("Guess: feeling and need", "Gjett: følelse og behov"), t("Check with them", "Sjekk med den andre")] },
  ],
  4: [
    { kind: "contrast", title: t("When the answer is “no”", "Når svaret er «nei»"), left: { label: t("Request", "Anmodning"), sub: t("Curiosity", "Nysgjerrighet"), icon: "door" }, right: { label: t("Demand", "Krav"), sub: t("Blame, guilt, punishment", "Skyld, dårlig samvittighet, straff"), icon: "lock" } },
  ],
  5: [
    { kind: "rows", top: { label: t("Connects", "Skaper kontakt"), items: [t("Observation", "Observasjon"), t("Feeling", "Følelse"), t("Need", "Behov"), t("Request", "Anmodning")] }, bottom: { label: t("Disconnects", "Bryter kontakt"), items: [t("Judgment", "Vurdering"), t("Thinking", "Tenkning"), t("Strategy", "Strategi"), t("Demand", "Krav")] } },
    { kind: "twoWay", title: t("The same four parts, both ways", "De samme fire delene, begge veier"), items: [t("Observation", "Observasjon"), t("Feeling", "Følelse"), t("Need", "Behov"), t("Request", "Anmodning")], forward: t("Expressing honestly", "Uttrykke ærlig"), back: t("Receiving with empathy", "Ta imot med empati") },
  ],
  6: [
    { kind: "steps", title: t("Translating the inner jackal", "Å oversette den indre sjakalen"), items: [t("Self-judgment", "Selvkritikk"), t("Feeling", "Følelse"), t("Need", "Behov"), t("Choice", "Valg")] },
  ],
  7: [
    { kind: "orbit", title: t("Staying with the other person", "Bli hos den andre"), center: t("Their feelings and needs", "Følelsene og behovene til den andre"), around: [t("Advising", "Å gi råd"), t("Fixing", "Å fikse"), t("Consoling", "Å trøste"), t("Sympathising", "Å sympatisere"), t("Educating", "Å belære"), t("One-upping", "Å overgå"), t("Interrogating", "Å spørre ut"), t("Correcting", "Å korrigere")] },
  ],
  8: [
    { kind: "steps", title: t("Expressing anger fully", "Å uttrykke sinne fullt ut"), items: [t("Stop and breathe", "Stopp og pust"), t("Notice the judging thoughts", "Legg merke til de dømmende tankene"), t("Connect with the needs", "Få kontakt med behovene"), t("Express feelings and needs", "Uttrykk følelser og behov")] },
    { kind: "steps", title: t("Stimulus, not cause", "Stimulus, ikke årsak"), items: [t("Stimulus", "Stimulus"), t("My need", "Mitt behov"), t("My feeling", "Min følelse")] },
  ],
  9: [
    { kind: "steps", title: t("Learning while teaching", "Å lære mens man underviser"), items: [t("Learn", "Lær"), t("Practise", "Øv"), t("Share", "Del")], loop: true },
  ],
  10: [
    { kind: "steps", title: t("Feedback, the NVC way", "Tilbakemelding på IVK-måten"), items: [t("What I observed", "Det jeg observerte"), t("What I feel", "Det jeg føler"), t("Needs met and not met", "Behov som ble møtt og ikke møtt"), t("A request to myself", "En anmodning til meg selv")] },
  ],
};

export function slidesForSession(number: number): Slide[] {
  return slidesBySession[number] ?? [];
}

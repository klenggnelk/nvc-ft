// "Check yourself" rounds: for each session, a few short sorting games built on the
// key differentiations of NVC (source: the trainers' handout "Nøkkeldifferensieringer",
// the 25 CNVC key differentiations). `key` is the number of the differentiation in that handout.
//
// In a round the participant reads one statement at a time and chooses side A or side B.
// It is for learning, never a grade: explanations stay warm and never shame.
//
// DRAFT FOR TRAINER REVIEW: the statements and explanations were drafted by Claude.
// Please check, change or remove them freely. Titles have Norwegian from the handout;
// statements are in plain English (participants share English as a second language).

import type { Localized } from "@/app/lib/language";

export type Side = "a" | "b";

export type CheckStatement = {
  text: Localized;
  answer: Side;
  /** Short, kind explanation shown after the participant has chosen */
  why: Localized;
};

export type Check = {
  id: string;
  session: number;
  /** Number of the key differentiation in the handout (1–25) */
  key: number;
  title: Localized;
  /** Short button labels for the two sides */
  labels: Record<Side, Localized>;
  /** One or two sentences that explain the difference */
  intro: Localized;
  /** Optional situation that all statements in the round respond to */
  situation?: Localized;
  statements: CheckStatement[];
};

/** One statement: English text, the answer, English explanation, then the Norwegian text and explanation. */
const st = (text: string, answer: Side, why: string, textNo: string, whyNo: string): CheckStatement => ({
  text: { en: text, no: textNo },
  answer,
  why: { en: why, no: whyNo },
});

export const checks: Check[] = [
  // -------------------------------------------------------------------------
  // Session 1 — Introduction to NVC
  // -------------------------------------------------------------------------
  {
    id: "s1-observation",
    session: 1,
    key: 8,
    title: {
      en: "Observation vs. observation mixed with evaluation",
      no: "Observasjon vs. observasjon blandet med vurdering",
    },
    labels: {
      a: { en: "Observation", no: "Observasjon" },
      b: { en: "Mixed with evaluation", no: "Blandet med vurdering" },
    },
    intro: {
      en: "An observation is what a camera could record. An evaluation adds our own opinion to it.",
      no: "En observasjon er det et kamera kunne tatt opp. En vurdering legger vår egen mening til.",
    },
    statements: [
      st(
        "You arrived at 9:20. The meeting started at 9:00.",
        "a",
        "Two times that a clock can show. There is no opinion in it.",
        "Du kom 9.20. Møtet startet 9.00.",
        "To klokkeslett som en klokke kan vise. Det er ingen mening i det.",
      ),
      st(
        "You are always late.",
        "b",
        "\"Always\" is a generalisation, and \"late\" is a judgment. An observation would be: \"You arrived after nine three times this week.\"",
        "Du er alltid sen.",
        "«Alltid» er en generalisering, og «sen» er en vurdering. En observasjon ville vært: «Du kom etter klokka ni tre ganger denne uken.»",
      ),
      st(
        "He ignored me in the meeting.",
        "b",
        "\"Ignored\" is a guess about what he intended. A camera would see: \"He did not look at me or answer when I spoke.\"",
        "Han overså meg i møtet.",
        "«Overså» er en gjetning om hva han mente. Et kamera ville sett: «Han så ikke på meg og svarte ikke da jeg snakket.»",
      ),
      st(
        "She said: \"I don't have time today.\"",
        "a",
        "It repeats her exact words. A microphone could record this.",
        "Hun sa: «Jeg har ikke tid i dag.»",
        "Det gjentar ordene hennes nøyaktig. En mikrofon kunne tatt opp dette.",
      ),
      st(
        "My son is lazy with his homework.",
        "b",
        "\"Lazy\" is a label. An observation would be: \"He has not opened his school books this week.\"",
        "Sønnen min er lat med leksene.",
        "«Lat» er en merkelapp. En observasjon ville vært: «Han har ikke åpnet skolebøkene denne uken.»",
      ),
    ],
  },
  {
    id: "s1-value-judgment",
    session: 1,
    key: 13,
    title: { en: "Value judgment vs. moralistic judgment", no: "Verdidom vs. moralsk dom" },
    labels: {
      a: { en: "Value judgment", no: "Verdidom" },
      b: { en: "Moralistic judgment", no: "Moralsk dom" },
    },
    intro: {
      en: "A value judgment says what is important to me. A moralistic judgment says who is right or wrong, good or bad.",
      no: "En verdidom sier hva som er viktig for meg. En moralsk dom sier hvem som har rett eller feil, er god eller dårlig.",
    },
    statements: [
      st(
        "Honesty is very important to me.",
        "a",
        "It tells what the speaker values. Nobody is judged.",
        "Ærlighet er veldig viktig for meg.",
        "Det sier hva den som snakker verdsetter. Ingen blir dømt.",
      ),
      st(
        "People who lie are bad people.",
        "b",
        "It sorts people into good and bad.",
        "Folk som lyver, er dårlige mennesker.",
        "Det sorterer folk i gode og dårlige.",
      ),
      st(
        "It was wrong of you to leave early.",
        "b",
        "It says the other person did something wrong. A value version: \"I value finishing things together.\"",
        "Det var galt av deg å gå tidlig.",
        "Det sier at den andre gjorde noe galt. En verdi-versjon: «Jeg setter pris på at vi gjør ting ferdig sammen.»",
      ),
      st(
        "I care a lot about fairness, and I didn't like how the work was shared.",
        "a",
        "The speaker names a value and their own reaction. The other person is not called wrong.",
        "Rettferdighet betyr mye for meg, og jeg likte ikke hvordan arbeidet ble fordelt.",
        "Den som snakker, setter navn på en verdi og sin egen reaksjon. Den andre blir ikke kalt feil.",
      ),
    ],
  },
  {
    id: "s1-life-connected",
    session: 1,
    key: 16,
    title: { en: "Life-connected vs. life-alienated", no: "Livsforbundet vs. livsfremmed" },
    labels: {
      a: { en: "Life-connected", no: "Livsforbundet" },
      b: { en: "Life-alienated", no: "Livsfremmed" },
    },
    intro: {
      en: "Life-connected language speaks about feelings and needs. Life-alienated language uses the 4 Ds: diagnosis, denial of responsibility, deserve thinking and demands.",
      no: "Livsberikende språk snakker om følelser og behov. Livsfremmedgjørende språk bruker de fire D-ene: diagnose, å fraskrive seg ansvar, fortjeneste-tenkning og krav.",
    },
    statements: [
      st(
        "I had to do it. I had no choice.",
        "b",
        "This is denial of responsibility: the speaker hides their own choice.",
        "Jeg måtte gjøre det. Jeg hadde ikke noe valg.",
        "Dette er å fraskrive seg ansvar: den som snakker, skjuler sitt eget valg.",
      ),
      st(
        "You're so selfish.",
        "b",
        "This is a diagnosis: a label that says what is wrong with the other person.",
        "Du er så egoistisk.",
        "Dette er en diagnose: en merkelapp som sier hva som er galt med den andre.",
      ),
      st(
        "I'm tired, and I would like some help with the dishes.",
        "a",
        "The speaker shares a feeling and asks for something concrete. There is no blame.",
        "Jeg er sliten, og jeg vil gjerne ha litt hjelp med oppvasken.",
        "Den som snakker, deler en følelse og ber om noe konkret. Det er ingen skyld.",
      ),
      st(
        "He deserves to be punished for that.",
        "b",
        "This is deserve thinking: some people should be rewarded and others punished.",
        "Han fortjener å bli straffet for det.",
        "Dette er fortjeneste-tenkning: noen skal belønnes og andre straffes.",
      ),
      st(
        "Are you worried because you want everyone to be safe?",
        "a",
        "The speaker guesses the other person's feeling and need. That builds connection.",
        "Er du bekymret fordi du ønsker at alle skal være trygge?",
        "Den som snakker, gjetter den andres følelse og behov. Det bygger kontakt.",
      ),
    ],
  },

  // -------------------------------------------------------------------------
  // Session 2 — Feelings and Needs
  // -------------------------------------------------------------------------
  {
    id: "s2-feeling",
    session: 2,
    key: 9,
    title: { en: "Feeling vs. feeling mixed with thoughts", no: "Følelse vs. følelse blandet med tanker" },
    labels: {
      a: { en: "Feeling", no: "Følelse" },
      b: { en: "Mixed with thoughts", no: "Blandet med tanker" },
    },
    intro: {
      en: "A feeling is something I can sense in my body. A thought often hides behind \"I feel that…\", \"I feel like…\" or words that say what others do to me.",
      no: "En følelse er noe jeg kan kjenne i kroppen. En tanke skjuler seg ofte bak «jeg føler at…», «jeg føler meg som…» eller ord som sier hva andre gjør mot meg.",
    },
    statements: [
      st(
        "I feel sad.",
        "a",
        "Sad is a feeling. It says nothing about anyone else.",
        "Jeg føler meg trist.",
        "Trist er en følelse. Den sier ingenting om noen andre.",
      ),
      st(
        "I feel that you don't care about me.",
        "b",
        "\"I feel that…\" starts a thought about the other person. The feeling underneath could be sad or lonely.",
        "Jeg føler at du ikke bryr deg om meg.",
        "«Jeg føler at…» innleder en tanke om den andre. Følelsen under kan være trist eller ensom.",
      ),
      st(
        "I feel ignored.",
        "b",
        "\"Ignored\" is a faux feeling: it says what I think you are doing to me. The feeling could be hurt or lonely.",
        "Jeg føler meg oversett.",
        "«Oversett» er en falsk følelse: den sier hva jeg tror du gjør mot meg. Følelsen kan være såret eller ensom.",
      ),
      st(
        "I feel nervous and a little shaky.",
        "a",
        "Both words describe what is happening inside the speaker's body.",
        "Jeg føler meg nervøs og litt skjelven.",
        "Begge ordene beskriver hva som skjer inni kroppen til den som snakker.",
      ),
      st(
        "I feel like a failure.",
        "b",
        "This is a thought about myself. The feeling underneath could be disappointed or discouraged.",
        "Jeg føler meg som en fiasko.",
        "Dette er en tanke om meg selv. Følelsen under kan være skuffet eller motløs.",
      ),
    ],
  },
  {
    id: "s2-need",
    session: 2,
    key: 10,
    title: { en: "Need vs. request", no: "Behov vs. anmodning" },
    labels: {
      a: { en: "Need", no: "Behov" },
      b: { en: "Request (strategy)", no: "Anmodning (strategi)" },
    },
    intro: {
      en: "A need is universal: every human has it, and it does not depend on a certain person or action. A request is a strategy: one concrete way to meet a need.",
      no: "Et behov er universelt: alle mennesker har det, og det er ikke avhengig av en bestemt person eller handling. En anmodning er en strategi: én konkret måte å møte et behov på.",
    },
    statements: [
      st(
        "I need rest.",
        "a",
        "Rest is a need all people share. There are many ways to meet it.",
        "Jeg trenger hvile.",
        "Hvile er et behov alle mennesker deler. Det finnes mange måter å møte det på.",
      ),
      st(
        "I need you to call me every evening.",
        "b",
        "This names a person and an action, so it is a strategy. The need behind it could be connection.",
        "Jeg trenger at du ringer meg hver kveld.",
        "Dette nevner en person og en handling, så det er en strategi. Behovet bak kan være kontakt.",
      ),
      st(
        "I need support.",
        "a",
        "Support is a universal need. It does not say who must do what.",
        "Jeg trenger støtte.",
        "Støtte er et universelt behov. Det sier ikke hvem som må gjøre hva.",
      ),
      st(
        "Would you be willing to cook dinner tonight?",
        "b",
        "This is a concrete request to one person: one way to meet a need.",
        "Vil du være villig til å lage middag i kveld?",
        "Dette er en konkret anmodning til én person: én måte å møte et behov på.",
      ),
      st(
        "I need a new car.",
        "b",
        "A car is a strategy. The needs behind it could be ease, safety or freedom of movement.",
        "Jeg trenger en ny bil.",
        "En bil er en strategi. Behovene bak kan være letthet, trygghet eller bevegelsesfrihet.",
      ),
    ],
  },
  {
    id: "s2-stimulus",
    session: 2,
    key: 12,
    title: { en: "Stimulus vs. cause", no: "Stimulus vs. årsak" },
    labels: {
      a: { en: "Seen as stimulus", no: "Sett som stimulus" },
      b: { en: "Seen as cause", no: "Sett som årsak" },
    },
    intro: {
      en: "What other people do can be the stimulus for our feelings, but not the cause. The cause is our own needs. How does each sentence see the other person's action?",
      no: "Det andre gjør kan være stimulus for følelsene våre, men ikke årsaken. Årsaken er våre egne behov. Hvordan ser hver setning på den andres handling?",
    },
    statements: [
      st(
        "You make me so angry.",
        "b",
        "The other person is named as the cause of the feeling.",
        "Du gjør meg så sint.",
        "Den andre blir pekt ut som årsaken til følelsen.",
      ),
      st(
        "When you came home at midnight, I felt worried, because I want to know you are safe.",
        "a",
        "The action is the stimulus. The cause is the speaker's own need for safety.",
        "Da du kom hjem ved midnatt, ble jeg bekymret, fordi jeg vil vite at du er trygg.",
        "Handlingen er stimulus. Årsaken er behovet for trygghet hos den som snakker.",
      ),
      st(
        "I'm disappointed because you didn't come.",
        "b",
        "\"Because you…\" puts the cause in the other person. Try: \"…because I was looking forward to time together.\"",
        "Jeg er skuffet fordi du ikke kom.",
        "«Fordi du…» legger årsaken hos den andre. Prøv: «…fordi jeg gledet meg til å være sammen.»",
      ),
      st(
        "I felt hurt when I heard that, because I want my effort to be seen.",
        "a",
        "\"Because I want…\" connects the feeling to the speaker's own need.",
        "Jeg ble såret da jeg hørte det, fordi jeg ønsker at innsatsen min blir sett.",
        "«Fordi jeg ønsker…» knytter følelsen til behovet hos den som snakker.",
      ),
    ],
  },

  // -------------------------------------------------------------------------
  // Session 3 — Empathic Listening
  // -------------------------------------------------------------------------
  {
    id: "s3-empathy",
    session: 3,
    key: 3,
    title: {
      en: "Empathy vs. sympathy and other forms of response",
      no: "Empati vs. sympati og andre former for respons",
    },
    labels: {
      a: { en: "Empathy", no: "Empati" },
      b: { en: "Another response", no: "En annen respons" },
    },
    intro: {
      en: "Empathy means staying present with what the other person feels and needs. Sympathy, advice and comfort are other responses. They are often kind, but they are not empathy.",
      no: "Empati betyr å være til stede med det den andre føler og trenger. Sympati, råd og trøst er andre måter å svare på. De er ofte vennlige, men de er ikke empati.",
    },
    situation: {
      en: "A friend says: \"I lost my job last week.\"",
      no: "En venn sier: «Jeg mistet jobben forrige uke.»",
    },
    statements: [
      st(
        "Oh no, poor you. I feel so sorry for you.",
        "b",
        "This is sympathy. The attention moves to the listener's own feelings.",
        "Å nei, stakkars deg. Jeg synes så synd på deg.",
        "Dette er sympati. Oppmerksomheten flytter seg til lytterens egne følelser.",
      ),
      st(
        "Are you worried, because you need some security?",
        "a",
        "A guess about the friend's feeling and need. The attention stays with the friend.",
        "Er du bekymret, fordi du trenger litt trygghet?",
        "En gjetning om vennens følelse og behov. Oppmerksomheten blir hos vennen.",
      ),
      st(
        "You should update your CV right away.",
        "b",
        "This is advice. It may help later, but first the friend may want to be heard.",
        "Du bør oppdatere CV-en din med en gang.",
        "Dette er et råd. Det kan hjelpe senere, men først vil vennen kanskje bli hørt.",
      ),
      st(
        "Are you feeling shocked?",
        "a",
        "A simple, open guess about what the friend is feeling.",
        "Føler du deg sjokkert?",
        "En enkel, åpen gjetning om hva vennen føler.",
      ),
      st(
        "Don't worry, you'll find something better.",
        "b",
        "This is reassurance. It tries to take the feeling away.",
        "Ikke bekymre deg, du finner noe bedre.",
        "Dette er beroligelse. Den prøver å ta bort følelsen.",
      ),
    ],
  },
  {
    id: "s3-sensing",
    session: 3,
    key: 25,
    title: { en: "Empathic sensing vs. intellectual guessing", no: "Empatisk sansing vs. intellektuell gjetning" },
    labels: {
      a: { en: "Empathic sensing", no: "Empatisk sansing" },
      b: { en: "Intellectual guessing", no: "Intellektuell gjetning" },
    },
    intro: {
      en: "Empathic sensing comes from the heart: I am present and curious about what is alive in you. Intellectual guessing comes from the head: I analyse you or look for the right label.",
      no: "Empatisk innlevelse kommer fra hjertet: jeg er til stede og nysgjerrig på det som lever i deg. Intellektuell gjetning kommer fra hodet: jeg analyserer deg eller leter etter riktig merkelapp.",
    },
    statements: [
      st(
        "While she talks, I think about which need on the list fits her best.",
        "b",
        "The listener is busy in their head with finding the right word, and less present with her.",
        "Mens hun snakker, tenker jeg på hvilket behov på listen som passer best for henne.",
        "Lytteren er opptatt i hodet med å finne riktig ord, og er mindre til stede med henne.",
      ),
      st(
        "I listen with my whole attention and ask softly: \"Are you longing to be understood?\"",
        "a",
        "The guess comes from presence, and it is offered as a question.",
        "Jeg lytter med hele oppmerksomheten og spør mykt: «Lengter du etter å bli forstått?»",
        "Gjetningen kommer fra nærvær, og den blir gitt som et spørsmål.",
      ),
      st(
        "I tell him: \"Your real problem is that you need recognition.\"",
        "b",
        "This is analysis. The listener tells him what is true about him, without asking.",
        "Jeg sier til ham: «Det egentlige problemet ditt er at du trenger anerkjennelse.»",
        "Dette er analyse. Lytteren forteller ham hva som er sant om ham, uten å spørre.",
      ),
      st(
        "I'm not sure my guess is right, and that's fine. I'm curious what she will say.",
        "a",
        "Curiosity matters more than being right. A wrong guess still shows that I care.",
        "Jeg er ikke sikker på om gjetningen min er riktig, og det er greit. Jeg er nysgjerrig på hva hun vil si.",
        "Nysgjerrighet betyr mer enn å ha rett. En feil gjetning viser likevel at jeg bryr meg.",
      ),
    ],
  },

  // -------------------------------------------------------------------------
  // Session 4 — Requests
  // -------------------------------------------------------------------------
  {
    id: "s4-request",
    session: 4,
    key: 11,
    title: { en: "Request vs. demand", no: "Anmodning vs. krav" },
    labels: {
      a: { en: "Request", no: "Anmodning" },
      b: { en: "Demand", no: "Krav" },
    },
    intro: {
      en: "The words can be the same. It is a request when a \"no\" is welcome. It is a demand when a \"no\" leads to blame, guilt or punishment.",
      no: "Ordene kan være de samme. Det er en anmodning når et «nei» er velkomment. Det er et krav når et «nei» fører til skyld, dårlig samvittighet eller straff.",
    },
    statements: [
      st(
        "Would you be willing to turn the music down? Please tell me if that doesn't work for you.",
        "a",
        "The speaker makes it clear that a \"no\" is welcome.",
        "Vil du være villig til å skru ned musikken? Si fra hvis det ikke passer for deg.",
        "Den som snakker, gjør det tydelig at et «nei» er velkomment.",
      ),
      st(
        "Turn the music down, or I'll take your phone.",
        "b",
        "A threat of punishment makes it a demand.",
        "Skru ned musikken, ellers tar jeg telefonen din.",
        "En trussel om straff gjør det til et krav.",
      ),
      st(
        "If you really cared about me, you would come.",
        "b",
        "Guilt is used as pressure. A \"no\" would mean \"you don't care\".",
        "Hvis du virkelig brydde deg om meg, ville du kommet.",
        "Dårlig samvittighet blir brukt som press. Et «nei» ville betydd «du bryr deg ikke».",
      ),
      st(
        "She asks: \"Could you send the report by Friday?\" He says no. She replies: \"OK. What would work for you?\"",
        "a",
        "We see it in how she meets the \"no\": with curiosity, not blame.",
        "Hun spør: «Kan du sende rapporten innen fredag?» Han sier nei. Hun svarer: «OK. Hva ville passet for deg?»",
        "Vi ser det på hvordan hun møter neiet: med nysgjerrighet, ikke skyld.",
      ),
      st(
        "He asks: \"Can you help me move on Saturday?\" She says no. He doesn't speak to her for a week.",
        "b",
        "It sounded like a request, but the \"no\" was punished. So it was a demand.",
        "Han spør: «Kan du hjelpe meg å flytte på lørdag?» Hun sier nei. Han snakker ikke med henne på en uke.",
        "Det hørtes ut som en anmodning, men neiet ble straffet. Da var det et krav.",
      ),
    ],
  },
  {
    id: "s4-persisting",
    session: 4,
    key: 18,
    title: { en: "Persisting vs. demanding", no: "Vedvarende vs. krevende" },
    labels: {
      a: { en: "Persisting", no: "Vedvarende" },
      b: { en: "Demanding", no: "Krevende" },
    },
    intro: {
      en: "After a \"no\", persisting means I keep caring about my need and also about yours, and we look for another way. Demanding means I push until you give in.",
      no: "Etter et «nei» betyr å holde fast at jeg fortsetter å bry meg om mitt behov og også om ditt, og vi leter etter en annen vei. Å kreve betyr at jeg presser til du gir etter.",
    },
    statements: [
      st(
        "I hear that Saturday doesn't work for you. This still matters to me. Can we look for another day?",
        "a",
        "The speaker accepts the \"no\" and stays with their own need.",
        "Jeg hører at lørdag ikke passer for deg. Dette er fortsatt viktig for meg. Kan vi finne en annen dag?",
        "Den som snakker, godtar neiet og holder fast ved sitt eget behov.",
      ),
      st(
        "I'll keep asking until you say yes.",
        "b",
        "The aim is to make the other person give in.",
        "Jeg fortsetter å spørre til du sier ja.",
        "Målet er å få den andre til å gi etter.",
      ),
      st(
        "What is behind your no? I'd like to find something that works for both of us.",
        "a",
        "The speaker keeps going with care for both people's needs.",
        "Hva ligger bak neiet ditt? Jeg vil gjerne finne noe som fungerer for oss begge.",
        "Den som snakker, fortsetter med omsorg for begges behov.",
      ),
      st(
        "You said no, but you owe me this.",
        "b",
        "Pressure through duty. The \"no\" is not accepted.",
        "Du sa nei, men dette skylder du meg.",
        "Press gjennom plikt. Neiet blir ikke godtatt.",
      ),
    ],
  },

  // -------------------------------------------------------------------------
  // Session 5 — Putting It All Together
  // -------------------------------------------------------------------------
  {
    id: "s5-honesty",
    session: 5,
    key: 2,
    title: { en: "Giraffe honesty vs. jackal honesty", no: "Sjiraff-ærlighet vs. sjakal-ærlighet" },
    labels: {
      a: { en: "Giraffe honesty", no: "Sjiraff-ærlighet" },
      b: { en: "Jackal honesty", no: "Sjakal-ærlighet" },
    },
    intro: {
      en: "Giraffe honesty shares my observation, feeling, need and request. Jackal honesty tells you what I think is wrong with you.",
      no: "Sjiraff-ærlighet deler min observasjon, følelse, behov og anmodning. Sjakal-ærlighet forteller deg hva jeg mener er galt med deg.",
    },
    statements: [
      st(
        "Honestly? You're a terrible listener.",
        "b",
        "It is honest about a judgment, not about the speaker's feelings and needs.",
        "Ærlig talt? Du er en elendig lytter.",
        "Det er ærlig om en vurdering, ikke om følelsene og behovene til den som snakker.",
      ),
      st(
        "When you looked at your phone while I was speaking, I felt sad, because I want to be heard. Would you put it away for ten minutes?",
        "a",
        "All four steps are there: observation, feeling, need and request.",
        "Da du så på telefonen mens jeg snakket, ble jeg trist, fordi jeg vil bli hørt. Vil du legge den bort i ti minutter?",
        "Alle fire stegene er med: observasjon, følelse, behov og anmodning.",
      ),
      st(
        "I'm just being honest: that idea is stupid.",
        "b",
        "\"Stupid\" is a judgment of the idea. We don't learn what the speaker needs.",
        "Jeg er bare ærlig: den ideen er dum.",
        "«Dum» er en vurdering av ideen. Vi får ikke vite hva den som snakker, trenger.",
      ),
      st(
        "I feel uneasy about this plan, because I need more clarity about the costs. Could we go through the numbers?",
        "a",
        "The speaker is honest about their own feeling and need, and makes a doable request.",
        "Jeg føler meg urolig for denne planen, fordi jeg trenger mer klarhet om kostnadene. Kan vi gå gjennom tallene?",
        "Den som snakker, er ærlig om sin egen følelse og sitt behov, og kommer med en gjennomførbar anmodning.",
      ),
    ],
  },
  {
    id: "s5-idiomatic",
    session: 5,
    key: 24,
    title: { en: "Idiomatic vs. classical (formal) Giraffe", no: "Idiomatisk vs. klassisk sjiraff" },
    labels: {
      a: { en: "Idiomatic (everyday)", no: "Idiomatisk (hverdagslig)" },
      b: { en: "Classical (formal)", no: "Klassisk (formell)" },
    },
    intro: {
      en: "Classical Giraffe uses the four steps in a clear order, which is good for learning. Idiomatic Giraffe has the same intention, in everyday words.",
      no: "Klassisk sjiraff bruker de fire stegene i en tydelig rekkefølge, og det er fint når vi lærer. Hverdags-sjiraff har den samme intensjonen, med hverdagsord.",
    },
    statements: [
      st(
        "When I see socks on the floor, I feel frustrated, because I need order. Would you be willing to put them in the basket?",
        "b",
        "The four steps follow each other in the formal order.",
        "Når jeg ser sokker på gulvet, blir jeg frustrert, fordi jeg trenger orden. Vil du være villig til å legge dem i kurven?",
        "De fire stegene følger etter hverandre i den formelle rekkefølgen.",
      ),
      st(
        "Rough day? Want to tell me about it?",
        "a",
        "An empathy guess in everyday words. The intention to connect is the same.",
        "Tøff dag? Vil du fortelle meg om det?",
        "En empatigjetning med hverdagsord. Intensjonen om kontakt er den samme.",
      ),
      st(
        "Hey, I'd love some help with the dishes. I'm really tired tonight. OK for you?",
        "a",
        "Feeling, need and request are all there, in natural everyday language.",
        "Du, jeg hadde satt pris på litt hjelp med oppvasken. Jeg er skikkelig sliten i kveld. Går det greit for deg?",
        "Følelse, behov og anmodning er med, i naturlig hverdagsspråk.",
      ),
      st(
        "When you say that, I feel worried, because I need trust. Would you tell me what you heard me say?",
        "b",
        "This follows the formal model step by step.",
        "Når du sier det, blir jeg bekymret, fordi jeg trenger tillit. Vil du fortelle meg hva du hørte meg si?",
        "Dette følger den formelle modellen steg for steg.",
      ),
    ],
  },
  {
    id: "s5-natural",
    session: 5,
    key: 14,
    title: { en: "Natural vs. habitual", no: "Naturlig vs. tillært" },
    labels: {
      a: { en: "Natural", no: "Naturlig" },
      b: { en: "Habitual", no: "Tillært" },
    },
    intro: {
      en: "Habitual is what we have learned and are used to. Natural is giving from the heart, in a way that serves life. NVC can feel strange at first and still be natural.",
      no: "Vane er det vi har lært og er vant til. Naturlig er å gi fra hjertet, på en måte som tjener livet. IVK kan føles uvant i starten og likevel være naturlig.",
    },
    statements: [
      st(
        "I say sorry at once, without thinking, so that nobody gets upset.",
        "b",
        "An automatic habit, learned to keep the peace.",
        "Jeg sier unnskyld med en gang, uten å tenke, så ingen skal bli opprørt.",
        "En automatisk vane, lært for å bevare freden.",
      ),
      st(
        "A small child shares her food with joy when she sees that someone is hungry.",
        "a",
        "Giving from the heart, before any rule was learned.",
        "Et lite barn deler maten sin med glede når hun ser at noen er sulten.",
        "Å gi fra hjertet, før noen regel ble lært.",
      ),
      st(
        "I blame myself when something goes wrong. I have done that since I was a child.",
        "b",
        "Self-blame is learned. It feels normal because it is familiar, not because it is natural.",
        "Jeg klandrer meg selv når noe går galt. Det har jeg gjort siden jeg var barn.",
        "Selvbebreidelse er lært. Den føles normal fordi den er kjent, ikke fordi den er naturlig.",
      ),
      st(
        "I help my neighbour because I enjoy contributing, not because I must.",
        "a",
        "The joy of contributing is what Rosenberg calls our natural way of giving.",
        "Jeg hjelper naboen min fordi jeg liker å bidra, ikke fordi jeg må.",
        "Gleden ved å bidra er det Rosenberg kaller vår naturlige måte å gi på.",
      ),
    ],
  },

  // -------------------------------------------------------------------------
  // Session 6 — Self-Empathy
  // -------------------------------------------------------------------------
  {
    id: "s6-self-empathy",
    session: 6,
    key: 23,
    title: {
      en: "Self-empathy vs. acting out, repressing or wallowing in feelings",
      no: "Selv-empati vs. å utagere, undertrykke eller svelge følelser",
    },
    labels: {
      a: { en: "Self-empathy", no: "Selv-empati" },
      b: { en: "Acting out, repressing or wallowing", no: "Utagere, undertrykke eller svelge" },
    },
    intro: {
      en: "Self-empathy means I stop and connect with what I feel and need. The other ways: acting out (I throw the feeling at others), repressing (I push it away) and wallowing (I stay stuck in the story).",
      no: "Selvempati betyr at jeg stopper opp og får kontakt med det jeg føler og trenger. De andre måtene: å reagere ut (jeg kaster følelsen på andre), å fortrenge (jeg skyver den bort) og å velte seg (jeg blir sittende fast i historien).",
    },
    statements: [
      st(
        "I'm furious, so I slam the door and shout at my partner.",
        "b",
        "This is acting out: the feeling is thrown at someone else.",
        "Jeg er rasende, så jeg smeller igjen døren og roper til partneren min.",
        "Dette er å reagere ut: følelsen blir kastet på noen andre.",
      ),
      st(
        "I tell myself: \"It's nothing. Just keep working.\"",
        "b",
        "This is repressing: the feeling is pushed away.",
        "Jeg sier til meg selv: «Det er ingenting. Bare fortsett å jobbe.»",
        "Dette er å fortrenge: følelsen blir skjøvet bort.",
      ),
      st(
        "I notice that my chest is tight. I'm disappointed. I wanted to be included.",
        "a",
        "The speaker notices the body, names the feeling and finds the need.",
        "Jeg merker at det strammer i brystet. Jeg er skuffet. Jeg ville bli inkludert.",
        "Den som snakker, merker kroppen, setter navn på følelsen og finner behovet.",
      ),
      st(
        "For days I think again and again about how unfair it all is.",
        "b",
        "This is wallowing: staying in the story, without reaching the need.",
        "I flere dager tenker jeg om og om igjen på hvor urettferdig alt er.",
        "Dette er å velte seg: å bli i historien, uten å nå fram til behovet.",
      ),
      st(
        "I take three breaths and ask myself: what do I need right now?",
        "a",
        "A pause and a turn inward, towards the need.",
        "Jeg tar tre pust og spør meg selv: hva trenger jeg akkurat nå?",
        "En pause og en vending innover, mot behovet.",
      ),
    ],
  },
  {
    id: "s6-choice",
    session: 6,
    key: 7,
    title: { en: "Choice vs. submission or rebellion", no: "Valg vs. underkastelse eller opprør" },
    labels: {
      a: { en: "Choice", no: "Valg" },
      b: { en: "Submission or rebellion", no: "Underkastelse eller opprør" },
    },
    intro: {
      en: "When I submit, I do it because I \"have to\". When I rebel, I refuse because nobody should tell me what to do. In both, someone else still decides for me. Choice means I act from my own needs.",
      no: "Når jeg underkaster meg, gjør jeg det fordi jeg «må». Når jeg gjør opprør, nekter jeg fordi ingen skal bestemme over meg. I begge tilfeller er det fortsatt noen andre som bestemmer for meg. Valg betyr at jeg handler ut fra mine egne behov.",
    },
    statements: [
      st(
        "I have to visit my mother every Sunday.",
        "b",
        "\"Have to\" is submission. The speaker's own reason is missing.",
        "Jeg må besøke mamma hver søndag.",
        "«Må» er underkastelse. Den egne grunnen til den som snakker, mangler.",
      ),
      st(
        "I choose to visit my mother, because connection with her matters to me.",
        "a",
        "The same action, now chosen and connected to a need.",
        "Jeg velger å besøke mamma, fordi kontakten med henne betyr noe for meg.",
        "Den samme handlingen, nå valgt og knyttet til et behov.",
      ),
      st(
        "Nobody tells me what to do. I'm not going, just because they asked.",
        "b",
        "This is rebellion. The \"no\" is still a reaction to the other person, not a free choice.",
        "Ingen bestemmer over meg. Jeg drar ikke, bare fordi de ba meg.",
        "Dette er opprør. Neiet er fortsatt en reaksjon på den andre, ikke et fritt valg.",
      ),
      st(
        "I say no to the extra shift, because I want to protect my rest.",
        "a",
        "A \"no\" that comes from the speaker's own need.",
        "Jeg sier nei til ekstravakten, fordi jeg vil beskytte hvilen min.",
        "Et nei som kommer fra det egne behovet til den som snakker.",
      ),
      st(
        "I say yes so that they won't be angry with me.",
        "b",
        "This is submission: a yes that comes from fear.",
        "Jeg sier ja så de ikke skal bli sinte på meg.",
        "Dette er underkastelse: et ja som kommer fra frykt.",
      ),
    ],
  },

  // -------------------------------------------------------------------------
  // Session 7 — Empathy and Not-Empathy
  // -------------------------------------------------------------------------
  {
    id: "s7-empathy",
    session: 7,
    key: 3,
    title: {
      en: "Empathy vs. sympathy and other forms of response",
      no: "Empati vs. sympati og andre former for respons",
    },
    labels: {
      a: { en: "Empathy", no: "Empati" },
      b: { en: "Another response", no: "En annen respons" },
    },
    intro: {
      en: "A closer look at our listening habits. Which responses stay with the other person, and which ones move away, even with good intentions?",
      no: "Et nærmere blikk på lyttevanene våre. Hvilke svar blir værende hos den andre, og hvilke beveger seg bort, selv med gode intensjoner?",
    },
    situation: {
      en: "A colleague says: \"I worked all weekend on the report, and my boss didn't even say thank you.\"",
      no: "En kollega sier: «Jeg jobbet hele helgen med rapporten, og sjefen min sa ikke engang takk.»",
    },
    statements: [
      st(
        "That's nothing. Last year I worked through my whole holiday.",
        "b",
        "This is one-upping: the story becomes about the listener.",
        "Det er ingenting. I fjor jobbet jeg gjennom hele ferien.",
        "Dette er å overgå: historien handler nå om lytteren.",
      ),
      st(
        "Are you disappointed, because you would like your effort to be seen?",
        "a",
        "A guess about the colleague's feeling and need.",
        "Er du skuffet, fordi du ønsker at innsatsen din blir sett?",
        "En gjetning om kollegaens følelse og behov.",
      ),
      st(
        "Have you told her how you feel?",
        "b",
        "This is a question that leads towards advice. It moves away from what is alive right now.",
        "Har du sagt til henne hvordan du har det?",
        "Dette er et spørsmål som leder mot råd. Det beveger seg bort fra det som lever akkurat nå.",
      ),
      st(
        "Bosses are like that. That's how the system works.",
        "b",
        "This is explaining or educating. The colleague's feelings are left alone.",
        "Sjefer er sånn. Det er sånn systemet fungerer.",
        "Dette er å forklare eller belære. Kollegaens følelser blir oversett.",
      ),
      st(
        "I know exactly how you feel.",
        "b",
        "It sounds close to empathy, but the attention moves to the listener's own experience.",
        "Jeg vet nøyaktig hvordan du har det.",
        "Det høres nær empati ut, men oppmerksomheten flytter seg til lytterens egen erfaring.",
      ),
      st(
        "You stay silent and keep your full attention on her.",
        "a",
        "Silent empathy. Presence does not need words.",
        "Du er stille og gir henne hele oppmerksomheten din.",
        "Stille empati. Nærvær trenger ikke ord.",
      ),
      st(
        "At least you still have a job.",
        "b",
        "This is consoling by making the problem smaller.",
        "Du har i hvert fall fortsatt en jobb.",
        "Dette er å trøste ved å gjøre problemet mindre.",
      ),
      st(
        "So you put in a lot, and you long for some appreciation?",
        "a",
        "It reflects what she said and guesses the need behind it.",
        "Så du la ned mye, og du lengter etter litt verdsettelse?",
        "Det gir tilbake det hun sa og gjetter behovet bak.",
      ),
    ],
  },

  // -------------------------------------------------------------------------
  // Session 8 — Challenging Dialogues
  // -------------------------------------------------------------------------
  {
    id: "s8-power",
    session: 8,
    key: 5,
    title: { en: "Power with vs. power over", no: "Makt med vs. makt over" },
    labels: {
      a: { en: "Power with", no: "Makt med" },
      b: { en: "Power over", no: "Makt over" },
    },
    intro: {
      en: "Power over: I use my position, punishment or reward to get my way. Power with: we look for a way that works for everyone.",
      no: "Makt over: jeg bruker posisjonen min, straff eller belønning for å få det som jeg vil. Makt med: vi leter etter en løsning som fungerer for alle.",
    },
    statements: [
      st(
        "I'm the manager. We do it my way.",
        "b",
        "Position is used to decide for others.",
        "Jeg er lederen. Vi gjør det på min måte.",
        "Posisjonen blir brukt til å bestemme for andre.",
      ),
      st(
        "If you finish your homework, you get a sweet.",
        "b",
        "A reward is also power over: it steers the other person from outside.",
        "Hvis du gjør ferdig leksene, får du et godteri.",
        "En belønning er også makt over: den styrer den andre utenfra.",
      ),
      st(
        "This matters to me, and I want to hear what matters to you before we decide.",
        "a",
        "Both people's needs are part of the decision.",
        "Dette er viktig for meg, og jeg vil høre hva som er viktig for deg før vi bestemmer.",
        "Begges behov er en del av avgjørelsen.",
      ),
      st(
        "Let's find a plan that works for both of us.",
        "a",
        "The power is shared.",
        "La oss finne en plan som fungerer for oss begge.",
        "Makten blir delt.",
      ),
    ],
  },
  {
    id: "s8-force",
    session: 8,
    key: 4,
    title: { en: "Protective vs. punitive use of force", no: "Beskyttende vs. straffende bruk av makt" },
    labels: {
      a: { en: "Protective", no: "Beskyttende" },
      b: { en: "Punitive", no: "Straffende" },
    },
    intro: {
      en: "Protective force is used only to prevent harm. Punitive force is used to make someone suffer for what they did, so that they \"learn a lesson\".",
      no: "Beskyttende makt brukes bare for å hindre skade. Straffende makt brukes for å få noen til å lide for det de gjorde, så de skal «lære en lekse».",
    },
    statements: [
      st(
        "A mother grabs her child's arm to stop him from running into the road.",
        "a",
        "The only aim is to keep the child safe.",
        "En mor griper barnets arm for å hindre ham i å løpe ut i veien.",
        "Det eneste målet er å holde barnet trygt.",
      ),
      st(
        "A father takes away his daughter's phone for a week because she was rude.",
        "b",
        "The aim is that she suffers and learns a lesson.",
        "En far tar fra datteren telefonen i en uke fordi hun var frekk.",
        "Målet er at hun skal lide og lære en lekse.",
      ),
      st(
        "A teacher steps between two fighting pupils and holds one of them back.",
        "a",
        "Force is used to stop harm, without blame.",
        "En lærer går imellom to elever som slåss, og holder den ene tilbake.",
        "Makt blir brukt for å stoppe skade, uten skyld.",
      ),
      st(
        "After the meeting, I stop speaking to my colleague, so that she feels how wrong she was.",
        "b",
        "Silence is used as punishment.",
        "Etter møtet slutter jeg å snakke med kollegaen min, så hun skal kjenne hvor feil hun tok.",
        "Taushet blir brukt som straff.",
      ),
    ],
  },
  {
    id: "s8-shift",
    session: 8,
    key: 17,
    title: { en: "Shift vs. compromise", no: "Skifte vs. kompromiss" },
    labels: {
      a: { en: "Shift", no: "Skifte" },
      b: { en: "Compromise", no: "Kompromiss" },
    },
    intro: {
      en: "In a compromise, each person gives up something and often stays a little unhappy. In a shift, I connect with the other person's needs, and what I want really changes.",
      no: "I et kompromiss gir hver person opp noe og blir ofte litt misfornøyd. I et skifte får jeg kontakt med den andres behov, og det jeg ønsker endrer seg virkelig.",
    },
    statements: [
      st(
        "Fine. We go to your parents this year and to mine next year. But I'm not happy about it.",
        "b",
        "A trade. The speaker gives something up and stays unhappy.",
        "Greit. Vi drar til foreldrene dine i år og til mine neste år. Men jeg er ikke fornøyd med det.",
        "Et bytte. Den som snakker, gir opp noe og blir misfornøyd.",
      ),
      st(
        "When I understood how much you need rest, I really wanted to stay home with you.",
        "a",
        "The wish itself changed after connecting with the other person's need.",
        "Da jeg forsto hvor mye du trenger hvile, fikk jeg virkelig lyst til å være hjemme med deg.",
        "Selve ønsket endret seg etter kontakt med den andres behov.",
      ),
      st(
        "We both gave up half. Nobody got what they wanted.",
        "b",
        "Each person lost something. That is a compromise.",
        "Vi ga begge opp halvparten. Ingen fikk det de ville.",
        "Hver person mistet noe. Det er et kompromiss.",
      ),
      st(
        "After hearing why it matters to her, I no longer wanted my first plan.",
        "a",
        "Something moved inside. The new plan is given freely.",
        "Etter å ha hørt hvorfor det betyr noe for henne, ville jeg ikke lenger ha den første planen min.",
        "Noe flyttet seg inni. Den nye planen blir gitt fritt.",
      ),
    ],
  },

  // -------------------------------------------------------------------------
  // Session 9 — Training of Trainers I
  // -------------------------------------------------------------------------
  {
    id: "s9-being",
    session: 9,
    key: 1,
    title: { en: "\"Being Giraffe\" vs. \"doing Giraffe\"", no: "Være sjiraff vs. gjøre sjiraff" },
    labels: {
      a: { en: "Being Giraffe", no: "Være sjiraff" },
      b: { en: "Doing Giraffe", no: "Gjøre sjiraff" },
    },
    intro: {
      en: "Doing Giraffe is using the method and the right words. Being Giraffe is the intention to connect, with or without the words.",
      no: "Å gjøre sjiraff er å bruke metoden og de riktige ordene. Å være sjiraff er intensjonen om å skape kontakt, med eller uten ordene.",
    },
    statements: [
      st(
        "I say the four steps correctly, but inside I just want him to admit that he is wrong.",
        "b",
        "The form is there, but the intention is to win, not to connect.",
        "Jeg sier de fire stegene riktig, men inni meg vil jeg bare at han skal innrømme at han tar feil.",
        "Formen er der, men intensjonen er å vinne, ikke å skape kontakt.",
      ),
      st(
        "I say nothing, and I am fully present with her pain.",
        "a",
        "No method is visible. The intention to connect is fully there.",
        "Jeg sier ingenting, og jeg er helt til stede med smerten hennes.",
        "Ingen metode synes. Intensjonen om kontakt er helt til stede.",
      ),
      st(
        "I correct my friend: \"That's not a feeling, that's a thought!\"",
        "b",
        "NVC is used as a rule to correct someone. The connection is lost.",
        "Jeg retter på vennen min: «Det er ikke en følelse, det er en tanke!»",
        "IVK blir brukt som en regel for å rette på noen. Kontakten blir borte.",
      ),
      st(
        "My words come out clumsy, but I really want to understand him.",
        "a",
        "The intention matters more than perfect words.",
        "Ordene mine kommer klønete ut, men jeg vil virkelig forstå ham.",
        "Intensjonen betyr mer enn perfekte ord.",
      ),
    ],
  },
  {
    id: "s9-self-discipline",
    session: 9,
    key: 19,
    title: { en: "Self-discipline vs. obedience", no: "Selvdisiplin vs. lydighet" },
    labels: {
      a: { en: "Self-discipline", no: "Selvdisiplin" },
      b: { en: "Obedience", no: "Lydighet" },
    },
    intro: {
      en: "Obedience: I do it because someone with power says so, or because I fear what will happen. Self-discipline: I do it because I see how it serves needs I care about.",
      no: "Lydighet: jeg gjør det fordi noen med makt sier det, eller fordi jeg er redd for hva som skjer. Selvdisiplin: jeg gjør det fordi jeg ser hvordan det tjener behov jeg bryr meg om.",
    },
    statements: [
      st(
        "I practise every day because the trainer said we must.",
        "b",
        "The reason is outside the speaker: someone said so.",
        "Jeg øver hver dag fordi treneren sa at vi må.",
        "Grunnen ligger utenfor den som snakker: noen sa det.",
      ),
      st(
        "I practise every day because I see how it helps my relationships.",
        "a",
        "The reason comes from the speaker's own needs.",
        "Jeg øver hver dag fordi jeg ser hvordan det hjelper relasjonene mine.",
        "Grunnen kommer fra de egne behovene til den som snakker.",
      ),
      st(
        "The children are quiet because they are afraid of being punished.",
        "b",
        "Fear of punishment creates obedience.",
        "Barna er stille fordi de er redde for å bli straffet.",
        "Frykt for straff skaper lydighet.",
      ),
      st(
        "Our group agreed on the start time together, and I come on time because I care about our shared time.",
        "a",
        "The speaker follows the agreement from the inside, because of what they value.",
        "Gruppen vår ble enige om starttiden sammen, og jeg kommer i tide fordi jeg bryr meg om tiden vi har sammen.",
        "Den som snakker, følger avtalen innenfra, på grunn av det hun eller han verdsetter.",
      ),
    ],
  },
  {
    id: "s9-authority",
    session: 9,
    key: 20,
    title: { en: "Respect for authority vs. fear of authority", no: "Respekt for autoriteter vs. frykt for autoriteter" },
    labels: {
      a: { en: "Respect", no: "Respekt" },
      b: { en: "Fear", no: "Frykt" },
    },
    intro: {
      en: "I respect an authority when I value what the person knows or offers. I fear an authority when the person can punish or reward me.",
      no: "Jeg respekterer en autoritet når jeg setter pris på det personen kan eller gir. Jeg frykter en autoritet når personen kan straffe eller belønne meg.",
    },
    statements: [
      st(
        "I listen to her because she has a lot of experience that I want to learn from.",
        "a",
        "The speaker values what she offers.",
        "Jeg lytter til henne fordi hun har mye erfaring som jeg vil lære av.",
        "Den som snakker, setter pris på det hun gir.",
      ),
      st(
        "I don't ask questions, because the teacher might think I'm stupid.",
        "b",
        "Fear of being judged keeps the speaker silent.",
        "Jeg stiller ikke spørsmål, fordi læreren kanskje tror jeg er dum.",
        "Frykt for å bli dømt gjør at den som snakker, holder seg taus.",
      ),
      st(
        "I agree with my boss in meetings, so that I don't get into trouble.",
        "b",
        "The agreement comes from fear of what could happen.",
        "Jeg er enig med sjefen min i møter, så jeg ikke får problemer.",
        "Enigheten kommer av frykt for hva som kan skje.",
      ),
      st(
        "I tell the trainer that I see it differently, and I'm curious about his view.",
        "a",
        "With respect, there is room to disagree and stay curious.",
        "Jeg sier til treneren at jeg ser det annerledes, og jeg er nysgjerrig på hans syn.",
        "Med respekt er det rom for å være uenig og forbli nysgjerrig.",
      ),
    ],
  },

  // -------------------------------------------------------------------------
  // Session 10 — Training of Trainers II
  // -------------------------------------------------------------------------
  {
    id: "s10-appreciation",
    session: 10,
    key: 6,
    title: {
      en: "Appreciation vs. approval, compliments or praise",
      no: "Verdsettelse vs. godkjenning, kompliment eller ros",
    },
    labels: {
      a: { en: "Appreciation", no: "Verdsettelse" },
      b: { en: "Approval, compliment or praise", no: "Godkjenning, kompliment eller ros" },
    },
    intro: {
      en: "Praise judges the person, even when it is positive: \"You are good.\" Appreciation tells what the person did, how I feel about it, and which need of mine was met.",
      no: "Ros vurderer personen, selv når den er positiv: «Du er flink.» Verdsettelse forteller hva personen gjorde, hva jeg føler om det, og hvilket behov hos meg som ble møtt.",
    },
    statements: [
      st(
        "Great job! You're a natural facilitator.",
        "b",
        "A positive judgment of the person. We don't learn what she did or how it helped.",
        "Kjempebra! Du er en naturlig fasilitator.",
        "En positiv vurdering av personen. Vi får ikke vite hva hun gjorde eller hvordan det hjalp.",
      ),
      st(
        "When you waited in silence after your question, I felt calm and had space to think. Thank you.",
        "a",
        "It names what the person did, the feeling, and the need that was met.",
        "Da du ventet i stillhet etter spørsmålet ditt, kjente jeg meg rolig og fikk rom til å tenke. Takk.",
        "Det setter navn på hva personen gjorde, følelsen, og behovet som ble møtt.",
      ),
      st(
        "You're so good at this.",
        "b",
        "A compliment. It is kind, but it is still a judgment.",
        "Du er så flink til dette.",
        "Et kompliment. Det er vennlig, men det er fortsatt en vurdering.",
      ),
      st(
        "When you gave that example from your own life, I understood the exercise much better. I'm grateful.",
        "a",
        "A concrete action, and how it made the speaker's life better.",
        "Da du ga det eksempelet fra ditt eget liv, forsto jeg øvelsen mye bedre. Jeg er takknemlig.",
        "En konkret handling, og hvordan den gjorde livet bedre for den som snakker.",
      ),
      st(
        "That was perfect. Ten out of ten.",
        "b",
        "A grade. It puts the speaker in the role of judge.",
        "Det var perfekt. Ti av ti.",
        "En karakter. Den setter den som snakker, i dommerrollen.",
      ),
    ],
  },
  {
    id: "s10-vulnerability",
    session: 10,
    key: 21,
    title: { en: "Vulnerability vs. weakness", no: "Sårbarhet vs. svakhet" },
    labels: {
      a: { en: "Chooses vulnerability", no: "Velger sårbarhet" },
      b: { en: "Sees it as weakness", no: "Ser det som svakhet" },
    },
    intro: {
      en: "Vulnerability is showing what is alive in me. It takes courage, and it builds connection. When we see feelings as weakness, we hide them.",
      no: "Sårbarhet er å vise det som lever i meg. Det krever mot, og det bygger kontakt. Når vi ser følelser som svakhet, skjuler vi dem.",
    },
    statements: [
      st(
        "I'm nervous, and I tell the group: \"This is my first time guiding an exercise.\"",
        "a",
        "The speaker shows what is alive in them. That invites connection.",
        "Jeg er nervøs, og jeg sier til gruppen: «Dette er første gang jeg leder en øvelse.»",
        "Den som snakker, viser det som lever i henne eller ham. Det inviterer til kontakt.",
      ),
      st(
        "I hide that I lost my place, because a trainer must never look unsure.",
        "b",
        "Being unsure is seen as weakness, so it is hidden.",
        "Jeg skjuler at jeg mistet tråden, fordi en trener aldri må virke usikker.",
        "Usikkerhet blir sett som svakhet, så den blir skjult.",
      ),
      st(
        "I say: \"I don't know the answer. Can we explore it together?\"",
        "a",
        "Not knowing is shared openly, with trust in the group.",
        "Jeg sier: «Jeg vet ikke svaret. Kan vi utforske det sammen?»",
        "Å ikke vite blir delt åpent, med tillit til gruppen.",
      ),
      st(
        "If I show that I'm sad, they will stop respecting me. So I smile.",
        "b",
        "The feeling is seen as weakness and covered with a smile.",
        "Hvis jeg viser at jeg er trist, slutter de å respektere meg. Så jeg smiler.",
        "Følelsen blir sett som svakhet og dekket til med et smil.",
      ),
    ],
  },
  {
    id: "s10-interdependence",
    session: 10,
    key: 15,
    title: {
      en: "Interdependence vs. dependence or independence",
      no: "Gjensidig forbundet vs. avhengig eller uavhengig",
    },
    labels: {
      a: { en: "Interdependence", no: "Gjensidig forbundet" },
      b: { en: "Dependence or independence", no: "Avhengig eller uavhengig" },
    },
    intro: {
      en: "Dependence: I can't manage without you. Independence: I need nobody. Interdependence: my needs and your needs both matter, and we support each other by choice.",
      no: "Avhengighet: jeg klarer meg ikke uten deg. Uavhengighet: jeg trenger ingen. Gjensidig avhengighet: både mine og dine behov teller, og vi støtter hverandre av fri vilje.",
    },
    statements: [
      st(
        "I can't facilitate unless you tell me exactly what to do.",
        "b",
        "This is dependence: the speaker gives away their own power.",
        "Jeg kan ikke lede med mindre du sier nøyaktig hva jeg skal gjøre.",
        "Dette er avhengighet: den som snakker, gir bort sin egen makt.",
      ),
      st(
        "I don't need feedback from anyone. I do it my way.",
        "b",
        "This is independence: the speaker closes the door to others.",
        "Jeg trenger ikke tilbakemelding fra noen. Jeg gjør det på min måte.",
        "Dette er uavhengighet: den som snakker, stenger døren for andre.",
      ),
      st(
        "I'd like your feedback, and I'll decide myself what I do with it.",
        "a",
        "The speaker is open to others and keeps their own choice.",
        "Jeg vil gjerne ha tilbakemeldingen din, og jeg bestemmer selv hva jeg gjør med den.",
        "Den som snakker, er åpen for andre og beholder sitt eget valg.",
      ),
      st(
        "We plan the exercise together: you bring the idea, and I keep the time.",
        "a",
        "Each person contributes, and both needs count.",
        "Vi planlegger øvelsen sammen: du kommer med ideen, og jeg passer på tiden.",
        "Hver person bidrar, og begges behov teller.",
      ),
    ],
  },
];

export function checksForSession(sessionNumber: number): Check[] {
  return checks.filter((check) => check.session === sessionNumber);
}

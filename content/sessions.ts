// Course content lives here as plain data, so trainers' changes don't touch page code.
//
// Source: the trainer team's agenda for the ten-week Foundation Training ("Untitled document").
// Content is written in plain English, because participants speak English as a second language.
// A Norwegian version (`no`) can be added to any text later; until then English is shown.
//
// DRAFT FOR TRAINER REVIEW: the "practices" (exercises) and suggested readings were drafted by
// Claude from the agenda topics — please check, change or remove them freely.

import type { Localized } from "@/app/lib/language";

// ---------------------------------------------------------------------------
// Course details
// ---------------------------------------------------------------------------

export const course = {
  /** Date of session 1 as "YYYY-MM-DD" (a Monday). Leave null until it is decided. */
  startDate: null as string | null,
  schedule: {
    en: "Weekly on Mondays, 10:00–12:00 (Oslo time), on Zoom",
    no: "Ukentlig på mandager kl. 10.00–12.00 (norsk tid), på Zoom",
  } satisfies Localized,
};

/** Date of a session, counted weekly from course.startDate, or null if no start date is set. */
export function sessionDate(sessionNumber: number): Date | null {
  if (!course.startDate) return null;
  const [year, month, day] = course.startDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + (sessionNumber - 1) * 7));
}

/** How each 2-hour session runs. */
export const sessionFlow: { minutes: number; label: Localized }[] = [
  { minutes: 5, label: { en: "Today's inspiration", no: "Dagens inspirasjon" } },
  { minutes: 10, label: { en: "Check-in and questions", no: "Innsjekk og spørsmål" } },
  { minutes: 20, label: { en: "First topic", no: "Første tema" } },
  { minutes: 20, label: { en: "First exercise in breakout rooms", no: "Første øvelse i grupperom" } },
  { minutes: 5, label: { en: "Coming together", no: "Samling i plenum" } },
  { minutes: 5, label: { en: "Break", no: "Pause" } },
  { minutes: 20, label: { en: "Second topic", no: "Andre tema" } },
  { minutes: 20, label: { en: "Second exercise in breakout rooms", no: "Andre øvelse i grupperom" } },
  { minutes: 5, label: { en: "Coming together", no: "Samling i plenum" } },
  { minutes: 10, label: { en: "Reflections", no: "Refleksjoner" } },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ResourceKind = "reading" | "video" | "podcast" | "handout" | "link";

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

/** One of our own recordings on YouTube, embedded on the session page. */
export type Recording = {
  /** The id in youtu.be/<id> */
  youtubeId: string;
  title: Localized;
};

export type Song = {
  title: string;
  /** Suno song id (from suno.com/song/<id>), used for the embedded player */
  sunoId: string;
  /** Share link, shown as a fallback "Open in Suno" link */
  url: string;
  /** Chorus lyrics, one line per array item, shown in a fold-out under the player */
  chorus?: string[];
};

export type Session = {
  number: number;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  topics: Localized[];
  /** One-paragraph summary of the key takeaways from this session's resources */
  takeaways?: Localized;
  /** A song (made with Suno) that sums up the session's learnings */
  song?: Song;
  /** Recordings of the topic presentations (our own YouTube videos), added after the session */
  recordings?: Recording[];
  /** Things participants should print or have ready before the session starts */
  bring?: Resource[];
  resources: Resource[];
  exercises: Exercise[];
};

// Readings refer to Marshall B. Rosenberg, "Nonviolent Communication: A Language of Life".
const book = (id: string, chapter: number, title: string, titleNo: string): Resource => ({
  id,
  kind: "reading",
  title: {
    en: `Rosenberg, Nonviolent Communication — Chapter ${chapter}: ${title}`,
    no: `Rosenberg, Ikkevoldskommunikasjon — kapittel ${chapter}: ${titleNo}`,
  },
});

// Podcast: recordings of Marshall Rosenberg's own NVC training sessions (Spotify, English audio).
const rosenbergEpisode = (id: string, episodeTitle: string, spotifyEpisodeId: string): Resource => ({
  id,
  kind: "podcast",
  title: { en: `Rosenberg: ${episodeTitle}`, no: `Rosenberg: ${episodeTitle} (engelsk)` },
  url: `https://open.spotify.com/episode/${spotifyEpisodeId}`,
});

/** Resources for the whole training, shown above the sessions on the Resources page. */
export const generalResources: Resource[] = [
  {
    id: "podcast-rosenberg-nvc-training",
    kind: "podcast",
    title: { en: "Nonviolent Communication – Marshall Rosenberg's NVC Training", no: "Nonviolent Communication – Marshall Rosenbergs IVK-trening" },
    url: "https://open.spotify.com/show/3jPpnalv97b9ky9BB5DCAA",
    note: {
      en: "Recordings of Marshall Rosenberg's own training sessions (Spotify, in English).",
      no: "Opptak fra Marshall Rosenbergs egne treningssamlinger (Spotify, på engelsk).",
    },
  },
  rosenbergEpisode("podcast-sincere-gratitude", "Role of Sincere Gratitude", "4I8n4y843eZrjaVVUnDlxa"),
];

// ---------------------------------------------------------------------------
// The ten sessions
// ---------------------------------------------------------------------------

export const sessions: Session[] = [
  {
    number: 1,
    title: { en: "Introduction to NVC", no: "Introduksjon til IVK" },
    recordings: [
      { youtubeId: "OCDJUNRQmTM", title: { en: "Recording, part 1", no: "Opptak, del 1" } },
      { youtubeId: "rIp0KOUlBWw", title: { en: "Recording, part 2", no: "Opptak, del 2" } },
    ],
    subtitle: { en: "Seeing clearly, speaking with connection", no: "Å se klart og snakke med kontakt" },
    description: { en: "We start by exploring how everyday language can either build bridges or create distance, often without our noticing. You'll practise telling apart what actually happened from the story we tell about it. That small shift can change a whole conversation. No experience needed, just bring your curiosity.", no: "Vi begynner med å utforske hvordan hverdagsspråket kan bygge broer eller skape avstand, ofte uten at vi merker det. Du får øve på å skille det som faktisk skjedde fra historien vi forteller om det. Den lille endringen kan forandre en hel samtale. Du trenger ingen erfaring, bare ta med nysgjerrigheten din." },
    topics: [
      { en: "Language of connection and disconnection (life-serving and life-alienating language)", no: "Språk som skaper kontakt og språk som bryter kontakt (livsberikende og livsfremmedgjørende språk)" },
      { en: "Observation vs. judgment", no: "Observasjon vs. vurdering" },
      { en: "The 4 Ds of disconnection: diagnosis, denial of responsibility, deserve thinking, demands", no: "De fire D-ene som bryter kontakt: diagnose, å fraskrive seg ansvar, fortjeneste-tenkning, krav" },
    ],
    takeaways: { en: "NVC is a way of focusing our attention so that we can give, and receive, from the heart. It has two sides: expressing honestly how we are, and receiving with empathy how others are, without blame or criticism. Both sides use four parts: observations, feelings, needs and requests. Rosenberg shows how much of our everyday language blocks compassion: moralistic judgments, comparisons, denying responsibility (\"I had to\"), demands and deserve thinking. We learned these habits, so we can also unlearn them. The first step is to see clearly: to say what happened, as a camera would, without mixing in our evaluation. The philosopher Krishnamurti called observing without evaluating the highest form of human intelligence. In the podcast you can hear Marshall introduce NVC in his own words.", no: "IVK er en måte å rette oppmerksomheten på, slik at vi kan gi og ta imot fra hjertet. Den har to sider: å uttrykke ærlig hvordan vi har det, og å ta imot med empati hvordan andre har det, uten skyld eller kritikk. Begge sidene bruker fire deler: observasjoner, følelser, behov og anmodninger. Rosenberg viser hvor mye av hverdagsspråket vårt som blokkerer medfølelse: moralske vurderinger, sammenligninger, å fraskrive seg ansvar («jeg måtte»), krav og fortjeneste-tenkning. Vi har lært oss disse vanene, så vi kan også lære dem bort. Det første steget er å se klart: å si hva som skjedde, slik et kamera ville sett det, uten å blande inn vår vurdering. Filosofen Krishnamurti kalte det å observere uten å vurdere den høyeste formen for menneskelig intelligens. I podkasten kan du høre Marshall introdusere IVK med egne ord." },
    song: { title: "What Would a Camera See", sunoId: "3d8db40e-88fb-4fab-a14f-5e79e106959d", url: "https://suno.com/s/FIamPpoOzR267ZFV",
      chorus: [
        "What would a camera see?",
        "Not lazy, not a mess:",
        "three cups, a shirt, a muddy shoe,",
        "no more and no less.",
        "When I say what I see,",
        "the judging falls away,",
        "and maybe you can hear me,",
        "and maybe you will stay.",
      ],
    },
    resources: [
      book("s1-ch1", 1, "Giving from the heart", "Å gi fra hjertet"),
      book("s1-ch2", 2, "Communication that blocks compassion", "Kommunikasjon som blokkerer medfølelse"),
      book("s1-ch3", 3, "Observing without evaluating", "Å observere uten å vurdere"),
      rosenbergEpisode("s1-podcast-intro", "Introduction to Nonviolent Communication", "0Dfd1vDw9eYPOFPcB4tAfY"),
    ],
    exercises: [
      {
        id: "s1-mourn-celebrate",
        title: { en: "From the session: mourning and celebrating", no: "Fra samlingen: sorg og feiring" },
        instructions: {
          en: "We did this in small groups in the first session. You can do it with a partner, or alone in writing. Take turns. One person answers, the other listens without advice or comments.\n\n• What am I mourning, and what am I celebrating?\n• What is my experience? What do I feel, and what do I need?\n• What is valuable, interesting and important to me?\n• What action could support me?\n\nThen listen to the other person with the same questions:\n\n• What are you mourning, and what are you celebrating?\n• What is your experience? What do you feel, and what do you need?\n• What is valuable, interesting and important to you?\n• What action could support you?",
          no: "Dette gjorde vi i små grupper i første samling. Du kan gjøre det sammen med en partner, eller alene skriftlig. Bytt på. Én svarer, den andre lytter uten råd eller kommentarer.\n\n• Hva sørger jeg over, og hva feirer jeg?\n• Hva er min opplevelse? Hva føler jeg, og hva trenger jeg?\n• Hva er verdifullt, interessant og viktig for meg?\n• Hvilken handling kan støtte meg?\n\nLytt så til den andre med de samme spørsmålene:\n\n• Hva sørger du over, og hva feirer du?\n• Hva er din opplevelse? Hva føler du, og hva trenger du?\n• Hva er verdifullt, interessant og viktig for deg?\n• Hvilken handling kan støtte deg?",
        },
      },
      {
        id: "s1-thoughts-to-observations",
        title: { en: "From the session: from judgments to observations", no: "Fra samlingen: fra vurderinger til observasjoner" },
        instructions: {
          en: "1. Choose a few people in your real life. Write down what you think about each of them, honestly, just as the thoughts come.\n\n2. Now think of a moment when you were with each person. Write what happened as observations, without judgment: what did they say or do, as a camera could record it?\n\nNotice how the two lists feel different.",
          no: "1. Velg noen personer i livet ditt. Skriv ned hva du tenker om hver av dem, ærlig, akkurat slik tankene kommer.\n\n2. Tenk nå på et øyeblikk da du var sammen med hver person. Skriv hva som skjedde som observasjoner, uten vurdering: hva sa eller gjorde de, slik et kamera kunne tatt det opp?\n\nLegg merke til hvordan de to listene kjennes forskjellige.",
        },
      },
      {
        id: "s1-observation-check",
        title: { en: "Observation or judgment?", no: "Observasjon eller vurdering?" },
        instructions: { en: "Write one sentence about something that happened. You'll get gentle feedback on whether it is a pure observation — what a camera could record — or whether a judgment slipped in.", no: "Skriv én setning om noe som skjedde. Du får vennlig tilbakemelding på om det er en ren observasjon – det et kamera kunne tatt opp – eller om en vurdering har sneket seg inn." },
        aiTask: "observation-check",
      },
      {
        id: "s1-four-ds",
        title: { en: "Spot the 4 Ds", no: "Finn de fire D-ene" },
        instructions: { en: "This week, notice one moment when you (or someone near you) used one of the 4 Ds: a diagnosis (\"she is lazy\"), denying responsibility (\"I had to\"), deserve thinking (\"he deserves it\") or a demand. Write it down. Then ask: what actually happened, as a camera would see it?", no: "Legg denne uken merke til ett øyeblikk der du (eller noen rundt deg) brukte en av de fire D-ene: en diagnose («hun er lat»), å fraskrive seg ansvar («jeg måtte»), fortjeneste-tenkning («han fortjener det») eller et krav. Skriv det ned. Spør deg så: hva skjedde faktisk, slik et kamera ville sett det?" },
      },
    ],
  },
  {
    number: 2,
    title: { en: "Feelings and Needs", no: "Følelser og behov" },
    recordings: [
      { youtubeId: "qB23dQZOpsA", title: { en: "Recording, part 1", no: "Opptak, del 1" } },
      { youtubeId: "PRa97as_D34", title: { en: "Recording, part 2", no: "Opptak, del 2" } },
    ],
    bring: [
      {
        id: "s2-picture-needs-cards",
        kind: "handout",
        title: { en: "Picture Needs Cards (The No-Fault Zone) — PDF to print", no: "Bildekort for behov (The No-Fault Zone) – PDF til utskrift" },
        url: "https://thenofaultzone.com/cards_picture_needs_print_download_english_2018_merged.pdf",
        note: {
          en: "Please print this PDF before the session and have the cards with you.",
          no: "Skriv ut denne PDF-en før samlingen og ha kortene klare.",
        },
      },
    ],
    subtitle: { en: "What's alive in us", no: "Det som lever i oss" },
    description: { en: "Behind every feeling is a need, met or unmet. In this session you'll learn to notice feelings in the body, spot thoughts dressed up as feelings (\"I feel ignored\"), and connect with the universal needs we all share. Many participants say this is where NVC really starts to make sense.", no: "Bak hver følelse ligger et behov, møtt eller ikke møtt. I denne samlingen lærer du å merke følelser i kroppen, oppdage tanker som er kledd ut som følelser («jeg føler meg oversett»), og få kontakt med de universelle behovene vi alle deler. Mange deltakere sier at det er her IVK virkelig begynner å gi mening." },
    topics: [
      { en: "Body sensations and feelings vs. thoughts and faux feelings", no: "Kroppsfornemmelser og følelser vs. tanker og falske følelser" },
      { en: "Universal human needs vs. the strategies we use to meet them", no: "Universelle menneskelige behov vs. strategiene vi bruker for å møte dem" },
    ],
    takeaways: { en: "Our feelings tell us whether our needs are being met. Rosenberg asks us to build a rich vocabulary for feelings, and to notice when \"I feel…\" is really a thought: \"I feel that you…\", or words like ignored, misunderstood or betrayed, which say what we think others are doing to us. The Feelings vs. Faux Feelings list helps us translate those words. The key message of chapter 5 is that what others do may be the stimulus of our feelings, but never the cause. The cause is our own needs. When we hear a hard message, we have four options: blame ourselves, blame the other person, sense our own feelings and needs, or sense theirs. The Feelings and Needs Inventory and the picture needs cards help us find words for what is alive in us.", no: "Følelsene våre forteller oss om behovene våre blir møtt. Rosenberg ber oss bygge et rikt ordforråd for følelser, og legge merke til når «jeg føler…» egentlig er en tanke: «jeg føler at du…», eller ord som oversett, misforstått eller sviktet, som sier hva vi tror andre gjør mot oss. Listen Følelser vs. falske følelser hjelper oss å oversette slike ord. Hovedbudskapet i kapittel 5 er at det andre gjør kan være stimulus for følelsene våre, men aldri årsaken. Årsaken er våre egne behov. Når vi hører et vanskelig budskap, har vi fire valg: å klandre oss selv, å klandre den andre, å kjenne etter egne følelser og behov, eller å kjenne etter den andres. Oversikten over følelser og behov og bildekortene for behov hjelper oss å finne ord for det som lever i oss." },
    song: { title: "Underneath the Words", sunoId: "ef2fa07a-dc00-47e3-8c87-3bee2319c21a", url: "https://suno.com/s/62vdNUAnl363TEhs",
      chorus: [
        "Underneath the words I throw,",
        "something soft is true:",
        "a feeling that I didn't show,",
        "a need I hid from you.",
        "So I stop, and I breathe,",
        "I listen to my chest.",
        "The story's loud, but underneath",
        "I know what I need best.",
      ],
    },
    resources: [
      book("s2-ch4", 4, "Identifying and expressing feelings", "Å kjenne igjen og uttrykke følelser"),
      book("s2-ch5", 5, "Taking responsibility for our feelings", "Å ta ansvar for følelsene våre"),
      {
        id: "s2-feelings-needs-inventory",
        kind: "handout",
        title: { en: "Feelings and Needs Inventory (CNVC) — PDF", no: "Oversikt over følelser og behov (CNVC) – PDF" },
        url: "https://www.changethegameacademy.org/wp-content/uploads/2025/Toolkits/Feelings%20and%20Needs%20inventory%20-%20CNVC.pdf",
        note: {
          en: "Lists of feeling words and universal needs. Useful to keep next to you in every session.",
          no: "Lister over følelsesord og universelle behov. Nyttig å ha ved siden av seg i alle samlingene.",
        },
      },
      {
        id: "s2-feelings-vs-faux-feelings",
        kind: "handout",
        title: { en: "Feelings vs. Faux Feelings — PDF", no: "Følelser vs. falske følelser – PDF" },
        url: "https://johnkinyon.com/wp-content/uploads/2019/10/Feelings-vs-Faux-Feelings-copy-2.pdf",
        note: {
          en: "Translates words like \"ignored\" or \"betrayed\" into the real feelings and needs behind them.",
          no: "Oversetter ord som «ignorert» eller «forrådt» til de egentlige følelsene og behovene bak.",
        },
      },
    ],
    exercises: [
      {
        id: "s2-body-to-feeling",
        title: { en: "From the session: from body to feeling", no: "Fra samlingen: fra kropp til følelse" },
        instructions: {
          en: "1. Think of a state of mind, or something that happened to you. Name what you noticed in your body: for example sweating, blushing, a tight throat, a warm chest or heavy shoulders.\n\n2. Now try to name the feeling that goes with each body reaction. For example, sweating and blushing could go with feeling awkward.\n\nThere is no right answer. The same body reaction can go with different feelings.",
          no: "1. Tenk på en sinnstilstand, eller noe som skjedde med deg. Sett ord på hva du merket i kroppen: for eksempel svetting, rødming, en stram hals, varme i brystet eller tunge skuldre.\n\n2. Prøv nå å sette navn på følelsen som hører til hver kroppsreaksjon. For eksempel kan svetting og rødming høre sammen med å føle seg brydd.\n\nDet finnes ikke ett riktig svar. Den samme kroppsreaksjonen kan høre sammen med ulike følelser.",
        },
      },
      {
        id: "s2-thinking-feelings",
        title: { en: "From the session: the feeling under the thought", no: "Fra samlingen: følelsen under tanken" },
        instructions: {
          en: "1. Write down a few \"thinking feelings\": words that sound like feelings but say what we think others are doing to us. For example: rejected, ignored, misunderstood, criticised.\n\n2. For each one, find the feelings underneath that you can sense in your body. For example, \"I feel rejected\" may hold sadness, loneliness and fear.\n\nThe Feelings vs. Faux Feelings list in the resources can help.",
          no: "1. Skriv ned noen «tankefølelser»: ord som høres ut som følelser, men som sier hva vi tror andre gjør mot oss. For eksempel: avvist, oversett, misforstått, kritisert.\n\n2. Finn for hver av dem følelsene under, de du kan kjenne i kroppen. For eksempel kan «jeg føler meg avvist» romme tristhet, ensomhet og frykt.\n\nListen Følelser vs. falske følelser i ressursene kan hjelpe.",
        },
      },
      {
        id: "s2-feeling-or-thought",
        title: { en: "Feeling or thought?", no: "Følelse eller tanke?" },
        instructions: { en: "Three times this week, stop for a moment and notice your body. Then name what you feel in one word. If your sentence sounds like \"I feel that…\", \"I feel like you…\" or \"I feel ignored\", it is probably a thought. Try again: what is the feeling underneath?", no: "Stopp opp tre ganger denne uken og kjenn etter i kroppen. Sett så navn på det du føler med ett ord. Hvis setningen din høres ut som «jeg føler at…», «jeg føler at du…» eller «jeg føler meg oversett», er det sannsynligvis en tanke. Prøv igjen: hva er følelsen under?" },
      },
      {
        id: "s2-need-behind-strategy",
        title: { en: "The need behind the strategy", no: "Behovet bak strategien" },
        instructions: { en: "Pick something you want, for example \"I want my colleague to answer emails faster\". Ask yourself: if I got this, what would it give me? Keep asking until you reach a need that every human shares, such as ease, trust or respect.", no: "Velg noe du ønsker deg, for eksempel «jeg vil at kollegaen min skal svare raskere på e-post». Spør deg selv: hvis jeg fikk dette, hva ville det gi meg? Fortsett å spørre til du kommer fram til et behov som alle mennesker deler, som letthet, tillit eller respekt." },
      },
    ],
  },
  {
    number: 3,
    title: { en: "Empathic Listening", no: "Empatisk lytting" },
    subtitle: { en: "Hearing the heart behind the words", no: "Å høre hjertet bak ordene" },
    description: { en: "What happens when someone feels truly heard? In this session we practise listening for the feelings and needs behind complaints, stories and experiences, including the needs that are met and the needs that aren't. You'll discover how much can shift when people feel understood rather than judged or fixed.", no: "Hva skjer når noen føler seg virkelig hørt? I denne samlingen øver vi på å lytte etter følelsene og behovene bak klager, historier og opplevelser, både behov som er møtt og behov som ikke er det. Du vil oppdage hvor mye som kan endre seg når folk føler seg forstått i stedet for vurdert eller fikset." },
    topics: [{ en: "Building your empathy muscle", no: "Å trene empatimuskelen" }, { en: "Staying curious", no: "Å forbli nysgjerrig" }],
    takeaways: { en: "Empathy is a respectful understanding of what another person is experiencing. Our habit is to advise, reassure or explain our own view. Empathy asks us instead to empty our mind and listen with our whole being. A Buddhist saying puts it simply: \"Don't just do something, stand there.\" Whatever words people use, even judgments or complaints, we listen for their feelings and needs, and we can check our understanding by reflecting it back as a question. We stay with the other person until they have said what they need to say. A release of tension, or the words coming to an end, are signs that they feel heard. And when our own pain makes listening impossible, it is a sign that we need empathy ourselves first.", no: "Empati er en respektfull forståelse av det et annet menneske opplever. Vanen vår er å gi råd, trøste eller forklare vårt eget syn. Empati ber oss i stedet tømme hodet og lytte med hele oss. Et buddhistisk ordtak sier det enkelt: «Ikke bare gjør noe, stå der.» Uansett hvilke ord folk bruker, også vurderinger eller klager, lytter vi etter følelsene og behovene deres, og vi kan sjekke om vi har forstått ved å gi det tilbake som et spørsmål. Vi blir værende hos den andre til hun eller han har sagt det som trengs. Når spenningen slipper, eller ordene tar slutt, er det tegn på at personen føler seg hørt. Og når vår egen smerte gjør det umulig å lytte, er det et tegn på at vi trenger empati selv først." },
    song: { title: "Stand There", sunoId: "30c1324c-b35f-43d0-ab34-eebbc7c47cb5", url: "https://suno.com/s/1KmD7mO4D33ImiCh",
      chorus: [
        "Don't just do something, stand there.",
        "Don't fix, don't rush, don't run.",
        "Just be here with the one in pain",
        "until the words are done.",
        "Listen past the words they say,",
        "the anger and the blame,",
        "for what they feel and what they need,",
        "and gently guess its name.",
      ],
    },
    resources: [
      book("s3-ch7", 7, "Receiving empathically", "Å ta imot med empati"),
      rosenbergEpisode("s3-podcast-dynamics-of-empathy", "Dynamics of Empathy", "5v9tSglQutTmSDv0vwk2d2"),
    ],
    exercises: [
      {
        id: "s3-silent-empathy",
        title: { en: "Silent empathy", no: "Stille empati" },
        instructions: { en: "In one conversation this week, listen and guess silently: what might this person be feeling? What might they need? You don't need to say anything. Just notice how listening this way changes the conversation for you.", no: "I én samtale denne uken: lytt og gjett i stillhet. Hva kan denne personen føle? Hva kan hun eller han trenge? Du trenger ikke si noe. Bare legg merke til hvordan det å lytte på denne måten endrer samtalen for deg." },
      },
      {
        id: "s3-guess-out-loud",
        title: { en: "One empathy guess out loud", no: "Én empatigjetning høyt" },
        instructions: { en: "Once this week, try a short guess out loud: \"Are you feeling … because you need …?\" It doesn't have to be right. Notice what happens when the other person can correct you.", no: "Prøv én gang denne uken en kort gjetning høyt: «Føler du deg … fordi du trenger …?» Den trenger ikke være riktig. Legg merke til hva som skjer når den andre kan korrigere deg." },
      },
    ],
  },
  {
    number: 4,
    title: { en: "Requests", no: "Anmodninger" },
    subtitle: { en: "Asking for what we want, without demanding", no: "Å be om det vi ønsker, uten å kreve" },
    description: { en: "Knowing our needs is only half the journey. The other half is asking for what would help. We'll practise making requests that are clear, concrete and doable, and look at the one question that separates a request from a demand: how we respond to a \"no\".", no: "Å kjenne behovene våre er bare halve veien. Den andre halvdelen er å be om det som ville hjelpe. Vi øver på å komme med anmodninger som er tydelige, konkrete og gjennomførbare, og ser på det ene spørsmålet som skiller en anmodning fra et krav: hvordan vi møter et «nei»." },
    topics: [
      { en: "Requests for action, understanding and connection", no: "Anmodninger om handling, forståelse og kontakt" },
      { en: "Requests vs. demands", no: "Anmodning vs. krav" },
      { en: "Hearing \"no\" as an opening, not a dead end", no: "Å høre «nei» som en åpning, ikke en blindvei" },
    ],
    takeaways: { en: "Rosenberg suggests making requests in positive action language: say what we do want, not what we don't want, and be concrete enough that the other person knows what to do. When we are not sure we were understood, we can ask the other person to tell us what they heard. The big difference in this chapter is between a request and a demand. It is not in the words. It shows in how we respond when the other person says no. If we can listen with empathy to what stops them from saying yes, it was a request. This does not mean giving up on our need. The aim of NVC is not to get our way, but a relationship based on honesty and empathy, where everyone's needs matter.", no: "Rosenberg foreslår at vi formulerer anmodninger i positivt handlingsspråk: si hva vi ønsker, ikke hva vi ikke ønsker, og vær konkret nok til at den andre vet hva hun eller han kan gjøre. Når vi ikke er sikre på om vi ble forstått, kan vi be den andre fortelle hva hun eller han hørte. Den store forskjellen i dette kapitlet er mellom en anmodning og et krav. Den ligger ikke i ordene. Den viser seg i hvordan vi svarer når den andre sier nei. Hvis vi kan lytte med empati til det som hindrer den andre i å si ja, var det en anmodning. Det betyr ikke at vi gir opp behovet vårt. Målet med IVK er ikke å få det som vi vil, men en relasjon bygget på ærlighet og empati, der alles behov teller." },
    song: { title: "A Question, Not a Cage", sunoId: "38dd63ae-2d21-4620-9afe-37faaaab7aaa", url: "https://suno.com/s/7L39aGKld93n6xM5",
      chorus: [
        "So I ask you, clear and kind,",
        "for one thing you can do,",
        "and if your answer is a \"no\",",
        "I want to hear that too.",
        "It's a question, not a cage,",
        "an open door, not a wall,",
        "and how I meet your \"no\"",
        "shows if I asked at all.",
      ],
    },
    resources: [book("s4-ch6", 6, "Requesting that which would enrich life", "Å be om det som kan berike livet")],
    exercises: [
      {
        id: "s4-wish-to-request",
        title: { en: "From wish to request", no: "Fra ønske til anmodning" },
        instructions: { en: "Write down a wish, for example \"I want more respect\". Now make it a request: say what you want (not what you don't want), make it concrete, and make it something the person can do now. Start with \"Would you be willing to…?\"", no: "Skriv ned et ønske, for eksempel «jeg vil ha mer respekt». Gjør det nå om til en anmodning: si hva du ønsker (ikke hva du ikke ønsker), gjør det konkret, og gjør det til noe personen kan gjøre nå. Begynn med «Vil du være villig til å…?»" },
      },
      {
        id: "s4-hearing-no",
        title: { en: "What is behind the no?", no: "Hva ligger bak neiet?" },
        instructions: { en: "The next time someone says no to you this week, guess what they are saying yes to. Which need of theirs might the no protect?", no: "Neste gang noen sier nei til deg denne uken: gjett hva de sier ja til. Hvilket av deres behov kan neiet beskytte?" },
      },
    ],
  },
  {
    number: 5,
    title: { en: "Putting It All Together", no: "Å sette det hele sammen" },
    subtitle: { en: "OFNR in real life", no: "OFBA i det virkelige liv" },
    description: { en: "Now we connect the pieces: observations, feelings, needs and requests. We'll use them both to express ourselves honestly and to listen with empathy. Come prepared with a real situation from your life that you'd like to work with. This is where the model becomes a living practice.", no: "Nå setter vi delene sammen: observasjoner, følelser, behov og anmodninger. Vi bruker dem både til å uttrykke oss ærlig og til å lytte med empati. Ta med en virkelig situasjon fra livet ditt som du vil jobbe med. Det er her modellen blir en levende praksis." },
    topics: [
      { en: "Using OFNR for honest expression and empathic listening", no: "Å bruke OFBA til ærlig uttrykk og empatisk lytting" },
      { en: "Practising with real-life situations", no: "Å øve med situasjoner fra det virkelige liv" },
    ],
    takeaways: { en: "In this episode you can hear Marshall Rosenberg present the four-part model in his own words. The key takeaway is that the same four parts work in both directions. When we express ourselves, we share what we observe, how we feel, what we need, and what we would like to ask for. When we listen, we guess the other person's observation, feeling, need and request. In real conversations we move back and forth between the two, and often empathy has to come first: the more we hear others, the more they can hear us. The four parts support the intention to connect. With practice, they can be said in everyday words.", no: "I denne episoden kan du høre Marshall Rosenberg presentere firestegsmodellen med egne ord. Hovedpoenget er at de samme fire delene virker begge veier. Når vi uttrykker oss, deler vi hva vi observerer, hva vi føler, hva vi trenger og hva vi vil be om. Når vi lytter, gjetter vi den andres observasjon, følelse, behov og anmodning. I virkelige samtaler beveger vi oss fram og tilbake mellom de to, og ofte må empatien komme først: jo mer vi hører andre, jo mer kan de høre oss. De fire delene støtter intensjonen om å skape kontakt. Med øvelse kan de sies med hverdagsord." },
    resources: [rosenbergEpisode("s5-podcast-4-part-model", "The 4 Part NVC Model", "2PXhRKCE0ls0c4zZS0FlKp")],
    exercises: [
      {
        id: "s5-prepare-situation",
        title: { en: "Prepare your situation", no: "Forbered situasjonen din" },
        instructions: { en: "Before the session, choose a real situation you'd like to work with. Write it in four short lines: what happened (O), what you felt (F), what you needed (N), and what you would like to ask for (R).", no: "Velg før samlingen en virkelig situasjon du vil jobbe med. Skriv den i fire korte linjer: hva som skjedde (O), hva du følte (F), hva du trengte (B), og hva du vil be om (A)." },
      },
      {
        id: "s5-listen-ofnr",
        title: { en: "Listen in four steps", no: "Lytt i fire steg" },
        instructions: { en: "When someone tells you about something difficult this week, listen for their four parts: what happened, what they feel, what they need, and what they might want. Guess one of them out loud.", no: "Når noen forteller deg om noe vanskelig denne uken, lytt etter de fire delene deres: hva som skjedde, hva de føler, hva de trenger, og hva de kanskje ønsker. Gjett én av dem høyt." },
      },
    ],
  },
  {
    number: 6,
    title: { en: "Self-Empathy", no: "Selvempati" },
    subtitle: { en: "Meeting ourselves with kindness", no: "Å møte oss selv med vennlighet" },
    description: { en: "The harshest voice many of us hear is our own. In this session we turn NVC inward. You'll learn to translate self-judgment into feelings and needs, and to grow understanding for different parts of yourself. We'll use chair work to give each inner voice a place to be heard.", no: "Den strengeste stemmen mange av oss hører, er vår egen. I denne samlingen vender vi IVK innover. Du lærer å oversette selvkritikk til følelser og behov, og å få mer forståelse for ulike deler av deg selv. Vi bruker stolarbeid for å gi hver indre stemme et sted å bli hørt." },
    topics: [
      { en: "Recognising the inner \"jackal\" and translating self-judgment", no: "Å kjenne igjen den indre «sjakalen» og oversette selvkritikk" },
      { en: "Mourning vs. self-blame", no: "Sorg vs. selvbebreidelse" },
      { en: "Chair work: dialogue between inner parts", no: "Stolarbeid: dialog mellom indre deler" },
    ],
    takeaways: { en: "Rosenberg sees the way we treat ourselves as perhaps the most important use of NVC. When we make mistakes, our inner voice often judges: \"I'm so stupid\", \"I should have…\". NVC invites us to translate these self-judgments into feelings and needs. In NVC mourning, we connect with the needs that were not met by what we did. In self-forgiveness, we connect with the needs we were trying to meet when we did it. Change then comes from care for ourselves and others, not from shame or guilt. Rosenberg also suggests turning \"I have to\" into \"I choose to … because I want …\", so that we act from the joy of contributing to life, rather than from fear, guilt, shame or duty.", no: "Rosenberg ser måten vi behandler oss selv på som kanskje den viktigste bruken av IVK. Når vi gjør feil, dømmer den indre stemmen ofte: «Jeg er så dum», «Jeg burde ha…». IVK inviterer oss til å oversette denne selvkritikken til følelser og behov. I IVK-sorg får vi kontakt med behovene som ikke ble møtt av det vi gjorde. I selvtilgivelse får vi kontakt med behovene vi prøvde å møte da vi gjorde det. Endring kommer da av omsorg for oss selv og andre, ikke av skam eller skyld. Rosenberg foreslår også å gjøre «jeg må» om til «jeg velger å … fordi jeg ønsker …», slik at vi handler ut fra gleden ved å bidra til livet, og ikke ut fra frykt, skyld, skam eller plikt." },
    song: { title: "Face Myself", sunoId: "96579c9c-6dfd-4014-a3c8-7254a6171708", url: "https://suno.com/s/W9KOXgZFx0ZIaj2h",
      chorus: [
        "So let me turn and face myself",
        "the way I'd face a friend.",
        "Behind each \"should\" a need is crying,",
        "and needs can help me mend.",
        "I'll mourn the thing I couldn't give,",
        "forgive the choice I made,",
        "and grow from care, and not because",
        "I'm guilty or afraid.",
      ],
    },
    resources: [
      book("s6-ch9", 9, "Connecting compassionately with ourselves", "Å møte oss selv med medfølelse"),
      rosenbergEpisode("s6-podcast-communicate-with-ourselves", "How We Communicate with Ourselves", "31VbjKJgmuPR68X0eAUtrt"),
    ],
    exercises: [
      {
        id: "s6-translate-jackal",
        title: { en: "Translate your inner jackal", no: "Oversett den indre sjakalen din" },
        instructions: { en: "Write down one harsh thing you say to yourself, for example \"I'm so stupid\". Then ask: what do I feel? Which of my needs was not met? And which need was I trying to meet when I did what I did?", no: "Skriv ned én hard ting du sier til deg selv, for eksempel «jeg er så dum». Spør deg så: hva føler jeg? Hvilket behov ble ikke møtt? Og hvilket behov prøvde jeg å møte da jeg gjorde det jeg gjorde?" },
      },
      {
        id: "s6-mourning",
        title: { en: "Mourning instead of blaming", no: "Sorg i stedet for bebreidelse" },
        instructions: { en: "Think of something you regret. Instead of blaming yourself, take a few minutes to feel the sadness of the unmet need. Notice how mourning feels different from self-blame.", no: "Tenk på noe du angrer på. I stedet for å bebreide deg selv: ta noen minutter til å kjenne sorgen over behovet som ikke ble møtt. Legg merke til hvordan sorg kjennes annerledes enn selvbebreidelse." },
      },
    ],
  },
  {
    number: 7,
    title: { en: "Empathy and Not-Empathy", no: "Empati og ikke-empati" },
    subtitle: { en: "Refining our listening", no: "Å finslipe lyttingen vår" },
    description: { en: "Most of us respond to others with good intentions: advice, comfort, stories of our own, questions. Yet these can leave people feeling unheard. We'll explore our habitual responses with curiosity rather than judgment, and practise staying with empathy a little longer than feels natural.", no: "De fleste av oss svarer andre med gode intensjoner: råd, trøst, egne historier, spørsmål. Likevel kan dette gjøre at folk ikke føler seg hørt. Vi utforsker de vanlige svarene våre med nysgjerrighet i stedet for vurdering, og øver på å bli værende i empatien litt lenger enn det som føles naturlig." },
    topics: [
      { en: "Empathy vs. deflective responses (sympathy, advice, fixing, educating, interrogating, one-upping)", no: "Empati vs. avledende svar (sympati, råd, fiksing, belæring, utspørring, overgåing)" },
      { en: "Recognising your own listening habits", no: "Å kjenne igjen dine egne lyttevaner" },
    ],
    takeaways: { en: "Chapter 8 shows what empathy can do. Being heard can heal, and it makes it easier to be vulnerable. Empathy can even help in dangerous moments, as Rosenberg's stories show. When someone says \"no\", empathy keeps us from taking it personally: we listen for the feelings and needs behind the no, for what the person wants that stops them from saying yes. Empathy can also bring a lifeless conversation back to life, and help us stay present with silence. The book also names habits that block empathy, even when we mean well: advising, one-upping, educating, consoling, storytelling, shutting down and others. Noticing our own favourite habits, without judging them, is the first step to staying with the other person a little longer.", no: "Kapittel 8 viser hva empati kan gjøre. Å bli hørt kan hele, og det gjør det lettere å være sårbar. Empati kan til og med hjelpe i farlige øyeblikk, som Rosenbergs historier viser. Når noen sier «nei», hjelper empatien oss å ikke ta det personlig: vi lytter etter følelsene og behovene bak neiet, etter det personen ønsker som hindrer henne eller ham i å si ja. Empati kan også blåse liv i en livløs samtale, og hjelpe oss å være til stede i stillhet. Boken nevner også vaner som blokkerer empati, selv når vi mener det godt: å gi råd, å overgå, å belære, å trøste, å fortelle historier, å avslutte og andre. Å legge merke til våre egne favorittvaner, uten å dømme dem, er første steg mot å bli værende hos den andre litt lenger." },
    song: { title: "Let the Silence Be", sunoId: "a0d35ec4-a54a-474d-8afe-ca0ae37dd7e5", url: "https://suno.com/s/GukcN1ntqeStWWbE",
      chorus: [
        "Behind your \"no\" there is a \"yes\"",
        "to something deep and true.",
        "I won't take it personally,",
        "I'll get curious about you.",
        "And if the room goes quiet, love,",
        "I'll let the silence be,",
        "'cause being heard can heal a heart",
        "and set the spirit free.",
      ],
    },
    resources: [
      book("s7-ch8", 8, "The power of empathy", "Empatiens kraft"),
      rosenbergEpisode("s7-podcast-power-of-empathy", "The Power of Empathy", "54vjDfY6WGHUoDCZChduI8"),
    ],
    exercises: [
      {
        id: "s7-notice-habit",
        title: { en: "Notice your listening habit", no: "Legg merke til lyttevanen din" },
        instructions: { en: "This week, notice what you usually do when someone shares a problem: give advice, comfort, tell your own story, ask questions, explain? No judgment — just notice, with curiosity.", no: "Legg denne uken merke til hva du vanligvis gjør når noen deler et problem: gir du råd, trøster, forteller din egen historie, stiller spørsmål, forklarer? Ingen vurdering – bare legg merke til det, med nysgjerrighet." },
      },
      {
        id: "s7-one-more-moment",
        title: { en: "Stay a little longer", no: "Bli litt lenger" },
        instructions: { en: "The next time you notice the urge to advise or fix, stay with empathy for one more moment first. Reflect what you hear, then see what the person needs.", no: "Neste gang du merker trangen til å gi råd eller fikse, bli i empatien et øyeblikk til først. Gi tilbake det du hører, og se så hva personen trenger." },
      },
    ],
  },
  {
    number: 8,
    title: { en: "Challenging Dialogues", no: "Utfordrende samtaler" },
    subtitle: { en: "Staying connected when it matters most", no: "Å holde kontakten når det betyr mest" },
    description: { en: "NVC is easy when everyone is calm. The real test comes when we think we are criticised, feel triggered or stuck. We'll practise pausing, using emergency self-empathy, hearing anger and criticism as expressions of needs, and saying a clear \"no\". Bring a conversation you dread, or one that didn't go the way you hoped.", no: "IVK er lett når alle er rolige. Den virkelige prøven kommer når vi tror vi blir kritisert, blir trigget eller står fast. Vi øver på å ta en pause, bruke førstehjelps-selvempati, høre sinne og kritikk som uttrykk for behov, og si et tydelig «nei». Ta med en samtale du gruer deg til, eller en som ikke gikk slik du håpet." },
    topics: [
      { en: "Handling triggers and emergency self-empathy", no: "Å håndtere triggere og førstehjelps-selvempati" },
      { en: "Receiving criticism and anger", no: "Å ta imot kritikk og sinne" },
      { en: "Expressing a \"no\" while staying connected", no: "Å uttrykke et «nei» og samtidig holde kontakten" },
    ],
    takeaways: { en: "Rosenberg's key point about anger: what others do is the stimulus, never the cause. The cause lies in our own thinking, in judgments about what others should or shouldn't do. Every anger has a life-serving core: a need that is not met. To express anger fully, he suggests four steps: stop and breathe, identify the judgmental thoughts, connect with the needs behind them, and then express our feelings and unmet needs. Often we need to offer the other person empathy first, because the more we hear them, the more they will be able to hear us. Blaming and punishing are only surface ways of expressing anger. And we need to take our time, because habits of judging run deep.", no: "Rosenbergs hovedpoeng om sinne: det andre gjør er stimulus, aldri årsaken. Årsaken ligger i vår egen tenkning, i vurderinger av hva andre burde eller ikke burde gjøre. Alt sinne har en livsberikende kjerne: et behov som ikke er møtt. For å uttrykke sinne fullt ut foreslår han fire steg: stopp og pust, finn de dømmende tankene, få kontakt med behovene bak dem, og uttrykk så følelsene og de umøtte behovene. Ofte må vi gi den andre empati først, for jo mer vi hører den andre, jo mer vil hun eller han kunne høre oss. Å klandre og straffe er bare overfladiske måter å uttrykke sinne på. Og vi må gi oss selv tid, for vanene med å dømme sitter dypt." },
    song: { title: "Stop and Breathe", sunoId: "ec748411-f48d-4771-9629-dc30eb10ac04", url: "https://suno.com/s/C64uN0l04Ze1oUA9",
      chorus: [
        "So I stop, and I breathe,",
        "I hear my judging mind.",
        "\"A thief, a snake,\" but underneath",
        "there's something else to find.",
        "What he did was just the spark,",
        "my thoughts are what burn hot,",
        "and every anger, at its heart,",
        "is a need that I forgot.",
      ],
    },
    resources: [book("s8-ch10", 10, "Expressing anger fully", "Å uttrykke sinne fullt ut")],
    exercises: [
      {
        id: "s8-emergency-self-empathy",
        title: { en: "Emergency self-empathy", no: "Førstehjelps-selvempati" },
        instructions: { en: "When you feel triggered this week, try this: stop and breathe. Notice what happens in your body. Hear the judging thought. Then ask: what am I feeling, and what do I need right now?", no: "Når du blir trigget denne uken, prøv dette: stopp og pust. Legg merke til hva som skjer i kroppen. Hør den dømmende tanken. Spør deg så: hva føler jeg, og hva trenger jeg akkurat nå?" },
      },
      {
        id: "s8-criticism-as-need",
        title: { en: "Hearing criticism as a need", no: "Å høre kritikk som et behov" },
        instructions: { en: "Write down a criticism you received recently. Then guess: what might the other person have been feeling, and which need of theirs was not met?", no: "Skriv ned en kritikk du nylig har fått. Gjett så: hva kan den andre ha følt, og hvilket av hennes eller hans behov ble ikke møtt?" },
      },
      {
        id: "s8-connected-no",
        title: { en: "A no with connection", no: "Et nei med kontakt" },
        instructions: { en: "Think of a request you want to say no to. Write your no so it includes the need you are saying yes to, and a request that keeps the conversation open: \"No, because I need… Would you be willing to…?\"", no: "Tenk på en anmodning du vil si nei til. Skriv neiet ditt slik at det tar med behovet du sier ja til, og en anmodning som holder samtalen åpen: «Nei, fordi jeg trenger … Vil du være villig til å …?»" },
      },
    ],
  },
  {
    number: 9,
    title: { en: "Training of Trainers I", no: "Opplæring av trenere I" },
    subtitle: { en: "Sharing NVC with others", no: "Å dele IVK med andre" },
    description: { en: "How do you bring NVC into your family, workplace or community? We'll look at ways to share what you've learned, including how to explain the basics simply and how to guide short exercises. We'll also explore how to stay in your own learning while supporting others in theirs.", no: "Hvordan tar du med IVK inn i familien, på jobben eller i lokalmiljøet? Vi ser på måter å dele det du har lært, blant annet hvordan du forklarer det grunnleggende enkelt og hvordan du leder korte øvelser. Vi utforsker også hvordan du kan fortsette å lære selv mens du støtter andre i deres læring." },
    topics: [
      { en: "Sharing NVC in your own contexts", no: "Å dele IVK i dine egne sammenhenger" },
      { en: "Guiding simple exercises", no: "Å lede enkle øvelser" },
      { en: "Learning while teaching", no: "Å lære mens man underviser" },
    ],
    resources: [],
    exercises: [
      {
        id: "s9-explain-simply",
        title: { en: "NVC in one minute", no: "IVK på ett minutt" },
        instructions: { en: "Write how you would explain NVC to a friend in three or four short sentences, using everyday words. Try it on someone this week.", no: "Skriv hvordan du ville forklart IVK for en venn i tre eller fire korte setninger, med hverdagsord. Prøv det på noen denne uken." },
      },
      {
        id: "s9-plan-exercise",
        title: { en: "Plan a short exercise", no: "Planlegg en kort øvelse" },
        instructions: { en: "Choose one exercise from this course. Write down how you would introduce it, the steps, and how much time it needs. You may get to facilitate it in the next session.", no: "Velg én øvelse fra dette kurset. Skriv ned hvordan du ville introdusert den, stegene, og hvor lang tid den trenger. Kanskje får du lede den i neste samling." },
      },
    ],
  },
  {
    number: 10,
    title: { en: "Training of Trainers II", no: "Opplæring av trenere II" },
    subtitle: { en: "Practising facilitation", no: "Å øve på å lede" },
    description: { en: "Time to try it out. Participants take turns facilitating short NVC exercises and receive supportive, needs-based feedback. It's a safe space to experiment, stumble and grow, and to gain confidence in passing NVC on.", no: "Nå er det tid for å prøve. Deltakerne bytter på å lede korte IVK-øvelser og får støttende, behovsbasert tilbakemelding. Det er et trygt sted å eksperimentere, snuble og vokse, og å få trygghet i å gi IVK videre." },
    topics: [{ en: "Facilitating exercises in small groups", no: "Å lede øvelser i små grupper" }, { en: "Giving and receiving feedback the NVC way", no: "Å gi og ta imot tilbakemelding på IVK-måten" }],
    resources: [],
    exercises: [
      {
        id: "s10-feedback-ofnr",
        title: { en: "Feedback to yourself, the NVC way", no: "Tilbakemelding til deg selv, på IVK-måten" },
        instructions: { en: "After you facilitate, give yourself feedback in four steps: what you observed, how you feel about it, which needs were met and which were not, and one request to yourself for next time.", no: "Etter at du har ledet en øvelse, gi deg selv tilbakemelding i fire steg: hva du observerte, hva du føler om det, hvilke behov som ble møtt og hvilke som ikke ble det, og én anmodning til deg selv til neste gang." },
      },
      {
        id: "s10-next-step",
        title: { en: "Your next step", no: "Ditt neste steg" },
        instructions: { en: "What do you want to keep practising after the course? Who could you practise with? Write down one small, concrete step for the coming month.", no: "Hva vil du fortsette å øve på etter kurset? Hvem kan du øve sammen med? Skriv ned ett lite, konkret steg for den kommende måneden." },
      },
    ],
  },
];

export function getSession(sessionNumber: number): Session | undefined {
  return sessions.find((session) => session.number === sessionNumber);
}

// Course content lives here as plain data, so trainers' changes don't touch page code.
//
// Source: the trainer team's agenda for the ten-week Foundation Training ("Untitled document").
// Content is written in plain English, because participants speak English as a second language.
// A Norwegian version (`no`) can be added to any text later; until then English is shown.
//
// DRAFT FOR TRAINER REVIEW: the "practices" (exercises) and suggested readings were drafted by
// Claude from the agenda topics — please check, change or remove them freely.

import type { Localized } from "@/app/lib/language";

/** Shorthand for English-only text. */
const en = (text: string): Localized => ({ en: text });

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

export type Song = {
  title: string;
  /** Suno song id (from suno.com/song/<id>), used for the embedded player */
  sunoId: string;
  /** Share link, shown as a fallback "Open in Suno" link */
  url: string;
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
  /** Link to the recording of the topic presentations, added after the session */
  recordingUrl?: string;
  /** Things participants should print or have ready before the session starts */
  bring?: Resource[];
  resources: Resource[];
  exercises: Exercise[];
};

// Readings refer to Marshall B. Rosenberg, "Nonviolent Communication: A Language of Life".
const book = (id: string, chapter: number, title: string): Resource => ({
  id,
  kind: "reading",
  title: en(`Rosenberg, Nonviolent Communication — Chapter ${chapter}: ${title}`),
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
    title: en("Nonviolent Communication – Marshall Rosenberg's NVC Training"),
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
    title: en("Introduction to NVC"),
    subtitle: en("Seeing clearly, speaking with connection"),
    description: en(
      "We start by exploring how everyday language can either build bridges or create distance, often without our noticing. You'll practise telling apart what actually happened from the story we tell about it. That small shift can change a whole conversation. No experience needed, just bring your curiosity.",
    ),
    topics: [
      en("Language of connection and disconnection (life-serving and life-alienating language)"),
      en("Observation vs. judgment"),
      en("The 4 Ds of disconnection: diagnosis, denial of responsibility, deserve thinking, demands"),
    ],
    takeaways: en(
      "NVC is a way of focusing our attention so that we can give, and receive, from the heart. It has two sides: expressing honestly how we are, and receiving with empathy how others are, without blame or criticism. Both sides use four parts: observations, feelings, needs and requests. Rosenberg shows how much of our everyday language blocks compassion: moralistic judgments, comparisons, denying responsibility (\"I had to\"), demands and deserve thinking. We learned these habits, so we can also unlearn them. The first step is to see clearly: to say what happened, as a camera would, without mixing in our evaluation. The philosopher Krishnamurti called observing without evaluating the highest form of human intelligence. In the podcast you can hear Marshall introduce NVC in his own words.",
    ),
    song: { title: "What Would a Camera See", sunoId: "3d8db40e-88fb-4fab-a14f-5e79e106959d", url: "https://suno.com/s/FIamPpoOzR267ZFV" },
    resources: [
      book("s1-ch1", 1, "Giving from the heart"),
      book("s1-ch2", 2, "Communication that blocks compassion"),
      book("s1-ch3", 3, "Observing without evaluating"),
      rosenbergEpisode("s1-podcast-intro", "Introduction to Nonviolent Communication", "0Dfd1vDw9eYPOFPcB4tAfY"),
    ],
    exercises: [
      {
        id: "s1-observation-check",
        title: en("Observation or judgment?"),
        instructions: en(
          "Write one sentence about something that happened. You'll get gentle feedback on whether it is a pure observation — what a camera could record — or whether a judgment slipped in.",
        ),
        aiTask: "observation-check",
      },
      {
        id: "s1-four-ds",
        title: en("Spot the 4 Ds"),
        instructions: en(
          "This week, notice one moment when you (or someone near you) used one of the 4 Ds: a diagnosis (\"she is lazy\"), denying responsibility (\"I had to\"), deserve thinking (\"he deserves it\") or a demand. Write it down. Then ask: what actually happened, as a camera would see it?",
        ),
      },
    ],
  },
  {
    number: 2,
    title: en("Feelings and Needs"),
    bring: [
      {
        id: "s2-picture-needs-cards",
        kind: "handout",
        title: en("Picture Needs Cards (The No-Fault Zone) — PDF to print"),
        url: "https://thenofaultzone.com/cards_picture_needs_print_download_english_2018_merged.pdf",
        note: {
          en: "Please print this PDF before the session and have the cards with you.",
          no: "Skriv ut denne PDF-en før samlingen og ha kortene klare.",
        },
      },
    ],
    subtitle: en("What's alive in us"),
    description: en(
      "Behind every feeling is a need, met or unmet. In this session you'll learn to notice feelings in the body, spot thoughts dressed up as feelings (\"I feel ignored\"), and connect with the universal needs we all share. Many participants say this is where NVC really starts to make sense.",
    ),
    topics: [
      en("Body sensations and feelings vs. thoughts and faux feelings"),
      en("Universal human needs vs. the strategies we use to meet them"),
    ],
    takeaways: en(
      "Our feelings tell us whether our needs are being met. Rosenberg asks us to build a rich vocabulary for feelings, and to notice when \"I feel…\" is really a thought: \"I feel that you…\", or words like ignored, misunderstood or betrayed, which say what we think others are doing to us. The Feelings vs. Faux Feelings list helps us translate those words. The key message of chapter 5 is that what others do may be the stimulus of our feelings, but never the cause. The cause is our own needs. When we hear a hard message, we have four options: blame ourselves, blame the other person, sense our own feelings and needs, or sense theirs. The Feelings and Needs Inventory and the picture needs cards help us find words for what is alive in us.",
    ),
    song: { title: "Underneath the Words", sunoId: "ef2fa07a-dc00-47e3-8c87-3bee2319c21a", url: "https://suno.com/s/62vdNUAnl363TEhs" },
    resources: [
      book("s2-ch4", 4, "Identifying and expressing feelings"),
      book("s2-ch5", 5, "Taking responsibility for our feelings"),
      {
        id: "s2-feelings-needs-inventory",
        kind: "handout",
        title: en("Feelings and Needs Inventory (CNVC) — PDF"),
        url: "https://www.changethegameacademy.org/wp-content/uploads/2025/Toolkits/Feelings%20and%20Needs%20inventory%20-%20CNVC.pdf",
        note: {
          en: "Lists of feeling words and universal needs. Useful to keep next to you in every session.",
          no: "Lister over følelsesord og universelle behov. Nyttig å ha ved siden av seg i alle samlingene.",
        },
      },
      {
        id: "s2-feelings-vs-faux-feelings",
        kind: "handout",
        title: en("Feelings vs. Faux Feelings — PDF"),
        url: "https://johnkinyon.com/wp-content/uploads/2019/10/Feelings-vs-Faux-Feelings-copy-2.pdf",
        note: {
          en: "Translates words like \"ignored\" or \"betrayed\" into the real feelings and needs behind them.",
          no: "Oversetter ord som «ignorert» eller «forrådt» til de egentlige følelsene og behovene bak.",
        },
      },
    ],
    exercises: [
      {
        id: "s2-feeling-or-thought",
        title: en("Feeling or thought?"),
        instructions: en(
          "Three times this week, stop for a moment and notice your body. Then name what you feel in one word. If your sentence sounds like \"I feel that…\", \"I feel like you…\" or \"I feel ignored\", it is probably a thought. Try again: what is the feeling underneath?",
        ),
      },
      {
        id: "s2-need-behind-strategy",
        title: en("The need behind the strategy"),
        instructions: en(
          "Pick something you want, for example \"I want my colleague to answer emails faster\". Ask yourself: if I got this, what would it give me? Keep asking until you reach a need that every human shares, such as ease, trust or respect.",
        ),
      },
    ],
  },
  {
    number: 3,
    title: en("Empathic Listening"),
    subtitle: en("Hearing the heart behind the words"),
    description: en(
      "What happens when someone feels truly heard? In this session we practise listening for the feelings and needs behind complaints, stories and experiences, including the needs that are met and the needs that aren't. You'll discover how much can shift when people feel understood rather than judged or fixed.",
    ),
    topics: [en("Building your empathy muscle"), en("Staying curious")],
    takeaways: en(
      "Empathy is a respectful understanding of what another person is experiencing. Our habit is to advise, reassure or explain our own view. Empathy asks us instead to empty our mind and listen with our whole being. A Buddhist saying puts it simply: \"Don't just do something, stand there.\" Whatever words people use, even judgments or complaints, we listen for their feelings and needs, and we can check our understanding by reflecting it back as a question. We stay with the other person until they have said what they need to say. A release of tension, or the words coming to an end, are signs that they feel heard. And when our own pain makes listening impossible, it is a sign that we need empathy ourselves first.",
    ),
    song: { title: "Stand There", sunoId: "b9bfefad-92ea-47d0-abe0-6814223ca249", url: "https://suno.com/s/OK9gOkBf7PjEWTZG" },
    resources: [
      book("s3-ch7", 7, "Receiving empathically"),
      rosenbergEpisode("s3-podcast-dynamics-of-empathy", "Dynamics of Empathy", "5v9tSglQutTmSDv0vwk2d2"),
    ],
    exercises: [
      {
        id: "s3-silent-empathy",
        title: en("Silent empathy"),
        instructions: en(
          "In one conversation this week, listen and guess silently: what might this person be feeling? What might they need? You don't need to say anything. Just notice how listening this way changes the conversation for you.",
        ),
      },
      {
        id: "s3-guess-out-loud",
        title: en("One empathy guess out loud"),
        instructions: en(
          "Once this week, try a short guess out loud: \"Are you feeling … because you need …?\" It doesn't have to be right. Notice what happens when the other person can correct you.",
        ),
      },
    ],
  },
  {
    number: 4,
    title: en("Requests"),
    subtitle: en("Asking for what we want, without demanding"),
    description: en(
      "Knowing our needs is only half the journey. The other half is asking for what would help. We'll practise making requests that are clear, concrete and doable, and look at the one question that separates a request from a demand: how we respond to a \"no\".",
    ),
    topics: [
      en("Requests for action, understanding and connection"),
      en("Requests vs. demands"),
      en("Hearing \"no\" as an opening, not a dead end"),
    ],
    takeaways: en(
      "Rosenberg suggests making requests in positive action language: say what we do want, not what we don't want, and be concrete enough that the other person knows what to do. When we are not sure we were understood, we can ask the other person to tell us what they heard. The big difference in this chapter is between a request and a demand. It is not in the words. It shows in how we respond when the other person says no. If we can listen with empathy to what stops them from saying yes, it was a request. This does not mean giving up on our need. The aim of NVC is not to get our way, but a relationship based on honesty and empathy, where everyone's needs matter.",
    ),
    song: { title: "A Question, Not a Cage", sunoId: "38dd63ae-2d21-4620-9afe-37faaaab7aaa", url: "https://suno.com/s/7L39aGKld93n6xM5" },
    resources: [book("s4-ch6", 6, "Requesting that which would enrich life")],
    exercises: [
      {
        id: "s4-wish-to-request",
        title: en("From wish to request"),
        instructions: en(
          "Write down a wish, for example \"I want more respect\". Now make it a request: say what you want (not what you don't want), make it concrete, and make it something the person can do now. Start with \"Would you be willing to…?\"",
        ),
      },
      {
        id: "s4-hearing-no",
        title: en("What is behind the no?"),
        instructions: en(
          "The next time someone says no to you this week, guess what they are saying yes to. Which need of theirs might the no protect?",
        ),
      },
    ],
  },
  {
    number: 5,
    title: en("Putting It All Together"),
    subtitle: en("OFNR in real life"),
    description: en(
      "Now we connect the pieces: observations, feelings, needs and requests. We'll use them both to express ourselves honestly and to listen with empathy. Come prepared with a real situation from your life that you'd like to work with. This is where the model becomes a living practice.",
    ),
    topics: [
      en("Using OFNR for honest expression and empathic listening"),
      en("Practising with real-life situations"),
    ],
    takeaways: en(
      "In this episode you can hear Marshall Rosenberg present the four-part model in his own words. The key takeaway is that the same four parts work in both directions. When we express ourselves, we share what we observe, how we feel, what we need, and what we would like to ask for. When we listen, we guess the other person's observation, feeling, need and request. In real conversations we move back and forth between the two, and often empathy has to come first: the more we hear others, the more they can hear us. The four parts support the intention to connect. With practice, they can be said in everyday words.",
    ),
    resources: [rosenbergEpisode("s5-podcast-4-part-model", "The 4 Part NVC Model", "2PXhRKCE0ls0c4zZS0FlKp")],
    exercises: [
      {
        id: "s5-prepare-situation",
        title: en("Prepare your situation"),
        instructions: en(
          "Before the session, choose a real situation you'd like to work with. Write it in four short lines: what happened (O), what you felt (F), what you needed (N), and what you would like to ask for (R).",
        ),
      },
      {
        id: "s5-listen-ofnr",
        title: en("Listen in four steps"),
        instructions: en(
          "When someone tells you about something difficult this week, listen for their four parts: what happened, what they feel, what they need, and what they might want. Guess one of them out loud.",
        ),
      },
    ],
  },
  {
    number: 6,
    title: en("Self-Empathy"),
    subtitle: en("Meeting ourselves with kindness"),
    description: en(
      "The harshest voice many of us hear is our own. In this session we turn NVC inward. You'll learn to translate self-judgment into feelings and needs, and to grow understanding for different parts of yourself. We'll use chair work to give each inner voice a place to be heard.",
    ),
    topics: [
      en("Recognising the inner \"jackal\" and translating self-judgment"),
      en("Mourning vs. self-blame"),
      en("Chair work: dialogue between inner parts"),
    ],
    takeaways: en(
      "Rosenberg sees the way we treat ourselves as perhaps the most important use of NVC. When we make mistakes, our inner voice often judges: \"I'm so stupid\", \"I should have…\". NVC invites us to translate these self-judgments into feelings and needs. In NVC mourning, we connect with the needs that were not met by what we did. In self-forgiveness, we connect with the needs we were trying to meet when we did it. Change then comes from care for ourselves and others, not from shame or guilt. Rosenberg also suggests turning \"I have to\" into \"I choose to … because I want …\", so that we act from the joy of contributing to life, rather than from fear, guilt, shame or duty.",
    ),
    song: { title: "Face Myself", sunoId: "c18de4a6-010f-4c16-9632-8337510852b3", url: "https://suno.com/s/3a6VYVB8N1wQkEi7" },
    resources: [
      book("s6-ch9", 9, "Connecting compassionately with ourselves"),
      rosenbergEpisode("s6-podcast-communicate-with-ourselves", "How We Communicate with Ourselves", "31VbjKJgmuPR68X0eAUtrt"),
    ],
    exercises: [
      {
        id: "s6-translate-jackal",
        title: en("Translate your inner jackal"),
        instructions: en(
          "Write down one harsh thing you say to yourself, for example \"I'm so stupid\". Then ask: what do I feel? Which of my needs was not met? And which need was I trying to meet when I did what I did?",
        ),
      },
      {
        id: "s6-mourning",
        title: en("Mourning instead of blaming"),
        instructions: en(
          "Think of something you regret. Instead of blaming yourself, take a few minutes to feel the sadness of the unmet need. Notice how mourning feels different from self-blame.",
        ),
      },
    ],
  },
  {
    number: 7,
    title: en("Empathy and Not-Empathy"),
    subtitle: en("Refining our listening"),
    description: en(
      "Most of us respond to others with good intentions: advice, comfort, stories of our own, questions. Yet these can leave people feeling unheard. We'll explore our habitual responses with curiosity rather than judgment, and practise staying with empathy a little longer than feels natural.",
    ),
    topics: [
      en("Empathy vs. deflective responses (sympathy, advice, fixing, educating, interrogating, one-upping)"),
      en("Recognising your own listening habits"),
    ],
    takeaways: en(
      "Chapter 8 shows what empathy can do. Being heard can heal, and it makes it easier to be vulnerable. Empathy can even help in dangerous moments, as Rosenberg's stories show. When someone says \"no\", empathy keeps us from taking it personally: we listen for the feelings and needs behind the no, for what the person wants that stops them from saying yes. Empathy can also bring a lifeless conversation back to life, and help us stay present with silence. The book also names habits that block empathy, even when we mean well: advising, one-upping, educating, consoling, storytelling, shutting down and others. Noticing our own favourite habits, without judging them, is the first step to staying with the other person a little longer.",
    ),
    song: { title: "Let the Silence Be", sunoId: "a0d35ec4-a54a-474d-8afe-ca0ae37dd7e5", url: "https://suno.com/s/GukcN1ntqeStWWbE" },
    resources: [
      book("s7-ch8", 8, "The power of empathy"),
      rosenbergEpisode("s7-podcast-power-of-empathy", "The Power of Empathy", "54vjDfY6WGHUoDCZChduI8"),
    ],
    exercises: [
      {
        id: "s7-notice-habit",
        title: en("Notice your listening habit"),
        instructions: en(
          "This week, notice what you usually do when someone shares a problem: give advice, comfort, tell your own story, ask questions, explain? No judgment — just notice, with curiosity.",
        ),
      },
      {
        id: "s7-one-more-moment",
        title: en("Stay a little longer"),
        instructions: en(
          "The next time you notice the urge to advise or fix, stay with empathy for one more moment first. Reflect what you hear, then see what the person needs.",
        ),
      },
    ],
  },
  {
    number: 8,
    title: en("Challenging Dialogues"),
    subtitle: en("Staying connected when it matters most"),
    description: en(
      "NVC is easy when everyone is calm. The real test comes when we think we are criticised, feel triggered or stuck. We'll practise pausing, using emergency self-empathy, hearing anger and criticism as expressions of needs, and saying a clear \"no\". Bring a conversation you dread, or one that didn't go the way you hoped.",
    ),
    topics: [
      en("Handling triggers and emergency self-empathy"),
      en("Receiving criticism and anger"),
      en("Expressing a \"no\" while staying connected"),
    ],
    takeaways: en(
      "Rosenberg's key point about anger: what others do is the stimulus, never the cause. The cause lies in our own thinking, in judgments about what others should or shouldn't do. Every anger has a life-serving core: a need that is not met. To express anger fully, he suggests four steps: stop and breathe, identify the judgmental thoughts, connect with the needs behind them, and then express our feelings and unmet needs. Often we need to offer the other person empathy first, because the more we hear them, the more they will be able to hear us. Blaming and punishing are only surface ways of expressing anger. And we need to take our time, because habits of judging run deep.",
    ),
    song: { title: "Stop and Breathe", sunoId: "ec748411-f48d-4771-9629-dc30eb10ac04", url: "https://suno.com/s/C64uN0l04Ze1oUA9" },
    resources: [book("s8-ch10", 10, "Expressing anger fully")],
    exercises: [
      {
        id: "s8-emergency-self-empathy",
        title: en("Emergency self-empathy"),
        instructions: en(
          "When you feel triggered this week, try this: stop and breathe. Notice what happens in your body. Hear the judging thought. Then ask: what am I feeling, and what do I need right now?",
        ),
      },
      {
        id: "s8-criticism-as-need",
        title: en("Hearing criticism as a need"),
        instructions: en(
          "Write down a criticism you received recently. Then guess: what might the other person have been feeling, and which need of theirs was not met?",
        ),
      },
      {
        id: "s8-connected-no",
        title: en("A no with connection"),
        instructions: en(
          "Think of a request you want to say no to. Write your no so it includes the need you are saying yes to, and a request that keeps the conversation open: \"No, because I need… Would you be willing to…?\"",
        ),
      },
    ],
  },
  {
    number: 9,
    title: en("Training of Trainers I"),
    subtitle: en("Sharing NVC with others"),
    description: en(
      "How do you bring NVC into your family, workplace or community? We'll look at ways to share what you've learned, including how to explain the basics simply and how to guide short exercises. We'll also explore how to stay in your own learning while supporting others in theirs.",
    ),
    topics: [
      en("Sharing NVC in your own contexts"),
      en("Guiding simple exercises"),
      en("Learning while teaching"),
    ],
    resources: [],
    exercises: [
      {
        id: "s9-explain-simply",
        title: en("NVC in one minute"),
        instructions: en(
          "Write how you would explain NVC to a friend in three or four short sentences, using everyday words. Try it on someone this week.",
        ),
      },
      {
        id: "s9-plan-exercise",
        title: en("Plan a short exercise"),
        instructions: en(
          "Choose one exercise from this course. Write down how you would introduce it, the steps, and how much time it needs. You may get to facilitate it in the next session.",
        ),
      },
    ],
  },
  {
    number: 10,
    title: en("Training of Trainers II"),
    subtitle: en("Practising facilitation"),
    description: en(
      "Time to try it out. Participants take turns facilitating short NVC exercises and receive supportive, needs-based feedback. It's a safe space to experiment, stumble and grow, and to gain confidence in passing NVC on.",
    ),
    topics: [en("Facilitating exercises in small groups"), en("Giving and receiving feedback the NVC way")],
    resources: [],
    exercises: [
      {
        id: "s10-feedback-ofnr",
        title: en("Feedback to yourself, the NVC way"),
        instructions: en(
          "After you facilitate, give yourself feedback in four steps: what you observed, how you feel about it, which needs were met and which were not, and one request to yourself for next time.",
        ),
      },
      {
        id: "s10-next-step",
        title: en("Your next step"),
        instructions: en(
          "What do you want to keep practising after the course? Who could you practise with? Write down one small, concrete step for the coming month.",
        ),
      },
    ],
  },
];

export function getSession(sessionNumber: number): Session | undefined {
  return sessions.find((session) => session.number === sessionNumber);
}

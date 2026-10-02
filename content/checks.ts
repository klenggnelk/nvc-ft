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

const en = (text: string): Localized => ({ en: text });
const st = (text: string, answer: Side, why: string): CheckStatement => ({ text: en(text), answer, why: en(why) });

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
    intro: en("An observation is what a camera could record. An evaluation adds our own opinion to it."),
    statements: [
      st("You arrived at 9:20. The meeting started at 9:00.", "a", "Two times that a clock can show. There is no opinion in it."),
      st(
        "You are always late.",
        "b",
        "\"Always\" is a generalisation, and \"late\" is a judgment. An observation would be: \"You arrived after nine three times this week.\"",
      ),
      st(
        "He ignored me in the meeting.",
        "b",
        "\"Ignored\" is a guess about what he intended. A camera would see: \"He did not look at me or answer when I spoke.\"",
      ),
      st("She said: \"I don't have time today.\"", "a", "It repeats her exact words. A microphone could record this."),
      st(
        "My son is lazy with his homework.",
        "b",
        "\"Lazy\" is a label. An observation would be: \"He has not opened his school books this week.\"",
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
    intro: en(
      "A value judgment says what is important to me. A moralistic judgment says who is right or wrong, good or bad.",
    ),
    statements: [
      st("Honesty is very important to me.", "a", "It tells what the speaker values. Nobody is judged."),
      st("People who lie are bad people.", "b", "It sorts people into good and bad."),
      st(
        "It was wrong of you to leave early.",
        "b",
        "It says the other person did something wrong. A value version: \"I value finishing things together.\"",
      ),
      st(
        "I care a lot about fairness, and I didn't like how the work was shared.",
        "a",
        "The speaker names a value and their own reaction. The other person is not called wrong.",
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
    intro: en(
      "Life-connected language speaks about feelings and needs. Life-alienated language uses the 4 Ds: diagnosis, denial of responsibility, deserve thinking and demands.",
    ),
    statements: [
      st("I had to do it. I had no choice.", "b", "This is denial of responsibility: the speaker hides their own choice."),
      st("You're so selfish.", "b", "This is a diagnosis: a label that says what is wrong with the other person."),
      st(
        "I'm tired, and I would like some help with the dishes.",
        "a",
        "The speaker shares a feeling and asks for something concrete. There is no blame.",
      ),
      st("He deserves to be punished for that.", "b", "This is deserve thinking: some people should be rewarded and others punished."),
      st(
        "Are you worried because you want everyone to be safe?",
        "a",
        "The speaker guesses the other person's feeling and need. That builds connection.",
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
    intro: en(
      "A feeling is something I can sense in my body. A thought often hides behind \"I feel that…\", \"I feel like…\" or words that say what others do to me.",
    ),
    statements: [
      st("I feel sad.", "a", "Sad is a feeling. It says nothing about anyone else."),
      st(
        "I feel that you don't care about me.",
        "b",
        "\"I feel that…\" starts a thought about the other person. The feeling underneath could be sad or lonely.",
      ),
      st(
        "I feel ignored.",
        "b",
        "\"Ignored\" is a faux feeling: it says what I think you are doing to me. The feeling could be hurt or lonely.",
      ),
      st("I feel nervous and a little shaky.", "a", "Both words describe what is happening inside the speaker's body."),
      st(
        "I feel like a failure.",
        "b",
        "This is a thought about myself. The feeling underneath could be disappointed or discouraged.",
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
    intro: en(
      "A need is universal: every human has it, and it does not depend on a certain person or action. A request is a strategy: one concrete way to meet a need.",
    ),
    statements: [
      st("I need rest.", "a", "Rest is a need all people share. There are many ways to meet it."),
      st(
        "I need you to call me every evening.",
        "b",
        "This names a person and an action, so it is a strategy. The need behind it could be connection.",
      ),
      st("I need support.", "a", "Support is a universal need. It does not say who must do what."),
      st("Would you be willing to cook dinner tonight?", "b", "This is a concrete request to one person: one way to meet a need."),
      st(
        "I need a new car.",
        "b",
        "A car is a strategy. The needs behind it could be ease, safety or freedom of movement.",
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
    intro: en(
      "What other people do can be the stimulus for our feelings, but not the cause. The cause is our own needs. How does each sentence see the other person's action?",
    ),
    statements: [
      st("You make me so angry.", "b", "The other person is named as the cause of the feeling."),
      st(
        "When you came home at midnight, I felt worried, because I want to know you are safe.",
        "a",
        "The action is the stimulus. The cause is the speaker's own need for safety.",
      ),
      st(
        "I'm disappointed because you didn't come.",
        "b",
        "\"Because you…\" puts the cause in the other person. Try: \"…because I was looking forward to time together.\"",
      ),
      st(
        "I felt hurt when I heard that, because I want my effort to be seen.",
        "a",
        "\"Because I want…\" connects the feeling to the speaker's own need.",
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
    intro: en(
      "Empathy means staying present with what the other person feels and needs. Sympathy, advice and comfort are other responses. They are often kind, but they are not empathy.",
    ),
    situation: en("A friend says: \"I lost my job last week.\""),
    statements: [
      st("Oh no, poor you. I feel so sorry for you.", "b", "This is sympathy. The attention moves to the listener's own feelings."),
      st("Are you worried, because you need some security?", "a", "A guess about the friend's feeling and need. The attention stays with the friend."),
      st("You should update your CV right away.", "b", "This is advice. It may help later, but first the friend may want to be heard."),
      st("Are you feeling shocked?", "a", "A simple, open guess about what the friend is feeling."),
      st("Don't worry, you'll find something better.", "b", "This is reassurance. It tries to take the feeling away."),
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
    intro: en(
      "Empathic sensing comes from the heart: I am present and curious about what is alive in you. Intellectual guessing comes from the head: I analyse you or look for the right label.",
    ),
    statements: [
      st(
        "While she talks, I think about which need on the list fits her best.",
        "b",
        "The listener is busy in their head with finding the right word, and less present with her.",
      ),
      st(
        "I listen with my whole attention and ask softly: \"Are you longing to be understood?\"",
        "a",
        "The guess comes from presence, and it is offered as a question.",
      ),
      st(
        "I tell him: \"Your real problem is that you need recognition.\"",
        "b",
        "This is analysis. The listener tells him what is true about him, without asking.",
      ),
      st(
        "I'm not sure my guess is right, and that's fine. I'm curious what she will say.",
        "a",
        "Curiosity matters more than being right. A wrong guess still shows that I care.",
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
    intro: en(
      "The words can be the same. It is a request when a \"no\" is welcome. It is a demand when a \"no\" leads to blame, guilt or punishment.",
    ),
    statements: [
      st(
        "Would you be willing to turn the music down? Please tell me if that doesn't work for you.",
        "a",
        "The speaker makes it clear that a \"no\" is welcome.",
      ),
      st("Turn the music down, or I'll take your phone.", "b", "A threat of punishment makes it a demand."),
      st("If you really cared about me, you would come.", "b", "Guilt is used as pressure. A \"no\" would mean \"you don't care\"."),
      st(
        "She asks: \"Could you send the report by Friday?\" He says no. She replies: \"OK. What would work for you?\"",
        "a",
        "We see it in how she meets the \"no\": with curiosity, not blame.",
      ),
      st(
        "He asks: \"Can you help me move on Saturday?\" She says no. He doesn't speak to her for a week.",
        "b",
        "It sounded like a request, but the \"no\" was punished. So it was a demand.",
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
    intro: en(
      "After a \"no\", persisting means I keep caring about my need and also about yours, and we look for another way. Demanding means I push until you give in.",
    ),
    statements: [
      st(
        "I hear that Saturday doesn't work for you. This still matters to me. Can we look for another day?",
        "a",
        "The speaker accepts the \"no\" and stays with their own need.",
      ),
      st("I'll keep asking until you say yes.", "b", "The aim is to make the other person give in."),
      st(
        "What is behind your no? I'd like to find something that works for both of us.",
        "a",
        "The speaker keeps going with care for both people's needs.",
      ),
      st("You said no, but you owe me this.", "b", "Pressure through duty. The \"no\" is not accepted."),
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
    intro: en(
      "Giraffe honesty shares my observation, feeling, need and request. Jackal honesty tells you what I think is wrong with you.",
    ),
    statements: [
      st("Honestly? You're a terrible listener.", "b", "It is honest about a judgment, not about the speaker's feelings and needs."),
      st(
        "When you looked at your phone while I was speaking, I felt sad, because I want to be heard. Would you put it away for ten minutes?",
        "a",
        "All four steps are there: observation, feeling, need and request.",
      ),
      st("I'm just being honest: that idea is stupid.", "b", "\"Stupid\" is a judgment of the idea. We don't learn what the speaker needs."),
      st(
        "I feel uneasy about this plan, because I need more clarity about the costs. Could we go through the numbers?",
        "a",
        "The speaker is honest about their own feeling and need, and makes a doable request.",
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
    intro: en(
      "Classical Giraffe uses the four steps in a clear order, which is good for learning. Idiomatic Giraffe has the same intention, in everyday words.",
    ),
    statements: [
      st(
        "When I see socks on the floor, I feel frustrated, because I need order. Would you be willing to put them in the basket?",
        "b",
        "The four steps follow each other in the formal order.",
      ),
      st("Rough day? Want to tell me about it?", "a", "An empathy guess in everyday words. The intention to connect is the same."),
      st(
        "Hey, I'd love some help with the dishes. I'm really tired tonight. OK for you?",
        "a",
        "Feeling, need and request are all there, in natural everyday language.",
      ),
      st(
        "When you say that, I feel worried, because I need trust. Would you tell me what you heard me say?",
        "b",
        "This follows the formal model step by step.",
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
    intro: en(
      "Habitual is what we have learned and are used to. Natural is giving from the heart, in a way that serves life. NVC can feel strange at first and still be natural.",
    ),
    statements: [
      st("I say sorry at once, without thinking, so that nobody gets upset.", "b", "An automatic habit, learned to keep the peace."),
      st("A small child shares her food with joy when she sees that someone is hungry.", "a", "Giving from the heart, before any rule was learned."),
      st(
        "I blame myself when something goes wrong. I have done that since I was a child.",
        "b",
        "Self-blame is learned. It feels normal because it is familiar, not because it is natural.",
      ),
      st("I help my neighbour because I enjoy contributing, not because I must.", "a", "The joy of contributing is what Rosenberg calls our natural way of giving."),
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
    intro: en(
      "Self-empathy means I stop and connect with what I feel and need. The other ways: acting out (I throw the feeling at others), repressing (I push it away) and wallowing (I stay stuck in the story).",
    ),
    statements: [
      st("I'm furious, so I slam the door and shout at my partner.", "b", "This is acting out: the feeling is thrown at someone else."),
      st("I tell myself: \"It's nothing. Just keep working.\"", "b", "This is repressing: the feeling is pushed away."),
      st(
        "I notice that my chest is tight. I'm disappointed. I wanted to be included.",
        "a",
        "The speaker notices the body, names the feeling and finds the need.",
      ),
      st(
        "For days I think again and again about how unfair it all is.",
        "b",
        "This is wallowing: staying in the story, without reaching the need.",
      ),
      st("I take three breaths and ask myself: what do I need right now?", "a", "A pause and a turn inward, towards the need."),
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
    intro: en(
      "When I submit, I do it because I \"have to\". When I rebel, I refuse because nobody should tell me what to do. In both, someone else still decides for me. Choice means I act from my own needs.",
    ),
    statements: [
      st("I have to visit my mother every Sunday.", "b", "\"Have to\" is submission. The speaker's own reason is missing."),
      st(
        "I choose to visit my mother, because connection with her matters to me.",
        "a",
        "The same action, now chosen and connected to a need.",
      ),
      st(
        "Nobody tells me what to do. I'm not going, just because they asked.",
        "b",
        "This is rebellion. The \"no\" is still a reaction to the other person, not a free choice.",
      ),
      st("I say no to the extra shift, because I want to protect my rest.", "a", "A \"no\" that comes from the speaker's own need."),
      st("I say yes so that they won't be angry with me.", "b", "This is submission: a yes that comes from fear."),
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
    intro: en(
      "A closer look at our listening habits. Which responses stay with the other person, and which ones move away, even with good intentions?",
    ),
    situation: en(
      "A colleague says: \"I worked all weekend on the report, and my boss didn't even say thank you.\"",
    ),
    statements: [
      st("That's nothing. Last year I worked through my whole holiday.", "b", "This is one-upping: the story becomes about the listener."),
      st(
        "Are you disappointed, because you would like your effort to be seen?",
        "a",
        "A guess about the colleague's feeling and need.",
      ),
      st("Have you told her how you feel?", "b", "This is a question that leads towards advice. It moves away from what is alive right now."),
      st("Bosses are like that. That's how the system works.", "b", "This is explaining or educating. The colleague's feelings are left alone."),
      st("I know exactly how you feel.", "b", "It sounds close to empathy, but the attention moves to the listener's own experience."),
      st("You stay silent and keep your full attention on her.", "a", "Silent empathy. Presence does not need words."),
      st("At least you still have a job.", "b", "This is consoling by making the problem smaller."),
      st("So you put in a lot, and you long for some appreciation?", "a", "It reflects what she said and guesses the need behind it."),
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
    intro: en(
      "Power over: I use my position, punishment or reward to get my way. Power with: we look for a way that works for everyone.",
    ),
    statements: [
      st("I'm the manager. We do it my way.", "b", "Position is used to decide for others."),
      st("If you finish your homework, you get a sweet.", "b", "A reward is also power over: it steers the other person from outside."),
      st(
        "This matters to me, and I want to hear what matters to you before we decide.",
        "a",
        "Both people's needs are part of the decision.",
      ),
      st("Let's find a plan that works for both of us.", "a", "The power is shared."),
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
    intro: en(
      "Protective force is used only to prevent harm. Punitive force is used to make someone suffer for what they did, so that they \"learn a lesson\".",
    ),
    statements: [
      st("A mother grabs her child's arm to stop him from running into the road.", "a", "The only aim is to keep the child safe."),
      st(
        "A father takes away his daughter's phone for a week because she was rude.",
        "b",
        "The aim is that she suffers and learns a lesson.",
      ),
      st("A teacher steps between two fighting pupils and holds one of them back.", "a", "Force is used to stop harm, without blame."),
      st(
        "After the meeting, I stop speaking to my colleague, so that she feels how wrong she was.",
        "b",
        "Silence is used as punishment.",
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
    intro: en(
      "In a compromise, each person gives up something and often stays a little unhappy. In a shift, I connect with the other person's needs, and what I want really changes.",
    ),
    statements: [
      st(
        "Fine. We go to your parents this year and to mine next year. But I'm not happy about it.",
        "b",
        "A trade. The speaker gives something up and stays unhappy.",
      ),
      st(
        "When I understood how much you need rest, I really wanted to stay home with you.",
        "a",
        "The wish itself changed after connecting with the other person's need.",
      ),
      st("We both gave up half. Nobody got what they wanted.", "b", "Each person lost something. That is a compromise."),
      st("After hearing why it matters to her, I no longer wanted my first plan.", "a", "Something moved inside. The new plan is given freely."),
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
    intro: en(
      "Doing Giraffe is using the method and the right words. Being Giraffe is the intention to connect, with or without the words.",
    ),
    statements: [
      st(
        "I say the four steps correctly, but inside I just want him to admit that he is wrong.",
        "b",
        "The form is there, but the intention is to win, not to connect.",
      ),
      st("I say nothing, and I am fully present with her pain.", "a", "No method is visible. The intention to connect is fully there."),
      st("I correct my friend: \"That's not a feeling, that's a thought!\"", "b", "NVC is used as a rule to correct someone. The connection is lost."),
      st("My words come out clumsy, but I really want to understand him.", "a", "The intention matters more than perfect words."),
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
    intro: en(
      "Obedience: I do it because someone with power says so, or because I fear what will happen. Self-discipline: I do it because I see how it serves needs I care about.",
    ),
    statements: [
      st("I practise every day because the trainer said we must.", "b", "The reason is outside the speaker: someone said so."),
      st("I practise every day because I see how it helps my relationships.", "a", "The reason comes from the speaker's own needs."),
      st("The children are quiet because they are afraid of being punished.", "b", "Fear of punishment creates obedience."),
      st(
        "Our group agreed on the start time together, and I come on time because I care about our shared time.",
        "a",
        "The speaker follows the agreement from the inside, because of what they value.",
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
    intro: en(
      "I respect an authority when I value what the person knows or offers. I fear an authority when the person can punish or reward me.",
    ),
    statements: [
      st("I listen to her because she has a lot of experience that I want to learn from.", "a", "The speaker values what she offers."),
      st("I don't ask questions, because the teacher might think I'm stupid.", "b", "Fear of being judged keeps the speaker silent."),
      st("I agree with my boss in meetings, so that I don't get into trouble.", "b", "The agreement comes from fear of what could happen."),
      st("I tell the trainer that I see it differently, and I'm curious about his view.", "a", "With respect, there is room to disagree and stay curious."),
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
    intro: en(
      "Praise judges the person, even when it is positive: \"You are good.\" Appreciation tells what the person did, how I feel about it, and which need of mine was met.",
    ),
    statements: [
      st("Great job! You're a natural facilitator.", "b", "A positive judgment of the person. We don't learn what she did or how it helped."),
      st(
        "When you waited in silence after your question, I felt calm and had space to think. Thank you.",
        "a",
        "It names what the person did, the feeling, and the need that was met.",
      ),
      st("You're so good at this.", "b", "A compliment. It is kind, but it is still a judgment."),
      st(
        "When you gave that example from your own life, I understood the exercise much better. I'm grateful.",
        "a",
        "A concrete action, and how it made the speaker's life better.",
      ),
      st("That was perfect. Ten out of ten.", "b", "A grade. It puts the speaker in the role of judge."),
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
    intro: en(
      "Vulnerability is showing what is alive in me. It takes courage, and it builds connection. When we see feelings as weakness, we hide them.",
    ),
    statements: [
      st(
        "I'm nervous, and I tell the group: \"This is my first time guiding an exercise.\"",
        "a",
        "The speaker shows what is alive in them. That invites connection.",
      ),
      st(
        "I hide that I lost my place, because a trainer must never look unsure.",
        "b",
        "Being unsure is seen as weakness, so it is hidden.",
      ),
      st("I say: \"I don't know the answer. Can we explore it together?\"", "a", "Not knowing is shared openly, with trust in the group."),
      st("If I show that I'm sad, they will stop respecting me. So I smile.", "b", "The feeling is seen as weakness and covered with a smile."),
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
    intro: en(
      "Dependence: I can't manage without you. Independence: I need nobody. Interdependence: my needs and your needs both matter, and we support each other by choice.",
    ),
    statements: [
      st("I can't facilitate unless you tell me exactly what to do.", "b", "This is dependence: the speaker gives away their own power."),
      st("I don't need feedback from anyone. I do it my way.", "b", "This is independence: the speaker closes the door to others."),
      st("I'd like your feedback, and I'll decide myself what I do with it.", "a", "The speaker is open to others and keeps their own choice."),
      st("We plan the exercise together: you bring the idea, and I keep the time.", "a", "Each person contributes, and both needs count."),
    ],
  },
];

export function checksForSession(sessionNumber: number): Check[] {
  return checks.filter((check) => check.session === sessionNumber);
}

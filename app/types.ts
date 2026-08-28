export type CardTag =
  | 'v-arbeit'
  | 'v-buero'
  | 'v-ansage'
  | 'v-wohnen'
  | 'v-gesund'
  | 'v-reise'
  | 'koll'
  | 'gramm'
  | 'falle'
  | 'brief'
  | 'digital'
  | 'thema'

export interface Card {
  tag: CardTag
  /** Front of the card. Never the answer in disguise — see NOTES.md on difficulty. */
  cue: string
  /** The German side: the word, the correction, the rule. */
  answer: string
  /**
   * Cloze cards only: the cue with the hole filled in. Exists for the ear, not
   * the eye — heard, `Ich erkundige mich ___ dem Preis` is a sentence with a
   * stumble in it and no solution ever arrives. The screen doesn't need this
   * (the answer is right there); the audio can't work without it.
   */
  loesung?: string
  /**
   * Plain English. The German answer alone is useless on a word you have never
   * met — you cannot check yourself against an explanation you also don't
   * understand. Every card carries one, including the grammar cards.
   */
  meaning: string
  /**
   * Worked examples, ordered easiest first: a bare phrase or collocation, then
   * full sentences. The order is the teaching — you meet the word in the
   * smallest unit that still carries it (`jemanden ausnutzen`) before you meet
   * it inside a sentence whose word order you also have to hold.
   *
   * The renderer styles by position, so index 0 must always be the short one.
   * May carry `<b>` around the target word; the speech layer strips it.
   */
  examples?: string[]
  /** Where this came from: a ledger number, an exam item. Keeps drills honest. */
  hint?: string
  /**
   * Kern des Themenfelds. A 20-card evening ignores how memory works — nobody
   * holds 20 new words from one sitting ("I can't memorize 200 things",
   * 2026-08-17). A drill therefore serves only the core until every core card
   * has sat once; the rest is the Ausbau and stays locked until then.
   */
  core?: boolean
}

/** Where the block happens. The place is the cue, not the clock. */
export type Place = 'gym' | 'sofa' | 'bed'

export interface Slot {
  place: Place
  what: string
  /**
   * The same instruction in English, shown when the reader asks for it (see
   * `useEnglish`). A gloss, not a translation: what to do, in one line.
   */
  en?: string
  note?: string
  minutes: number
  /**
   * The work itself, carried by the block that asks for it. A block that says
   * „Teil 2, mit Uhr" and then makes you hunt for the audio at the bottom of the
   * page is a block you skip — so the material lives here, not in a footer.
   */
  /** Card round: the tags to drill, or `true` for the day's own deck. */
  karten?: CardTag[] | true
  /** Episode ids from `data/hoeren` to sit and do in this block. */
  hoeren?: string[]
  /** Show the device's own imported MP3s here (licensed audio, never in the repo). */
  dateien?: boolean
  /**
   * The exact file this block wants, e.g. `telc-ut1-hv.mp3`. Once a file of that
   * name is on the device the block plays it straight away instead of asking for
   * an import again — the panel is not a to-do, it is this evening's audio.
   *
   * Only ever a *filename*. The recording itself is a TTS rendering of a
   * copyrighted telc transcript and lives in the private repo.
   */
  datei?: string
}

export type DayKind = 'class' | 'day' | 'big' | 'exam' | 'rest'

/**
 * The Sprechen Teil 2 topic spoken in class that evening. A topic is always a
 * *pair* of person-cards — that is the exam shape: two candidates get the same
 * theme from different sides, then discuss it.
 *
 * `cards` stays labels only (name, age, role). The readable material — an
 * original quote, a described photo, the topic's toolkit — lives in
 * `data/themen.ts`, keyed by date. The handout's actual photos and quotes stay
 * out of this public repo; what ships is rewritten, same stance, own words.
 */
export interface Thema {
  title: string
  cards: [string, string]
}

/**
 * A Teil 3 task exactly as the telc paper prints it: situation, then a
 * Stichpunkt list. Prose was the wrong shape — the exam never hands you a
 * finished sentence to plan from, it hands you `Wann?` `Wo?` `Wer bezahlt?`
 * and expects you to talk every item through and agree at the end.
 */
export interface Planung {
  /** Sie-form, 2–4 sentences, ends „Sie haben sich schon diese Liste gemacht:" */
  situation: string
  /** The situation in English (the EN toggle). */
  en: string
  titel: string
  /** Short Stichpunkte; the last one is always '…'. */
  punkte: string[]
}

export interface Day {
  /** ISO date, and the identity of the day everywhere in storage. */
  date: string
  kind: DayKind
  headline: string
  tagline?: string
  needs?: string[]
  slots: Slot[]
  deck: CardTag[]
  /** Course evenings only: tonight's Sprechen Teil 2 topic. */
  thema?: Thema
  /**
   * Tonight's Teil 3 planning task, in the exam's own shape. Chosen to sit next
   * to the same evening's Teil 2 topic, so one word field carries both halves
   * of the speaking hour.
   */
  aufgabe?: Planung
  /** Shows the one-time setup banner. */
  setup?: boolean
}

/** The distractor a statement is built on — named so a miss teaches a category. */
export type Trap = 'paraphrase' | 'wortgleichheit' | 'absolutizer' | 'negation' | 'inferenz' | 'detail'

export interface EpisodeItem {
  n: number
  text: string
  /** '+' = richtig, '−' = falsch (U+2212). */
  solution: '+' | '−'
  trap: Trap
  why: string
}

export interface Episode {
  id: string
  title: string
  teil: string
  /** Filename under public/audio. Original material only — nothing licensed. */
  file: string
  seconds: number
  /** telc Teil 1 is heard once; Teil 2 and 3 twice. */
  once: boolean
  instructions: string
  items: EpisodeItem[]
  transcript: string
}

export const TRAP_NAMES: Record<Trap, string> = {
  paraphrase: 'Paraphrase',
  wortgleichheit: 'Wortgleichheit',
  absolutizer: 'Absolutizer',
  negation: 'Verneinung',
  inferenz: 'Inferenz',
  detail: 'Detail',
}

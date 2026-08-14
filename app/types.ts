export type CardTag =
  | 'v-arbeit'
  | 'v-buero'
  | 'v-ansage'
  | 'koll'
  | 'gramm'
  | 'falle'
  | 'brief'

export interface Card {
  tag: CardTag
  /** Front of the card. Never the answer in disguise — see NOTES.md on difficulty. */
  cue: string
  answer: string
  example?: string
  /** Where this came from: a ledger number, an exam item. Keeps drills honest. */
  hint?: string
}

/** Where the block happens. The place is the cue, not the clock. */
export type Place = 'gym' | 'sofa' | 'bed'

export interface Slot {
  place: Place
  what: string
  note?: string
  minutes: number
}

export type DayKind = 'class' | 'day' | 'big' | 'exam' | 'rest'

export interface Day {
  /** ISO date, and the identity of the day everywhere in storage. */
  date: string
  kind: DayKind
  headline: string
  tagline?: string
  needs?: string[]
  slots: Slot[]
  deck: CardTag[]
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

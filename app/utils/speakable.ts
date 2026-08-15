import type { Card } from '~/types'

/**
 * How a card becomes sound.
 *
 * This module is shared, on purpose, by two things that must never drift apart:
 * the browser-speech fallback in `useSpeech.ts`, and the offline synthesizer in
 * the private repo (`tools/wortschatz-audio.ts`) that bakes the Gemini MP3s.
 * If the two disagreed about what a card says, a re-synth would quietly change
 * the audio out from under a card and nobody would notice until the gym.
 *
 * It deliberately imports nothing but a type, so plain `node` can load it.
 */

/** One thing to say, in one language. */
export interface Line {
  text: string
  lang: 'de' | 'en'
  /** Silence *before* this line, in ms. Where the self-test gap goes. */
  gap?: number
  /**
   * How it is *said*. A single vocabulary item is announced — slowly, with the
   * article audible. A sentence, a rule or a Redemittel has to be read at
   * conversational speed, because that is the speed the exam plays it at: read
   * „so bald wie möglich" one word at a time and you have taught the ear a
   * shape it will never meet again. Defaults to `satz` — only a bare headword
   * earns `wort`.
   */
  as?: 'wort' | 'satz'
}

export const LANGS = { de: 'de-DE', en: 'en-US' } as const

/**
 * Card text is written to be read with the *eyes*. The meaning field is a
 * dictionary entry, not a sentence — `to employ · sich ~ mit = to occupy
 * oneself with` — and a synthesizer reads that literally: "tilde", "equals",
 * and a run of German words in an American accent. Notation has to become
 * words, or punctuation, before it reaches any voice.
 */
export function speakable(html: string, lang: 'de' | 'en' = 'en') {
  const de = lang === 'de'
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;|&/g, de ? ' und ' : ' and ')
    // A cloze blank is a hole you see. Heard, it has to be a hole you *hear* —
    // a comma buys the prosodic gap without anyone saying "underscore".
    .replace(/_{2,}/g, ', ')
    // German shorthand nobody says out loud. Only when the line is German:
    // `etw.` never appears in an English gloss, but the guard keeps it honest.
    .replace(/\bjdm\./g, de ? 'jemandem' : 'jdm.')
    .replace(/\bjdn\./g, de ? 'jemanden' : 'jdn.')
    .replace(/\bjd\./g, de ? 'jemand' : 'jd.')
    .replace(/\betw\./g, de ? 'etwas' : 'etw.')
    .replace(/\bz\.\s*B\./g, de ? 'zum Beispiel' : 'for example')
    .replace(/\busw\./g, de ? 'und so weiter' : 'and so on')
    .replace(/\bbzw\./g, de ? 'beziehungsweise' : 'or rather')
    // Grammar shorthand, spelled out. Longest first — `Akk.` before a bare `+`.
    //
    // `(?:usativ)?` is not decoration: without it, `Akk\.?` matches the first
    // three letters of an already-written-out „+ Akkusativ" and the tail
    // survives the substitution as „plus Akkusativusativ". A card that spells
    // the case out in full is the *likelier* card, not the exotic one.
    .replace(/\(\s*\+\s*Akk(?:usativ)?\.?\s*\)/gi, de ? '(plus Akkusativ)' : '(plus accusative)')
    .replace(/\(\s*\+\s*Dat(?:iv)?\.?\s*\)/gi, de ? '(plus Dativ)' : '(plus dative)')
    .replace(/\+\s*Akk(?:usativ)?\.?/gi, de ? 'plus Akkusativ' : 'plus accusative')
    .replace(/\+\s*Dat(?:iv)?\.?/gi, de ? 'plus Dativ' : 'plus dative')
    .replace(/\(\s*Akk(?:usativ)?\.?\s*\)/gi, de ? '(Akkusativ)' : '(accusative)')
    .replace(/\(\s*Dat(?:iv)?\.?\s*\)/gi, de ? '(Dativ)' : '(dative)')
    // Symbols that mean something to a reader and nothing to a voice.
    .replace(/\s*↔\s*/g, ', versus ')
    .replace(/\s*→\s*/g, ', ')
    .replace(/\s*=\s*/g, de ? ' bedeutet ' : ' means ')
    .replace(/\s*·\s*/g, '. ')   // sense separator — a full stop is the pause it wants
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*\/\s*/g, de ? ' oder ' : ' or ')
    .replace(/\s*…\s*/g, ', ')
    // An exam reference — „ÜT4/44" — is not a choice between two things, and
    // „ÜT4 oder 44" is what the general slash rule below would make of it.
    .replace(/(\d)\s*\/\s*(\d)/g, '$1, $2')
    .replace(/~/g, '')           // stands in for the headword; the ear already has it
    .replace(/[„“”"]/g, '')      // quote glyphs get announced by some voices
    // Tidy the seams the substitutions leave behind, or the voice reads them
    // as hesitations: „jemandem etwas, ( bedeutet informieren)".
    .replace(/,\s*\(/g, ' (')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/([.,])\s*\1+/g, '$1')
    // A blank that fell at the end of a sentence leaves „so bald wie,." —
    // the stronger mark wins.
    .replace(/,\s*([.!?])/g, '$1')
    .replace(/^[\s,.]+/, '')
    .replace(/[\s,]+$/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * ── Short lines get a carrier ────────────────────────────────────────────────
 *
 * A TTS model clips what it has barely started: „abschaffen" on its own comes
 * back sounding cut at the front and chopped at the end, because there is no
 * run-up and no run-out around the word. The fix is to give it one — a two-word
 * frame the voice can start into, so the word itself lands in the middle of the
 * utterance where nothing is ever lost.
 *
 * It is also how a teacher would say it out loud, which is why the frames are
 * real German and not throat-clearing. Long lines carry themselves and are left
 * alone; the threshold is where clipping stops being audible.
 *
 * A line also always ends in a full stop. A trailing period buys a beat of
 * decay: without it the tail of the last syllable is what gets truncated.
 */
const SHORT = 30

const stopped = (text: string) => (/[.!?…]$/.test(text) ? text : `${text}.`)

/** Frame only if the line is too short to survive on its own. */
function framed(text: string, lead: string) {
  return stopped(text.length >= SHORT ? text : `${lead}${text}`)
}

/**
 * Frame regardless of length. On a rule card the lead is not padding, it is the
 * structure: „Ich erkundige mich ___ dem Preis" and „Ich erkundige mich nach dem
 * Preis" are near-identical to the ear, and without „Richtig ist:" in front of
 * the second one nothing tells you which of the two was the answer.
 */
const always = (text: string, lead: string) => stopped(`${lead}${text}`)

/**
 * Two kinds of card, and they must not sound alike.
 *
 * A `v-*` card is a headword: one word to install, worth hearing twice. Every
 * other tag is a *rule* card — a cloze, a quoted sentence, a question about a
 * trap. Saying „Ich erkundige mich ___ dem Preis" twice teaches the gap, not
 * the answer; those cards need the sentence once, then the solution.
 */
export function isRuleCard(card: Card) {
  return !card.tag.startsWith('v-')
}

/**
 * ── The pacing policy ────────────────────────────────────────────────────────
 * What the ear gets, in what order, and how much silence sits between.
 *
 * The gaps are the design. Cue → (silence) → answer is a self-test you can run
 * with your hands on a dumbbell: the silence is where you answer. Set the gap
 * to 0 and the same audio becomes passive listening — faster, but you never
 * find out what you don't know. Each pass ends in German, so the last thing the
 * ear holds is the language, not the translation.
 *
 * Both shapes speak `card.answer` — the German explanation. Until 2026-08-15
 * they didn't, and the audio was a word repeated twice followed by an English
 * gloss: the one field the deck exists to install was the one field no voice
 * ever said. On a cloze card it was worse than useless, because the blank was
 * read aloud as a blank and the solution never arrived.
 *
 * These numbers are the knob. Changing them re-stitches the baked MP3s but
 * costs nothing at the API: the synthesizer caches speech by content, and a
 * different silence layout is just a different ffmpeg concat of the same parts.
 */
export function linesFor(card: Card): Line[] {
  const de = (text: string, lead: string, as: 'wort' | 'satz', gap?: number): Line =>
    ({ text: framed(speakable(text, 'de'), lead), lang: 'de', as, gap })
  const en = (text: string, gap?: number): Line =>
    // The English gloss is framed even when it is long: „Meaning:" is the cue
    // that the language has just switched, half a second before the accent is.
    ({ text: always(speakable(text, 'en'), 'Meaning: '), lang: 'en', gap })
  const rule = (text: string, lead: string, gap?: number): Line =>
    ({ text: always(speakable(text, 'de'), lead), lang: 'de', as: 'satz', gap })
  const examples = (card.examples ?? []).map(e => de(e, 'Zum Beispiel: ', 'satz', 600))

  if (isRuleCard(card)) {
    return [
      // Three shapes of prompt, three honest leads: a gap to fill, a question to
      // answer, a statement to judge. „Die Frage:" in front of „Das Wort aus der
      // Aussage kommt im Hörtext vor." would be a small lie the ear notices.
      rule(card.cue, card.loesung ? 'Ergänzen Sie: ' : /\?\s*$/.test(card.cue) ? 'Die Frage: ' : 'Der Fall: '),
      ...(card.loesung ? [rule(card.loesung, 'Richtig ist: ', 1400)] : []),      // the hole, filled — after the gap
      rule(card.answer, 'Die Regel: ', card.loesung ? 500 : 1400),               // the rule itself
      en(card.meaning, 600),
      ...examples,
    ]
  }

  return [
    de(card.cue, 'Das Wort: ', 'wort'),
    de(card.cue, 'Noch einmal: ', 'wort', 700),   // twice: hear it, then hold it
    en(card.meaning, 1400),                       // the check, after the self-test gap
    de(card.answer, 'Auf Deutsch: ', 'satz', 600), // and then the same thing in German
    ...examples,
  ]
}

/**
 * The identity of a card for audio purposes. Cards have no id, and the cue
 * alone is not unique across tags, so the pair is the key.
 */
export function cardKey(card: Card) {
  return `${card.tag}|${card.cue}`
}

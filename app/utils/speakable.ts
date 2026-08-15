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
    .replace(/\(\s*\+\s*Akk\.?\s*\)/gi, de ? '(plus Akkusativ)' : '(plus accusative)')
    .replace(/\(\s*\+\s*Dat\.?\s*\)/gi, de ? '(plus Dativ)' : '(plus dative)')
    .replace(/\+\s*Akk\.?/gi, de ? 'plus Akkusativ' : 'plus accusative')
    .replace(/\+\s*Dat\.?/gi, de ? 'plus Dativ' : 'plus dative')
    .replace(/\(\s*Akk\.?\s*\)/gi, de ? '(Akkusativ)' : '(accusative)')
    .replace(/\(\s*Dat\.?\s*\)/gi, de ? '(Dativ)' : '(dative)')
    // Symbols that mean something to a reader and nothing to a voice.
    .replace(/\s*↔\s*/g, ', versus ')
    .replace(/\s*→\s*/g, ', ')
    .replace(/\s*=\s*/g, de ? ' bedeutet ' : ' means ')
    .replace(/\s*·\s*/g, '. ')   // sense separator — a full stop is the pause it wants
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*\/\s*/g, de ? ' oder ' : ' or ')
    .replace(/\s*…\s*/g, ', ')
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
 * ── The pacing policy ────────────────────────────────────────────────────────
 * What the ear gets, in what order, and how much silence sits between.
 *
 * The gaps are the design. Word → (silence) → meaning is a self-test you can
 * run with your hands on a dumbbell: the silence is where you answer. Set the
 * gap to 0 and the same audio becomes passive listening — faster, but you never
 * find out what you don't know. The examples come last and in German only, so
 * the pass ends in the language instead of in English.
 *
 * These numbers are the knob. Changing them re-stitches the baked MP3s but
 * costs nothing at the API: the synthesizer caches speech by content, and a
 * different silence layout is just a different ffmpeg concat of the same parts.
 */
export function linesFor(card: Card): Line[] {
  return [
    { text: speakable(card.cue, 'de'), lang: 'de' },
    { text: speakable(card.cue, 'de'), lang: 'de', gap: 700 },     // twice: hear it, then hold it
    { text: speakable(card.meaning, 'en'), lang: 'en', gap: 1400 }, // the answer, after the self-test gap
    ...(card.examples ?? []).map(e => ({ text: speakable(e, 'de'), lang: 'de' as const, gap: 600 })),
  ]
}

/**
 * The identity of a card for audio purposes. Cards have no id, and the cue
 * alone is not unique across tags, so the pair is the key.
 */
export function cardKey(card: Card) {
  return `${card.tag}|${card.cue}`
}

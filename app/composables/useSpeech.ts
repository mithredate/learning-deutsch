import { onScopeDispose, readonly, ref } from 'vue'

/**
 * Spoken Wortschatz, straight out of the browser.
 *
 * Deliberately *not* pre-rendered MP3s like the Hörverstehen material. The deck
 * is rewritten every week from the gap ledger, and a baked file is one more
 * thing to re-synthesize, commit and ship before a card is usable. The Web
 * Speech API costs nothing, weighs nothing in the repo, works offline in the
 * installed PWA, and is never out of sync with the card in front of you.
 *
 * The Hörverstehen recordings stay on the TTS pipeline — there the *voice* is
 * the exercise. Here it is only a carrier for the word.
 */

/** One thing to say, in one language. */
export interface Line {
  text: string
  lang: 'de' | 'en'
  /** Silence *before* this line, in ms. Where the self-test gap goes. */
  gap?: number
}

const LANGS = { de: 'de-DE', en: 'en-US' } as const

/**
 * Card text is written to be read with the *eyes*. The meaning field is a
 * dictionary entry, not a sentence — `to employ · sich ~ mit = to occupy
 * oneself with` — and a synthesizer reads that literally: "tilde", "equals",
 * and a run of German words in an American accent. Notation has to become
 * words, or punctuation, before it reaches the voice.
 */
function plain(html: string) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    // Only ever appears in an English gloss here (`A&E`), so "and", not "und".
    .replace(/&amp;|&/g, ' and ')
    // Grammar shorthand, spelled out. Longest first — `Akk.` before a bare `+`.
    .replace(/\(\s*\+\s*Akk\.?\s*\)/gi, '(plus accusative)')
    .replace(/\(\s*\+\s*Dat\.?\s*\)/gi, '(plus dative)')
    .replace(/\+\s*Akk\.?/gi, 'plus accusative')
    .replace(/\+\s*Dat\.?/gi, 'plus dative')
    // Symbols that mean something to a reader and nothing to a voice.
    .replace(/\s*↔\s*/g, ', versus ')
    .replace(/\s*→\s*/g, ', ')
    .replace(/\s*=\s*/g, ' means ')
    .replace(/\s*·\s*/g, '. ')   // sense separator — a full stop is the pause it wants
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*\/\s*/g, ' or ')
    .replace(/\s*…\s*/g, ', ')
    .replace(/~/g, '')           // stands in for the headword; the ear already has it
    .replace(/[„“”"]/g, '')      // quote glyphs get announced by some voices
    .replace(/\s+([.,])/g, '$1')
    .replace(/([.,])\1+/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * macOS and iOS ship a row of novelty voices — Bahh is a sheep, Bells is a
 * chime — and they sit in `getVoices()` next to the real ones. Picking "the
 * first local match" is luck, not a choice: on this machine the en-US list runs
 * Samantha, Albert, Bad News, Bahh, Bells, Boing.
 */
const NOVELTY = /^(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|junior|kathy|organ|ralph|superstar|trinoids|whisper|wobble|zarvox)/i

/**
 * Best available voice for a language, in descending order of how good it will
 * actually sound. Local beats network: on iOS a network voice stalls for a
 * second on a bad connection, which at the gym reads as "the button is broken".
 *
 * The big quality jump is not in this function though — it is whether the
 * device has an *enhanced* voice installed at all (iOS: Einstellungen →
 * Bedienungshilfen → Gesprochene Inhalte → Stimmen). The compact voices that
 * ship by default are the robotic ones.
 */
function pickVoice(voices: SpeechSynthesisVoice[], lang: string) {
  const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-')
  const exact = voices.filter(v => norm(v) === lang && !NOVELTY.test(v.name))
  const loose = voices.filter(v => norm(v).startsWith(lang.slice(0, 2)) && !NOVELTY.test(v.name))
  const pool = exact.length ? exact : loose
  if (!pool.length) return undefined
  return (
    pool.find(v => /enhanced|premium|siri/i.test(v.name) && v.localService)
    ?? pool.find(v => /enhanced|premium|siri/i.test(v.name))
    ?? pool.find(v => v.default)
    ?? pool.find(v => v.localService)
    ?? pool[0]
  )
}

export function useSpeech() {
  const speaking = ref(false)
  const supported = ref(false)

  /**
   * Voices arrive asynchronously and, on some browsers, only after the first
   * `getVoices()` call has primed the list. Read it once now and once on the
   * event, then keep whatever we ended up with.
   */
  const voices = ref<SpeechSynthesisVoice[]>([])
  function loadVoices() {
    voices.value = window.speechSynthesis.getVoices()
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    supported.value = true
    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    onScopeDispose(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
      window.speechSynthesis.cancel()
    })
  }

  /**
   * Every run gets a token. A run that has been superseded — you tapped the next
   * card, or stop — sees its token go stale and returns instead of speaking over
   * the new one. `speechSynthesis.cancel()` alone is not enough: the pending
   * `onend`/`setTimeout` of the old run would still queue its next line.
   */
  let token = 0

  function stop() {
    token++
    speaking.value = false
    if (supported.value) window.speechSynthesis.cancel()
  }

  const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

  function say(line: Line, rate: number) {
    return new Promise<void>((resolve) => {
      const u = new SpeechSynthesisUtterance(plain(line.text))
      u.lang = LANGS[line.lang]
      u.voice = pickVoice(voices.value, LANGS[line.lang]) ?? null
      u.rate = rate
      // Resolve either way: a voice that fails silently must not hang the queue.
      u.onend = () => resolve()
      u.onerror = () => resolve()
      window.speechSynthesis.speak(u)
    })
  }

  /**
   * Speak a sequence, in order, honouring each line's leading gap. Awaiting the
   * previous utterance rather than queueing them all up front is what makes the
   * gaps possible — and what lets `stop()` actually interrupt.
   */
  async function speak(lines: Line[], opts: { rate?: number } = {}) {
    if (!supported.value || !lines.length) return
    stop()
    const mine = ++token
    speaking.value = true

    // Safari drops a `speak()` issued in the same tick as a `cancel()`.
    await wait(60)

    for (const line of lines) {
      if (token !== mine) return
      if (line.gap) await wait(line.gap)
      if (token !== mine) return
      // German a little under natural, English at natural pace. Not slower:
      // Apple's compact voices are concatenative, so dragging the rate down
      // stretches the joins between recorded fragments and makes them sound
      // *more* robotic, not clearer.
      await say(line, opts.rate ?? (line.lang === 'de' ? 0.92 : 1))
    }

    if (token === mine) speaking.value = false
  }

  return { speak, stop, speaking: readonly(speaking), supported: readonly(supported), plain }
}

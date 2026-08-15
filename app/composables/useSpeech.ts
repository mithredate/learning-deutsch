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

/** Cards carry light markup (`<b>` round the target word). Never read it out. */
function plain(html: string) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, 'und')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Best available voice for a language. Prefers a local one: on iOS a
 * network voice stalls for a second on a bad connection, and at the gym that
 * reads as "the button is broken" and the app gets closed.
 */
function pickVoice(voices: SpeechSynthesisVoice[], lang: string) {
  const matches = voices.filter(v => v.lang.replace('_', '-').startsWith(lang.slice(0, 2)))
  if (!matches.length) return undefined
  return (
    matches.find(v => v.lang.replace('_', '-') === lang && v.localService)
    ?? matches.find(v => v.lang.replace('_', '-') === lang)
    ?? matches[0]
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
      // German slower than English: the German is the thing being learned, the
      // English is only the check.
      await say(line, opts.rate ?? (line.lang === 'de' ? 0.82 : 0.95))
    }

    if (token === mine) speaking.value = false
  }

  return { speak, stop, speaking: readonly(speaking), supported: readonly(supported), plain }
}

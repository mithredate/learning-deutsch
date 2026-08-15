import { onScopeDispose, readonly, ref } from 'vue'
import type { Card } from '~/types'
import { cardKey, linesFor } from '~/utils/speakable'
import { WORT_AUDIO } from '~/data/wortAudio'
import { useSpeech } from '~/composables/useSpeech'

/**
 * Plays the baked Gemini recordings for the Wortschatz.
 *
 * One `<audio>` element, reused for every card, and that is the whole point.
 * `speechSynthesis` is driven by JS timers, which iOS freezes the moment the
 * screen locks — so the browser-speech version could never survive a pocket.
 * A media element keeps playing when the app goes to the background, and
 * setting `.src` on the *same* element from inside its own `ended` handler
 * keeps the audio session alive across a whole deck. Creating a new element per
 * card would end the session and stop the run at the first card.
 *
 * A card with no baked file — added to the deck since the last synth run —
 * falls back to the phone's own voice rather than to silence.
 */
export function useWortAudio() {
  const speech = useSpeech()

  const playing = ref(false)
  /** The card currently sounding, so the UI can follow a deck run. */
  const currentKey = ref<string | null>(null)

  const base = useRuntimeConfig().app.baseURL
  const src = (file: string) => `${base}audio/wort/${file}`

  const fileFor = (card: Card): string | undefined => WORT_AUDIO[cardKey(card)]
  const isBaked = (card: Card) => !!fileFor(card)

  let el: HTMLAudioElement | null = null
  function element() {
    if (!el && typeof window !== 'undefined') {
      el = new Audio()
      el.preload = 'auto'
    }
    return el
  }

  /**
   * Same guard as the speech layer: a run that has been superseded must not
   * speak over the one that replaced it. `pause()` alone cannot do it — the
   * pending `ended`/`play()` promises of the old run would still fire.
   */
  let token = 0

  function stop() {
    token++
    playing.value = false
    currentKey.value = null
    speech.stop()
    const a = element()
    if (a) { a.pause(); a.removeAttribute('src'); a.load() }
  }
  onScopeDispose(stop)

  /** Play one card to completion. Resolves when it ends, or immediately if superseded. */
  function playOne(card: Card, mine: number) {
    const file = fileFor(card)
    currentKey.value = cardKey(card)

    // No recording yet — let the phone read it rather than skip the card.
    if (!file) return speech.speak(linesFor(card))

    const a = element()
    if (!a) return Promise.resolve()
    return new Promise<void>((resolve) => {
      const done = () => {
        a.removeEventListener('ended', done)
        a.removeEventListener('error', done)
        resolve()
      }
      a.addEventListener('ended', done)
      a.addEventListener('error', done)   // a missing file must not hang the deck
      a.src = src(file)
      a.play().catch(done)                // autoplay refusal resolves, never hangs
      if (token !== mine) done()
    })
  }

  async function play(cards: Card[], onCard?: (card: Card, index: number) => void) {
    if (!cards.length) return
    stop()
    const mine = ++token
    playing.value = true

    for (const [i, card] of cards.entries()) {
      if (token !== mine) return
      onCard?.(card, i)
      await playOne(card, mine)
      if (token !== mine) return
      // A beat between cards, or the deck arrives as one undifferentiated block.
      await new Promise(r => setTimeout(r, 700))
    }

    if (token === mine) {
      playing.value = false
      currentKey.value = null
    }
  }

  /**
   * Pull today's deck into the service-worker cache while there is still
   * signal. The runtime cache is CacheFirst, which only fills on *first play* —
   * and the first play is usually in the gym basement, which is exactly where
   * the network isn't. A deck is ~20 files of ~90 KB, so this is a second of
   * background fetching in exchange for the audio being there when it matters.
   *
   * Deliberately best-effort: offline, a slow link or a failed fetch must never
   * surface as an error. The card still plays if the network comes back, and
   * falls back to the phone's own voice if it doesn't.
   */
  function warm(cards: Card[]) {
    if (typeof navigator === 'undefined' || navigator.onLine === false) return
    for (const card of cards) {
      const file = fileFor(card)
      if (file) fetch(src(file)).catch(() => {})
    }
  }

  return { play, stop, warm, playing: readonly(playing), currentKey: readonly(currentKey), isBaked }
}

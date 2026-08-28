import { onScopeDispose, readonly, ref } from 'vue'
import type { Card } from '~/types'
import { cardKey, linesFor } from '~/utils/speakable'
import { WORT_AUDIO } from '~/data/wortAudio'
import { TAG_NAMES } from '~/data/cards'
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

  /**
   * The beat between two cards — 0.7 s of real, playing silence rather than a
   * `setTimeout`. A timer is the one thing iOS is guaranteed to freeze: the
   * moment the last card stops sounding, a backgrounded page has no audio
   * holding it awake, the callback never fires and the deck dies at card 1 in
   * your pocket. Silence that *plays* keeps the audio session alive, so the gap
   * costs the run nothing.
   */
  const PAUSE = '_pause.mp3'

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

  /**
   * Ending the *current card* without ending the run. `stop()` bumps the token,
   * which means „everything you were doing is void"; a skip must not, because
   * the loop is supposed to survive it and carry on at another index.
   */
  let interrupt: (() => void) | null = null

  /** The run in progress, so ⏮ / ↻ / ⏭ have something to move through. */
  let list: Card[] = []
  let index = 0
  let pending: number | null = null

  function stop() {
    token++
    interrupt = null
    pending = null
    playing.value = false
    currentKey.value = null
    speech.stop()
    const a = element()
    if (a) { a.pause(); a.removeAttribute('src'); a.load() }
  }
  onScopeDispose(stop)

  /**
   * The lock screen is where a deck run actually happens — pocket, screen off.
   * Untold, iOS shows the site name and the headphone buttons do nothing; told,
   * the card you are hearing has a name and ⏮ / ⏭ walk the deck without the
   * phone coming out. Same functions the on-screen buttons call.
   */
  function announce(card: Card) {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: card.cue.replace(/<[^>]+>/g, ''),
      artist: 'Deutsch B1 · Wortschatz',
      album: TAG_NAMES[card.tag] ?? '',
    })
    navigator.mediaSession.setActionHandler('play', () => void element()?.play())
    navigator.mediaSession.setActionHandler('pause', () => element()?.pause())
    navigator.mediaSession.setActionHandler('nexttrack', () => skip(1))
    navigator.mediaSession.setActionHandler('previoustrack', () => skip(-1))
    navigator.mediaSession.setActionHandler('stop', () => stop())
  }

  /** Play one file to completion. Resolves when it ends, or immediately if superseded. */
  function playFile(file: string, mine: number) {
    const a = element()
    if (!a) return Promise.resolve()
    return new Promise<void>((resolve) => {
      const done = () => {
        a.removeEventListener('ended', done)
        a.removeEventListener('error', done)
        interrupt = null
        resolve()
      }
      interrupt = () => { a.pause(); done() }
      a.addEventListener('ended', done)
      a.addEventListener('error', done)   // a missing file must not hang the deck
      a.src = src(file)
      a.play().catch(done)                // autoplay refusal resolves, never hangs
      if (token !== mine) done()
    })
  }

  /** Play one card: its recording, or the phone's own voice if none is baked. */
  function playOne(card: Card, mine: number) {
    const file = fileFor(card)
    currentKey.value = cardKey(card)
    announce(card)

    // No recording yet — let the phone read it rather than skip the card.
    if (!file) {
      interrupt = () => speech.stop()
      return speech.speak(linesFor(card))
    }
    return playFile(file, mine)
  }

  async function play(cards: Card[], onCard?: (card: Card, index: number) => void) {
    if (!cards.length) return
    stop()
    const mine = ++token
    playing.value = true
    list = cards
    index = 0

    while (index < cards.length) {
      if (token !== mine) return
      onCard?.(cards[index]!, index)
      await playOne(cards[index]!, mine)

      // The beat between cards — silence that plays, not a timer (see PAUSE).
      // A queued skip jumps it: ⏭ has to land on the next card now, not after
      // three quarters of a second of nothing.
      if (token === mine && pending === null) await playFile(PAUSE, mine)
      if (token !== mine) return

      // A skip lands here: go straight to the chosen card, no advance.
      if (pending !== null) {
        index = pending
        pending = null
        continue
      }
      index++
    }

    if (token === mine) {
      playing.value = false
      currentKey.value = null
    }
  }

  /**
   * Move inside a running deck. Hearing a word you don't know is the moment you
   * need it *again*, and hearing one you do know is the moment you need the next
   * one — a run you can only stop turns both into „start over from here".
   *
   * `delta: 0` replays the card you are on. Past either end, the run stops
   * rather than wrapping: at the last card ⏭ means „I'm done".
   */
  function skip(delta: number) {
    if (!playing.value || !list.length) return
    const next = index + delta
    if (next < 0) return void interrupt?.()   // already at the first card: restart it
    if (next >= list.length) return stop()
    pending = next
    interrupt?.()
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
    fetch(src(PAUSE)).catch(() => {})   // the between-card silence is part of the deck
    for (const card of cards) {
      const file = fileFor(card)
      if (file) fetch(src(file)).catch(() => {})
    }
  }

  return { play, stop, skip, warm, playing: readonly(playing), currentKey: readonly(currentKey), isBaked }
}

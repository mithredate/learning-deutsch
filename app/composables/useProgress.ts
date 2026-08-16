import { reactive, ref } from 'vue'

const NS = 'ld:'

interface ProgressState {
  /** `${date}:${slotIndex}` → ticked */
  slots: Record<string, boolean>
  /** date → free-text result, e.g. "HV Teil 2: 7/10" */
  notes: Record<string, string>
  /** card cue → how often it came back as „nochmal" */
  misses: Record<string, number>
  /**
   * Block id → the cards already answered „saß ✓" in it.
   *
   * Until 2026-08-15 a card round kept its position in component state only, so
   * closing the app put a 25-card deck back on card 1 — and a deck you only ever
   * see the first four cards of teaches you four words. The set is *per block*,
   * not per card: two blocks on the same day can drill the same tag (15.08. does),
   * and a card cleared in the warm-up must not empty the block after it.
   */
  drills: Record<string, string[]>
  /**
   * Block id → how the quiz went, first answer per card only.
   *
   * The drill lets a missed card come back until it sits, which is right for
   * learning but useless as a measurement — by the last pass everything is
   * always 100 %. What the daily report needs is the first pass: which cards
   * you actually knew when they surprised you. So the first grading of a cue
   * in a block is recorded here and later gradings of the same cue are ignored.
   */
  quiz: Record<string, { right: string[]; wrong: string[]; at: string }>
  setupDone: boolean
}

const state = reactive<ProgressState>({ slots: {}, notes: {}, misses: {}, drills: {}, quiz: {}, setupDone: false })
const ready = ref(false)

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(NS + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value))
  } catch {
    /* Private mode or a full quota — the app still works, it just forgets. */
  }
}

/**
 * Progress lives in localStorage, so it is per-device on purpose: the phone is
 * the study device, and one source of truth beats two that disagree.
 */
export function useProgress() {
  function hydrate() {
    if (ready.value) return
    state.slots = read('slots', {})
    state.notes = read('notes', {})
    state.misses = read('misses', {})
    state.drills = read('drills', {})
    state.quiz = read('quiz', {})
    state.setupDone = read('setupDone', false)
    ready.value = true
  }

  /** Cards already cleared in this block, as a Set for the drill to skip. */
  function clearedCards(id: string) {
    return new Set(state.drills[id] ?? [])
  }

  function clearCard(id: string, key: string) {
    const list = state.drills[id] ?? (state.drills[id] = [])
    if (!list.includes(key)) list.push(key)
    write('drills', state.drills)
  }

  /**
   * „Noch einmal" — the whole deck comes back, on purpose and by hand.
   * The quiz record goes with it: a deliberate restart is a retest, and a
   * retest that could only ever confirm the old score would measure nothing.
   */
  function resetDrill(id: string) {
    delete state.drills[id]
    delete state.quiz[id]
    write('drills', state.drills)
    write('quiz', state.quiz)
  }

  function isTicked(date: string, index: number) {
    return state.slots[`${date}:${index}`] === true
  }

  function toggleSlot(date: string, index: number) {
    const key = `${date}:${index}`
    if (state.slots[key]) delete state.slots[key]
    else state.slots[key] = true
    write('slots', state.slots)
  }

  function dayTouched(date: string) {
    return Object.keys(state.slots).some(k => k.startsWith(`${date}:`))
  }

  function setNote(date: string, value: string) {
    if (value) state.notes[date] = value
    else delete state.notes[date]
    write('notes', state.notes)
  }

  function missCard(cue: string) {
    state.misses[cue] = (state.misses[cue] ?? 0) + 1
    write('misses', state.misses)
  }

  /** First answer per cue and block wins; retries of the same card are ignored. */
  function gradeCard(id: string, cue: string, ok: boolean) {
    const q = state.quiz[id]
      ?? (state.quiz[id] = { right: [], wrong: [], at: new Date().toISOString().slice(0, 16) })
    if (q.right.includes(cue) || q.wrong.includes(cue)) return
    ;(ok ? q.right : q.wrong).push(cue)
    write('quiz', state.quiz)
  }

  function dismissSetup() {
    state.setupDone = true
    write('setupDone', true)
  }

  return {
    state, ready, hydrate, isTicked, toggleSlot, dayTouched, setNote, missCard, gradeCard,
    clearedCards, clearCard, resetDrill, dismissSetup,
  }
}

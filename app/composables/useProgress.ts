import { reactive, ref } from 'vue'

const NS = 'ld:'

interface ProgressState {
  /** `${date}:${slotIndex}` → ticked */
  slots: Record<string, boolean>
  /** date → free-text result, e.g. "HV Teil 2: 7/10" */
  notes: Record<string, string>
  /** card cue → how often it came back as „nochmal" */
  misses: Record<string, number>
  setupDone: boolean
}

const state = reactive<ProgressState>({ slots: {}, notes: {}, misses: {}, setupDone: false })
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
    state.setupDone = read('setupDone', false)
    ready.value = true
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

  function dismissSetup() {
    state.setupDone = true
    write('setupDone', true)
  }

  return { state, ready, hydrate, isTicked, toggleSlot, dayTouched, setNote, missCard, dismissSetup }
}

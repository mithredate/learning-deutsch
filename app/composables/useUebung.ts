import { reactive } from 'vue'

const KEY = 'ld:hv'

export interface Attempt {
  /** item number → the answer given */
  answers: Record<number, '+' | '−'>
  correct: number
  total: number
  /** Local stamp: `YYYY-MM-DDTHH:MM`. Older entries are date-only. */
  at: string
}

/**
 * Every sitting is kept, never overwritten. The first cold 2/5 and the 5/5 an
 * hour later mean completely different things, and the difference between them
 * is the only evidence that the material stuck — so „noch einmal versuchen"
 * must not be allowed to erase the number it is trying to beat.
 */
const attempts = reactive<Record<string, Attempt[]>>({})
let loaded = false

/** Local time, not UTC — a 22:30 sitting must not be filed under the next day. */
function stamp(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

export function attemptDate(at: string) {
  return at.slice(0, 10)
}

export function attemptTime(at: string) {
  return at.length > 10 ? at.slice(11, 16) : ''
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(attempts))
  } catch {
    /* ignore */
  }
}

/**
 * Reads both shapes. Until 2026-08-15 this stored one Attempt per episode; that
 * value becomes the first entry of its history rather than being thrown away.
 */
function normalise(raw: unknown): Record<string, Attempt[]> {
  const out: Record<string, Attempt[]> = {}
  if (!raw || typeof raw !== 'object') return out
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (Array.isArray(value)) out[id] = value as Attempt[]
    else if (value && typeof value === 'object') out[id] = [value as Attempt]
  }
  return out
}

/** Results of listening sittings — feeds the exercise page, the slot and the report. */
export function useUebung() {
  function hydrate() {
    if (loaded) return
    try {
      const migrated = normalise(JSON.parse(localStorage.getItem(KEY) ?? '{}'))
      Object.assign(attempts, migrated)
      persist()
    } catch {
      /* ignore */
    }
    loaded = true
  }

  function history(id: string): Attempt[] {
    return attempts[id] ?? []
  }

  function save(id: string, attempt: Omit<Attempt, 'at'> & { at?: string }) {
    const list = attempts[id] ?? (attempts[id] = [])
    list.push({ ...attempt, at: attempt.at ?? stamp() })
    persist()
  }

  function latest(id: string): Attempt | undefined {
    return history(id).at(-1)
  }

  function best(id: string): Attempt | undefined {
    return history(id).reduce<Attempt | undefined>(
      (top, a) => (!top || a.correct > top.correct ? a : top),
      undefined,
    )
  }

  /** Wipes the whole history for one episode. Only ever from an explicit tap. */
  function forget(id: string) {
    delete attempts[id]
    persist()
  }

  return { attempts, hydrate, history, save, latest, best, forget }
}

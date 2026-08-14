import { reactive } from 'vue'

const KEY = 'ld:hv'

export interface Attempt {
  /** item number → the answer given */
  answers: Record<number, '+' | '−'>
  correct: number
  total: number
  /** ISO date of the sitting */
  at: string
}

const attempts = reactive<Record<string, Attempt>>({})
let loaded = false

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(attempts))
  } catch {
    /* ignore */
  }
}

/** Results of listening sittings — feeds both the exercise page and the report. */
export function useUebung() {
  function hydrate() {
    if (loaded) return
    try {
      Object.assign(attempts, JSON.parse(localStorage.getItem(KEY) ?? '{}'))
    } catch {
      /* ignore */
    }
    loaded = true
  }

  function save(id: string, attempt: Attempt) {
    attempts[id] = attempt
    persist()
  }

  function clear(id: string) {
    delete attempts[id]
    persist()
  }

  return { attempts, hydrate, save, clear }
}

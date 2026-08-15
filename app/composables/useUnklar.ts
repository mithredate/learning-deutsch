import { reactive, ref } from 'vue'

const KEY = 'ld:unklar'

export interface Unklar {
  /** Exactly what was selected — the word, the phrase, the whole sentence. */
  text: string
  /** Where it was met: „Hören · Fünf Durchsagen", „Tageskarte", „Sprechen". */
  quelle: string
  /** Local stamp `YYYY-MM-DDTHH:MM`. */
  at: string
}

/**
 * „Das habe ich nicht verstanden" — captured where it happens.
 *
 * The gap this closes is not knowledge, it is *time*: a word goes past during a
 * listening block, and the place to write it down is a note field hours later,
 * at the bottom of a different screen. „I usually forget to write these back"
 * (2026-08-15) is the predictable result — the cost of capture is paid in a
 * different session than the noticing.
 *
 * So capture is one tap at the moment of noticing, anywhere in the app, and the
 * list flows into the report by itself. Nothing has to be remembered twice.
 */
const items = reactive<Unklar[]>([])
const ready = ref(false)

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(items))
  } catch {
    /* private mode — the list still works for this session */
  }
}

function stamp(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

export function useUnklar() {
  function hydrate() {
    if (ready.value) return
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]')
      if (Array.isArray(raw)) items.push(...(raw as Unklar[]))
    } catch {
      /* ignore */
    }
    ready.value = true
  }

  /** Returns false if the same text is already on the list — marking twice is a no-op, not a duplicate. */
  function add(text: string, quelle: string) {
    const clean = text.replace(/\s+/g, ' ').trim()
    if (!clean) return false
    if (items.some(i => i.text.toLowerCase() === clean.toLowerCase())) return false
    items.unshift({ text: clean, quelle, at: stamp() })
    persist()
    return true
  }

  function remove(text: string) {
    const i = items.findIndex(x => x.text === text)
    if (i >= 0) items.splice(i, 1)
    persist()
  }

  /** After a drill has been built from the list, it has done its job. */
  function clear() {
    items.splice(0, items.length)
    persist()
  }

  return { items, hydrate, add, remove, clear }
}

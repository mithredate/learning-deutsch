import { ref } from 'vue'

const KEY = 'ld:en'

/**
 * „Was soll ich hier eigentlich machen?" — in English, on demand.
 *
 * The plan is written in German on purpose: reading the instructions is itself
 * exposure, and the day's task uses the vocabulary of the exam. But an
 * instruction you have to *guess* is worse than no instruction — you then do
 * the exercise wrong for a reason that has nothing to do with the exercise
 * (user, 2026-08-15). So every block carries an English line and this switch
 * decides whether it is on screen.
 *
 * One global preference rather than a toggle per block: the answer to „do I
 * need English today" is the same for all of tonight's blocks, and tapping four
 * times to read four blocks is a tax on the exact evening you are struggling.
 *
 * Deliberately *not* offered for exam material — the statements in a listening
 * Teil stay German, because in September they will be.
 */
const on = ref(false)
let loaded = false

export function useEnglish() {
  function hydrate() {
    if (loaded) return
    try {
      on.value = localStorage.getItem(KEY) === '1'
    } catch {
      /* private mode, no storage — the default is fine */
    }
    loaded = true
  }

  function toggle() {
    on.value = !on.value
    try {
      localStorage.setItem(KEY, on.value ? '1' : '0')
    } catch {
      /* ignore */
    }
  }

  return { on, hydrate, toggle }
}

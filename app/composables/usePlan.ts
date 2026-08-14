import { computed, ref } from 'vue'
import { DAYS, EXAM_DATE } from '~/data/days'
import { CARDS } from '~/data/cards'
import type { Card, CardTag } from '~/types'

const WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

export function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Parse as *local* midnight. `new Date('2026-08-14')` would be UTC and can slip a day. */
export function fromISO(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y!, m! - 1, d!)
}

export function formatDay(iso: string) {
  const d = fromISO(iso)
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS[d.getMonth()]}`
}

export function daysUntilExam(iso: string) {
  return Math.round((fromISO(EXAM_DATE).getTime() - fromISO(iso).getTime()) / 86_400_000)
}

/** Today, or the next planned day if today is a rest/trip day. */
export function todayIndex(): number {
  const today = toISO(new Date())
  const exact = DAYS.findIndex(d => d.date === today)
  if (exact !== -1) return exact
  const upcoming = DAYS.findIndex(d => d.date > today)
  if (upcoming !== -1) return upcoming
  return today < DAYS[0]!.date ? 0 : DAYS.length - 1
}

export function usePlan() {
  const index = ref(0)
  const day = computed(() => DAYS[index.value]!)
  const isToday = computed(() => day.value.date === toISO(new Date()))
  const minutes = computed(() => day.value.slots.reduce((sum, s) => sum + s.minutes, 0))

  function jumpToToday() {
    index.value = todayIndex()
  }
  function step(delta: number) {
    index.value = Math.min(DAYS.length - 1, Math.max(0, index.value + delta))
  }

  return { DAYS, index, day, isToday, minutes, jumpToToday, step }
}

/**
 * The deck for a day, rotated by index so a repeated tag set does not start on
 * the same card twice — the first card of a session gets the most attention.
 */
export function deckFor(tags: CardTag[], rotation: number): Card[] {
  const pool = CARDS.filter(c => tags.includes(c.tag))
  if (!pool.length) return []
  const start = (rotation * 3) % pool.length
  return pool.map((_, i) => pool[(start + i) % pool.length]!)
}

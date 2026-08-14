<script setup lang="ts">
import { DAYS, EXAM_DATE } from '~/data/days'
import { CARDS, TAG_NAMES } from '~/data/cards'
import { useProgress } from '~/composables/useProgress'
import { toISO, fromISO } from '~/composables/usePlan'

const { state, dayTouched } = useProgress()

const open = ref(false)
const copied = ref(false)
const box = ref<HTMLTextAreaElement | null>(null)

const report = computed(() => {
  const today = toISO(new Date())
  const past = DAYS.filter(d => d.date <= today)
  const done = past.filter(d => dayTouched(d.date)).length
  const left = Math.round((fromISO(EXAM_DATE).getTime() - fromISO(today).getTime()) / 86_400_000)

  const lines = [
    `# Lernbericht telc B1 — Stand ${today}`,
    `Abgehakt: ${done}/${past.length} Lerntage · noch ${Math.max(0, left)} Tage bis zur Prüfung`,
    '',
    '## Tage',
    ...past.map(d => {
      const tick = dayTouched(d.date) ? '[x]' : '[ ]'
      const note = state.notes[d.date]
      return `${tick} ${d.date}  ${d.headline}${note ? `\n        → ${note}` : ''}`
    }),
  ]

  const stuck = CARDS
    .map(c => ({ card: c, n: state.misses[c.cue] ?? 0 }))
    .filter(x => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 20)

  lines.push('')
  if (stuck.length) {
    lines.push('## Karten, die hängen  („nochmal"-Zähler)')
    for (const { card, n } of stuck) {
      lines.push(`${n}×  [${TAG_NAMES[card.tag]}]  ${card.cue.replace(/<[^>]+>/g, '')}`)
    }
  } else {
    lines.push('## Karten: noch keine Daten')
  }
  return lines.join('\n')
})

async function copy() {
  const text = report.value
  let ok = false
  try {
    await navigator.clipboard.writeText(text)
    ok = true
  } catch {
    // Sandboxed or insecure context — fall back to selecting the textarea so
    // the OS copy gesture still works.
    box.value?.select()
    box.value?.setSelectionRange(0, text.length)
  }
  copied.value = ok
  if (ok) setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-line bg-surface">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-2.5 px-4 py-3.5 text-left text-[0.9rem] text-ink-2"
      @click="open = !open"
    >
      <span>📤 Bericht für Claude</span>
      <span class="text-ink-3">{{ open ? '▴' : '▾' }}</span>
    </button>

    <div v-if="open" class="flex flex-col gap-2.5 px-4 pb-4">
      <textarea
        ref="box"
        readonly
        :value="report"
        class="h-48 w-full resize-y rounded-lg border border-line bg-surface-2 p-3 font-mono text-[0.72rem] leading-relaxed whitespace-pre text-ink-2"
      />
      <button
        type="button"
        class="rounded-lg border border-accent bg-accent-wash px-3 py-2.5 text-[0.85rem] font-semibold text-accent"
        @click="copy"
      >
        {{ copied ? 'kopiert ✓' : 'kopieren' }}
      </button>
      <p class="text-[0.78rem] leading-relaxed text-ink-3">
        Kopieren und mir in den Chat einfügen. Dann sehe ich, welche Karten hängen
        und welche Tage gefallen sind — ohne dass du es erzählen musst.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DAYS, EXAM_DATE } from '~/data/days'
import { CARDS, TAG_NAMES } from '~/data/cards'
import { useProgress } from '~/composables/useProgress'
import { useUebung } from '~/composables/useUebung'
import { EPISODES } from '~/data/hoeren'
import { toISO, fromISO } from '~/composables/usePlan'
import { useUnklar } from '~/composables/useUnklar'

const { state, dayTouched } = useProgress()
const { history, hydrate } = useUebung()
const { items: unklar, hydrate: hydrateUnklar } = useUnklar()
onMounted(() => {
  hydrate()
  hydrateUnklar()
})

/** Multi-line notes have to stay readable once they are pasted into chat. */
function indent(text: string) {
  return text.split('\n').map(l => `        → ${l}`).join('\n')
}

const open = ref(false)
const copied = ref(false)
const box = ref<HTMLTextAreaElement | null>(null)

const report = computed(() => {
  const today = toISO(new Date())
  // A note written ahead of a day still belongs in the report.
  const past = DAYS.filter(d => d.date <= today || state.notes[d.date])
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
      return `${tick} ${d.date}  ${d.headline}${note ? `\n${indent(note)}` : ''}`
    }),
  ]

  // Every sitting, not just the last one. A 2/5 followed by a 5/5 on the same
  // material is a different message than a single 5/5 — and the first number is
  // the one that says which words were actually missing.
  const worked = EPISODES.map(e => ({ e, runs: history(e.id) })).filter(x => x.runs.length)
  if (worked.length) {
    lines.push('', '## Hörverstehen-Sitzungen')
    for (const { e, runs } of worked) {
      lines.push(`${e.teil} — ${e.title}  (${runs.length}× gemacht)`)
      runs.forEach((a, i) => {
        const wrong = e.items
          .filter(item => a.answers[item.n] !== item.solution)
          .map(item => `${item.n} (${item.trap})`)
        lines.push(
          `    Versuch ${i + 1}  ${a.at.replace('T', ' ')}  ${a.correct}/${a.total}` +
          (wrong.length ? `\n        falsch: ${wrong.join(', ')}` : '  — alles richtig'),
        )
      })
    }
  }

  // The quiz record: first answer per card and block. This is the line that
  // used to be typed into the notes field by hand („Karten: 8/10").
  const strip = (s: string) => s.replace(/<[^>]+>/g, '')
  const rounds = Object.entries(state.quiz)
    .map(([id, q]) => ({ id, date: id.slice(0, 10), q, total: q.right.length + q.wrong.length }))
    .filter(r => r.total > 0)
    .sort((a, b) => a.q.at.localeCompare(b.q.at))
  if (rounds.length) {
    lines.push('', '## Wortschatz-Quiz  (erster Versuch zählt)')
    for (const r of rounds) {
      lines.push(
        `${r.date}  ${r.q.right.length}/${r.total}` +
        (r.q.wrong.length ? `\n        falsch: ${r.q.wrong.map(strip).join(' · ')}` : '  — alles gewusst'),
      )
    }
  }

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

  // The whole point of marking a word is that it arrives here without anyone
  // having to remember it a second time.
  if (unklar.length) {
    lines.push('', '## Nicht verstanden (markiert)')
    for (const u of unklar) {
      lines.push(`- „${u.text}"  — ${u.quelle}, ${u.at.replace('T', ' ')}`)
    }
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
        class="h-48 w-full resize-y rounded-lg border border-line bg-surface-2 p-3 font-mono text-[1rem] leading-relaxed whitespace-pre text-ink-2"
      />
      <button
        type="button"
        class="rounded-lg border border-accent bg-accent-wash px-3 py-2.5 text-[0.85rem] font-semibold text-accent"
        @click="copy"
      >
        {{ copied ? 'kopiert ✓' : 'kopieren' }}
      </button>
      <p class="text-[0.78rem] leading-relaxed text-ink-3">
        Kopieren und mir in den Chat einfügen. Enthält <b>jeden</b> Versuch, deine Notizen
        und die Karten, die immer wieder zurückkommen — ohne dass du es erzählen musst.
      </p>
    </div>
  </section>
</template>

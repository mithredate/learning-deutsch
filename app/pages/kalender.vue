<script setup lang="ts">
import { DAYS, EXAM_DATE, studyDays } from '~/data/days'
import { fromISO } from '~/composables/usePlan'

useHead({ title: 'Lernkalender B1' })

const WEEKDAY_SHORT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']

const WEEKS = [
  { title: 'Woche 1 · Neustart', range: '14.–16. August', focus: 'HV Teil 1 + ÜT4 neu hören', from: '2026-08-14', to: '2026-08-16' },
  { title: 'Woche 2 · Hörverstehen Teil 2', range: '17.–23. August', focus: 'der teuerste Teil: 12 P.', from: '2026-08-17', to: '2026-08-23' },
  { title: 'Woche 3 · vertiefen + SB Teil 2', range: '24.–30. August', focus: 'Kollokationen = deine Wurzelursache', from: '2026-08-24', to: '2026-08-30' },
  { title: 'Woche 4 · Schreiben + SB Teil 1', range: '31. Aug – 6. Sep', focus: 'Mechanik = ~10 billige Punkte', from: '2026-08-31', to: '2026-09-06' },
  { title: 'Woche 5 · Integration + Generalprobe', range: '7.–13. September', focus: 'zusammensetzen, dann proben', from: '2026-09-07', to: '2026-09-13' },
  { title: 'Rückkehr & Taper', range: '22.–24. September', focus: 'nur Rost abschütteln', from: '2026-09-22', to: '2026-09-24' },
]

function daysOf(from: string, to: string) {
  return DAYS.filter(d => d.date >= from && d.date <= to)
}

/** Gross points still missing per section, from Übungstest 4. */
const SECTIONS = [
  { name: 'Hörverstehen', have: 42, max: 75, status: 'bad', label: '56 %' },
  { name: 'Schreiben', have: 24, max: 45, status: 'warn', label: '~53 %' },
  { name: 'Sprachbausteine', have: 10.5, max: 15, status: 'ok', label: '70 %' },
  { name: 'Leseverstehen', have: 75, max: 75, status: 'ok', label: '100 %' },
]
const TOTAL = 210

const RAMP = [
  { date: '15. Aug', stack: '2 Teile — HV 1 + HV 3', len: '~2 h' },
  { date: '22. Aug', stack: '3 Teile — HV 1 + HV 2 + SB 2', len: '~2,5 h' },
  { date: '29. Aug', stack: '4 Teile — LV 1 + LV 3 + HV 2 + SB 2', len: '~2,5 h' },
  { date: '5. Sep', stack: '5 Teile + Brief', len: '~3 h' },
  { date: '12. Sep', stack: 'Ganze Prüfung — Generalprobe', len: '~3,5 h' },
]

const GATES = [
  { when: 'So 16.08', target: 'ÜT4 neu gehört: HV ≥ 20/25', miss: 'Woche 2 startet mit HV Teil 1 statt Teil 2' },
  { when: 'So 23.08', target: 'erster frischer HV Teil 2 ≥ 6/10', miss: 'Woche 3 bleibt auf Teil 2, SB rutscht' },
  { when: 'So 06.09', target: 'HV ≥ 65 %, SA ≥ 30/45', miss: 'Woche 5 streicht die Lesen-Pflege' },
  { when: 'Sa 12.09', target: 'alle Teile ≥ 60 %, HV ≥ 70 %', miss: 'Taper wird Reparatur' },
]

const STUDY = studyDays()
const totalMinutes = DAYS.reduce((n, d) => n + d.slots.reduce((m, s) => m + s.minutes, 0), 0)
const classDays = DAYS.filter(d => d.kind === 'class').length
const examLeft = Math.round((fromISO(EXAM_DATE).getTime() - fromISO('2026-08-14').getTime()) / 86_400_000) + 1
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-9 px-4 pb-16">
    <header class="flex flex-col gap-4 pt-8">
      <span class="eyebrow">Lernkalender · 14.08.2026 → 25.09.2026</span>
      <h1 class="text-[clamp(1.9rem,5.5vw,2.9rem)] leading-tight">{{ STUDY.length }} Abende bis telc B1</h1>
      <p class="max-w-prose text-ink-2">
        Teil für Teil, jeden Tag um 21:00. Nicht mehr Stoff — weniger Entscheidungen.
      </p>

      <div class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line-soft sm:grid-cols-4">
        <div v-for="stat in [
          { n: String(STUDY.length), l: 'Lerntage' },
          { n: String(examLeft), l: 'Tage bis zur Prüfung' },
          { n: '8', l: 'Alpen — kein Studium' },
          { n: String(classDays), l: 'Kursabende' },
        ]" :key="stat.l" class="flex flex-col gap-1 bg-surface px-4 py-3.5">
          <b class="font-serif text-2xl leading-none tabular-nums">{{ stat.n }}</b>
          <span class="text-[0.76rem] leading-snug text-ink-3">{{ stat.l }}</span>
        </div>
      </div>
      <p class="font-mono text-[0.74rem] text-ink-3">
        ≈ {{ Math.round(totalMinutes / 60) }} h in den Abendblöcken, dazu {{ classDays }} × 30 min Kurs.
      </p>
    </header>

    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-1 border-t border-line pt-4">
        <span class="eyebrow">Warum diese Reihenfolge</span>
        <h2 class="text-2xl">Wo die Punkte liegen</h2>
        <p class="max-w-prose text-[0.95rem] text-ink-2">
          Ein Hörverstehen-Item ist 3 Punkte wert, ein Sprachbausteine-Item 0,75.
          Deshalb steht HV Teil 2 vor allem anderen — und Lesen wird nur noch gepflegt.
        </p>
      </div>
      <div class="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5">
        <div v-for="s in SECTIONS" :key="s.name" class="grid grid-cols-[8rem_1fr] items-center gap-x-3.5 gap-y-2">
          <span class="flex flex-col">
            <strong class="text-[0.89rem]">{{ s.name }}</strong>
            <span class="font-mono text-[0.7rem] tabular-nums text-ink-3">{{ s.have }} / {{ s.max }} P.</span>
          </span>
          <span class="flex items-center">
            <span class="relative flex h-5 flex-1 items-center rounded bg-surface-2">
              <span
                class="h-full rounded-r"
                :style="{
                  width: `${((s.max - s.have) / TOTAL) * 100}%`,
                  minWidth: s.max === s.have ? '2px' : undefined,
                  background: s.max === s.have ? 'var(--ink-3)' : 'var(--accent)',
                }"
              />
            </span>
            <span class="ml-2 font-mono text-[0.74rem] tabular-nums whitespace-nowrap text-ink-2">
              {{ (s.max - s.have).toString().replace('.', ',') }} P. offen
            </span>
          </span>
        </div>
        <p class="text-[0.78rem] text-ink-3">Balkenlänge = fehlende Punkte, gemessen an 210 Punkten schriftlich.</p>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-1 border-t border-line pt-4">
        <span class="eyebrow">Der Kompromiss</span>
        <h2 class="text-2xl">Teil für Teil — mit wachsendem Samstag</h2>
        <p class="max-w-prose text-[0.95rem] text-ink-2">
          Teil-Training gibt engeres Feedback und macht aus 4 Resttests ~36 Übungseinheiten.
          Was es nicht trainiert: 2,5 Stunden stillsitzen. Dafür wächst der Samstagsblock.
        </p>
      </div>
      <div class="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table class="w-full min-w-[30rem] border-collapse text-[0.86rem]">
          <thead>
            <tr>
              <th v-for="h in ['Samstag', 'Stapel', 'Dauer']" :key="h"
                  class="border-b border-line-soft px-5 py-2.5 text-left font-mono text-[0.68rem] font-normal tracking-widest text-ink-3 uppercase">
                {{ h }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in RAMP" :key="r.date">
              <td class="border-b border-line-soft px-5 py-2.5 font-mono tabular-nums whitespace-nowrap">{{ r.date }}</td>
              <td class="border-b border-line-soft px-5 py-2.5">{{ r.stack }}</td>
              <td class="border-b border-line-soft px-5 py-2.5 font-mono tabular-nums whitespace-nowrap">{{ r.len }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-1 border-t border-line pt-4">
        <span class="eyebrow">Tag für Tag</span>
        <h2 class="text-2xl">Der Kalender</h2>
      </div>

      <article v-for="w in WEEKS" :key="w.title" class="overflow-hidden rounded-2xl border border-line bg-surface">
        <header class="flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1 border-b border-line-soft px-5 py-3.5">
          <h3 class="text-[1.06rem]">{{ w.title }}</h3>
          <span class="font-mono text-[0.72rem] text-ink-3">{{ w.range }} · {{ w.focus }}</span>
        </header>
        <div class="flex flex-col">
          <div
            v-for="d in daysOf(w.from, w.to)"
            :key="d.date"
            class="grid grid-cols-[4.2rem_1fr] gap-x-4 gap-y-1 border-b border-line-soft px-5 py-3 last:border-b-0"
            :class="d.kind === 'class' ? 'bg-accent-wash' : d.kind === 'big' || d.kind === 'exam' ? 'bg-surface-2' : ''"
          >
            <span class="font-mono text-[0.78rem] leading-snug tabular-nums text-ink-2">
              {{ d.date.slice(8) }}.{{ d.date.slice(5, 7) }}
              <em class="block text-[0.69rem] not-italic text-ink-3">{{ WEEKDAY_SHORT[fromISO(d.date).getDay()] }}</em>
            </span>
            <span class="flex flex-col gap-1">
              <span class="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span class="text-[0.92rem] font-semibold">{{ d.headline }}</span>
                <span
                  class="rounded border px-1.5 font-mono text-[0.7rem] tabular-nums"
                  :class="d.kind === 'exam' ? 'border-crit text-crit' : 'border-accent text-accent'"
                >{{ d.slots.reduce((n, s) => n + s.minutes, 0) || '—' }} min</span>
              </span>
              <span v-if="d.tagline" class="text-[0.855rem] leading-relaxed text-ink-2">{{ d.tagline }}</span>
            </span>
          </div>
        </div>
      </article>

      <div class="flex flex-col gap-2.5 rounded-2xl border px-5 py-6"
           style="border-color: var(--accent); background: var(--accent-wash)">
        <span class="eyebrow" style="color: var(--accent)">14.–21. September · 8 Tage</span>
        <h3 class="text-xl" style="color: var(--accent)">Alpen — kein Studium</h3>
        <p class="max-w-prose text-[0.9rem] text-ink-2">
          Keine Mocks, keine Drills, kein Kalender. Täglich Deutsch mit deinem Freund.
          Die Reiseorganisation auf Deutsch machen — Route, Stellplatz, Einkauf, Essen —
          das ist gratis Sprechen Teil 3. <b>Ausruhen gehört zum Plan.</b>
        </p>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-1 border-t border-line pt-4">
        <span class="eyebrow">Kontrollpunkte</span>
        <h2 class="text-2xl">Was passiert, wenn ein Ziel verfehlt wird</h2>
        <p class="max-w-prose text-[0.95rem] text-ink-2">
          Ein Gate ohne Konsequenz ist nur eine Zahl. Jede Zeile sagt, was sich in der Folgewoche ändert.
        </p>
      </div>
      <div class="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table class="w-full min-w-[34rem] border-collapse text-[0.86rem]">
          <thead>
            <tr>
              <th v-for="h in ['Wann', 'Ziel', 'Verfehlt →']" :key="h"
                  class="border-b border-line-soft px-5 py-2.5 text-left font-mono text-[0.68rem] font-normal tracking-widest text-ink-3 uppercase">
                {{ h }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in GATES" :key="g.when">
              <td class="border-b border-line-soft px-5 py-2.5 font-mono tabular-nums whitespace-nowrap">{{ g.when }}</td>
              <td class="border-b border-line-soft px-5 py-2.5">{{ g.target }}</td>
              <td class="border-b border-line-soft px-5 py-2.5 text-ink-2">{{ g.miss }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <footer class="border-t border-line pt-4 text-[0.8rem] text-ink-3">
      <NuxtLink to="/" class="text-accent">← Zurück zur Tageskarte</NuxtLink>
    </footer>
  </div>
</template>

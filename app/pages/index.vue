<script setup lang="ts">
import { usePlan, deckFor, formatDay, daysUntilExam } from '~/composables/usePlan'
import { studyDays } from '~/data/days'
import { useProgress } from '~/composables/useProgress'

const { DAYS, index, day, isToday, minutes, jumpToToday, step } = usePlan()
const { state, hydrate, isTicked, toggleSlot, dayTouched, setNote, missCard, dismissSetup } = useProgress()

const mounted = ref(false)
onMounted(() => {
  hydrate()
  jumpToToday()
  mounted.value = true
})

const cards = computed(() => deckFor(day.value.deck, index.value))
const left = computed(() => daysUntilExam(day.value.date))

const STUDY = studyDays()
/** Position among study days — exam day returns 0 and is labelled instead. */
const studyPos = computed(() => STUDY.findIndex(d => d.date === day.value.date) + 1)
const ticked = computed(() => STUDY.filter(d => dayTouched(d.date)).length)

const note = computed({
  get: () => state.notes[day.value.date] ?? '',
  set: (v: string) => setNote(day.value.date, v),
})

function go(delta: number) {
  step(delta)
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <div class="mx-auto flex max-w-lg flex-col gap-5 px-4">
    <ClientOnly>
      <template #fallback>
        <div class="flex h-64 items-center justify-center text-ink-3">…</div>
      </template>

      <header v-if="mounted" class="flex flex-col gap-3.5 pt-6">
        <nav class="flex items-center justify-between gap-2.5">
          <button
            type="button"
            class="h-9 w-10 rounded-lg border border-line bg-surface text-ink-2 disabled:opacity-30"
            :disabled="index === 0"
            aria-label="Vorheriger Tag"
            @click="go(-1)"
          >‹</button>
          <span class="flex-1 text-center">
            <span class="block font-mono text-[0.78rem] tabular-nums text-ink-2">
              <template v-if="isToday">Heute · </template>{{ formatDay(day.date) }}
            </span>
            <span class="block font-mono text-[0.66rem] tracking-wider text-ink-3">
              {{ studyPos ? `Lerntag ${studyPos} von ${STUDY.length}` : 'Prüfungstag' }}
            </span>
          </span>
          <button
            type="button"
            class="h-9 w-10 rounded-lg border border-line bg-surface text-ink-2 disabled:opacity-30"
            :disabled="index === DAYS.length - 1"
            aria-label="Nächster Tag"
            @click="go(1)"
          >›</button>
        </nav>

        <h1 class="text-[clamp(1.7rem,6vw,2.15rem)] leading-tight">{{ day.headline }}</h1>
        <p v-if="day.tagline" class="text-[0.95rem] text-ink-2">{{ day.tagline }}</p>

        <div class="flex flex-wrap gap-2">
          <span
            class="rounded-full px-2.5 py-1 font-mono text-[0.7rem] tabular-nums"
            :class="left <= 7 ? 'bg-crit-wash text-crit' : 'bg-surface-2 text-ink-2'"
          >{{ left > 0 ? `noch ${left} Tage` : 'Prüfungstag' }}</span>
          <span v-if="minutes" class="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] tabular-nums text-ink-2">
            {{ minutes >= 100 ? `${(minutes / 60).toFixed(1)} h heute` : `${minutes} min heute` }}
          </span>
          <span v-if="day.kind === 'class'" class="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] text-ink-2">
            Kurs 20:30
          </span>
          <span v-if="!day.needs?.length && day.slots.length" class="rounded-full bg-good-wash px-2.5 py-1 font-mono text-[0.7rem] text-good">
            nichts mitbringen
          </span>
        </div>
      </header>

      <!-- Quick access. On course evenings Sprechen is the primary action, since
           that is the only place speaking actually gets practised. -->
      <nav v-if="mounted" class="grid grid-cols-2 gap-2.5">
        <NuxtLink
          to="/hoeren"
          class="flex flex-col gap-0.5 rounded-2xl border px-3.5 py-3 no-underline"
          :class="day.kind === 'class' ? 'border-line bg-surface' : 'border-accent bg-accent-wash'"
        >
          <span class="text-lg leading-none" aria-hidden="true">🎧</span>
          <span class="text-[0.9rem] font-semibold" :class="day.kind === 'class' ? 'text-ink' : 'text-accent'">
            Hören
          </span>
          <span class="font-mono text-[0.68rem] text-ink-3">3 Teile · mit Auswertung</span>
        </NuxtLink>

        <NuxtLink
          to="/sprechen"
          class="flex flex-col gap-0.5 rounded-2xl border px-3.5 py-3 no-underline"
          :class="day.kind === 'class' ? 'border-accent bg-accent-wash' : 'border-line bg-surface'"
        >
          <span class="text-lg leading-none" aria-hidden="true">🗣️</span>
          <span class="text-[0.9rem] font-semibold" :class="day.kind === 'class' ? 'text-accent' : 'text-ink'">
            Sprechen
          </span>
          <span class="font-mono text-[0.68rem] text-ink-3">
            {{ day.thema ? day.thema.title : day.kind === 'class' ? 'heute im Kurs · 20:30' : '3 Teile · Redemittel' }}
          </span>
        </NuxtLink>
      </nav>

      <!-- Tonight's speaking hour, both halves. Teil 2: read both cards aloud
           before class, speak one, hand your partner the other. Teil 3: the
           planning task, chosen to sit next to the same topic. -->
      <section
        v-if="mounted && (day.thema || day.aufgabe)"
        class="flex flex-col gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5"
        :style="{ boxShadow: 'var(--shadow)' }"
      >
        <span class="flex items-baseline justify-between gap-3">
          <span class="eyebrow">Sprechen heute im Kurs</span>
          <NuxtLink to="/sprechen" class="font-mono text-[0.68rem] no-underline" style="color: var(--accent)">
            Redemittel ›
          </NuxtLink>
        </span>

        <div v-if="day.thema" class="flex flex-col gap-2">
          <span class="font-mono text-[0.68rem] tracking-widest uppercase text-ink-3">Teil 2 · Thema</span>
          <h3 class="text-[1.05rem] leading-tight">{{ day.thema.title }}</h3>
          <ul class="flex list-none flex-col gap-1.5">
            <li
              v-for="(card, i) in day.thema.cards"
              :key="card"
              class="flex items-baseline gap-2 rounded-xl bg-surface-2 px-3 py-2 text-[0.85rem] text-ink-2"
            >
              <span class="font-mono text-[0.7rem] text-ink-3">{{ i === 0 ? 'A' : 'B' }}</span>
              <span>{{ card }}</span>
            </li>
          </ul>
          <p class="text-[0.8rem] leading-relaxed text-ink-3">
            Eine Karte für dich, eine für deinen Partner. Beschreiben → Meinung wiedergeben →
            eigene Meinung <b class="text-ink-2">mit einem Beispiel aus deinem Leben</b> → zurückfragen.
          </p>
        </div>

        <div v-if="day.aufgabe" class="flex flex-col gap-1.5 border-t border-line-soft pt-3">
          <span class="font-mono text-[0.68rem] tracking-widest uppercase text-ink-3">Teil 3 · gemeinsam planen</span>
          <p class="text-[0.88rem] leading-relaxed text-ink-2">{{ day.aufgabe }}</p>
          <p class="text-[0.8rem] leading-relaxed text-ink-3">
            <b class="text-ink-2">Vorschlagen, nicht nur zustimmen</b> — einmal höflich widersprechen,
            am Ende laut zusammenfassen.
          </p>
        </div>
      </section>

      <HowItWorks v-if="mounted" />

      <!-- One-time setup, dismissable forever -->
      <section
        v-if="mounted && day.setup && !state.setupDone"
        class="flex flex-col gap-2.5 rounded-2xl border border-crit bg-crit-wash px-4 py-4"
      >
        <h3 class="text-base text-crit">Zuerst: 5 Minuten Einrichtung, einmalig</h3>
        <ol class="flex list-decimal flex-col gap-1.5 pl-5 text-[0.89rem] text-ink-2">
          <li>Diese Seite auf den Home-Bildschirm legen — Teilen → „Zum Home-Bildschirm".</li>
          <li>Die MP3 aus <code class="rounded bg-surface px-1 font-mono text-[0.8em]">audio/</code> per AirDrop aufs Handy, dann unten unter „Hören" hinzufügen.</li>
          <li>Das Aufgabenblatt (ÜT4, S. 14–16) in „Dateien" ablegen.</li>
        </ol>
        <button
          type="button"
          class="rounded-xl border border-line bg-surface px-3 py-2.5 text-[0.85rem] text-ink-2"
          @click="dismissSetup"
        >Erledigt — nicht mehr zeigen</button>
      </section>

      <div v-if="mounted && !day.slots.length" class="flex flex-col gap-2.5 rounded-2xl border border-dashed border-line bg-surface-2 px-5 py-7 text-center">
        <h3 class="text-xl">Viel Erfolg.</h3>
        <p class="text-[0.9rem] text-ink-2">
          Nie ein Feld leer lassen. Ein Kreuz ist 50 %, ein leeres Feld ist 0 %.
        </p>
      </div>

      <div v-if="mounted" class="flex flex-col gap-3">
        <SlotCard
          v-for="(slot, i) in day.slots"
          :key="`${day.date}:${i}`"
          :slot="slot"
          :needs="i === 0 ? day.needs : undefined"
          :ticked="isTicked(day.date, i)"
          @toggle="toggleSlot(day.date, i)"
        />
      </div>

      <section v-if="mounted && day.slots.length" class="flex flex-col gap-2 rounded-2xl border border-line bg-surface px-4 py-3.5">
        <label class="eyebrow" for="note">Ergebnis oder Notiz</label>
        <input
          id="note"
          v-model="note"
          type="text"
          placeholder="z. B. HV Teil 2: 7/10 — Absolutizer wieder übersehen"
          class="w-full rounded-lg border border-line bg-surface-2 px-3 py-2.5 font-mono text-[0.88rem] text-ink"
        >
      </section>

      <CardDrill v-if="mounted" :cards="cards" @miss="missCard" />
      <AudioShelf v-if="mounted" />
      <ReportPanel v-if="mounted" />
    </ClientOnly>

    <footer class="flex flex-col gap-2 border-t border-line pt-4 text-[0.8rem] text-ink-3">
      <ClientOnly>
        <span v-if="ticked" class="font-mono text-[0.74rem] text-ink-2">
          {{ ticked }} von {{ STUDY.length }} Lerntagen abgehakt.
        </span>
      </ClientOnly>
      <span>Fortschritt wird nur auf diesem Gerät gespeichert.</span>
      <NuxtLink to="/kalender" class="text-accent">→ Der ganze Kalender: Wochen, Gates, Samstagsrampe</NuxtLink>
    </footer>
  </div>
</template>

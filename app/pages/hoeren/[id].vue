<script setup lang="ts">
import { episodeById } from '~/data/hoeren'
import { useUebung, attemptDate, attemptTime } from '~/composables/useUebung'
import { usePlaybackMemory } from '~/composables/useLocalAudio'
import { TRAP_NAMES } from '~/types'

const route = useRoute()
const episode = episodeById(String(route.params.id))
if (!episode) throw createError({ statusCode: 404, statusMessage: 'Übung nicht gefunden', fatal: true })

useHead({ title: `${episode.title} — Hörverstehen` })

const { hydrate, save, history, best, forget } = useUebung()
const memory = usePlaybackMemory()
const base = useRuntimeConfig().app.baseURL

const player = ref<HTMLAudioElement | null>(null)
const answers = reactive<Record<number, '+' | '−'>>({})
const evaluated = ref(false)
const showTranscript = ref(false)

const sittings = computed(() => history(episode.id))
const bestRun = computed(() => best(episode.id))

onMounted(() => {
  hydrate()
  const prior = sittings.value.at(-1)
  if (prior) {
    Object.assign(answers, prior.answers)
    evaluated.value = true
  }
  if (player.value) player.value.currentTime = memory.get(episode.id)
})

const answered = computed(() => Object.keys(answers).length)
const correct = computed(() => episode.items.filter(i => answers[i.n] === i.solution).length)
const percent = computed(() => Math.round((correct.value / episode.items.length) * 100))

function pick(n: number, value: '+' | '−') {
  if (evaluated.value) return
  answers[n] = value
}

function evaluate() {
  evaluated.value = true
  save(episode.id, {
    answers: { ...answers },
    correct: correct.value,
    total: episode.items.length,
  })
}

/**
 * Clears the sheet, not the record. The previous sitting stays in the history —
 * a second run is only worth anything next to the first one.
 */
function retry() {
  for (const k of Object.keys(answers)) delete answers[Number(k)]
  evaluated.value = false
  showTranscript.value = false
  window.scrollTo({ top: 0 })
}

function remember() {
  if (player.value) memory.set(episode.id, player.value.currentTime)
}

function nudge(seconds: number) {
  if (player.value) player.value.currentTime = Math.max(0, player.value.currentTime + seconds)
}
</script>

<template>
  <div class="mx-auto flex max-w-lg flex-col gap-5 px-4">
    <header class="flex flex-col gap-2.5 pt-6">
      <span class="eyebrow">{{ episode.teil }}</span>
      <h1 class="text-[clamp(1.5rem,5vw,2rem)] leading-tight">{{ episode.title }}</h1>
      <p class="text-[0.9rem] leading-relaxed text-ink-2">{{ episode.instructions }}</p>
      <span class="flex flex-wrap gap-1.5">
        <span class="rounded bg-surface-2 px-2 py-0.5 font-mono text-[0.7rem] tabular-nums text-ink-2">
          {{ Math.floor(episode.seconds / 60) }}:{{ String(episode.seconds % 60).padStart(2, '0') }}
        </span>
        <span class="rounded bg-surface-2 px-2 py-0.5 font-mono text-[0.7rem] text-ink-2">
          {{ episode.once ? 'einmal hören' : 'zweimal hören' }}
        </span>
      </span>
    </header>

    <ClientOnly>
      <p
        v-if="!evaluated && sittings.length"
        class="rounded-xl border border-line bg-surface-2 px-3 py-2.5 font-mono text-[0.75rem] tabular-nums text-ink-2"
      >
        Versuch {{ sittings.length + 1 }} · zuletzt {{ sittings.at(-1)!.correct }}/{{ sittings.at(-1)!.total }}
      </p>
    </ClientOnly>

    <section class="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-4" :style="{ boxShadow: 'var(--shadow)' }">
      <audio
        ref="player"
        controls
        preload="metadata"
        class="w-full"
        :src="`${base}audio/${episode.file}`"
        @timeupdate="remember"
        @pause="remember"
      />
      <div class="flex gap-2">
        <button type="button" class="flex-1 rounded-lg border border-line bg-surface-2 py-2 text-[0.8rem] text-ink-2" @click="nudge(-15)">
          ← 15 s
        </button>
        <button type="button" class="flex-1 rounded-lg border border-line bg-surface-2 py-2 text-[0.8rem] text-ink-2" @click="nudge(15)">
          15 s →
        </button>
      </div>
      <p class="text-[0.78rem] leading-relaxed text-ink-3">
        Prüfungsbedingungen: einmal starten, nicht pausieren, nicht zurückspulen.
        Die Sprechpausen für die Lesezeit sind im Ton eingebaut.
      </p>
    </section>

    <ol class="flex list-none flex-col gap-2.5 p-0">
      <li
        v-for="item in episode.items"
        :key="item.n"
        class="flex flex-col gap-2.5 rounded-2xl border bg-surface px-4 py-3.5"
        :class="!evaluated
          ? 'border-line'
          : answers[item.n] === item.solution
            ? 'border-good'
            : 'border-crit'"
      >
        <span class="flex gap-2.5">
          <span class="font-mono text-[0.8rem] tabular-nums text-ink-3">{{ item.n }}</span>
          <span class="flex-1 text-[0.94rem] leading-relaxed">{{ item.text }}</span>
        </span>

        <span class="flex gap-2">
          <button
            v-for="opt in (['+', '−'] as const)"
            :key="opt"
            type="button"
            class="flex-1 rounded-lg border py-2.5 text-[0.85rem] font-semibold transition-colors"
            :class="answers[item.n] === opt
              ? 'border-accent bg-accent-wash text-accent'
              : 'border-line bg-surface-2 text-ink-3'"
            :disabled="evaluated"
            @click="pick(item.n, opt)"
          >
            {{ opt === '+' ? 'richtig +' : 'falsch −' }}
          </button>
        </span>

        <span v-if="evaluated" class="flex flex-col gap-1.5 rounded-lg bg-surface-2 px-3 py-2.5">
          <span class="flex items-center gap-2">
            <span
              class="font-mono text-[0.72rem] font-semibold"
              :class="answers[item.n] === item.solution ? 'text-good' : 'text-crit'"
            >
              {{ answers[item.n] === item.solution ? '✓ richtig' : `✗ Lösung: ${item.solution}` }}
            </span>
            <span class="rounded border border-line px-1.5 font-mono text-[0.66rem] text-ink-3">
              {{ TRAP_NAMES[item.trap] }}
            </span>
          </span>
          <span class="text-[0.85rem] leading-relaxed text-ink-2">{{ item.why }}</span>
        </span>
      </li>
    </ol>

    <section v-if="!evaluated" class="flex flex-col gap-2">
      <button
        type="button"
        class="rounded-xl border border-accent bg-accent-wash px-4 py-3 text-[0.9rem] font-semibold text-accent disabled:opacity-40"
        :disabled="answered === 0"
        @click="evaluate"
      >
        Auswerten ({{ answered }}/{{ episode.items.length }} beantwortet)
      </button>
      <p v-if="answered < episode.items.length" class="text-center text-[0.78rem] text-ink-3">
        Nie ein Feld leer lassen — raten kostet nichts.
      </p>
    </section>

    <section v-else class="flex flex-col gap-3">
      <div
        class="flex flex-col items-center gap-1 rounded-2xl border px-4 py-5 text-center"
        :class="percent >= 60 ? 'border-good bg-good-wash' : 'border-crit bg-crit-wash'"
      >
        <span class="font-serif text-3xl tabular-nums" :class="percent >= 60 ? 'text-good' : 'text-crit'">
          {{ correct }} / {{ episode.items.length }}
        </span>
        <span class="font-mono text-[0.75rem] tabular-nums" :class="percent >= 60 ? 'text-good' : 'text-crit'">
          {{ percent }} % · Bestehensgrenze 60 %
        </span>
      </div>

      <!-- Every sitting, oldest first. The shape of the column is the point:
           2/5 → 5/5 is progress, 5/5 → 5/5 on the same day is recall. -->
      <section v-if="sittings.length" class="flex flex-col gap-2 rounded-2xl border border-line bg-surface px-4 py-3.5">
        <span class="flex items-baseline justify-between gap-2">
          <span class="eyebrow">Versuche</span>
          <button type="button" class="font-mono text-[0.68rem] text-ink-3" @click="forget(episode.id)">
            Verlauf löschen
          </button>
        </span>
        <ol class="flex list-none flex-col gap-1.5 p-0">
          <li
            v-for="(a, i) in sittings"
            :key="a.at + i"
            class="flex items-baseline gap-2.5 rounded-lg bg-surface-2 px-3 py-2"
          >
            <span class="font-mono text-[0.72rem] tabular-nums text-ink-3">{{ i + 1 }}.</span>
            <span class="flex-1 font-mono text-[0.72rem] tabular-nums text-ink-3">
              {{ attemptDate(a.at) }}<template v-if="attemptTime(a.at)"> · {{ attemptTime(a.at) }}</template>
            </span>
            <span
              v-if="i > 0 && a.correct !== sittings[i - 1]!.correct"
              class="font-mono text-[0.7rem] tabular-nums"
              :class="a.correct > sittings[i - 1]!.correct ? 'text-good' : 'text-crit'"
            >{{ a.correct > sittings[i - 1]!.correct ? '+' : '' }}{{ a.correct - sittings[i - 1]!.correct }}</span>
            <span
              class="font-mono text-[0.78rem] font-semibold tabular-nums"
              :class="a.correct / a.total >= 0.6 ? 'text-good' : 'text-crit'"
            >{{ a.correct }}/{{ a.total }}</span>
          </li>
        </ol>
        <p v-if="sittings.length > 1 && bestRun" class="font-mono text-[0.7rem] text-ink-3">
          bestes Ergebnis: {{ bestRun.correct }}/{{ bestRun.total }} am {{ attemptDate(bestRun.at) }}
        </p>
      </section>

      <button
        type="button"
        class="rounded-xl border border-line bg-surface px-4 py-2.5 text-[0.85rem] text-ink-2"
        @click="showTranscript = !showTranscript"
      >
        {{ showTranscript ? 'Transkript ausblenden' : 'Transkript zeigen' }}
      </button>

      <pre
        v-if="showTranscript"
        class="overflow-x-auto rounded-xl border border-line bg-surface p-4 font-sans text-[0.87rem] leading-relaxed whitespace-pre-wrap text-ink-2"
      >{{ episode.transcript }}</pre>

      <button type="button" class="rounded-xl border border-line bg-surface px-4 py-2.5 text-[0.85rem] text-ink-2" @click="retry">
        Noch einmal versuchen
      </button>
    </section>

    <footer class="flex flex-col gap-2 border-t border-line pt-4 text-[0.8rem] text-ink-3">
      <NuxtLink to="/hoeren" class="text-accent">← Alle Hörübungen</NuxtLink>
      <NuxtLink to="/" class="text-accent">← Tageskarte</NuxtLink>
    </footer>
  </div>
</template>

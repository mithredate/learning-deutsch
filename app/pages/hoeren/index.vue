<script setup lang="ts">
import { EPISODES } from '~/data/hoeren'
import { useUebung } from '~/composables/useUebung'

useHead({ title: 'Hörverstehen' })

const { hydrate, history, best } = useUebung()
onMounted(hydrate)

const totalItems = EPISODES.reduce((n, e) => n + e.items.length, 0)

/**
 * Unheard first. Nine exercises no longer fit on one thumb-scroll, and the one
 * never played is always the one worth playing — so fewest attempts to the top,
 * original order inside a tier. The attempts only exist after `hydrate` on the
 * client, so the prerendered page shows the base order and re-sorts on mount.
 */
const listed = computed(() =>
  EPISODES.map((e, i) => ({ e, i }))
    .sort((a, b) => history(a.e.id).length - history(b.e.id).length || a.i - b.i)
    .map(x => x.e),
)
</script>

<template>
  <div class="mx-auto flex max-w-lg flex-col gap-5 px-4">
    <header class="flex flex-col gap-3 pt-6">
      <span class="eyebrow">Übungstests E1–E3 · eigenes Material</span>
      <h1 class="text-[clamp(1.6rem,5.5vw,2.1rem)] leading-tight">Hörverstehen</h1>
      <p class="text-[0.93rem] leading-relaxed text-ink-2">
        {{ EPISODES.length }} Übungen, {{ totalItems }} Aufgaben. Selbst geschrieben und vertont —
        und die Distraktoren sind gezielt auf deine Fehlertypen gebaut, nicht auf die
        eines beliebigen Verlagstests.
      </p>
      <p class="rounded-xl bg-surface-2 px-3 py-2.5 text-[0.8rem] leading-relaxed text-ink-3">
        Fürs Gym: jede Datei <b class="text-ink-2">einmal online abspielen</b> — danach liegt sie
        im Offline-Speicher der App und läuft auch ohne Netz.
      </p>
    </header>

    <NuxtLink
      v-for="ep in listed"
      :key="ep.id"
      :to="`/hoeren/${ep.id}`"
      class="flex flex-col gap-2 rounded-2xl border border-line bg-surface px-4 py-4 no-underline"
      :style="{ boxShadow: 'var(--shadow)' }"
    >
      <span class="flex items-baseline justify-between gap-3">
        <span class="font-serif text-[1.08rem] font-semibold text-ink">{{ ep.title }}</span>
        <ClientOnly>
          <span v-if="best(ep.id)" class="flex items-baseline gap-1.5">
            <span v-if="history(ep.id).length > 1" class="font-mono text-[0.66rem] tabular-nums text-ink-3">
              {{ history(ep.id).length }} Versuche
            </span>
            <span
              class="rounded-full px-2 py-0.5 font-mono text-[0.7rem] tabular-nums"
              :class="best(ep.id)!.correct / best(ep.id)!.total >= 0.6
                ? 'bg-good-wash text-good'
                : 'bg-crit-wash text-crit'"
            >{{ best(ep.id)!.correct }}/{{ best(ep.id)!.total }}</span>
          </span>
        </ClientOnly>
      </span>
      <span class="font-mono text-[0.7rem] text-ink-3">{{ ep.teil }}</span>
      <span class="flex flex-wrap gap-1.5">
        <span class="rounded bg-surface-2 px-2 py-0.5 font-mono text-[0.7rem] tabular-nums text-ink-2">
          {{ Math.round(ep.seconds / 60) }} min
        </span>
        <span class="rounded bg-surface-2 px-2 py-0.5 font-mono text-[0.7rem] text-ink-2">
          {{ ep.items.length }} Aufgaben
        </span>
        <span class="rounded bg-surface-2 px-2 py-0.5 font-mono text-[0.7rem] text-ink-2">
          {{ ep.once ? 'einmal hören' : 'zweimal hören' }}
        </span>
      </span>
    </NuxtLink>

    <footer class="border-t border-line pt-4 text-[0.8rem] text-ink-3">
      <NuxtLink to="/" class="text-accent">← Zurück zur Tageskarte</NuxtLink>
    </footer>
  </div>
</template>

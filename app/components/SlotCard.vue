<script setup lang="ts">
import type { Card, Place, Slot } from '~/types'
import { episodeById } from '~/data/hoeren'
import { useUebung } from '~/composables/useUebung'
import { useEnglish } from '~/composables/useEnglish'

const props = defineProps<{
  slot: Slot
  needs?: string[]
  ticked: boolean
  /** Already resolved by the page, so the rotation stays a page-level concern. */
  cards?: Card[]
  /** `${date}:${slotIndex}` — the identity this block's card progress is filed under. */
  id: string
}>()

const emit = defineEmits<{ toggle: []; miss: [cue: string] }>()

const META: Record<Place, { icon: string; where: string; when: string }> = {
  gym: { icon: '🎧', where: 'Unterwegs', when: 'Gym · Weg · Warten' },
  sofa: { icon: '🛋️', where: 'Sofa', when: '21:00 — der Anker' },
  bed: { icon: '🌙', where: 'Vor dem Schlafen', when: 'im Bett, Handy reicht' },
}

const meta = computed(() => META[props.slot.place])

const { hydrate, history, best } = useUebung()
const { on: english } = useEnglish()
onMounted(hydrate)

const episodes = computed(() =>
  (props.slot.hoeren ?? []).map(id => episodeById(id)).filter(Boolean),
)

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
</script>

<template>
  <section
    class="overflow-hidden rounded-2xl border border-line bg-surface transition-opacity"
    :class="ticked ? 'opacity-55' : ''"
    :style="{
      boxShadow: 'var(--shadow)',
      borderLeft: `4px solid var(--${slot.place})`,
    }"
  >
    <header
      class="flex items-center gap-2.5 px-4 py-3"
      :style="{ background: `var(--${slot.place}-wash)` }"
    >
      <span class="text-lg leading-none" aria-hidden="true">{{ meta.icon }}</span>
      <span class="flex flex-1 flex-col">
        <span class="text-[0.93rem] font-semibold" :style="{ color: `var(--${slot.place})` }">
          {{ meta.where }}
        </span>
        <span class="font-mono text-[0.68rem] tracking-wider text-ink-3">{{ meta.when }}</span>
      </span>
      <span
        v-if="slot.minutes"
        class="font-mono text-[0.78rem] tabular-nums whitespace-nowrap"
        :style="{ color: `var(--${slot.place})` }"
      >{{ slot.minutes }} min</span>
    </header>

    <div class="flex flex-col gap-3 px-4 pt-4 pb-4">
      <p class="copy text-[0.96rem] leading-relaxed" v-html="slot.what" />
      <!-- Under the German, never instead of it: the German line is still the
           one you read first, and the English is there to stop a misread task
           from costing you the exercise. -->
      <ClientOnly>
        <p
          v-if="english && slot.en"
          class="flex items-start gap-2 border-l-2 border-line pl-2.5 text-[0.86rem] leading-relaxed text-ink-3"
        >
          <span class="mt-0.5 rounded border border-line px-1 font-mono text-[0.6rem] tracking-wider">EN</span>
          <span class="flex-1">{{ slot.en }}</span>
        </p>
      </ClientOnly>
      <p v-if="slot.note" class="copy text-[0.85rem] leading-relaxed text-ink-3" v-html="slot.note" />

      <div v-if="needs?.length" class="flex flex-wrap gap-1.5">
        <span
          v-for="n in needs"
          :key="n"
          class="rounded-md border border-line-soft bg-surface-2 px-2 py-0.5 text-[0.76rem] text-ink-2"
        >{{ n }}</span>
      </div>

      <!-- The listening this block is actually asking for. Tapping it opens the
           sheet with the audio, the items and the solutions — no hunting. -->
      <NuxtLink
        v-for="ep in episodes"
        :key="ep!.id"
        :to="`/hoeren/${ep!.id}`"
        class="flex flex-col gap-1.5 rounded-xl border border-accent bg-accent-wash px-3 py-3 no-underline"
      >
        <span class="flex items-baseline justify-between gap-2">
          <span class="text-[0.9rem] font-semibold" style="color: var(--accent)">🎧 {{ ep!.title }}</span>
          <ClientOnly>
            <span
              v-if="best(ep!.id)"
              class="rounded-full bg-surface px-2 py-0.5 font-mono text-[0.68rem] tabular-nums"
              :class="best(ep!.id)!.correct / best(ep!.id)!.total >= 0.6 ? 'text-good' : 'text-crit'"
            >{{ best(ep!.id)!.correct }}/{{ best(ep!.id)!.total }}</span>
          </ClientOnly>
        </span>
        <span class="font-mono text-[0.68rem] text-ink-3">
          {{ ep!.teil }} · {{ mmss(ep!.seconds) }} · {{ ep!.items.length }} Aufgaben ·
          {{ ep!.once ? 'einmal hören' : 'zweimal hören' }}
        </span>
        <ClientOnly>
          <span v-if="history(ep!.id).length" class="font-mono text-[0.68rem] text-ink-3">
            {{ history(ep!.id).length }}× gemacht — noch einmal zählt als neuer Versuch
          </span>
        </ClientOnly>
      </NuxtLink>

      <LocalAudio v-if="slot.dateien || slot.datei" :want="slot.datei" />

      <CardDrill v-if="cards?.length" :id="id" :cards="cards" @miss="emit('miss', $event)" />

      <button
        type="button"
        class="w-full rounded-xl border px-3 py-2.5 text-[0.87rem] transition-colors"
        :class="ticked
          ? 'border-good bg-good-wash font-semibold text-good'
          : 'border-line bg-surface-2 text-ink-2'"
        @click="emit('toggle')"
      >
        {{ ticked ? '✓ erledigt' : 'abhaken' }}
      </button>
    </div>
  </section>
</template>

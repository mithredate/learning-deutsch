<script setup lang="ts">
import type { Place, Slot } from '~/types'

const props = defineProps<{
  slot: Slot
  needs?: string[]
  ticked: boolean
}>()

const emit = defineEmits<{ toggle: [] }>()

const META: Record<Place, { icon: string; where: string; when: string }> = {
  gym: { icon: '🎧', where: 'Unterwegs', when: 'Gym · Weg · Warten' },
  sofa: { icon: '🛋️', where: 'Sofa', when: '21:00 — der Anker' },
  bed: { icon: '🌙', where: 'Vor dem Schlafen', when: 'im Bett, Handy reicht' },
}

const meta = computed(() => META[props.slot.place])
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
      <p v-if="slot.note" class="copy text-[0.85rem] leading-relaxed text-ink-3" v-html="slot.note" />

      <div v-if="needs?.length" class="flex flex-wrap gap-1.5">
        <span
          v-for="n in needs"
          :key="n"
          class="rounded-md border border-line-soft bg-surface-2 px-2 py-0.5 text-[0.76rem] text-ink-2"
        >{{ n }}</span>
      </div>

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

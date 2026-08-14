<script setup lang="ts">
import { TAG_NAMES } from '~/data/cards'
import type { Card } from '~/types'

const props = defineProps<{ cards: Card[] }>()
const emit = defineEmits<{ miss: [cue: string] }>()

const queue = ref<Card[]>([])
const again = ref<Card[]>([])
const pos = ref(0)
const flipped = ref(false)
const finished = ref(false)

function reset() {
  queue.value = [...props.cards]
  again.value = []
  pos.value = 0
  flipped.value = false
  finished.value = props.cards.length === 0
}
watch(() => props.cards, reset, { immediate: true })

const current = computed(() => queue.value[pos.value])
const label = computed(() =>
  [...new Set(props.cards.map(c => TAG_NAMES[c.tag]))].join(' · '),
)

function advance() {
  pos.value++
  flipped.value = false
  if (pos.value < queue.value.length) return
  // A card marked „nochmal" comes back at the end — one pass is never enough.
  if (again.value.length) {
    queue.value = [...again.value]
    again.value = []
    pos.value = 0
  } else {
    finished.value = true
  }
}

function knew() {
  advance()
}

function missed() {
  if (current.value) {
    emit('miss', current.value.cue)
    again.value.push(current.value)
  }
  advance()
}
</script>

<template>
  <section
    v-if="cards.length"
    class="overflow-hidden rounded-2xl border border-line bg-surface"
    :style="{ boxShadow: 'var(--shadow)' }"
  >
    <header class="flex items-baseline justify-between gap-2.5 border-b border-line-soft px-4 py-3">
      <h3 class="text-base">{{ label }}</h3>
      <span class="font-mono text-[0.72rem] tabular-nums text-ink-3">
        <template v-if="!finished">
          {{ pos + 1 }} / {{ queue.length }}<template v-if="again.length"> ↺{{ again.length }}</template>
        </template>
      </span>
    </header>

    <div v-if="finished" class="flex flex-col items-center gap-3 px-4 py-7 text-center">
      <span class="font-serif text-2xl">Durch.</span>
      <p class="text-[0.87rem] text-ink-2">Alle Karten einmal richtig.</p>
      <button
        type="button"
        class="rounded-lg border border-line bg-surface-2 px-4 py-2 text-[0.85rem] text-ink-2"
        @click="reset"
      >Noch einmal</button>
    </div>

    <template v-else-if="current">
      <button
        type="button"
        class="flex min-h-[11rem] w-full cursor-pointer flex-col items-center justify-center gap-3 px-4 py-6 text-center select-none"
        :aria-label="flipped ? 'Antwort' : 'Antwort aufdecken'"
        @click="flipped = true"
      >
        <span class="eyebrow">{{ TAG_NAMES[current.tag] }}</span>
        <template v-if="flipped">
          <span class="copy text-[1.02rem] leading-snug font-semibold" v-html="current.answer" />
          <span v-if="current.example" class="copy text-[0.87rem] leading-relaxed text-ink-2 italic" v-html="current.example" />
          <span v-if="current.hint" class="text-[0.8rem] text-ink-3">{{ current.hint }}</span>
        </template>
        <template v-else>
          <span class="font-serif text-[1.45rem] leading-snug">{{ current.cue }}</span>
          <span class="text-[0.8rem] text-ink-3">tippen zum Aufdecken</span>
        </template>
      </button>

      <div class="flex gap-px border-t border-line-soft bg-line-soft">
        <template v-if="flipped">
          <button type="button" class="flex-1 bg-surface px-2 py-3.5 text-[0.87rem] text-crit" @click="missed">
            nochmal
          </button>
          <button type="button" class="flex-1 bg-surface px-2 py-3.5 text-[0.87rem] font-semibold text-good" @click="knew">
            saß ✓
          </button>
        </template>
        <button v-else type="button" class="flex-1 bg-surface px-2 py-3.5 text-[0.87rem] text-ink-2" @click="flipped = true">
          aufdecken
        </button>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { TAG_NAMES } from '~/data/cards'
import type { Card } from '~/types'
import { useSpeech, type Line } from '~/composables/useSpeech'

const props = defineProps<{ cards: Card[] }>()
const emit = defineEmits<{ miss: [cue: string] }>()

const queue = ref<Card[]>([])
const again = ref<Card[]>([])
const pos = ref(0)
const flipped = ref(false)
const finished = ref(false)

const { speak, stop, speaking, supported } = useSpeech()

function reset() {
  stop()
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

/**
 * ── The pacing policy ────────────────────────────────────────────────────────
 * What the ear gets, in what order, and how much silence sits between.
 *
 * The gaps are the design. Word → (silence) → meaning is a self-test you can
 * run with your hands on a dumbbell: the silence is where you answer. Set the
 * gap to 0 and the same audio becomes passive listening — faster, but you never
 * find out what you don't know. The examples come last and in German only, so
 * the pass ends in the language instead of in English.
 *
 * These numbers are the knob. Tune them to how you actually study.
 */
function linesFor(card: Card): Line[] {
  return [
    { text: card.cue, lang: 'de' },
    { text: card.cue, lang: 'de', gap: 700 },     // twice: once to hear, once to hold
    { text: card.meaning, lang: 'en', gap: 1400 }, // the answer, after the self-test gap
    ...(card.examples ?? []).map(e => ({ text: e, lang: 'de' as const, gap: 600 })),
  ]
}

function listen() {
  if (!current.value) return
  if (speaking.value) return stop()
  // Hearing the card is a form of revealing it — keep the screen honest.
  flipped.value = true
  speak(linesFor(current.value))
}

function advance() {
  stop()
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
    <header class="flex items-center justify-between gap-2.5 border-b border-line-soft px-4 py-3">
      <h3 class="flex-1 text-base">{{ label }}</h3>

      <ClientOnly>
        <button
          v-if="supported && !finished && current"
          type="button"
          class="-my-1 rounded-lg border px-2.5 py-1.5 text-[0.8rem] whitespace-nowrap transition-colors"
          :class="speaking
            ? 'border-accent bg-accent-wash font-semibold text-accent'
            : 'border-line bg-surface-2 text-ink-2'"
          :aria-label="speaking ? 'Vorlesen stoppen' : 'Karte vorlesen'"
          @click="listen"
        >{{ speaking ? '■ stopp' : '🔊 hören' }}</button>
      </ClientOnly>

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
      <!--
        Both faces sit in the *same* grid cell, so the row is always as tall as
        the taller of the two and flipping never resizes the card. With `v-if`
        the box grew by the height of the answer on every tap: the page jumped
        under your thumb and the buttons moved out from under it. `invisible`
        (visibility: hidden) is what makes the hidden face still take up its
        space — `hidden` or `v-show` would bring the jump straight back.
      -->
      <button
        type="button"
        class="grid w-full cursor-pointer text-center select-none"
        :aria-label="flipped ? 'Karte umdrehen' : 'Antwort aufdecken'"
        @click="flipped = !flipped"
      >
        <span
          class="col-start-1 row-start-1 flex flex-col items-center justify-center gap-3 px-4 py-6"
          :class="flipped ? 'invisible' : ''"
          :aria-hidden="flipped"
        >
          <span class="eyebrow">{{ TAG_NAMES[current.tag] }}</span>
          <span class="font-serif text-[1.45rem] leading-snug">{{ current.cue }}</span>
          <span class="text-[0.8rem] text-ink-3">tippen zum Aufdecken</span>
        </span>

        <span
          class="col-start-1 row-start-1 flex flex-col items-center justify-center gap-3 px-4 py-6"
          :class="flipped ? '' : 'invisible'"
          :aria-hidden="!flipped"
        >
          <span class="eyebrow">{{ TAG_NAMES[current.tag] }}</span>
          <!-- The German word stays on top: that is what has to survive into the
               exam. The English sits under it as the check that you actually
               know it, not just that it looks familiar. -->
          <span class="copy text-[1.02rem] leading-snug font-semibold" v-html="current.answer" />
          <span class="flex w-full items-start gap-2 rounded-xl bg-surface-2 px-3 py-2.5 text-left">
            <span class="mt-0.5 rounded border border-line px-1 font-mono text-[0.6rem] tracking-wider text-ink-3">EN</span>
            <span class="copy flex-1 text-[0.88rem] leading-relaxed text-ink-2" v-html="current.meaning" />
          </span>

          <!-- Easiest first. The opening phrase is the word in the smallest unit
               that still carries it, so it gets the compact chip; the sentences
               under it read as quoted German. -->
          <span v-if="current.examples?.length" class="flex w-full flex-col gap-1.5 text-left">
            <span
              v-for="(ex, i) in current.examples"
              :key="i"
              class="copy leading-relaxed"
              :class="i === 0
                ? 'self-start rounded-lg border border-line-soft bg-surface-2 px-2.5 py-1 text-[0.87rem] text-ink-2'
                : 'pl-2.5 text-[0.87rem] text-ink-2 italic'"
              v-html="ex"
            />
          </span>

          <span v-if="current.hint" class="text-[0.8rem] text-ink-3">{{ current.hint }}</span>
          <span class="font-mono text-[0.68rem] text-ink-3">↺ {{ current.cue }}</span>
        </span>
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

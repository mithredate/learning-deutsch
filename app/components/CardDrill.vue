<script setup lang="ts">
import { TAG_NAMES, KIND_NAMES, type CardKind } from '~/data/cards'
import type { Card } from '~/types'
import { useWortAudio } from '~/composables/useWortAudio'
import { useProgress } from '~/composables/useProgress'
import { cardKey } from '~/utils/speakable'

/**
 * `id` is the block this round belongs to — `${date}:${slotIndex}`, the same key
 * the tick marks use. It is what makes „saß ✓" survive closing the app.
 */
const props = defineProps<{ cards: Card[]; id: string; kind?: CardKind }>()
const emit = defineEmits<{ miss: [cue: string] }>()

const { hydrate, clearedCards, clearCard, resetDrill } = useProgress()
// Synchronously, not in onMounted: the first `reset()` runs during setup, and a
// round built before storage is read would show every cleared card again.
hydrate()

const queue = ref<Card[]>([])
const again = ref<Card[]>([])
const pos = ref(0)
const flipped = ref(false)
const finished = ref(false)
/** How many of this block's cards were already sitting before today's round. */
const carried = ref(0)

// The recordings are baked by the private repo's synthesizer (Gemini-TTS) and
// played through one reused <audio> element, so a deck run survives the screen
// locking. What each card says, and the silences between, live in
// `utils/speakable.ts` — shared with the synthesizer so the two cannot drift.
const { play, stop, skip, warm, playing } = useWortAudio()

/** True while a whole-deck run is walking the cards on its own. */
const running = ref(false)

/** Silence everything, including a run in progress. */
function halt() {
  running.value = false
  stop()
}
onUnmounted(halt)

/**
 * Rebuild the round from what is *not* yet cleared.
 *
 * Resuming is expressed as a filter rather than a stored cursor on purpose: a
 * cursor goes stale the moment the deck changes underneath it (a card edited,
 * the rotation moved on), and a stale cursor either repeats work or skips cards
 * silently. „Which cards are still open" cannot go stale.
 */
function reset() {
  halt()
  const done = clearedCards(props.id)
  const open = props.cards.filter(c => !done.has(cardKey(c)))
  carried.value = props.cards.length - open.length
  queue.value = open
  again.value = []
  pos.value = 0
  flipped.value = false
  finished.value = open.length === 0 && props.cards.length > 0
}

/** „Noch einmal" — deliberate, by hand: the whole deck comes back. */
function startOver() {
  resetDrill(props.id)
  reset()
}

watch(() => [props.cards, props.id], reset, { immediate: true })
// Fetch the deck's recordings while there is still signal — see `warm()`.
onMounted(() => warm(props.cards))

const current = computed(() => queue.value[pos.value])
const label = computed(() =>
  [...new Set(props.cards.map(c => TAG_NAMES[c.tag]))].join(' · '),
)

function listen() {
  if (!current.value) return
  if (playing.value) return halt()
  // Hearing the card is a form of revealing it — keep the screen honest.
  flipped.value = true
  play([current.value])
}

/**
 * The whole deck, hands-free, starting from the card you are on.
 *
 * A run deliberately grades nothing and puts the drill back where it found it.
 * Listening on the way to the gym must not quietly consume tonight's session —
 * otherwise you sit down at 21:00, open the block, and the deck is already at
 * „Durch." without a single card having been answered.
 *
 * Stopping by hand is the opposite case: you stopped because you want to be on
 * *that* card, so a manual stop leaves you standing there.
 */
async function listenAll() {
  if (playing.value) return halt()
  if (!queue.value.length) return

  const from = pos.value
  const wasFlipped = flipped.value
  running.value = true

  // The player walks the cards; the screen follows it card by card.
  await play(queue.value.slice(from), (_card, i) => {
    pos.value = from + i
    flipped.value = true
  })

  if (!running.value) return   // stopped by hand, or graded away — stay put
  running.value = false
  pos.value = from
  flipped.value = wasFlipped
}

function advance() {
  // Grading a card by hand ends the run — you have taken the wheel back.
  halt()
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
  // Persist before advancing: a card that sat is done for this block, today and
  // after the next app restart. This is the whole fix for „it always starts over".
  if (current.value) clearCard(props.id, cardKey(current.value))
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
      <h3 class="min-w-0 flex-1 text-base">
        <span v-if="kind" class="eyebrow block">{{ KIND_NAMES[kind] }}</span>
        {{ label }}
      </h3>

      <ClientOnly>
        <span v-if="!finished && current" class="-my-1 flex items-center gap-1">
          <!-- While a run is playing you need to move *inside* it: back to the
               word you didn't catch, again on the one you want twice, forward
               past the one you already own. Stop-only turns every one of those
               into „start the deck over". -->
          <template v-if="playing">
            <button
              type="button"
              class="rounded-lg border border-line bg-surface-2 px-2 py-1.5 text-[0.78rem] text-ink-2"
              aria-label="Vorherige Karte"
              @click="skip(-1)"
            >⏮</button>
            <button
              type="button"
              class="rounded-lg border border-line bg-surface-2 px-2 py-1.5 text-[0.78rem] text-ink-2"
              aria-label="Diese Karte noch einmal"
              @click="skip(0)"
            >↻</button>
            <button
              type="button"
              class="rounded-lg border border-accent bg-accent-wash px-2 py-1.5 text-[0.78rem] font-semibold text-accent"
              aria-label="Vorlesen stoppen"
              @click="halt"
            >■</button>
            <button
              type="button"
              class="rounded-lg border border-line bg-surface-2 px-2 py-1.5 text-[0.78rem] text-ink-2"
              aria-label="Nächste Karte"
              @click="skip(1)"
            >⏭</button>
          </template>
          <template v-else>
            <button
              type="button"
              class="rounded-lg border border-line bg-surface-2 px-2 py-1.5 text-[0.78rem] text-ink-2"
              aria-label="Diese Karte vorlesen"
              @click="listen"
            >🔊</button>
            <button
              type="button"
              class="rounded-lg border border-line bg-surface-2 px-2 py-1.5 text-[0.78rem] whitespace-nowrap text-ink-2"
              aria-label="Alle Karten nacheinander vorlesen"
              @click="listenAll"
            >▶︎ alle</button>
          </template>
        </span>
      </ClientOnly>

      <!-- The count includes what was already sitting from an earlier sitting of
           the same block, so the number matches the deck you were promised. -->
      <span class="font-mono text-[0.72rem] tabular-nums text-ink-3">
        <template v-if="!finished">
          {{ carried + pos + 1 }} / {{ carried + queue.length }}<template v-if="again.length"> ↺{{ again.length }}</template>
        </template>
      </span>
    </header>

    <div v-if="finished" class="flex flex-col items-center gap-3 px-4 py-7 text-center">
      <span class="font-serif text-2xl">Durch.</span>
      <p class="text-[0.87rem] text-ink-2">Alle {{ cards.length }} Karten einmal richtig.</p>
      <button
        type="button"
        class="rounded-lg border border-line bg-surface-2 px-4 py-2 text-[0.85rem] text-ink-2"
        @click="startOver"
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

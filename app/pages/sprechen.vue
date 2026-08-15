<script setup lang="ts">
import { TEILE, SURVIVAL, ALLEIN } from '~/data/sprechen'
import { todayIndex } from '~/composables/usePlan'
import { DAYS } from '~/data/days'

useHead({ title: 'Sprechen — die drei Teile' })

/** Collapsed by default: in class you want the task first, phrases on demand. */
const openBlocks = ref<Record<string, boolean>>({})
const toggle = (key: string) => (openBlocks.value[key] = !openBlocks.value[key])

/**
 * The solo prompt ends in „Das Thema ist: " — so it carries today's planning
 * task where the calendar has one, and the day's Teil 2 topic otherwise. A
 * prompt you still have to finish by hand is a prompt you don't use.
 */
// `todayIndex()` rather than `usePlan()`: this page has no day navigation, and
// usePlan's index starts at 0 — which would hand the AI the *first day of the
// plan's* topic. Resolved on mount, because on the server there is no „today"
// worth committing to in a prerendered page.
const today = ref(DAYS[0]!)
onMounted(() => (today.value = DAYS[todayIndex()]!))

const prompt = computed(() =>
  ALLEIN.prompt + (today.value.aufgabe ?? today.value.thema?.title ?? 'Sie planen zusammen ein Wochenende in einer anderen Stadt.'),
)

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(prompt.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    /* no clipboard permission — the text is on screen to read out anyway */
  }
}
</script>

<template>
  <div class="mx-auto flex max-w-lg flex-col gap-6 px-4">
    <header class="flex flex-col gap-3 pt-6">
      <span class="eyebrow">Mündliche Prüfung · 75 von 300 Punkten</span>
      <h1 class="text-[clamp(1.6rem,5.5vw,2.1rem)] leading-tight">Sprechen: die drei Teile</h1>
      <p class="text-[0.93rem] leading-relaxed text-ink-2">
        Zu zweit, etwa 15 Minuten, davor 20 Minuten Vorbereitung. Nimm das hier mit in den Kurs
        und gib deinem Partner die zweite Karte in Teil 2.
      </p>
      <p class="rounded-xl bg-surface-2 px-3 py-2.5 text-[0.83rem] leading-relaxed text-ink-3">
        <b class="text-ink-2">Die eine Regel:</b> Es zählt nicht, ob du fehlerfrei sprichst,
        sondern ob du <b class="text-ink-2">das Gespräch trägst</b> — fragen, vorschlagen,
        widersprechen, zusammenfassen. Wer nur antwortet, besteht nicht.
      </p>
    </header>

    <article
      v-for="teil in TEILE"
      :key="teil.n"
      class="overflow-hidden rounded-2xl border border-line bg-surface"
      :style="{ boxShadow: 'var(--shadow)' }"
    >
      <header class="flex flex-col gap-1 border-b border-line-soft px-4 py-3.5" style="background: var(--accent-wash)">
        <span class="flex items-baseline justify-between gap-3">
          <span class="font-mono text-[0.7rem] tracking-widest uppercase" style="color: var(--accent)">
            Teil {{ teil.n }}
          </span>
          <span class="font-mono text-[0.72rem] tabular-nums text-ink-3">{{ teil.minutes }}</span>
        </span>
        <h2 class="text-[1.15rem]">{{ teil.title }}</h2>
      </header>

      <div class="flex flex-col gap-3.5 px-4 py-4">
        <p class="text-[0.94rem] leading-relaxed">{{ teil.task }}</p>

        <div v-if="teil.cards" class="flex flex-col gap-2.5">
          <div
            v-for="card in teil.cards"
            :key="card.label"
            class="rounded-xl border border-line bg-surface-2 px-3.5 py-3"
          >
            <span class="eyebrow">{{ card.label }}</span>
            <p class="mt-1.5 text-[0.9rem] leading-relaxed text-ink-2">{{ card.text }}</p>
          </div>
        </div>

        <ol v-if="teil.steps" class="flex list-decimal flex-col gap-1.5 pl-5 text-[0.88rem] leading-relaxed text-ink-2">
          <li v-for="s in teil.steps" :key="s">{{ s }}</li>
        </ol>

        <div class="flex flex-col gap-1.5 rounded-xl px-3.5 py-3" style="background: var(--good-wash)">
          <span class="eyebrow" style="color: var(--good)">Worauf der Prüfer achtet</span>
          <p v-for="l in teil.looksFor" :key="l" class="text-[0.85rem] leading-relaxed text-ink-2">
            {{ l }}
          </p>
        </div>

        <div v-for="block in teil.blocks" :key="block.label" class="overflow-hidden rounded-xl border border-line">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-left text-[0.86rem] font-semibold text-ink-2"
            @click="toggle(`${teil.n}-${block.label}`)"
          >
            <span>{{ block.label }}</span>
            <span class="text-ink-3">{{ openBlocks[`${teil.n}-${block.label}`] ? '▴' : '▾' }}</span>
          </button>
          <ul
            v-if="openBlocks[`${teil.n}-${block.label}`]"
            class="flex list-none flex-col gap-1.5 border-t border-line-soft px-3.5 py-3"
          >
            <!-- v-html: Redemittel carry inline <b>/<i> to mark the part that has
                 to be right (case, verb position). Static authored data, no input. -->
            <li
              v-for="line in block.lines"
              :key="line"
              class="copy text-[0.89rem] leading-relaxed text-ink-2"
              v-html="line"
            />
          </ul>
        </div>

        <div class="flex flex-col gap-1.5 rounded-xl px-3.5 py-3" style="background: var(--crit-wash)">
          <span class="eyebrow" style="color: var(--crit)">Deine Fehler — aufpassen</span>
          <p
            v-for="t in teil.traps"
            :key="t"
            class="copy text-[0.85rem] leading-relaxed text-ink-2"
            v-html="t"
          />
        </div>
      </div>
    </article>

    <!-- Sprechen on a day with no course. Until 15.08. this page assumed a
         partner in class three evenings a week; a voice AI is a partner on the
         other four. -->
    <section
      class="flex flex-col gap-3 rounded-2xl border px-4 py-4"
      style="border-color: var(--accent)"
    >
      <span class="eyebrow" style="color: var(--accent)">{{ ALLEIN.label }}</span>
      <p class="text-[0.88rem] leading-relaxed text-ink-2">{{ ALLEIN.intro }}</p>

      <div class="flex flex-col gap-2 rounded-xl bg-surface-2 px-3.5 py-3">
        <p class="text-[0.85rem] leading-relaxed text-ink-2">{{ prompt }}</p>
        <button
          type="button"
          class="self-start rounded-lg border border-line bg-surface px-3 py-1.5 text-[0.8rem] text-ink-2"
          @click="copy"
        >{{ copied ? '✓ kopiert' : 'kopieren' }}</button>
      </div>

      <div class="flex flex-col gap-2">
        <p
          v-for="r in ALLEIN.rules"
          :key="r"
          class="copy text-[0.85rem] leading-relaxed text-ink-2"
          v-html="r"
        />
      </div>

      <p class="text-[0.83rem] leading-relaxed text-ink-3">{{ ALLEIN.danach }}</p>
    </section>

    <section class="flex flex-col gap-2 rounded-2xl border border-line bg-surface px-4 py-4">
      <span class="eyebrow">{{ SURVIVAL.label }}</span>
      <p class="text-[0.83rem] leading-relaxed text-ink-3">
        Auswendig lernen. Stille kostet mehr Punkte als ein Fehler.
      </p>
      <ul class="flex list-none flex-col gap-1.5 p-0">
        <li v-for="line in SURVIVAL.lines" :key="line" class="text-[0.89rem] leading-relaxed text-ink-2">
          {{ line }}
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-2 rounded-2xl border px-4 py-4" style="border-color: var(--accent); background: var(--accent-wash)">
      <span class="eyebrow" style="color: var(--accent)">Nach dem Kurs</span>
      <p class="text-[0.87rem] leading-relaxed text-ink-2">
        Schreib mir drei Dinge: welches Wort dir gefehlt hat, welchen Satz du zweimal neu
        anfangen musstest, und ob du in Teil 3 wirklich widersprochen hast. Daraus wird der
        nächste Drill.
      </p>
    </section>

    <footer class="flex flex-col gap-2 border-t border-line pt-4 text-[0.8rem] text-ink-3">
      <NuxtLink to="/" class="text-accent">← Tageskarte</NuxtLink>
    </footer>
  </div>
</template>

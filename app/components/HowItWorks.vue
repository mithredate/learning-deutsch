<script setup lang="ts">
/**
 * Onboarding. Deliberately in English while the study content stays German:
 * instructions about the *tool* should never be the thing you have to decode.
 * The learner said "I don't understand how to use the app" — that is a UX bug,
 * not a docs bug, so the answer lives here rather than in the README.
 */
const KEY = 'ld:helpSeen'
const open = ref(false)
const seen = ref(true)

onMounted(() => {
  try {
    seen.value = localStorage.getItem(KEY) === '1'
  } catch {
    seen.value = false
  }
  open.value = !seen.value
})

function dismiss() {
  try {
    localStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
  seen.value = true
  open.value = false
}

defineExpose({ show: () => (open.value = true) })

const STEPS = [
  {
    icon: '🎧',
    title: 'Unterwegs — 10–15 min',
    body: 'At the gym, on the way, waiting anywhere. The flashcards sit <b>inside</b> this block — read the German front, tap to flip. The back gives you the German explanation <i>and</i> the English meaning, then you mark <b>saß ✓</b> or <b>nochmal</b>. Anything marked <b>nochmal</b> comes back before the round ends.',
  },
  {
    icon: '🛋️',
    title: 'Sofa, 21:00 — 25–35 min',
    body: 'The one block that never moves, and it carries its own material: if tonight is a listening sitting, the exercise and the audio are right there in the block — nothing to go hunting for. When it says <i>schreib mir</i>, that means message me in chat — from your phone is fine.',
  },
  {
    icon: '🌙',
    title: 'Before sleep — 5 min',
    body: 'Three sentences in German, in any notes app — typed on the <b>German keyboard</b>. Wrong is fine; the point is producing, not being correct. The exam is digital and hands you a QWERTZ layout you cannot change, so every German character you type between now and 25.09. is practice for it.',
  },
]
</script>

<template>
  <div>
    <button
      v-if="seen && !open"
      type="button"
      class="self-start rounded-full border border-line bg-surface px-3 py-1 text-[0.75rem] text-ink-3"
      @click="open = true"
    >
      ? How this works
    </button>

    <section
      v-if="open"
      class="flex flex-col gap-4 rounded-2xl border border-accent bg-surface px-4 py-5"
      :style="{ boxShadow: 'var(--shadow)' }"
    >
      <header class="flex flex-col gap-1.5">
        <span class="eyebrow" style="color: var(--accent)">How this works</span>
        <h2 class="text-[1.25rem]">Three small blocks, three places</h2>
        <p class="text-[0.88rem] leading-relaxed text-ink-2">
          This page always shows <b>today</b> — you never pick a day or open a laptop.
          The three cards below are the day, in the order it happens. Tap
          <b>abhaken</b> on each when it's done.
        </p>
      </header>

      <ol class="flex list-none flex-col gap-3 p-0">
        <li v-for="s in STEPS" :key="s.title" class="flex gap-3">
          <span class="text-lg leading-none" aria-hidden="true">{{ s.icon }}</span>
          <span class="flex flex-1 flex-col gap-1">
            <span class="text-[0.9rem] font-semibold">{{ s.title }}</span>
            <span class="copy text-[0.85rem] leading-relaxed text-ink-2" v-html="s.body" />
          </span>
        </li>
      </ol>

      <div class="flex flex-col gap-2 rounded-xl bg-surface-2 px-3.5 py-3">
        <span class="eyebrow">The rest of the page</span>
        <p class="text-[0.85rem] leading-relaxed text-ink-2">
          <b>Doing an exercise twice is the point.</b> Tap <b>noch einmal versuchen</b> and the
          old score is kept, not replaced — you see 2/5 → 5/5 as a list, which is the only
          real evidence the material stuck.
        </p>
        <p class="text-[0.85rem] leading-relaxed text-ink-2">
          <b>Notizen für heute</b> is a free field per day: results, words you didn't know,
          questions for me. It stays on that day and goes into the report.
        </p>
        <p class="text-[0.85rem] leading-relaxed text-ink-2">
          <b>📤 Bericht für Claude</b> copies all of it as text — every attempt, every note,
          every card that keeps coming back. Paste it into chat and I can see what's
          sticking without you having to describe it.
        </p>
      </div>

      <p class="text-[0.82rem] leading-relaxed text-ink-3">
        Install it: Safari → Share → <b>Add to Home Screen</b>. Then it opens like an app and
        works without signal — but play each audio file once while online first.
      </p>

      <button
        type="button"
        class="rounded-xl border border-accent bg-accent-wash px-4 py-2.5 text-[0.87rem] font-semibold text-accent"
        @click="dismiss"
      >
        Got it
      </button>
    </section>
  </div>
</template>

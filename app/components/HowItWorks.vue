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
    body: 'At the gym, on the way, waiting anywhere. Do the flashcard deck further down this page: read the front, tap to flip, then mark <b>saß ✓</b> or <b>nochmal</b>. Anything you mark <b>nochmal</b> comes back before the round ends.',
  },
  {
    icon: '🛋️',
    title: 'Sofa, 21:00 — 25–35 min',
    body: 'The one block that never moves. Do whatever the card says: a listening sitting, vocabulary, grammar, or a letter. When it says <i>schreib mir</i>, that means message me in chat — from your phone is fine.',
  },
  {
    icon: '🌙',
    title: 'Before sleep — 5 min',
    body: 'Three sentences in German, in any notes app. Wrong is fine. The point is producing, not being correct.',
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
        <span class="eyebrow">The other two things on this page</span>
        <p class="text-[0.85rem] leading-relaxed text-ink-2">
          <b>🎧 Hören</b> opens the listening exercises: play the audio, answer
          <i>richtig</i> / <i>falsch</i>, then tap <b>Auswerten</b> to score yourself
          against the 60 % pass mark. It tells you which trap each miss was.
        </p>
        <p class="text-[0.85rem] leading-relaxed text-ink-2">
          <b>📤 Bericht für Claude</b> copies your progress as text. Paste it into chat and
          I can see what's sticking without you having to describe it.
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

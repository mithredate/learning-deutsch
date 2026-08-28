<script setup lang="ts">
import type { Planung } from '~/types'

/**
 * A Teil 3 task in the paper's own layout: situation, then the Stichpunkt list.
 * Two pages show the same thing (the day card and /sprechen), and the list is
 * the half that must not drift — so it lives in one component.
 */
defineProps<{ planung: Planung; english: boolean }>()
</script>

<template>
  <p class="text-[0.88rem] leading-relaxed text-ink-2">{{ planung.situation }}</p>
  <p v-if="english" class="flex items-start gap-2 border-l-2 border-line pl-2.5 text-[0.84rem] leading-relaxed text-ink-3">
    <span class="mt-0.5 rounded border border-line px-1 font-mono text-[0.6rem] tracking-wider">EN</span>
    <span class="flex-1">{{ planung.en }}</span>
  </p>

  <!-- The list is the exam's own box: a title, then Stichpunkte. Boxed and
       monospaced so it reads as material to work through, not as prose. -->
  <div class="flex flex-col gap-1.5 rounded-xl bg-surface-2 px-3.5 py-3">
    <span class="text-[0.85rem] font-semibold">{{ planung.titel }}</span>
    <ul class="flex list-none flex-col gap-1">
      <li
        v-for="p in planung.punkte"
        :key="p"
        class="text-[0.86rem] leading-relaxed text-ink-2"
      >• {{ p }}</li>
    </ul>
  </div>
</template>

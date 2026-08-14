<script setup lang="ts">
import { useLocalAudio, usePlaybackMemory } from '~/composables/useLocalAudio'

/**
 * The imported-MP3 player, sitting inside whichever block needs it. Licensed
 * telc audio never enters this repo, so the file has to come off the device —
 * but the moment that import lives at the bottom of the page instead of in the
 * block that says „22 Minuten am Stück", the block does not get done.
 */
const { tracks, refresh, add, objectUrl, remove, supported } = useLocalAudio()
const memory = usePlaybackMemory()

const player = ref<HTMLAudioElement | null>(null)
const nowPlaying = ref<{ id: string; title: string } | null>(null)
const error = ref('')
const busy = ref(false)

onMounted(refresh)

async function playLocal(url: string, name: string) {
  error.value = ''
  const src = await objectUrl(url)
  if (!src) {
    error.value = 'Datei nicht mehr im Speicher. Bitte neu hinzufügen.'
    return
  }
  nowPlaying.value = { id: url, title: name }
  await nextTick()
  if (player.value) {
    player.value.src = src
    player.value.currentTime = memory.get(url)
    void player.value.play()
  }
}

function remember() {
  if (player.value && nowPlaying.value) memory.set(nowPlaying.value.id, player.value.currentTime)
}

async function onPick(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  busy.value = true
  error.value = ''
  try {
    await add(file)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Konnte die Datei nicht speichern.'
  } finally {
    busy.value = false
    input.value = ''
  }
}

const mb = (bytes: number) => `${(bytes / 1_048_576).toFixed(1)} MB`
</script>

<template>
  <div class="flex flex-col gap-2.5 rounded-xl border border-line bg-surface-2 px-3 py-3">
    <span class="eyebrow">Deine Dateien · nur auf diesem Gerät</span>

    <div v-if="nowPlaying" class="flex flex-col gap-1.5 rounded-lg bg-surface p-2.5">
      <span class="truncate font-mono text-[0.72rem] text-ink-3">{{ nowPlaying.title }}</span>
      <audio ref="player" controls preload="metadata" class="w-full" @timeupdate="remember" @pause="remember" />
    </div>

    <div
      v-for="t in tracks"
      :key="t.url"
      class="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface px-3 py-2.5"
    >
      <button type="button" class="flex min-w-0 flex-1 flex-col text-left" @click="playLocal(t.url, t.name)">
        <span class="truncate text-[0.86rem] font-semibold">{{ t.name }}</span>
        <span class="font-mono text-[0.7rem] tabular-nums text-ink-3">{{ mb(t.size) }} · offline</span>
      </button>
      <button type="button" class="px-2 text-[0.78rem] text-crit" @click="remove(t.url)">entfernen</button>
    </div>

    <label class="cursor-pointer rounded-lg border border-dashed border-line bg-surface px-3 py-2.5 text-center text-[0.82rem] text-ink-2">
      {{ busy ? 'wird gespeichert …' : tracks.length ? '+ weitere MP3 hinzufügen' : '+ MP3 vom Gerät hinzufügen' }}
      <input type="file" accept="audio/*" class="sr-only" :disabled="busy" @change="onPick">
    </label>

    <p v-if="!supported()" class="text-[0.78rem] text-crit">
      Dieser Browser speichert keine Dateien offline (kein sicherer Kontext).
    </p>
    <p v-if="error" class="text-[0.78rem] text-crit">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { EPISODES } from '~/data/episodes'
import { useLocalAudio, usePlaybackMemory } from '~/composables/useLocalAudio'

const { tracks, refresh, add, objectUrl, remove, supported } = useLocalAudio()
const memory = usePlaybackMemory()

const open = ref(false)
const player = ref<HTMLAudioElement | null>(null)
const nowPlaying = ref<{ id: string; title: string } | null>(null)
const error = ref('')
const busy = ref(false)

const base = useRuntimeConfig().app.baseURL

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

async function playEpisode(file: string, title: string, id: string) {
  error.value = ''
  nowPlaying.value = { id, title }
  await nextTick()
  if (player.value) {
    player.value.src = `${base}audio/${file}`
    player.value.currentTime = memory.get(id)
    void player.value.play()
  }
}

function remember() {
  if (player.value && nowPlaying.value) memory.set(nowPlaying.value.id, player.value.currentTime)
}

function nudge(seconds: number) {
  if (player.value) player.value.currentTime = Math.max(0, player.value.currentTime + seconds)
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

function mb(bytes: number) {
  return `${(bytes / 1_048_576).toFixed(1)} MB`
}
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-line bg-surface" :style="{ boxShadow: 'var(--shadow)' }">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-2.5 px-4 py-3.5 text-left text-[0.9rem] text-ink-2"
      @click="open = !open"
    >
      <span>🎧 Hören</span>
      <span class="text-ink-3">{{ open ? '▴' : '▾' }}</span>
    </button>

    <div v-if="open" class="flex flex-col gap-3 px-4 pb-4">
      <div v-if="nowPlaying" class="flex flex-col gap-2 rounded-xl bg-surface-2 p-3">
        <span class="font-mono text-[0.72rem] text-ink-3">{{ nowPlaying.title }}</span>
        <audio
          ref="player"
          controls
          preload="metadata"
          class="w-full"
          @timeupdate="remember"
          @pause="remember"
        />
        <div class="flex gap-2">
          <button type="button" class="flex-1 rounded-lg border border-line bg-surface py-2 text-[0.8rem] text-ink-2" @click="nudge(-15)">
            ← 15 s
          </button>
          <button type="button" class="flex-1 rounded-lg border border-line bg-surface py-2 text-[0.8rem] text-ink-2" @click="nudge(15)">
            15 s →
          </button>
        </div>
      </div>

      <template v-if="EPISODES.length">
        <span class="eyebrow">Eigene Übungen</span>
        <button
          v-for="ep in EPISODES"
          :key="ep.id"
          type="button"
          class="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-left"
          @click="playEpisode(ep.file, ep.title, ep.id)"
        >
          <span class="flex flex-col">
            <span class="text-[0.88rem] font-semibold">{{ ep.title }}</span>
            <span class="font-mono text-[0.7rem] text-ink-3">{{ ep.teil }}</span>
          </span>
          <span class="font-mono text-[0.72rem] tabular-nums text-ink-3">
            {{ Math.round(ep.seconds / 60) }} min
          </span>
        </button>
      </template>
      <p v-else class="text-[0.82rem] leading-relaxed text-ink-3">
        Noch keine eigenen Hörübungen veröffentlicht. Die entstehen als Nächstes —
        selbst geschriebene Dialoge im telc-Format, mit dem TTS-Tool vertont.
      </p>

      <span class="eyebrow mt-1">Eigene Dateien</span>
      <p class="text-[0.82rem] leading-relaxed text-ink-3">
        Lizenzierte Prüfungsaudios gehören nicht ins öffentliche Repo. Füg die MP3
        hier einmal hinzu — sie bleibt auf diesem Gerät und spielt danach offline.
      </p>

      <label
        class="cursor-pointer rounded-xl border border-dashed border-line bg-surface-2 px-3 py-3 text-center text-[0.85rem] text-ink-2"
      >
        {{ busy ? 'wird gespeichert …' : '+ MP3 vom Gerät hinzufügen' }}
        <input type="file" accept="audio/*" class="sr-only" :disabled="busy" @change="onPick">
      </label>

      <div
        v-for="t in tracks"
        :key="t.url"
        class="flex items-center justify-between gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2.5"
      >
        <button type="button" class="flex min-w-0 flex-1 flex-col text-left" @click="playLocal(t.url, t.name)">
          <span class="truncate text-[0.86rem] font-semibold">{{ t.name }}</span>
          <span class="font-mono text-[0.7rem] tabular-nums text-ink-3">{{ mb(t.size) }} · offline</span>
        </button>
        <button type="button" class="px-2 text-[0.78rem] text-crit" @click="remove(t.url)">entfernen</button>
      </div>

      <p v-if="!supported()" class="text-[0.8rem] text-crit">
        Dieser Browser speichert keine Dateien offline (kein sicherer Kontext).
      </p>
      <p v-if="error" class="text-[0.8rem] text-crit">{{ error }}</p>
    </div>
  </section>
</template>

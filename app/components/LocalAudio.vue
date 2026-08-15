<script setup lang="ts">
import { useLocalAudio, usePlaybackMemory } from '~/composables/useLocalAudio'

/**
 * The imported-MP3 player, sitting inside whichever block needs it. Licensed
 * telc audio never enters this repo, so the file has to come off the device —
 * but the moment that import lives at the bottom of the page instead of in the
 * block that says „22 Minuten am Stück", the block does not get done.
 */
const props = defineProps<{
  /** The filename this block is waiting for, if it wants a particular one. */
  want?: string
}>()

const { tracks, refresh, add, objectUrl, remove, supported } = useLocalAudio()
const memory = usePlaybackMemory()

/**
 * Filenames survive AirDrop badly — „telc-ut1-hv.mp3" comes back as
 * „telc-ut1-hv 2.mp3" on a second send, and iOS likes to re-case things. Match
 * on the squashed stem so the block still recognises its own audio.
 */
const stem = (name: string) => name.toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]/g, '')
const wanted = computed(() =>
  props.want ? tracks.value.find(t => stem(t.name).startsWith(stem(props.want!))) : undefined,
)
const others = computed(() => tracks.value.filter(t => t.url !== wanted.value?.url))

/**
 * Only shout when something is genuinely missing: a named file that is not here,
 * or no files at all. Anything else gets the quiet link — a block whose audio is
 * already on the device must never look like an unfinished task.
 */
const asking = computed(() => (props.want ? !wanted.value : !tracks.value.length))

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

/**
 * Warn, but do not refuse. The unfiltered input exists precisely for files iOS
 * has tagged oddly, so a missing or surprising MIME type is not evidence of a
 * mistake — a wrong pick shows up immediately as a track that will not play,
 * and „entfernen" is right there.
 */
const AUDIO_EXT = /\.(mp3|m4a|aac|wav|aiff?|ogg|opus|mp4|caf)$/i

async function onPick(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  busy.value = true
  error.value = ''
  try {
    await add(file)
    if (!file.type.startsWith('audio/') && !AUDIO_EXT.test(file.name)) {
      error.value = `„${file.name}" sieht nicht nach Audio aus — gespeichert, aber wahrscheinlich nicht abspielbar.`
    }
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
    <span class="eyebrow">{{ want ? 'Audio für diesen Block · auf diesem Gerät' : 'Deine Dateien · nur auf diesem Gerät' }}</span>

    <div v-if="nowPlaying" class="flex flex-col gap-1.5 rounded-lg bg-surface p-2.5">
      <span class="truncate font-mono text-[0.72rem] text-ink-3">{{ nowPlaying.title }}</span>
      <audio ref="player" controls preload="metadata" class="w-full" @timeupdate="remember" @pause="remember" />
    </div>

    <!-- The file this block asked for, already on the device: play it, don't ask
         for it. This is the whole point of naming the file in the day plan. -->
    <button
      v-if="wanted"
      type="button"
      class="flex items-center gap-2.5 rounded-xl border border-accent bg-accent-wash px-3 py-3 text-left"
      @click="playLocal(wanted.url, wanted.name)"
    >
      <span class="text-lg leading-none" aria-hidden="true">🎧</span>
      <span class="flex min-w-0 flex-1 flex-col">
        <span class="truncate text-[0.9rem] font-semibold" style="color: var(--accent)">Abspielen</span>
        <span class="truncate font-mono text-[0.68rem] text-ink-3">{{ wanted.name }} · {{ mb(wanted.size) }} · offline</span>
      </span>
    </button>

    <!-- Named, but not here yet — say which file, not just „add an MP3". -->
    <p v-else-if="want" class="text-[0.82rem] leading-relaxed text-ink-2">
      Dieser Block braucht <b class="font-mono text-[0.78rem]">{{ want }}</b>.
      Einmal vom Rechner aufs Handy schicken und unten hinzufügen — danach steht sie hier offline bereit.
    </p>

    <div
      v-for="t in others"
      :key="t.url"
      class="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface px-3 py-2.5"
    >
      <button type="button" class="flex min-w-0 flex-1 flex-col text-left" @click="playLocal(t.url, t.name)">
        <span class="truncate text-[0.86rem] font-semibold">{{ t.name }}</span>
        <span class="font-mono text-[0.7rem] tabular-nums text-ink-3">{{ mb(t.size) }} · offline</span>
      </button>
      <button type="button" class="px-2 text-[0.78rem] text-crit" @click="remove(t.url)">entfernen</button>
    </div>

    <!-- Once a file is in, the import is done — so the dashed „bring me a file"
         box stops being an instruction and becomes noise. It shrinks to a quiet
         link instead of asking again for something that already happened. -->
    <label
      class="cursor-pointer"
      :class="asking
        ? 'rounded-lg border border-dashed border-line bg-surface px-3 py-2.5 text-center text-[0.82rem] text-ink-2'
        : 'self-start px-1 py-0.5 text-[0.78rem] text-ink-3 underline underline-offset-2'"
    >
      {{ busy ? 'wird gespeichert …' : asking ? '+ MP3 vom Gerät hinzufügen' : '+ weitere Datei' }}
      <!--
        Explicit extensions, never `audio/*`. On iOS a wildcard media type sends
        Safari to the *photo library* picker, where the only things carrying
        audio are videos — so the file list showed .mp4 and greyed out the .mp3
        sitting in Files (reported 2026-08-15). Naming the extensions switches it
        to the document picker.
      -->
      <input
        type="file"
        accept=".mp3,.m4a,.aac,.wav,.aiff,.ogg,.opus,audio/mpeg,audio/mp4,audio/x-m4a,audio/aac,audio/wav"
        class="sr-only"
        :disabled="busy"
        @change="onPick"
      >
    </label>

    <!--
      The escape hatch. A file that arrived by AirDrop or from a download can
      carry a type iOS does not tag the way the picker expects, and then even the
      explicit list hides it. This input filters nothing at all; `onPick` warns
      if the result does not look like audio, and otherwise trusts you.
    -->
    <label class="cursor-pointer self-start px-1 py-0.5 text-[0.75rem] text-ink-3 underline underline-offset-2">
      Datei wird nicht angezeigt? Alle Dateien zeigen
      <input type="file" class="sr-only" :disabled="busy" @change="onPick">
    </label>

    <p v-if="!supported()" class="text-[0.78rem] text-crit">
      Dieser Browser speichert keine Dateien offline (kein sicherer Kontext).
    </p>
    <p v-if="error" class="text-[0.78rem] text-crit">{{ error }}</p>
  </div>
</template>

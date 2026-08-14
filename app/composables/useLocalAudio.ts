import { ref } from 'vue'

const CACHE = 'eigene-hoerdateien'
const INDEX_KEY = 'ld:localAudio'

export interface LocalTrack {
  name: string
  url: string
  size: number
}

const tracks = ref<LocalTrack[]>([])

function readIndex(): LocalTrack[] {
  try {
    return JSON.parse(localStorage.getItem(INDEX_KEY) ?? '[]') as LocalTrack[]
  } catch {
    return []
  }
}

function writeIndex(list: LocalTrack[]) {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

/**
 * Audio the learner imports from their own device.
 *
 * Stored in the Cache API rather than shipped in the repo: the one telc
 * Hörverstehen file is a TTS rendering of telc's copyrighted transcripts, so it
 * must not be published — but there is no reason it cannot live offline inside
 * the installed app. Original material goes in public/audio instead.
 */
export function useLocalAudio() {
  const supported = () => typeof caches !== 'undefined' && typeof window !== 'undefined' && window.isSecureContext

  function refresh() {
    tracks.value = readIndex()
  }

  async function add(file: File) {
    if (!supported()) throw new Error('Dieser Browser kann keine Dateien offline speichern.')
    const cache = await caches.open(CACHE)
    const url = `local-audio/${encodeURIComponent(file.name)}`
    await cache.put(new Request(url), new Response(file, { headers: { 'Content-Type': file.type || 'audio/mpeg' } }))
    const next = readIndex().filter(t => t.url !== url)
    next.push({ name: file.name, url, size: file.size })
    writeIndex(next)
    refresh()
  }

  async function objectUrl(url: string): Promise<string | null> {
    if (!supported()) return null
    const cache = await caches.open(CACHE)
    const res = await cache.match(url)
    if (!res) return null
    return URL.createObjectURL(await res.blob())
  }

  async function remove(url: string) {
    if (supported()) {
      const cache = await caches.open(CACHE)
      await cache.delete(url)
    }
    writeIndex(readIndex().filter(t => t.url !== url))
    refresh()
  }

  return { tracks, refresh, add, objectUrl, remove, supported }
}

/** Resume where the last session stopped — a 22-minute file is not worth rescrubbing. */
export function usePlaybackMemory() {
  const key = (id: string) => `ld:pos:${id}`
  return {
    get(id: string) {
      const v = Number(localStorage.getItem(key(id)) ?? 0)
      return Number.isFinite(v) ? v : 0
    },
    set(id: string, seconds: number) {
      try {
        localStorage.setItem(key(id), String(Math.floor(seconds)))
      } catch {
        /* ignore */
      }
    },
  }
}

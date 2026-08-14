import type { Episode } from '~/types'
import teil1 from './episodes/eigen-01-teil1.json'
import teil3 from './episodes/eigen-01-teil3.json'

/**
 * Original Hörverstehen material — written for this course and voiced with the
 * repo's own TTS pipeline, so it is free to publish here.
 *
 * Nothing from a licensed telc Übungstest belongs in this list; those are
 * copyrighted transcripts. Import such a file in the app instead (Hören →
 * Eigene Dateien), where it stays on the device.
 *
 * The advantage of writing our own: the distractors are engineered against this
 * learner's actual error profile (paraphrase, word-match, absolutizer,
 * negation, inference) rather than whatever a published test happens to contain.
 */
// Teil 2 (Repair-Café, items 6–15) is written and synthesised; its items file
// lands next and gets added here in one commit with its audio.
export const EPISODES: Episode[] = [teil1, teil3] as Episode[]

export function episodeById(id: string): Episode | undefined {
  return EPISODES.find(e => e.id === id)
}

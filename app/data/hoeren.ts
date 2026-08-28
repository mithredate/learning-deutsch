import type { Episode } from '~/types'
import teil1 from './episodes/eigen-01-teil1.json'
import teil2 from './episodes/eigen-01-teil2.json'
import teil3 from './episodes/eigen-01-teil3.json'
import e2teil1 from './episodes/eigen-02-teil1.json'
import e2teil2 from './episodes/eigen-02-teil2.json'
import e2teil3 from './episodes/eigen-02-teil3.json'
import e3teil1 from './episodes/eigen-03-teil1.json'
import e3teil2 from './episodes/eigen-03-teil2.json'
import e3teil3 from './episodes/eigen-03-teil3.json'

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
export const EPISODES: Episode[] = [
  teil1, teil2, teil3,
  e2teil1, e2teil2, e2teil3,
  e3teil1, e3teil2, e3teil3,
] as Episode[]

export function episodeById(id: string): Episode | undefined {
  return EPISODES.find(e => e.id === id)
}

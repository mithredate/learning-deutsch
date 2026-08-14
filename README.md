# learning-deutsch

An installable daily study card for **telc Deutsch B1** (exam: 25 September 2026),
live at **<https://mithredate.com/learning-deutsch/>**.

Nuxt 4 · TypeScript · Tailwind 4 · `@vite-pwa/nuxt`, statically generated and
deployed to GitHub Pages by Actions on every push to `main`.

## Why it exists

A study plan that lives in a repo is a plan you have to sit at a desk to read —
and a desk is a trained work cue, so the studying loses. This app moves the plan
to the phone and splits each day by **place** rather than by clock:

| Slot | Where | What |
|---|---|---|
| 🎧 Unterwegs | gym, commute, waiting | audio + tap-to-reveal cards, one-handed |
| 🛋️ Sofa, 21:00 | the anchor | the day's real block |
| 🌙 Vor dem Schlafen | in bed | three German sentences |

The shape never changes; only the middle block does. That is the point — skipping
starts at the "what should I do tonight?" moment.

## What's in here

```
app/
  data/days.ts        34 study days — the plan itself
  data/cards.ts       the card bank: every entry is a real Übungstest 4 miss
  data/hoeren.ts      the listening exercises
  data/episodes/      one JSON per exercise: items, solutions, traps, transcript
  composables/        progress · plan navigation · offline audio · sittings
  components/         SlotCard · CardDrill · LocalAudio · ReportPanel
  pages/              index (Tageskarte) · kalender · hoeren/[id] (exercise)
public/audio/         original MP3s, runtime-cached by the service worker
scripts/icons.ts      PNG icon generator — no image dependency, just zlib
```

## A block carries its own material

What killed the first real evening was reading *„Teil 2, mit Uhr"* at the top of the page and
then having to go hunting for the audio at the bottom. So a `Slot` in `days.ts` carries the work
itself:

| Field | Meaning |
|---|---|
| `karten: CardTag[] \| true` | card round here — `true` means the day's own deck |
| `hoeren: string[]` | listening exercises to sit, with their score history inline |
| `dateien: true` | show the imported-MP3 player in this block |

When adding a day, put the material on the block that asks for it. The page falls back to a
page-level deck only if no block claims one.

## Cards have three sides

`cue` — the German you meet in the exam · `answer` — the German explanation, which is what has to
survive into September · `meaning` — **plain English, required on every card.**

The English is not decoration. A German-only gloss cannot teach a word you have never met: you end
up marking yourself correct against an explanation you also don't understand. Both sides show at
once when the card is flipped.

## Hörverstehen

`/hoeren` carries full listening exercises: audio, the printed richtig/falsch
statements, scoring against the 60 % pass bar, and per-item feedback naming
*which distractor* the item was built on — paraphrase, Wortgleichheit,
Absolutizer, Verneinung, Inferenz. The transcript unlocks after scoring.

Writing our own material rather than using a published test is the point: the
distractors are engineered against this learner's measured error profile instead
of whatever a Verlag happened to include.

Audio is **not** precached — the shell is, but MP3s are `CacheFirst` at runtime.
Play a file once while online and it stays available offline.

## Audio

`public/audio/` holds **original** material only: dialogues written for this
course and voiced with the repo's own TTS pipeline.

Licensed exam audio (telc Übungstest recordings) is deliberately **not** in this
repository — those are renderings of copyrighted transcripts and this site is
public. Import such a file instead, from the *Deine Dateien* box inside whichever
block needs it: it is stored in the browser's Cache API, stays on the device, and
plays offline inside the installed app.

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000/learning-deutsch/
pnpm generate     # static build → .output/public
pnpm icons        # regenerate PWA icons
```

The base path is `/learning-deutsch/` (`app.baseURL` in `nuxt.config.ts`) because
this is a GitHub Pages *project* site under a user site that already carries the
`mithredate.com` CNAME.

## Progress data

Ticks, per-day notes and card-miss counters live in `localStorage`, per device, on
purpose — the phone is the study device. *📤 Bericht für Claude* exports all of
it as plain text to paste into a chat.

**Sittings are a history, never a single value.** `ld:hv` holds `Record<episodeId, Attempt[]>`, and
*„Noch einmal versuchen"* clears the answer sheet without touching the record — a first cold 2/5
followed by a 5/5 is the only real evidence the material stuck, and an earlier version of this app
deleted the first number to store the second. `useUebung` migrates the old one-object-per-episode
shape by checking `Array.isArray`, so there is no version flag to maintain.

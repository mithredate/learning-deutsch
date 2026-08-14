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
  data/episodes.ts    original Hörverstehen material (see Audio below)
  composables/        progress (localStorage), plan navigation, offline audio
  components/         SlotCard · CardDrill · AudioShelf · ReportPanel
  pages/              index (Tageskarte) · kalender (weeks, gates, ramp)
scripts/icons.ts      PNG icon generator — no image dependency, just zlib
```

## Audio

`public/audio/` holds **original** material only: dialogues written for this
course and voiced with the repo's own TTS pipeline.

Licensed exam audio (telc Übungstest recordings) is deliberately **not** in this
repository — those are renderings of copyrighted transcripts and this site is
public. Import such a file through *Hören → Eigene Dateien* instead: it is stored
in the browser's Cache API, stays on the device, and plays offline inside the
installed app.

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

Ticks, notes and card-miss counters live in `localStorage`, per device, on
purpose — the phone is the study device. *📤 Bericht für Claude* exports all of
it as plain text to paste into a chat.

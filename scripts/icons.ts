/**
 * Generates the PWA icons — a five-bar waveform mark on navy.
 *
 * No image library: a PNG is just IHDR + zlib-deflated scanlines + IEND with
 * CRC32 per chunk, and node's zlib gives us the only hard part for free.
 *
 *   pnpm icons
 */
import { deflateSync } from 'node:zlib'
import { crc32 } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

type RGB = readonly [number, number, number]

const BG: RGB = [0x1e, 0x2a, 0x6b]
const MARK: RGB = [0xee, 0xf1, 0xf9]

/** Half-heights at a 512px canvas. Uneven on purpose — speech, not a bar chart. */
const BARS = [46, 82, 116, 74, 40]
const BAR_W = 26
const BAR_GAP = 22

function chunk(type: string, data: Uint8Array): Uint8Array {
  const body = new Uint8Array(4 + data.length)
  body.set(new TextEncoder().encode(type), 0)
  body.set(data, 4)
  const out = new Uint8Array(8 + data.length + 4)
  const view = new DataView(out.buffer)
  view.setUint32(0, data.length)
  out.set(body, 4)
  view.setUint32(8 + data.length, crc32(Buffer.from(body)) >>> 0)
  return out
}

function encodePng(width: number, height: number, at: (x: number, y: number) => RGB): Uint8Array {
  const stride = width * 3 + 1
  const raw = new Uint8Array(stride * height)
  for (let y = 0; y < height; y++) {
    const row = y * stride
    raw[row] = 0 // filter: none
    for (let x = 0; x < width; x++) {
      const [r, g, b] = at(x, y)
      const i = row + 1 + x * 3
      raw[i] = r
      raw[i + 1] = g
      raw[i + 2] = b
    }
  }
  const ihdr = new Uint8Array(13)
  const dv = new DataView(ihdr.buffer)
  dv.setUint32(0, width)
  dv.setUint32(4, height)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // colour type: truecolour
  const parts = [
    new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', new Uint8Array(deflateSync(Buffer.from(raw), { level: 9 }))),
    chunk('IEND', new Uint8Array(0)),
  ]
  const total = parts.reduce((n, p) => n + p.length, 0)
  const png = new Uint8Array(total)
  let off = 0
  for (const p of parts) {
    png.set(p, off)
    off += p.length
  }
  return png
}

function painter(size: number): (x: number, y: number) => RGB {
  const s = size / 512
  const w = BAR_W * s
  const gap = BAR_GAP * s
  const r = w / 2
  const total = BARS.length * w + (BARS.length - 1) * gap
  const x0 = (size - total) / 2
  const cy = size / 2
  const bars = BARS.map((half, i) => {
    const left = x0 + i * (w + gap)
    return { left, right: left + w, top: cy - half * s, bottom: cy + half * s }
  })

  return (x, y) => {
    const px = x + 0.5
    const py = y + 0.5
    for (const b of bars) {
      if (px < b.left || px > b.right) continue
      if (py >= b.top + r && py <= b.bottom - r) return MARK
      const capY = py < b.top + r ? b.top + r : b.bottom - r
      const dx = px - (b.left + r)
      const dy = py - capY
      if (dx * dx + dy * dy <= r * r) return MARK
    }
    return BG
  }
}

const targets: Array<[number, string]> = [
  [192, 'public/icons/icon-192.png'],
  [512, 'public/icons/icon-512.png'],
  [180, 'public/icons/apple-touch-icon.png'],
]

for (const [size, path] of targets) {
  mkdirSync(dirname(path), { recursive: true })
  const png = encodePng(size, size, painter(size))
  writeFileSync(path, png)
  console.log(`${path}  ${size}×${size}  ${png.length} B`)
}

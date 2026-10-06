/** A pixel grid: each cell holds a color, or null where it is transparent */
export type PixelGrid = (string | null)[][]

export interface PixelRect {
  x: number
  y: number
  w: number
  fill: string
}

/** Merges each row's runs of equal pixels into one rect, to keep the SVG small */
export const toRects = (grid: PixelGrid): PixelRect[] => {
  const rects: PixelRect[] = []
  grid.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const fill = row[x]
      let w = 1
      while (x + w < row.length && row[x + w] === fill) w++
      if (fill) rects.push({ x, y, w, fill })
      x += w
    }
  })
  return rects
}

const grid = (size: number, paint: (x: number, y: number) => string | null): PixelGrid =>
  Array.from({ length: size }, (_, y) => Array.from({ length: size }, (_, x) => paint(x, y)))

/** The logo: a disc with a centre hole and a diagonal shine */
export const discSprite = (): PixelGrid =>
  grid(16, (x, y) => {
    const dx = x - 7.5
    const dy = y - 7.5
    const r = Math.hypot(dx, dy)
    if (r > 7.6) return null
    if (r < 1.6) return null
    if (r < 2.7) return 'var(--px-dark)'
    if (r > 6.6) return 'var(--px-edge)'
    const band = x + y
    if (band >= 7 && band <= 9) return 'var(--px-shine)'
    if (band >= 11 && band <= 12) return 'var(--px-shine-2)'
    return 'var(--px-disc)'
  })

/**
 * A ringed planet, shaded with a few flat tones the way pixel artists do:
 * light from the upper left, stripes across the surface, a tilted ring that
 * passes behind the planet at the top and in front of it at the bottom
 */
export const planetSprite = (size = 48): PixelGrid => {
  const c = (size - 1) / 2
  const radius = size * 0.29
  const tilt = -0.38
  return grid(size, (x, y) => {
    const dx = x - c
    const dy = y - c
    // the ring, in the planet's tilted frame
    const rx = dx * Math.cos(tilt) - dy * Math.sin(tilt)
    const ry = dx * Math.sin(tilt) + dy * Math.cos(tilt)
    const ringR = Math.hypot(rx / 1, ry / 0.28)
    const onRing = ringR > radius * 1.32 && ringR < radius * 1.68
    const ringInner = ringR < radius * 1.45
    const inFront = ry > 0
    const r = Math.hypot(dx, dy)

    if (r <= radius && !(onRing && inFront)) {
      const light = (-dx - dy) / (radius * 1.414) // 1 at the upper left edge
      const stripe = Math.floor((ry + radius) / (radius / 3.2)) % 2 === 0
      if (r > radius - 1.2 && light < 0.1) return 'var(--planet-shadow)'
      if (light > 0.55) return 'var(--planet-light)'
      if (light > 0.05) return stripe ? 'var(--planet-mid)' : 'var(--planet-band)'
      if (light > -0.45) return stripe ? 'var(--planet-dark)' : 'var(--planet-mid)'
      return 'var(--planet-shadow)'
    }
    if (onRing) return ringInner ? 'var(--ring-dark)' : 'var(--ring-light)'
    return null
  })
}

/** Builds a grid from rows of characters, one per pixel; '.' is transparent */
export const fromRows = (rows: string[], palette: Record<string, string>): PixelGrid =>
  rows.map((row) => [...row].map((ch) => palette[ch] ?? null))

/** A small satellite with two solar panels */
export const satelliteSprite = (): PixelGrid =>
  fromRows(
    [
      '...........',
      '.....a.....',
      'bbb..c..bbb',
      'bdbcccccbdb',
      'bbb..c..bbb',
      '.....e.....',
      '...........',
    ],
    {
      a: 'var(--star-3)',
      b: 'var(--px-panel)',
      d: 'var(--px-panel-light)',
      c: 'var(--px-disc)',
      e: 'var(--px-edge)',
    },
  )

/** A speech bubble with three dots, for the chat button */
export const bubbleSprite = (): PixelGrid =>
  fromRows(
    [
      '..ooooooooooo..',
      '.offfffffffffo.',
      'offfffffffffffo',
      'offfffffffffffo',
      'offfdffdffdfffo',
      'offfdffdffdfffo',
      'offfffffffffffo',
      '.offfffffffffo.',
      '..ooofooooooo..',
      '....ofo........',
      '....oo.........',
    ],
    {
      o: 'var(--accent-strong)',
      f: 'var(--accent-contrast)',
      d: 'var(--accent-strong)',
    },
  )

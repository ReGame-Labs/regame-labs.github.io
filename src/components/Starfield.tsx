import { useEffect, useRef } from 'react'
import type { Theme } from '../store/useSiteStore'

/** The size of one art pixel, in CSS pixels */
const PX = 2
/** A low frame rate keeps the twinkle choppy, like a sprite animation, and spares the CPU */
const FPS = 12

interface Star {
  x: number
  y: number
  /** 0: a dot, 1: a bigger dot, 2: a four-armed sparkle */
  kind: 0 | 1 | 2
  /** Scroll parallax: far stars barely move */
  depth: number
  phase: number
  speed: number
  color: number
}

interface Comet {
  x: number
  y: number
  life: number
}

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

const makeStars = (w: number, h: number): Star[] =>
  Array.from({ length: Math.round((w * h) / 5200) }, () => {
    const roll = Math.random()
    return {
      x: Math.floor(Math.random() * (w / PX)),
      y: Math.floor(Math.random() * (h / PX)),
      kind: roll > 0.97 ? 2 : roll > 0.8 ? 1 : 0,
      depth: 0.05 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.4,
      color: Math.random() > 0.85 ? 1 : Math.random() > 0.9 ? 2 : 0,
    }
  })

export function Starfield({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    let stars: Star[] = []
    let comet: Comet | null = null
    let frame = 0
    let raf = 0
    let last = 0

    const resize = () => {
      canvas.width = innerWidth
      canvas.height = innerHeight
      ctx.imageSmoothingEnabled = false
      stars = makeStars(innerWidth, innerHeight)
    }

    const dot = (x: number, y: number, size: number) => ctx.fillRect(x * PX, y * PX, size * PX, size * PX)

    const draw = () => {
      // read on every frame: the theme attribute may change after this effect runs
      const colors = [cssVar('--star'), cssVar('--star-2'), cssVar('--star-3')]
      const { width, height } = canvas
      const rows = Math.ceil(height / PX)
      ctx.clearRect(0, 0, width, height)

      for (const s of stars) {
        // the twinkle steps between three brightness levels instead of fading smoothly
        const wave = still ? 1 : Math.sin(frame * 0.12 * s.speed + s.phase)
        ctx.globalAlpha = wave > 0.5 ? 1 : wave > -0.4 ? 0.6 : 0.25
        ctx.fillStyle = colors[s.color]
        const y = (((s.y - Math.floor((scrollY * s.depth) / PX)) % rows) + rows) % rows
        if (s.kind === 0) dot(s.x, y, 1)
        else if (s.kind === 1) dot(s.x, y, 2)
        else {
          dot(s.x, y, 1)
          const arm = ctx.globalAlpha === 1 ? 2 : 1
          for (let i = 1; i <= arm; i++) {
            dot(s.x - i, y, 1)
            dot(s.x + i, y, 1)
            dot(s.x, y - i, 1)
            dot(s.x, y + i, 1)
          }
        }
      }

      if (comet) {
        for (let i = 0; i < 10; i++) {
          ctx.globalAlpha = 1 - i / 10
          ctx.fillStyle = i < 2 ? colors[0] : colors[1]
          dot(comet.x - i * 2, comet.y - i, 1)
          dot(comet.x - i * 2 - 1, comet.y - i, 1)
        }
      }
      ctx.globalAlpha = 1
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (document.hidden || now - last < 1000 / FPS) return
      last = now
      frame++
      if (comet) {
        comet.x += 4
        comet.y += 2
        if (--comet.life <= 0) comet = null
      } else if (Math.random() < 0.004) {
        comet = { x: Math.floor((Math.random() * innerWidth) / PX / 2), y: Math.floor((Math.random() * innerHeight) / PX / 3), life: 40 }
      }
      draw()
    }

    resize()
    // after the parent has applied the theme attribute
    const first = requestAnimationFrame(draw)
    const onResize = () => {
      resize()
      draw()
    }
    addEventListener('resize', onResize)
    if (still) addEventListener('scroll', draw, { passive: true })
    else raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(raf)
      removeEventListener('resize', onResize)
      removeEventListener('scroll', draw)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}

import { useState } from 'react'
import { resources, stages, type Stage } from '../data/resources'
import { useResourceStore } from '../store/useResourceStore'
import { useMessages } from '../store/useSiteStore'

/** Star positions, in percent of the map, tracing a constellation from left to right */
const positions: Record<Stage, { x: number; y: number }> = {
  explore: { x: 7, y: 66 },
  split: { x: 24, y: 30 },
  decompile: { x: 41, y: 60 },
  match: { x: 59, y: 24 },
  diff: { x: 76, y: 58 },
  track: { x: 93, y: 30 },
}

/** The tools of a stage, the ones our projects use first */
const toolsAt = (stage: Stage) =>
  resources.filter((r) => r.stage === stage).sort((a, b) => Number(b.used) - Number(a.used))

/** The first few tool names of a stage; the rest show up as a count to keep the map readable */
const MAX_NAMES = 3
const toolList = (stage: Stage) => {
  const names = toolsAt(stage).map((r) => r.name)
  const rest = names.length - MAX_NAMES
  return names.slice(0, MAX_NAMES).join(' · ') + (rest > 0 ? ` +${rest}` : '')
}

export function Constellation() {
  const { t } = useMessages()
  const active = useResourceStore((s) => s.stage)
  const toggleStage = useResourceStore((s) => s.toggleStage)
  const [hovered, setHovered] = useState<Stage | null>(null)
  const focus = hovered ?? active

  return (
    <div className="constellation">
      <div className="constellation__head">
        <h3>{t.resources.mapTitle}</h3>
        <p>{focus ? t.resources.stages[focus].blurb : t.resources.mapHint}</p>
      </div>

      <div className="constellation__map">
        <svg className="constellation__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {stages.slice(1).map((s, i) => {
            const a = positions[stages[i]]
            const b = positions[s]
            const lit = active && stages.indexOf(active) >= i + 1
            return <line key={s} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={lit ? 'is-lit' : undefined} />
          })}
        </svg>

        <ol className="constellation__stars">
          {stages.map((s, i) => {
            return (
              <li key={s} style={{ left: `${positions[s].x}%`, top: `${positions[s].y}%` }}>
                <button
                  type="button"
                  className={`star${active === s ? ' is-active' : ''}`}
                  aria-pressed={active === s}
                  onClick={() => toggleStage(s)}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(s)}
                  onBlur={() => setHovered(null)}
                >
                  <span className="star__core" aria-hidden="true" />
                  <span className="star__label">
                    <span className="star__step mono">0{i + 1}</span>
                    {t.resources.stages[s].name}
                  </span>
                  <span className="star__tools">{toolList(s)}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

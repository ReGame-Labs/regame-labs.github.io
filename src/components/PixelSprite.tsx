import { useMemo } from 'react'
import { toRects, type PixelGrid } from '../lib/pixels'

export function PixelSprite({ make, size, className }: { make: () => PixelGrid; size: number; className?: string }) {
  const grid = useMemo(() => make(), [make])
  const rects = useMemo(() => toRects(grid), [grid])
  const w = grid[0]?.length ?? 0

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${w} ${grid.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rects.map((r) => (
        <rect key={`${r.x},${r.y}`} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  )
}

import { discSprite } from '../lib/pixels'
import { PixelSprite } from './PixelSprite'

/** A pixel-art disc: games brought back from the CD they shipped on */
export function Logo({ size = 32 }: { size?: number }) {
  return <PixelSprite make={discSprite} size={size} className="logo" />
}

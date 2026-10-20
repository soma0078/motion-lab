
import { useLoop, wait } from '../_shared'
import { cn } from '../../lib/utils'

const SNAP_CARDS = [
  { label: '1', bg: 'bg-nb-blue' },
  { label: '2', bg: 'bg-nb-yellow' },
  { label: '3', bg: 'bg-nb-green' }
]

export default function ScrollSnap() {
  const scope = useLoop(async (animate) => {
    for (const index of [1, 2, 0]) {
      await wait(900)
      // 스냅 지점에 spring으로 맞춰 섬. damping ↓ 더 흔들리며 멈춤
      const settle = { type: 'spring', stiffness: 260, damping: 24 } as const
      await Promise.all([
        animate('.track', { x: `${-33.333 * index}%` }, settle),
        animate('.indicator', { x: `${100 * index}%` }, settle)
      ])
    }
  })

  return (
    <div ref={scope} className="absolute inset-0">
      <div className="absolute inset-x-0 top-8 bottom-8 overflow-hidden">
        <div className="track flex h-full w-[300%]">
          {SNAP_CARDS.map(({ label, bg }) => (
            <div key={label} className="w-1/3 px-8">
              <div
                className={cn(
                  'grid h-full place-items-center border-2 border-black text-2xl font-extrabold',
                  bg
                )}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 flex h-2 w-12 -translate-x-1/2 border-2 border-black">
        <div className="indicator h-full w-1/3 bg-black" />
      </div>
    </div>
  )
}

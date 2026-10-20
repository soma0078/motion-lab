
import { EASE_OUT_QUART, useLoop, wait } from '../_shared'
import { cn } from '../../lib/utils'

const TRACKS = [
  { label: 'A', at: 0, bg: 'bg-nb-blue' },
  { label: 'B', at: 0.35, bg: 'bg-nb-yellow' },
  { label: 'C', at: 0.35, bg: 'bg-nb-green' }
]

export default function Timeline() {
  const scope = useLoop(async (animate) => {
    await animate('.chip', { x: '0%' }, { duration: 0 })
    await animate('.head', { left: '0%' }, { duration: 0 })
    await wait(400)
    // delay 로 시작 시각 표현. B · C 가 같은 값 = 동시 재생 (GSAP '<' · Motion at: '<')
    await Promise.all([
      animate('.head', { left: '100%' }, { duration: 1.25, ease: 'linear' }),
      ...TRACKS.map((track, index) =>
        animate(
          `.chip-${index}`,
          { x: '220%' },
          { duration: 0.6, ease: EASE_OUT_QUART, delay: track.at }
        )
      )
    ])
    await wait(900)
  })

  return (
    <div ref={scope} className="absolute inset-x-8 top-9 bottom-4 flex flex-col justify-center gap-2">
      {TRACKS.map((track, index) => (
        <div key={track.label} className="flex h-6 items-center gap-2">
          <span className="w-3 font-mono text-[10px] font-bold">{track.label}</span>
          <div className="relative h-full flex-1 border-b-2 border-dashed border-nb-line">
            <span
              className={cn(
                `chip chip-${index} absolute top-0 grid h-6 w-[30%] place-items-center border-2 border-black text-[10px] font-extrabold`,
                track.bg
              )}
            />
          </div>
        </div>
      ))}
      {/* 재생 위치 표시줄 */}
      <div className="pointer-events-none absolute inset-y-0 right-0 left-5">
        <span className="head absolute inset-y-0 w-0.5 bg-black" />
      </div>
    </div>
  )
}

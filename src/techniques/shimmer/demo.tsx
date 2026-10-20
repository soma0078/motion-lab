
import { useLoop, wait } from '../_shared'

export default function Shimmer() {
  const scope = useLoop(async (animate) => {
    await animate('.band', { x: '0%' }, { duration: 0 })
    await animate('.band', { x: '130%' }, { duration: 1.3, ease: 'easeInOut' })
    await wait(300)
  })

  return (
    <div
      ref={scope}
      className="absolute inset-x-8 top-10 bottom-5 flex gap-3 bg-white"
    >
      <div className="bg-nb-line size-12 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2.5 pt-1">
        <div className="bg-nb-line h-3 w-4/5" />
        <div className="bg-nb-line h-3 w-full" />
        <div className="bg-nb-line h-3 w-3/5" />
      </div>
      {/* lighten: 흰 바탕은 그대로, 회색 블록 위만 밝아짐 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-lighten">
        <div className="band absolute inset-0">
          <div className="absolute inset-y-0 -left-1/4 w-1/5 -skew-x-12 bg-[#f6f2ea]" />
        </div>
      </div>
    </div>
  )
}

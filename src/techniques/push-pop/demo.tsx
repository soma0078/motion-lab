import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

export default function PushPop({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    const t = { duration: params.duration / 1000, ease: [0.25, 1, 0.5, 1] } as const
    await animate('.a', { x: '0%' }, { duration: 0 })
    await animate('.b', { x: '100%' }, { duration: 0 })
    await wait(800)
    await Promise.all([animate('.b', { x: '0%' }, t), animate('.a', { x: '-28%' }, t)])
    await wait(900)
    await Promise.all([animate('.b', { x: '100%' }, t), animate('.a', { x: '0%' }, t)])
    await wait(400)
  })

  return (
    <div ref={scope} className="absolute top-8 bottom-0 left-1/2 w-44 -translate-x-1/2 overflow-hidden rounded-t-xl border-x-[1.5px] border-t-[1.5px] border-ink bg-surface">
      <div className="a paint-sub absolute inset-0 p-3">
        <p className="text-xs font-extrabold">목록</p>
        <div className="mt-2 h-1.5 w-2/3 bg-current" />
        <div className="mt-1.5 h-1.5 w-1/2 bg-current" />
      </div>
      <div className="b paint-key absolute inset-0 border-l-[1.5px] border-ink p-3 shadow-[-8px_0_16px_-8px_var(--sh-lo)]">
        <p className="text-xs font-extrabold">상세</p>
        <div className="mt-2 h-1.5 w-3/4 bg-current" />
        <div className="mt-1.5 h-1.5 w-1/3 bg-current" />
      </div>
    </div>
  )
}

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
    <div ref={scope} className="absolute top-8 bottom-0 left-1/2 w-44 -translate-x-1/2 overflow-hidden rounded-t-xl border-x-2 border-t-2 border-black bg-white">
      <div className="a bg-nb-yellow absolute inset-0 p-3">
        <p className="text-xs font-extrabold">목록</p>
        <div className="mt-2 h-1.5 w-2/3 bg-black" />
        <div className="mt-1.5 h-1.5 w-1/2 bg-black" />
      </div>
      <div className="b bg-nb-blue absolute inset-0 border-l-2 border-black p-3 shadow-[-4px_0_0_0_rgba(0,0,0,0.25)]">
        <p className="text-xs font-extrabold">상세</p>
        <div className="mt-2 h-1.5 w-3/4 bg-black" />
        <div className="mt-1.5 h-1.5 w-1/3 bg-black" />
      </div>
    </div>
  )
}

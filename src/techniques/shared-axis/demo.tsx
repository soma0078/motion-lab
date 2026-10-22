import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

const SHIFT = 28

export default function SharedAxis({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    const t = { duration: params.duration / 1000, ease: 'easeInOut' } as const
    await animate('.a', { x: 0, opacity: 1 }, { duration: 0 })
    await animate('.b', { x: SHIFT, opacity: 0 }, { duration: 0 })
    await wait(800)
    await Promise.all([animate('.a', { x: -SHIFT, opacity: 0 }, t), animate('.b', { x: 0, opacity: 1 }, t)])
    await wait(800)
    await Promise.all([animate('.b', { x: SHIFT, opacity: 0 }, t), animate('.a', { x: 0, opacity: 1 }, t)])
    await wait(300)
  })

  return (
    <div ref={scope} className="absolute top-8 right-[8%] bottom-3 left-[8%] overflow-hidden border-2 border-black bg-white">
      <div className="a bg-nb-yellow absolute inset-3 border-2 border-black p-3">
        <p className="text-xs font-extrabold">1단계 · 이름</p>
        <div className="mt-2 h-1.5 w-2/3 bg-black" />
      </div>
      <div className="b bg-nb-blue absolute inset-3 border-2 border-black p-3 opacity-0">
        <p className="text-xs font-extrabold">2단계 · 주소</p>
        <div className="mt-2 h-1.5 w-2/3 bg-black" />
      </div>
    </div>
  )
}

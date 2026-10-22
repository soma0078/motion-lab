import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

export default function FadeThrough({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    const out = { duration: params.out / 1000, ease: 'linear' } as const
    const into = { duration: params.in / 1000, ease: 'easeOut' } as const
    await animate('.a', { opacity: 1, scale: 1 }, { duration: 0 })
    await animate('.b', { opacity: 0, scale: 0.92 }, { duration: 0 })
    await wait(900)
    await animate('.a', { opacity: 0 }, out)
    await animate('.b', { opacity: 1, scale: 1 }, into)
    await wait(900)
    await animate('.b', { opacity: 0 }, out)
    await animate('.a', { opacity: 1, scale: [0.92, 1] }, into)
    await wait(300)
  })

  return (
    <div ref={scope} className="absolute top-8 right-[8%] bottom-3 left-[8%] overflow-hidden border-2 border-black bg-white">
      <div className="a bg-nb-green absolute inset-4 border-2 border-black p-3">
        <p className="text-xs font-extrabold">홈</p>
        <div className="mt-2 h-1.5 w-2/3 bg-black" />
      </div>
      <div className="b bg-nb-purple absolute inset-4 border-2 border-black p-3 opacity-0">
        <p className="text-xs font-extrabold">설정</p>
        <div className="mt-2 h-1.5 w-1/2 bg-black" />
      </div>
    </div>
  )
}

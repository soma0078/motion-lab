
import { EASE_OUT_QUART, useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

export default function ImageReveal({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    await animate('.frame', { clipPath: 'inset(100% 0% 0% 0%)' }, { duration: 0 })
    await animate('.photo', { scale: params.scale }, { duration: 0 })
    await wait(400)
    // 틀은 아래에서 열리고, 안쪽 이미지는 확대에서 제자리로 → 두 겹이 다른 속도라 깊이감
    await Promise.all([
      animate('.frame', { clipPath: 'inset(0% 0% 0% 0%)' }, { duration: params.duration, ease: [0.76, 0, 0.24, 1] }),
      animate('.photo', { scale: 1 }, { duration: params.duration * 1.45, ease: EASE_OUT_QUART })
    ])
    await wait(1100)
  })

  return (
    <div ref={scope} className="absolute inset-0 grid place-items-center pt-6">
      <div className="frame h-24 w-40 overflow-hidden border-2 border-black">
        {/* 이미지 대신 도형으로 그린 풍경 */}
        <div className="photo relative size-full bg-nb-blue">
          <span className="bg-nb-yellow absolute top-3 right-6 size-6 rounded-full border-2 border-black" />
          <span className="bg-nb-green absolute -bottom-6 -left-4 h-16 w-28 rounded-full border-2 border-black" />
          <span className="bg-nb-green absolute -right-6 -bottom-8 h-16 w-28 rounded-full border-2 border-black" />
        </div>
      </div>
    </div>
  )
}

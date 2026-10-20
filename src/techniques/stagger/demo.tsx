import { stagger } from 'motion/react'

import { EASE_OUT_QUART, useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

const BAR_HEIGHTS = [45, 70, 55, 85, 60, 40]

export default function Stagger({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    await animate('.bar', { y: '110%' }, { duration: 0 })
    await wait(300)
    // 간격 ↑ 하나씩 또렷하게 · ↓ 한 덩어리처럼
    await animate(
      '.bar',
      { y: '0%' },
      { duration: params.duration, ease: EASE_OUT_QUART, delay: stagger(params.gap) }
    )
    await wait(900)
    await animate(
      '.bar',
      { y: '110%' },
      { duration: 0.3, ease: 'easeIn', delay: stagger(0.04) }
    )
  })

  return (
    <div
      ref={scope}
      className="absolute inset-x-8 top-9 bottom-0 flex items-end gap-2 overflow-hidden"
    >
      {BAR_HEIGHTS.map((height, index) => (
        <div
          key={index}
          className="bar bg-nb-blue flex-1 border-2 border-b-0 border-black"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

import { stagger } from 'motion/react'

import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

const SPLIT_WORD = 'SPLIT'

export default function TextSplit({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    await animate('.char', { y: '110%', rotate: 12 }, { duration: 0 })
    await wait(300)
    // 글자마다 span 으로 쪼갠 뒤 스태거. 간격 ↑ 타자 치듯 · ↓ 한 번에
    await animate(
      '.char',
      { y: '0%', rotate: 0 },
      { type: 'spring', stiffness: 320, damping: 18, delay: stagger(params.gap) }
    )
    await wait(1000)
    await animate(
      '.char',
      { y: '-110%' },
      { duration: 0.3, ease: 'easeIn', delay: stagger(0.03, { from: 'last' }) }
    )
  })

  return (
    <div ref={scope} className="absolute inset-0 flex items-center justify-center pt-6">
      {[...SPLIT_WORD].map((char, index) => (
        <span key={index} className="overflow-hidden">
          <span className="char inline-block text-4xl font-extrabold">{char}</span>
        </span>
      ))}
    </div>
  )
}

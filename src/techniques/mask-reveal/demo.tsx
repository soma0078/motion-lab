import { stagger } from 'motion/react'

import { EASE_OUT_QUART, useLoop, wait } from '../_shared'
import { cn } from '../../lib/utils'
import type { DemoProps } from '../types'

export default function MaskReveal({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    await animate('.line', { y: '110%' }, { duration: 0 })
    await wait(300)
    await animate(
      '.line',
      { y: '0%' },
      { duration: params.duration, ease: EASE_OUT_QUART, delay: stagger(params.gap) }
    )
    await wait(1000)
    await animate(
      '.line',
      { y: '-110%' },
      { duration: 0.4, ease: 'easeIn', delay: stagger(0.06) }
    )
  })

  return (
    <div
      ref={scope}
      className="absolute inset-0 flex flex-col items-center justify-center pt-6"
    >
      {/* overflow-hidden 틀 밖은 안 보임 */}
      {['STANDARD', 'TERMS'].map((word, index) => (
        <div key={word} className="overflow-hidden">
          <div
            className={cn(
              'line px-1 text-3xl leading-tight font-extrabold',
              index === 1 && 'bg-nb-yellow'
            )}
          >
            {word}
          </div>
        </div>
      ))}
    </div>
  )
}

import { motion } from 'motion/react'

import { DOT, useLoop, wait } from '../_shared'
import { cn } from '../../lib/utils'

const KEYS = [
  [-56, -24],
  [56, -24],
  [56, 24],
  [-56, 24]
] as const

export default function Keyframes() {
  const scope = useLoop(async (animate) => {
    // 키마다 easeInOut이라 지점마다 잠깐 멈춘 듯 보임
    await animate(
      '.dot',
      {
        x: [...KEYS.map(([x]) => x), KEYS[0][0]],
        y: [...KEYS.map(([, y]) => y), KEYS[0][1]]
      },
      { duration: 2.6, ease: 'easeInOut' }
    )
    await wait(300)
  })

  return (
    <div ref={scope} className="absolute inset-0">
      <div className="absolute top-[58%] left-1/2 size-0">
        {KEYS.map(([x, y], index) => (
          <span
            key={index}
            className="absolute -top-3 -left-3 grid size-6 place-items-center rounded-full border-2 border-dashed border-black font-mono text-[9px] font-bold"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            {index + 1}
          </span>
        ))}
        <motion.span
          className={cn(DOT, 'dot absolute -top-2 -left-2')}
          style={{ x: KEYS[0][0], y: KEYS[0][1] }}
        />
      </div>
    </div>
  )
}

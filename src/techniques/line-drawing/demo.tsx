import { motion } from 'motion/react'

import { useLoop, wait } from '../_shared'

export default function LineDrawing() {
  const scope = useLoop(async (animate) => {
    await animate('.path', { pathLength: 0, opacity: 1 }, { duration: 0 })
    await wait(300)
    await animate(
      '.path',
      { pathLength: 1 },
      { duration: 1.4, ease: 'easeInOut' }
    )
    await wait(700)
    await animate('.path', { opacity: 0 }, { duration: 0.3 })
  })

  return (
    <div
      ref={scope}
      className="absolute inset-0 grid place-items-center px-6 pt-6"
    >
      <svg viewBox="0 0 220 80" className="w-full max-w-64">
        <motion.path
          className="path"
          d="M 10 55 C 40 10, 60 10, 90 40 S 140 80, 170 40 S 200 15, 210 25"
          fill="none"
          stroke="black"
          strokeWidth={4}
          strokeLinecap="round"
          initial={{ pathLength: 1 }}
        />
      </svg>
    </div>
  )
}

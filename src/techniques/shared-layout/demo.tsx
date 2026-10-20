import { motion } from 'motion/react'

import { useToggle } from '../_shared'
import { cn } from '../../lib/utils'

const TILE_BG = ['bg-nb-blue', 'bg-nb-yellow', 'bg-nb-green']

export default function SharedLayout() {
  const [ref, open] = useToggle(1600)
  const transition = { type: 'spring', stiffness: 300, damping: 30 } as const

  return (
    <div ref={ref} className="absolute inset-0">
      <div className="absolute inset-x-6 bottom-4 grid grid-cols-3 gap-3">
        {TILE_BG.map((bg, index) =>
          index === 0 && open ? (
            <div
              key={index}
              className="border-nb-line h-14 border-2 border-dashed"
            />
          ) : (
            <motion.div
              key={index}
              layoutId={index === 0 ? 'term-shared-layout' : undefined}
              transition={transition}
              className={cn('h-14 border-2 border-black', bg)}
            />
          )
        )}
      </div>
      {/* 같은 layoutId라 썸네일 자리에서 커지며 이어짐 */}
      {open && (
        <motion.div
          layoutId="term-shared-layout"
          transition={transition}
          className="bg-nb-blue absolute inset-x-6 top-9 bottom-4 border-2 border-black"
        />
      )}
    </div>
  )
}

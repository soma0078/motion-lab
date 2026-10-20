import { motion } from 'motion/react'
import { Heart } from 'lucide-react'

import { COLOR, useToggle } from '../_shared'
import type { DemoProps } from '../types'

export default function MicroInteraction({ params }: DemoProps) {
  const [ref, on] = useToggle(1100)

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center gap-8 pt-6"
    >
      <motion.div
        className="h-9 w-16 rounded-full border-2 border-black p-1"
        animate={{ backgroundColor: on ? COLOR.green : COLOR.surface }}
        transition={{ duration: 0.2 }}
      >
        {/* 트랙 안쪽 52px - 손잡이 24px = 28px 이동 */}
        <motion.div
          className="size-6 rounded-full border-2 border-black bg-white"
          animate={{ x: on ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: params.stiffness, damping: params.damping }}
        />
      </motion.div>
      <motion.div
        className="grid size-11 place-items-center rounded-[5px] border-2 border-black bg-white"
        animate={{ scale: on ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.35 }}
      >
        <Heart
          className="size-5"
          strokeWidth={2.5}
          fill={on ? COLOR.orange : 'transparent'}
        />
      </motion.div>
    </div>
  )
}

import { motion } from 'motion/react'
import { GripVertical } from 'lucide-react'

import { useStep } from '../_shared'
import { cn } from '../../lib/utils'

// 단계마다 순서. 맨 위 항목을 끌어 내리는 흐름
const REORDER_STEPS = [
  ['A', 'B', 'C'],
  ['B', 'A', 'C'],
  ['B', 'C', 'A'],
  ['A', 'B', 'C']
]
const REORDER_BG: Record<string, string> = { A: 'bg-nb-orange', B: 'bg-white', C: 'bg-white' }

export default function Reorder() {
  const [ref, step] = useStep(800, REORDER_STEPS.length)
  const order = REORDER_STEPS[step]
  // 마지막 단계는 원위치 복귀라 끌고 있지 않음
  const dragging = step === 1 || step === 2

  return (
    <div ref={ref} className="absolute inset-0 grid place-items-center pt-6">
      <ul className="grid w-44 gap-1.5">
        {order.map((item) => (
          <motion.li
            key={item}
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className={cn(
              'relative flex h-7 items-center gap-2 border-2 border-black px-2 text-xs font-extrabold',
              REORDER_BG[item]
            )}
            animate={{
              scale: item === 'A' && dragging ? 1.05 : 1,
              boxShadow: item === 'A' && dragging ? '4px 4px 0px 0px #000' : '0px 0px 0px 0px #000'
            }}
            style={{ zIndex: item === 'A' ? 1 : 0 }}
          >
            <GripVertical className="size-3.5" strokeWidth={3} />
            항목 {item}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

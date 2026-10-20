import { motion } from 'motion/react'

import { EASE_OUT_QUART, useStep } from '../_shared'
import { cn } from '../../lib/utils'

const VT_ITEMS = ['bg-nb-blue', 'bg-nb-yellow', 'bg-nb-green']

export default function ViewTransitions() {
  const [ref, step] = useStep(1400, 2)
  const open = step === 1

  return (
    <div ref={ref} className="absolute inset-x-8 top-9 bottom-4 border-2 border-black bg-white p-2">
      {open ? (
        <div className="flex h-full flex-col gap-1.5">
          {/* 같은 view-transition-name 끼리 old → new 로 이어짐 (여기선 layoutId 로 흉내) */}
          <motion.div layoutId="vt-hero" className={cn('h-14 border-2 border-black', VT_ITEMS[0])} transition={{ duration: 0.4, ease: EASE_OUT_QUART }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-nb-line h-2 w-4/5" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="bg-nb-line h-2 w-3/5" />
        </div>
      ) : (
        <div className="grid h-full grid-cols-3 gap-2">
          {VT_ITEMS.map((bg, index) => (
            <motion.div
              key={bg}
              layoutId={index === 0 ? 'vt-hero' : undefined}
              className={cn('border-2 border-black', bg)}
              transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
            />
          ))}
        </div>
      )}
      <span className="absolute -top-5 left-0 font-mono text-[9px] font-bold">view-transition-name: hero</span>
    </div>
  )
}

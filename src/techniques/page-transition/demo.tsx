import { motion, AnimatePresence } from 'motion/react'

import { EASE_OUT_QUART, useStep } from '../_shared'
import { cn } from '../../lib/utils'

const PAGES = [
  { title: 'HOME', bg: 'bg-nb-blue' },
  { title: 'ABOUT', bg: 'bg-nb-yellow' },
  { title: 'WORK', bg: 'bg-nb-green' }
]

export default function PageTransition() {
  const [ref, step] = useStep(1500, PAGES.length)
  const page = PAGES[step]

  return (
    <div ref={ref} className="absolute inset-x-10 top-9 bottom-4 overflow-hidden border-2 border-black bg-white">
      {/* 주소창 */}
      <div className="border-nb-line flex h-5 items-center border-b-2 px-2 font-mono text-[9px] font-bold">
        /{page.title.toLowerCase()}
      </div>
      {/* mode='wait': 앞 화면이 다 나간 뒤 다음 화면이 들어옴 */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page.title}
          className="absolute inset-x-0 top-5 bottom-0 p-3"
          initial={{ x: '30%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1, transition: { duration: 0.35, ease: EASE_OUT_QUART } }}
          exit={{ x: '-30%', opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
        >
          <div className={cn('h-5 w-1/2 border-2 border-black', page.bg)} />
          <div className="bg-nb-line mt-2 h-2 w-4/5" />
          <div className="bg-nb-line mt-1.5 h-2 w-3/5" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

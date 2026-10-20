import { Mouse } from 'lucide-react'

import { useLoop, wait } from '../_shared'
import { cn } from '../../lib/utils'

const SWIPE_SECTIONS = ['bg-nb-blue', 'bg-nb-yellow', 'bg-nb-green']

export default function SectionSwipe() {
  const scope = useLoop(async (animate) => {
    for (const index of [1, 2, 0]) {
      await wait(700)
      // 휠 한 번 → 섹션 하나. 휠 양과 상관없이 같은 거리
      await animate('.wheel', { y: [0, 6, 0] }, { duration: 0.3 })
      await animate('.stack', { y: `${-index * 100}%` }, { duration: 0.7, ease: [0.76, 0, 0.24, 1] })
    }
  })

  return (
    <div ref={scope} className="absolute inset-x-8 top-9 bottom-4 flex items-center gap-4">
      <div className="h-full flex-1 overflow-hidden border-2 border-black">
        <div className="stack h-full">
          {SWIPE_SECTIONS.map((bg, index) => (
            <div key={bg} className={cn('grid h-full place-items-center border-b-2 border-black', bg)}>
              <span className="font-mono text-sm font-extrabold">SECTION {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="wheel">
        <Mouse className="size-6" strokeWidth={2.5} />
      </div>
    </div>
  )
}

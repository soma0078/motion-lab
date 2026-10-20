import { Check } from 'lucide-react'

import { EASE_OUT_QUART, useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

export default function EnterExit({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    await animate('.toast', { y: 24, opacity: 0 }, { duration: 0 })
    await wait(300)
    // 퇴장은 진입보다 짧게
    await animate(
      '.toast',
      { y: 0, opacity: 1 },
      { duration: params.enter, ease: EASE_OUT_QUART }
    )
    await wait(1200)
    await animate(
      '.toast',
      { y: -12, opacity: 0 },
      { duration: params.exit, ease: 'easeIn' }
    )
    await wait(400)
  })

  return (
    <div ref={scope} className="absolute inset-0 grid place-items-center pt-6">
      <div className="toast shadow-nb-sm flex items-center gap-2 border-2 border-black bg-white px-3 py-2 text-sm font-extrabold">
        <span className="bg-nb-green grid size-5 place-items-center border-2 border-black">
          <Check className="size-3" strokeWidth={4} />
        </span>
        저장했어요
      </div>
    </div>
  )
}

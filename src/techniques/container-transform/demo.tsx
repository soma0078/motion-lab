import { useLoop, wait } from '../_shared'
import type { DemoProps } from '../types'

const SMALL = { left: '38%', top: '34%', width: '24%', height: '36%', borderRadius: '6px' }
const FULL = { left: '0%', top: '0%', width: '100%', height: '100%', borderRadius: '0px' }

export default function ContainerTransform({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    const t = { duration: params.duration / 1000, ease: [0.25, 1, 0.5, 1] } as const
    await animate('.card', SMALL, { duration: 0 })
    await animate('.detail', { opacity: 0 }, { duration: 0 })
    await wait(700)
    await Promise.all([animate('.card', FULL, t), animate('.detail', { opacity: 1 }, { duration: t.duration * 0.6, delay: t.duration * 0.4 })])
    await wait(900)
    await Promise.all([animate('.card', SMALL, t), animate('.detail', { opacity: 0 }, { duration: t.duration * 0.3 })])
    await wait(500)
  })

  return (
    <div ref={scope} className="absolute top-8 right-[8%] bottom-3 left-[8%] overflow-hidden border-2 border-black bg-white">
      <div className="card bg-nb-blue absolute overflow-hidden border-2 border-black">
        <div className="detail space-y-1.5 p-3 opacity-0">
          <p className="text-xs font-extrabold">상세 화면</p>
          <div className="h-1.5 w-3/4 bg-black" />
          <div className="h-1.5 w-1/2 bg-black" />
        </div>
      </div>
    </div>
  )
}

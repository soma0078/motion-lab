import { useLoop } from '../_shared'
import type { DemoProps } from '../types'

export default function Skeleton({ params }: DemoProps) {
  const scope = useLoop(async (animate) => {
    const t = { duration: params.duration / 1000, ease: 'easeInOut' } as const
    await animate('.sk', { opacity: 1 }, t)
    await animate('.sk', { opacity: 0.4 }, t)
  })

  return (
    <div ref={scope} className="absolute top-8 right-[8%] bottom-3 left-[8%] flex items-center gap-3 border-2 border-black bg-white px-4">
      <div className="sk size-12 shrink-0 rounded-full border-2 border-black bg-black/25 opacity-40" />
      <div className="flex-1 space-y-2">
        <div className="sk h-3 w-3/4 border-2 border-black bg-black/25 opacity-40" />
        <div className="sk h-3 w-1/2 border-2 border-black bg-black/25 opacity-40" />
      </div>
    </div>
  )
}

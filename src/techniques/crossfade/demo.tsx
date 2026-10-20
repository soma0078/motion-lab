
import { useLoop, wait } from '../_shared'
import { MiniCard } from '../_shared/ui'

export default function Crossfade() {
  const scope = useLoop(async (animate) => {
    // 같은 길이로 겹쳐야 중간에 빈 화면이 안 생김
    await Promise.all([
      animate('.a', { opacity: 0 }, { duration: 0.7, ease: 'easeInOut' }),
      animate('.b', { opacity: 1 }, { duration: 0.7, ease: 'easeInOut' })
    ])
    await wait(900)
    await Promise.all([
      animate('.a', { opacity: 1 }, { duration: 0.7, ease: 'easeInOut' }),
      animate('.b', { opacity: 0 }, { duration: 0.7, ease: 'easeInOut' })
    ])
    await wait(900)
  })

  return (
    <div ref={scope} className="absolute inset-0 grid place-items-center pt-6">
      <div className="relative h-20 w-36">
        <MiniCard label="A" className="a bg-nb-blue" />
        <MiniCard label="B" className="b bg-nb-yellow opacity-0" />
      </div>
    </div>
  )
}

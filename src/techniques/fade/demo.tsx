import { useLoop, wait } from '../_shared'
import { MiniCard } from '../_shared/ui'


export default function Fade() {
  const scope = useLoop(async (animate) => {
    await animate('.card', { opacity: 0 }, { duration: 0 })
    await wait(300)
    await animate('.card', { opacity: 1 }, { duration: 0.6, ease: 'easeOut' })
    await wait(900)
    await animate('.card', { opacity: 0 }, { duration: 0.6, ease: 'easeIn' })
  })

  return (
    <div ref={scope} className="absolute inset-0 grid place-items-center pt-6">
      <div className="relative h-20 w-36">
        <MiniCard label="FADE" className="card bg-nb-blue" />
      </div>
    </div>
  )
}

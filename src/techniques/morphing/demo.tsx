
import { COLOR, useLoop, wait } from '../_shared'

export default function Morphing() {
  const scope = useLoop(async (animate) => {
    await animate(
      '.shape',
      { borderRadius: '8%', rotate: 90, backgroundColor: COLOR.sub },
      { duration: 0.8, ease: 'easeInOut' }
    )
    await wait(600)
    await animate(
      '.shape',
      { borderRadius: '50%', rotate: 0, backgroundColor: COLOR.key },
      { duration: 0.8, ease: 'easeInOut' }
    )
    await wait(600)
  })

  return (
    <div ref={scope} className="absolute inset-0 grid place-items-center pt-6">
      <div
        className="shape size-20 border-[1.5px] border-ink"
        style={{ borderRadius: '50%', backgroundColor: COLOR.key }}
      />
    </div>
  )
}

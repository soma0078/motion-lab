
import { COLOR, useLoop, wait } from '../_shared'
import { Cursor } from '../_shared/ui'

const HOVER_REST = {
  x: 0,
  y: 0,
  boxShadow: 'var(--lift-rest)',
  backgroundColor: COLOR.surface,
  color: COLOR.ink
}
const HOVER_ON = {
  x: -3,
  y: -3,
  boxShadow: 'var(--lift-up)',
  backgroundColor: COLOR.key,
  color: 'var(--on-key)'
}

export default function Hover() {
  const scope = useLoop(async (animate) => {
    await animate('.pointer', { x: -190, y: 46 }, { duration: 0 })
    await animate(
      '.pointer',
      { x: 6, y: 4 },
      { duration: 0.8, ease: 'easeInOut' }
    )
    await animate('.btn', HOVER_ON, { duration: 0.15 })
    await wait(900)
    await Promise.all([
      animate(
        '.pointer',
        { x: 190, y: 46 },
        { duration: 0.8, ease: 'easeInOut' }
      ),
      animate('.btn', HOVER_REST, { duration: 0.15, delay: 0.1 })
    ])
    await wait(300)
  })

  return (
    <div ref={scope} className="absolute inset-0 overflow-hidden">
      <div className="absolute top-[58%] left-1/2 size-0">
        <div
          className="btn absolute -top-5 -left-14 grid h-10 w-28 place-items-center rounded-md border-[1.5px] border-ink text-xs font-extrabold"
          style={HOVER_REST}
        >
          HOVER ME
        </div>
        <div
          className="pointer absolute top-0 left-0"
          style={{ transform: 'translate(-190px, 46px)' }}
        >
          <Cursor />
        </div>
      </div>
    </div>
  )
}

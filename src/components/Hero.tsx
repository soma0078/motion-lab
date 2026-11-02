import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const STEPS = [
  { title: '기법 용어 찾기', body: '데모를 보며 머릿속 "그 스르륵 올라오는 거"의 정확한 이름을 찾아요.' },
  { title: '어떤 도구로 만들지', body: '같은 기법의 Motion · GSAP · CSS 구현을 나란히 비교해요.' },
  { title: '정확한 수치와 지시문', body: '슬라이더로 느낌을 맞추고, 수치가 담긴 지시문을 그대로 복사해요.' }
]

export interface HeroSection {
  id: string
  heading: string
  count: number
}

type Jump = (event: MouseEvent, id: string) => void

export function Hero({ sections, onJump }: { sections: HeroSection[]; onJump: Jump }) {
  return (
    <section id="top" className="blueprint border-line border-b">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:px-10 lg:py-20">
        <div className="min-w-0">
          <span className="border-line bg-surface shadow-raised-sm inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
            <span className="bg-key size-2 rounded-full" />
            Motion Lab
          </span>
          <h1 className="mt-6 text-5xl font-bold tracking-tight break-keep sm:text-6xl">모션 기법 사전</h1>
          <p className="mt-5 max-w-xl text-lg font-semibold break-keep">
            원하는 움직임을 표준 용어와 숫자로 바꿔보세요. 그대로 복사해서 AI에게 붙여 넣을 수 있는 지시문이 돼요.
          </p>
          <p className="text-ink-2 mt-3 max-w-xl text-sm break-keep">
            "부드럽게", "세련되게" 같은 표현은 사람마다, 실행할 때마다 다르게 해석되기 쉬워요. 표준 용어와 숫자로 말하면 누가
            언제 적용해도 똑같은 움직임을 만들 수 있어요.
          </p>

          <ol className="mt-8 grid max-w-xl gap-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-2 text-sm">
                <span className="text-key-text pt-px font-mono text-xs font-semibold">{String(index + 1).padStart(2, '0')}</span>
                <span className="break-keep">
                  <b className="font-semibold">{step.title}</b>
                  <span className="text-ink-2"> · {step.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <CategoryIndex sections={sections} onJump={onJump} />
        </div>

        <HubDiagram />
      </div>
    </section>
  )
}

/** 섹션 바로가기. 올리거나 포커스한 칩 위에 "눌러서 바로 이동해요" 말풍선이 따라다닌다 */
function CategoryIndex({ sections, onJump }: { sections: HeroSection[]; onJump: Jump }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useLayoutEffect(() => {
    const update = () => {
      const link = linkRefs.current[activeIndex]
      if (link) setTooltipPos({ x: link.offsetLeft + link.offsetWidth / 2, y: link.offsetTop })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [activeIndex])

  return (
    <nav id="hero-index" aria-label="섹션 바로가기" className="relative mt-12 flex max-w-xl flex-wrap gap-2">
      {sections.map((section, index) => (
        <a
          key={section.id}
          ref={(el) => {
            linkRefs.current[index] = el
          }}
          href={`#${section.id}`}
          title={`${section.heading} 섹션으로 이동`}
          onClick={(event) => onJump(event, section.id)}
          onMouseEnter={() => setActiveIndex(index)}
          onFocus={() => setActiveIndex(index)}
          className="border-line bg-surface shadow-raised-sm hover:shadow-inset-sm flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-shadow duration-200"
        >
          {section.heading}
          <span className="text-ink-3 font-mono text-[11px]">{section.count}</span>
        </a>
      ))}

      {tooltipPos && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 transition-transform duration-150 ease-out"
          style={{ transform: `translate(${tooltipPos.x}px, ${tooltipPos.y - 34}px)` }}
        >
          <span className="flex -translate-x-1/2 animate-bounce flex-col items-center">
            <span className="bg-ink text-paper rounded-md px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap">
              눌러서 바로 이동해요
            </span>
            <span className="bg-ink -mt-1 size-2 rotate-45" />
          </span>
        </span>
      )}
    </nav>
  )
}

/*
 * 허브-스포크 도면: 모호한 말 → 표준 지시문(허브) → 네 가지 구현.
 * 좌표는 500 × 400 기준. SVG 선과 HTML 노드가 같은 좌표를 % 로 공유한다
 */
const W = 500
const H = 400
const HUB = { x: 250, y: 200 }
const SPOKES = [
  { lib: 'Motion', code: 'stagger(0.12)', x: 100, y: 88 },
  { lib: 'GSAP', code: 'stagger: 0.12', x: 400, y: 88 },
  { lib: 'CSS · Web', code: 'calc(var(--i) * 0.12s)', x: 100, y: 312 },
  { lib: 'React Native', code: 'withDelay(i * 120, …)', x: 400, y: 312 }
]
const pos = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` })
// 허브에서 가로로 나간 뒤 세로로 꺾는 회로도식 선
const spokePath = (x: number, y: number) => `M${HUB.x} ${HUB.y} H${x} V${y}`

function HubDiagram() {
  const reduced = useReducedMotion()

  return (
    <figure className="border-line bg-surface shadow-raised rounded-card relative border p-3 sm:p-4">
      <div className="bg-well shadow-inset blueprint relative aspect-[5/4] overflow-hidden rounded-2xl">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
          {/* 입력 → 허브 (점선) */}
          <path d={`M${HUB.x} 52 V${HUB.y}`} fill="none" stroke="var(--line-strong)" strokeWidth={1.5} strokeDasharray="4 5" />
          {SPOKES.map((spoke) => (
            <path key={spoke.lib} d={spokePath(spoke.x, spoke.y)} fill="none" stroke="var(--line-strong)" strokeWidth={1.5} />
          ))}
          {/* 분기점 */}
          {[100, 400].map((x) => (
            <circle key={x} cx={x} cy={HUB.y} r={4} fill="var(--surface)" stroke="var(--ink-3)" strokeWidth={1.5} />
          ))}
          {/* 허브에서 바깥으로 흐르는 신호. 0.12s 간격 스태거 */}
          {!reduced &&
            SPOKES.map((spoke, i) => (
              <motion.path
                key={spoke.lib}
                d={spokePath(spoke.x, spoke.y)}
                pathLength={100}
                fill="none"
                stroke="var(--key)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="10 120"
                initial={{ strokeDashoffset: 10 }}
                animate={{ strokeDashoffset: -100 }}
                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1], repeat: Infinity, repeatDelay: 0.9, delay: i * 0.12 }}
              />
            ))}
        </svg>

        {/* 도면 표기 */}
        <span className="text-ink-3 absolute top-3 left-3.5 font-mono text-[10.5px] font-medium tracking-wider uppercase">
          Fig.01 · 같은 용어, 네 가지 구현
        </span>
        <span className="text-ink-3 absolute right-3.5 bottom-3 font-mono text-[10.5px] font-medium">stagger = 0.12s</span>

        {/* 입력: 모호한 말 */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(HUB.x, 52)}>
          <span className="border-line-strong bg-surface text-ink-3 rounded-full border border-dashed px-3 py-1 text-xs font-medium whitespace-nowrap line-through decoration-1">
            "스르륵 올라오게"
          </span>
        </div>

        {/* 허브: 표준 지시문 */}
        <div className="absolute w-[46%] -translate-x-1/2 -translate-y-1/2" style={pos(HUB.x, HUB.y)}>
          <div className="paint-key shadow-raised rounded-2xl px-3.5 py-3 text-center">
            <p className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase opacity-75">지시문</p>
            <p className="mt-1 text-sm font-bold sm:text-base">스태거(stagger)</p>
            <p className="mt-0.5 font-mono text-[10.5px] font-medium sm:text-[11px]">0.12s 간격 · 0.5s ease-out-quart</p>
          </div>
        </div>

        {/* 스포크: 라이브러리별 구현 */}
        {SPOKES.map((spoke) => (
          <div key={spoke.lib} className="absolute w-[34%] -translate-x-1/2 -translate-y-1/2" style={pos(spoke.x, spoke.y)}>
            <div className="border-line bg-surface shadow-raised-sm rounded-xl border px-2.5 py-2 text-center">
              <p className="text-xs font-bold sm:text-[13px]">{spoke.lib}</p>
              <p className="text-ink-2 mt-0.5 hidden truncate font-mono text-[10.5px] sm:block">{spoke.code}</p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}

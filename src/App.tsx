import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, RotateCcw } from 'lucide-react'

import { TECHNIQUE_SECTIONS, type Technique } from './techniques/registry'
import { buildPrompt, defaultValues, LIB_LABEL, type Lib } from './techniques/prompt'
import type { Accent, Fit, Param, ParamValues } from './techniques/types'
import { UI_ELEMENTS } from './techniques/ui-elements'
import { cn } from './lib/utils'

const ACCENT_BG: Record<Accent, string> = {
  yellow: 'bg-nb-yellow',
  blue: 'bg-nb-blue',
  green: 'bg-nb-green',
  purple: 'bg-nb-purple',
  orange: 'bg-nb-orange'
}

const FIT_LABEL: Record<Fit, { text: string; className: string }> = {
  motion: { text: 'Motion 추천', className: 'bg-nb-yellow' },
  gsap: { text: 'GSAP 추천', className: 'bg-nb-green' },
  both: { text: '둘 다 무난', className: 'bg-white' },
  native: { text: '브라우저 기본', className: 'bg-nb-purple' },
  rn: { text: 'React Native', className: 'bg-nb-blue' }
}

const sectionId = (index: number) => `section-${index + 1}`

export default function App() {
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
    <div className="pb-24">
      {/* 히어로 */}
      <section className="nb-grid border-b-2 border-black px-4 py-14 sm:px-6 lg:px-10">
        <div className="bg-nb-surface shadow-nb-lg max-w-3xl border-2 border-black p-7 lg:p-9">
          <span className="bg-nb-yellow shadow-nb-sm inline-block border-2 border-black px-2 py-0.5 text-[11px] font-extrabold tracking-[0.12em] uppercase">
            Motion Lab
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight break-keep sm:text-5xl">
            모션 기법 사전
          </h1>
          <p className="mt-4 max-w-xl text-base font-bold break-keep sm:text-lg">
            원하는 움직임을 표준 용어와 숫자로 바꿔보세요. 
         <br/>
            그대로 복사해서 AI에게 붙여 넣을 수 있는 지시문이 돼요.
          </p>
          <p className="text-nb-muted mt-2 max-w-xl text-sm font-medium break-keep">
            "부드럽게", "세련되게" 같은 표현은 사람마다, 실행할 때마다 다르게 해석되기 쉬워요. <br/>표준 용어와 숫자로 말하면 누가 언제 적용해도 똑같은 움직임을 만들 수 있습니다.
          </p>

          {/* 카테고리 바로가기 */}
          <nav className="relative mt-10 flex flex-wrap gap-2">
            {TECHNIQUE_SECTIONS.map((section, index) => (
              <a
                key={section.heading}
                ref={(el) => {
                  linkRefs.current[index] = el
                }}
                href={`#${sectionId(index)}`}
                title={`${section.heading} 섹션으로 이동`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={cn(
                  'shadow-nb-sm rounded-[5px] border-2 border-black px-3 py-1.5 text-xs font-extrabold transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none',
                  ACCENT_BG[section.accent]
                )}
              >
                {section.heading}
                <span className="ml-1.5 font-mono">{section.techniques.length}</span>
              </a>
            ))}

            {tooltipPos && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 transition-transform duration-150 ease-out"
                style={{ transform: `translate(${tooltipPos.x}px, ${tooltipPos.y - 32}px)` }}
              >
                <span className="flex -translate-x-1/2 animate-bounce flex-col items-center">
                  <span className="shadow-nb-sm rounded-[4px] border-2 border-black bg-white px-1.5 py-0.5 text-[9px] font-extrabold tracking-tight whitespace-nowrap text-black">
                    눌러서 바로 이동해요
                  </span>
                  <span className="-mt-[3px] size-1.5 rotate-45 border-r-2 border-b-2 border-black bg-white" />
                </span>
              </span>
            )}
          </nav>
        </div>
      </section>

      <div className="space-y-14 px-4 pt-12 sm:px-6 lg:px-10">
        <Takeaways />

        {/* 모든 기법에 공통 */}
        <aside className="bg-nb-surface shadow-nb-sm max-w-3xl rounded-[5px] border-2 border-black px-5 py-4 text-xs">
          <p className="font-extrabold">모든 기법에 공통: 움직임을 싫어하는 사람 배려하기</p>
          <p className="text-nb-muted mt-1 break-keep">
            OS에서 "동작 줄이기"를 켠 사람(어지러움 · 멀미)에게는 큰 움직임을 끄고 페이드 정도만 남긴다. CSS로는{' '}
            <code className="font-mono">prefers-reduced-motion</code>으로 읽는다.
          </p>
          <dl className="mt-2 grid gap-1.5">
            <ApiRow lib="Motion" lines={["<MotionConfig reducedMotion='user'>", 'useReducedMotion()으로 패럴랙스 · 자동재생 끄기']} className="bg-nb-yellow" />
            <ApiRow lib="GSAP" lines={["gsap.matchMedia().add({ reduce: '(prefers-reduced-motion: reduce)' }, ctx => …)"]} className="bg-nb-green" />
          </dl>
        </aside>

        {TECHNIQUE_SECTIONS.map((section, sectionIndex) => (
          <section key={section.heading} id={sectionId(sectionIndex)} className="scroll-mt-6">
            <header className="mb-6">
              <h2
                className={cn(
                  'shadow-nb-sm inline-block border-2 border-black px-2.5 py-1 text-xs font-extrabold tracking-[0.12em]',
                  ACCENT_BG[section.accent]
                )}
              >
                {section.heading}
              </h2>
              <p className="text-nb-muted mt-2 text-sm font-medium break-keep">{section.lead}</p>
            </header>
            <ol className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {section.techniques.map((technique, index) => (
                <TechniqueCard key={technique.slug} technique={technique} index={index} accent={section.accent} />
              ))}
            </ol>
          </section>
        ))}

        <section>
          <header className="mb-6">
            <h2 className="bg-nb-surface shadow-nb-sm inline-block border-2 border-black px-2.5 py-1 text-xs font-extrabold tracking-[0.12em]">
              UI 요소
            </h2>
            <p className="text-nb-muted mt-2 text-sm font-medium break-keep">
              연출이 붙는 대상. 이름이 정확해야 흔한 구현 관례(위치 · 닫힘 방식)까지 따라온다
            </p>
          </header>
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {UI_ELEMENTS.map((element) => (
              <li key={element.name} className="bg-nb-surface shadow-nb-sm rounded-[5px] border-2 border-black px-4 py-3">
                <span className="font-extrabold">{element.name}</span>
                <span className="text-nb-muted ml-2 text-xs font-semibold">{element.english}</span>
                <p className="text-nb-muted mt-1 text-xs break-keep">{element.meaning}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function TechniqueCard({
  technique,
  index,
  accent
}: {
  technique: Technique
  index: number
  accent: Accent
}) {
  const fit = FIT_LABEL[technique.fit]
  const [values, setValues] = useState(() => defaultValues(technique))

  return (
    <li className="flex min-w-0 flex-col">
      <div className="flex items-center gap-2">
        <span className={cn('border-2 border-black px-1 font-mono text-sm font-extrabold tabular-nums', ACCENT_BG[accent])}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-xl font-extrabold break-keep">{technique.name}</h3>
        <span className={cn('ml-auto border-2 border-black px-1.5 text-[10px] font-extrabold whitespace-nowrap', fit.className)}>
          {fit.text}
        </span>
      </div>
      <p className="text-nb-muted text-xs font-semibold">{technique.english}</p>

      <div className="bg-nb-surface shadow-nb relative mt-2 h-40 overflow-hidden rounded-[5px] border-2 border-black">
        <Suspense fallback={null}>
          <technique.Demo params={values} />
        </Suspense>
        {/* 슬라이더가 있으면 지금 값 · 없으면 meta 의 고정 라벨 */}
        <Viewfinder
          param={
            technique.params
              ? technique.params.map((param) => `${values[param.key]}${param.unit ?? ''}`).join(' · ')
              : technique.param
          }
        />
      </div>

      <p className="text-nb-muted mt-2 text-xs leading-relaxed break-keep">{technique.meaning}</p>

      {technique.params && (
        <ParamPanel
          params={technique.params}
          values={values}
          onChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
          onReset={() => setValues(defaultValues(technique))}
        />
      )}

      {/* 라이브러리별 핵심 API */}
      <dl className="mt-3 grid gap-1.5 text-[11px]">
        {technique.rn && <ApiRow lib="RN" lines={technique.rn} className="bg-nb-blue" />}
        {technique.motion && <ApiRow lib="Motion" lines={technique.motion} className="bg-nb-yellow" />}
        {technique.gsap && <ApiRow lib="GSAP" lines={technique.gsap} className="bg-nb-green" />}
        {technique.native && <ApiRow lib="CSS·Web" lines={technique.native} className="bg-nb-purple" />}
      </dl>

      <CopyButtons technique={technique} values={values} />
      <DocLinks docs={technique.docs} />
    </li>
  )
}

const TAKEAWAYS = [
  {
    title: '기법 용어 찾기',
    body: '머릿속에 있는 "그 스르륵 올라오는 거"가 어떤 기법인지 데모를 보면서 찾아보세요. 정확한 용어를 알면 AI에게 지시할 때도, 검색할 때도, 디자이너와 대화할 때도 훨씬 정확해져요.',
    accent: 'bg-nb-blue',
    example: ['마스크 리빌', '스태거', '오버슈트']
  },
  {
    title: '어떤 도구로 만들지',
    body: '같은 기법을 Motion · GSAP · CSS로 각각 어떻게 구현하는지 나란히 비교해보세요. 공식 문서와 대조한 API는 물론, 어느 쪽이 맞는지, 유료 기능인지도 함께 확인할 수 있어요.',
    accent: 'bg-nb-green',
    example: ['Motion 추천', 'GSAP 추천', '브라우저 기본']
  },
  {
    title: '정확한 수치와 지시문',
    body: '슬라이더를 움직이며 눈으로 느낌을 맞춰보고, 그대로 복사해보세요. "부드럽게 해줘"를 여러 번 주고받던 과정을 한 번에 끝낼 수 있어요.',
    accent: 'bg-nb-yellow',
    example: ['0.12s 간격', 'stiffness 220', 'damping 12']
  }
]

/** 이 사이트에서 얻어가는 것 · 쓰는 순서 */
function Takeaways() {
  return (
    <section>
      <h2 className="bg-nb-surface shadow-nb-sm inline-block border-2 border-black px-2.5 py-1 text-xs font-extrabold tracking-[0.12em]">
        여기서 얻어가는 것
      </h2>
      <ol className="mt-6 grid gap-5 lg:grid-cols-3">
        {TAKEAWAYS.map((item, index) => (
          <li key={item.title} className="bg-nb-surface shadow-nb flex flex-col rounded-[5px] border-2 border-black p-5">
            <div className="flex items-center gap-2">
              <span className={cn('border-2 border-black px-1 font-mono text-sm font-extrabold', item.accent)}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-extrabold break-keep">{item.title}</h3>
            </div>
            <p className="text-nb-muted mt-3 flex-1 text-sm leading-relaxed break-keep">{item.body}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.example.map((chip) => (
                <span key={chip} className="rounded-full border-2 border-black bg-white px-2 py-0.5 font-mono text-[11px] font-bold">
                  {chip}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      {/* 복사 결과 예시 */}
      <figure className="mt-5 max-w-3xl">
        <figcaption className="text-nb-muted mb-2 text-xs font-bold">카드에서 "Motion으로 복사"를 누르면 이렇게 나와요</figcaption>
        <pre className="overflow-x-auto rounded-[5px] border-2 border-black bg-black px-4 py-3 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-white">
          {`스태거(stagger): 스태거로 0.12s 간격을 두고, 하나씩 0.5s ease-out-quart로 아래에서 올라오게.
구현: Motion — 부모 variant transition: { delayChildren: stagger(0.12) } · 자식 { duration: 0.5, ease: [0.25, 1, 0.5, 1] }`}
        </pre>
      </figure>
    </section>
  )
}

/** 슬라이더를 움직이면 데모가 다음 반복부터 그 값으로 재생 */
function ParamPanel({
  params,
  values,
  onChange,
  onReset
}: {
  params: Param[]
  values: ParamValues
  onChange: (key: string, value: number) => void
  onReset: () => void
}) {
  const changed = params.some((param) => values[param.key] !== param.default)

  return (
    <div className="bg-nb-surface mt-3 grid gap-2 rounded-[5px] border-2 border-black px-3 py-2.5">
      {params.map((param) => (
        <label key={param.key} className="grid grid-cols-[4.5rem_1fr_3.5rem] items-center gap-2 text-[11px] font-bold">
          <span className="truncate">{param.label}</span>
          <input
            type="range"
            min={param.min}
            max={param.max}
            step={param.step}
            value={values[param.key]}
            onChange={(event) => onChange(param.key, Number(event.target.value))}
            className="accent-black"
          />
          <span className="text-right font-mono tabular-nums">
            {values[param.key]}
            {param.unit}
          </span>
        </label>
      ))}
      <button
        type="button"
        onClick={onReset}
        disabled={!changed}
        className="text-nb-muted flex w-fit items-center gap-1 text-[10px] font-bold hover:text-black disabled:invisible"
      >
        <RotateCcw className="size-3" strokeWidth={3} />
        기본값
      </button>
    </div>
  )
}

/** 지금 수치로 AI 지시문을 만들어 클립보드에 복사 */
function CopyButtons({ technique, values }: { technique: Technique; values: ParamValues }) {
  const [copied, setCopied] = useState<Lib | null>(null)
  const libs = (['rn', 'motion', 'gsap', 'native'] as const).filter((lib) => technique[lib])

  const copy = async (lib: Lib) => {
    try {
      await navigator.clipboard.writeText(buildPrompt(technique, lib, values))
      setCopied(lib)
      setTimeout(() => setCopied((prev) => (prev === lib ? null : prev)), 1200)
    } catch {
      // 클립보드 권한이 없으면 조용히 무시
    }
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {libs.map((lib) => (
        <button
          key={lib}
          type="button"
          onClick={() => copy(lib)}
          title={buildPrompt(technique, lib, values)}
          className="shadow-nb-sm flex items-center gap-1.5 rounded-[5px] border-2 border-black bg-white px-2.5 py-1 text-[11px] font-extrabold transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        >
          {copied === lib ? <Check className="size-3.5" strokeWidth={3} /> : <Copy className="size-3.5" strokeWidth={3} />}
          {copied === lib ? '복사됨' : `${LIB_LABEL[lib]}으로 복사`}
        </button>
      ))}
    </div>
  )
}

const DOC_LABEL = { rn: 'RN 문서', motion: 'motion.dev', gsap: 'gsap.com', native: 'MDN' } as const

/** 대조할 때 본 공식 문서. 더 깊은 옵션 · 예외는 여기서 */
function DocLinks({ docs }: { docs: Technique['docs'] }) {
  const links = (Object.keys(DOC_LABEL) as (keyof typeof DOC_LABEL)[]).filter((key) => docs[key])

  return (
    <p className="text-nb-muted mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold">
      공식 문서
      {links.map((key) => (
        <a
          key={key}
          href={docs[key]}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-0.5 text-black underline decoration-2 underline-offset-2 hover:decoration-nb-orange"
        >
          {DOC_LABEL[key]}
          <ArrowUpRight className="size-3" strokeWidth={3} />
        </a>
      ))}
    </p>
  )
}

/** 첫 줄이 기본 API, 나머지는 보강 (흐리게) */
function ApiRow({ lib, lines, className }: { lib: string; lines: string[]; className: string }) {
  const [primary, ...extra] = lines

  return (
    <div className="flex items-start gap-2">
      <dt className={cn('w-14 shrink-0 border-2 border-black text-center font-extrabold', className)}>{lib}</dt>
      <dd className="min-w-0 pt-0.5 font-mono leading-normal break-words">
        <p>{primary}</p>
        {extra.map((line) => (
          <p key={line} className="text-nb-muted mt-1">
            {line}
          </p>
        ))}
      </dd>
    </div>
  )
}

/** 화면 모서리 표시 · 수치 라벨. 데모 위에 겹침 */
function Viewfinder({ param }: { param?: string }) {
  const corner = 'absolute size-3 border-black'

  return (
    <div className="pointer-events-none absolute inset-0">
      <span className={`${corner} top-2 left-2 border-t-2 border-l-2`} />
      <span className={`${corner} top-2 right-2 border-t-2 border-r-2`} />
      <span className={`${corner} bottom-2 left-2 border-b-2 border-l-2`} />
      <span className={`${corner} right-2 bottom-2 border-r-2 border-b-2`} />
      {param && (
        <span className="absolute top-2 right-6 border-2 border-black bg-white px-1 font-mono text-[10px] leading-tight font-bold">
          {param}
        </span>
      )}
    </div>
  )
}

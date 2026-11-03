import { Suspense, useId, useState, type CSSProperties } from 'react'
import { ArrowUpRight, Check, Copy, RotateCcw } from 'lucide-react'

import type { Technique } from '../techniques/registry'
import { buildPrompt, defaultValues } from '../techniques/prompt'
import type { Fit, Param, ParamValues } from '../techniques/types'
import { cn } from '../lib/utils'

const FIT_LABEL: Record<Fit, { text: string; dot: string }> = {
  motion: { text: 'Motion 추천', dot: 'bg-key' },
  gsap: { text: 'GSAP 추천', dot: 'bg-sub' },
  both: { text: '둘 다 무난', dot: 'bg-tone' },
  native: { text: '브라우저 기본', dot: 'bg-ink-3' },
  rn: { text: 'React Native', dot: 'bg-sub' }
}

/**
 * 기법 카드: 용어 · 데모 · 뜻 · 조절하는 값 · 지시문 미리보기와 복사 · 공식 문서.
 * 구현 코드 비교는 쓰는 도구와 AI 마다 달라서 보여 주지 않는다
 */
export function TechniqueCard({
  technique,
  index,
  copyCount,
  onCopied,
  className
}: {
  technique: Technique
  index: number
  /** 지금까지 복사된 횟수. 모르면 null */
  copyCount: number | null
  /** 복사가 기록되면 서버가 돌려준 새 횟수 */
  onCopied: (slug: string, count: number) => void
  className?: string
}) {
  const fit = FIT_LABEL[technique.fit]
  const [values, setValues] = useState(() => defaultValues(technique))
  const prompt = buildPrompt(technique, values)

  return (
    <li className={cn('border-line bg-surface shadow-raised rounded-card flex min-w-0 flex-col border p-4 sm:p-5', className)}>
      <div className="flex items-start gap-2.5">
        <span className="bg-well shadow-inset-sm text-ink-2 mt-0.5 rounded-md px-1.5 py-0.5 font-mono text-xs font-semibold tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg leading-tight font-bold break-keep">{technique.name}</h3>
          <p className="text-ink-3 mt-0.5 font-mono text-[11px]">{technique.english}</p>
        </div>
        <span className="border-line text-ink-2 ml-auto flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap">
          <span className={cn('size-1.5 rounded-full', fit.dot)} />
          {fit.text}
        </span>
      </div>

      {/* 데모: 눌린 화면 + 설계도 격자 */}
      {/* data-demo: 인기 기법 슬라이드에서 마우스 끌기를 시작하지 않는 곳 (데모 자체를 끄는 기법이 있다) */}
      <div data-demo className="bg-well shadow-inset blueprint relative mt-3.5 h-40 cursor-auto overflow-hidden rounded-2xl">
        <Suspense fallback={null}>
          <technique.Demo params={values} />
        </Suspense>
        <Viewfinder
          param={
            technique.params
              ? technique.params.map((param) => `${values[param.key]}${param.unit ?? ''}`).join(' · ')
              : technique.param
          }
        />
      </div>

      <p className="text-ink-2 mt-3 text-[13px] leading-relaxed break-keep">{technique.meaning}</p>

      {technique.params && (
        <ParamPanel
          params={technique.params}
          values={values}
          onChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
          onReset={() => setValues(defaultValues(technique))}
        />
      )}

      {/* 아래 공식 문서 줄은 카드 바닥에 붙는다. 가장 긴 카드에서도 선과 붙지 않게 mb 를 둔다 */}
      <div className="mt-4 mb-4">
        <PromptPreview prompt={prompt} />
        {/* 복사는 보조 행동: 작은 버튼을 오른쪽에, 그 아래 횟수 */}
        <div className="mt-2.5 flex flex-col items-end gap-1.5">
          <CopyButton slug={technique.slug} prompt={prompt} onCopied={onCopied} />
          <p data-copy-count className="text-ink-3 font-mono text-[11px] font-medium tabular-nums">
            {copyCount === null ? '복사 —' : `복사 ${copyCount.toLocaleString()}회`}
          </p>
        </div>
      </div>

      <DocLinks docs={technique.docs} />
    </li>
  )
}

/** 값마다 이름 · 지금 값 · 슬라이더 · 바꾸면 달라지는 것. 슬라이더를 움직이면 데모가 다음 반복부터 그 값으로 재생 */
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
  // 카드마다 같은 key(stiffness 등)가 있어서 id 앞에 카드별 고유값을 붙인다
  const baseId = useId()

  return (
    <section aria-label="조절하는 값" className="border-line mt-4 border-t pt-3.5">
      <div className="flex items-center">
        <p className="text-ink-3 flex items-center gap-1.5 font-mono text-[10.5px] font-medium tracking-wider uppercase">
          <span className="bg-key size-1.5 rounded-full" />
          조절하는 값
        </p>
        <button
          type="button"
          onClick={onReset}
          disabled={!changed}
          className="text-ink-3 hover:text-ink ml-auto flex items-center gap-1 text-[11px] font-semibold disabled:invisible"
        >
          <RotateCcw className="size-3" strokeWidth={2.5} />
          기본값
        </button>
      </div>
      <div className="mt-2.5 grid gap-4">
        {params.map((param) => {
          const pct = ((values[param.key] - param.min) / (param.max - param.min)) * 100
          const inputId = `${baseId}-${param.key}`
          return (
            <div key={param.key}>
              <div className="flex items-baseline justify-between gap-3 text-xs">
                <label htmlFor={inputId} className="font-semibold break-keep">
                  {param.label}
                </label>
                <span className="font-mono font-medium tabular-nums">
                  {values[param.key]}
                  <span className="text-ink-3">{param.unit}</span>
                </span>
              </div>
              <input
                id={inputId}
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={values[param.key]}
                onChange={(event) => onChange(param.key, Number(event.target.value))}
                aria-describedby={`${inputId}-effect`}
                className="neu-range mt-1"
                style={{ '--pct': `${pct}%` } as CSSProperties}
              />
              <p id={`${inputId}-effect`} className="text-ink-2 mt-0.5 text-xs leading-relaxed break-keep">
                {param.effect}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/** 복사될 지시문을 그대로 보여 줌. 1줄 요청 · 2줄 추천 라이브러리 (있을 때만) */
function PromptPreview({ prompt }: { prompt: string }) {
  const [request, ...rest] = prompt.split('\n')

  return (
    <figure className="bg-well shadow-inset-sm rounded-xl px-3.5 py-3">
      <figcaption className="text-ink-3 mb-1.5 flex items-center gap-1.5 font-mono text-[10.5px] font-medium tracking-wider uppercase">
        <span className="bg-key size-1.5 rounded-full" />
        지시문
      </figcaption>
      <p className="font-mono text-xs leading-relaxed break-words">{request}</p>
      {rest.map((line) => (
        <p key={line} className="text-ink-2 mt-1 font-mono text-xs leading-relaxed break-words">
          {line}
        </p>
      ))}
    </figure>
  )
}

/** 지금 지시문을 클립보드에 복사하고 횟수를 1 올린다. 새 횟수는 버튼 아래 줄에 보인다 */
function CopyButton({ slug, prompt, onCopied }: { slug: string; prompt: string; onCopied: (slug: string, count: number) => void }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      // 클립보드 권한이 없으면 조용히 무시
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    // 횟수는 기록이 되는 대로 반영. 서버가 없거나 실패해도 "복사됨"은 그대로
    try {
      const response = await fetch('/api/copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      })
      const { count } = await response.json()
      if (response.ok && typeof count === 'number') onCopied(slug, count)
    } catch {
      // 횟수 기록 실패는 사용자에게 알리지 않음
    }
  }

  return (
    <button
      type="button"
      data-copy
      onClick={copy}
      className={cn(
        'border-line bg-surface shadow-raised-sm active:shadow-inset-sm inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-[color,box-shadow] duration-200',
        copied ? 'text-key-text' : 'text-ink-2 hover:text-ink'
      )}
    >
      {copied ? <Check className="size-3.5" strokeWidth={2.75} /> : <Copy className="size-3.5" strokeWidth={2.5} />}
      <span aria-live="polite">
        {copied ? '복사됨' : '지시문 복사'}
      </span>
    </button>
  )
}

const DOC_LABEL = { rn: 'RN 문서', motion: 'motion.dev', gsap: 'gsap.com', native: 'MDN' } as const

/** 용어를 더 알아볼 공식 문서. 카드 바닥에 붙인다 */
function DocLinks({ docs }: { docs: Technique['docs'] }) {
  const links = (Object.keys(DOC_LABEL) as (keyof typeof DOC_LABEL)[]).filter((key) => docs[key])

  return (
    <p className="border-line text-ink-3 mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-3 text-xs font-semibold">
      <span className="mr-auto">공식 문서</span>
      {links.map((key) => (
        <a
          key={key}
          href={docs[key]}
          target="_blank"
          rel="noreferrer"
          className="text-key-text inline-flex items-center gap-0.5 underline decoration-1 underline-offset-2 hover:decoration-2"
        >
          {DOC_LABEL[key]}
          <ArrowUpRight className="size-3" strokeWidth={2.5} />
        </a>
      ))}
    </p>
  )
}

/** 첫 줄이 기본 API, 나머지는 보강 (흐리게). 공통 규칙 섹션에서 쓴다 */
export function ApiRow({ lib, lines }: { lib: string; lines: string[] }) {
  const [primary, ...extra] = lines

  return (
    <div className="grid grid-cols-[4.5rem_1fr] items-start gap-2.5">
      <dt className="border-line bg-surface text-ink-2 rounded-md border py-0.5 text-center font-mono text-[11px] font-semibold">
        {lib}
      </dt>
      <dd className="min-w-0 pt-0.5 font-mono leading-normal break-words">
        <p>{primary}</p>
        {extra.map((line) => (
          <p key={line} className="text-ink-3 mt-1">
            {line}
          </p>
        ))}
      </dd>
    </div>
  )
}

/** 데모 위에 겹치는 도면 표시: 네 모서리 눈금 · 오른쪽 위 수치 라벨 */
function Viewfinder({ param }: { param?: string }) {
  const corner = 'absolute size-2.5 border-ink-3'

  return (
    <div className="pointer-events-none absolute inset-0">
      <span className={`${corner} top-2.5 left-2.5 border-t border-l`} />
      <span className={`${corner} top-2.5 right-2.5 border-t border-r`} />
      <span className={`${corner} bottom-2.5 left-2.5 border-b border-l`} />
      <span className={`${corner} right-2.5 bottom-2.5 border-r border-b`} />
      {param && (
        <span className="border-line bg-surface text-ink-2 absolute top-2 right-6 rounded border px-1.5 font-mono text-[11px] leading-[18px] font-medium">
          {param}
        </span>
      )}
    </div>
  )
}

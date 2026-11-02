import { Suspense, useState, type CSSProperties } from 'react'
import { ArrowUpRight, Check, ChevronRight, Copy, RotateCcw } from 'lucide-react'

import type { Technique } from '../techniques/registry'
import { buildPrompt, defaultValues, LIB_LABEL, type Lib } from '../techniques/prompt'
import type { Fit, Param, ParamValues } from '../techniques/types'
import { cn } from '../lib/utils'

const FIT_LABEL: Record<Fit, { text: string; dot: string }> = {
  motion: { text: 'Motion 추천', dot: 'bg-key' },
  gsap: { text: 'GSAP 추천', dot: 'bg-sub' },
  both: { text: '둘 다 무난', dot: 'bg-tone' },
  native: { text: '브라우저 기본', dot: 'bg-ink-3' },
  rn: { text: 'React Native', dot: 'bg-sub' }
}

/** 카드에 보이는 라이브러리 순서. 앱 기법은 RN 이 먼저 */
const LIB_ORDER = ['rn', 'motion', 'gsap', 'native'] as const

export function TechniqueCard({ technique, index }: { technique: Technique; index: number }) {
  const fit = FIT_LABEL[technique.fit]
  const libs = LIB_ORDER.filter((lib) => technique[lib])
  const [values, setValues] = useState(() => defaultValues(technique))
  const [lib, setLib] = useState<Lib>(libs[0])
  const prompt = buildPrompt(technique, lib, values)

  return (
    <li className="border-line bg-surface shadow-raised rounded-card flex min-w-0 flex-col border p-4 sm:p-5">
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
      <div className="bg-well shadow-inset blueprint relative mt-3.5 h-40 overflow-hidden rounded-2xl">
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

      {/* 바닥에 붙이면 슬라이더가 적은 카드 가운데에 빈 구멍이 생겨서, 위에서부터 채우고 남는 공간은 카드 아래로 보낸다 */}
      <div className="pt-4">
        {libs.length > 1 && <LibToggle libs={libs} value={lib} onChange={setLib} />}
        <PromptPreview prompt={prompt} />
        <CopyButton slug={technique.slug} prompt={prompt} />
        <ApiDetails technique={technique} libs={libs} />
      </div>
    </li>
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
    <div className="mt-3 grid gap-1.5">
      {params.map((param) => {
        const pct = ((values[param.key] - param.min) / (param.max - param.min)) * 100
        return (
          <label key={param.key} className="grid grid-cols-[4.5rem_1fr_3.75rem] items-center gap-2.5 text-xs font-semibold">
            <span className="text-ink-2 truncate">{param.label}</span>
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={values[param.key]}
              onChange={(event) => onChange(param.key, Number(event.target.value))}
              className="neu-range"
              style={{ '--pct': `${pct}%` } as CSSProperties}
            />
            <span className="text-right font-mono tabular-nums">
              {values[param.key]}
              <span className="text-ink-3">{param.unit}</span>
            </span>
          </label>
        )
      })}
      <button
        type="button"
        onClick={onReset}
        disabled={!changed}
        className="text-ink-3 hover:text-ink flex w-fit items-center gap-1 text-[11px] font-semibold disabled:invisible"
      >
        <RotateCcw className="size-3" strokeWidth={2.5} />
        기본값
      </button>
    </div>
  )
}

/** 지시문 2줄째(구현 코드)를 어느 라이브러리로 쓸지. 눌린 홈 위에 고른 칸만 튀어나옴 */
function LibToggle({ libs, value, onChange }: { libs: readonly Lib[]; value: Lib; onChange: (lib: Lib) => void }) {
  return (
    <div role="group" aria-label="구현 라이브러리" className="bg-well shadow-inset-sm mb-2.5 flex rounded-full p-1">
      {libs.map((lib) => (
        <button
          key={lib}
          type="button"
          aria-pressed={value === lib}
          onClick={() => onChange(lib)}
          className={cn(
            'flex-1 rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap transition-[color,box-shadow,background-color] duration-200',
            value === lib ? 'bg-surface text-ink shadow-raised-sm' : 'text-ink-3 hover:text-ink'
          )}
        >
          {LIB_LABEL[lib]}
        </button>
      ))}
    </div>
  )
}

/** 복사될 지시문을 그대로 보여 줌. 1줄 요청 · 2줄 구현 */
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

/** 지금 지시문을 클립보드에 복사하고, 기록되면 몇 번째 복사인지 덧붙임 */
function CopyButton({ slug, prompt }: { slug: string; prompt: string }) {
  const [copied, setCopied] = useState<{ count: number | null } | null>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      // 클립보드 권한이 없으면 조용히 무시
      return
    }
    setCopied({ count: null })
    setTimeout(() => setCopied(null), 2000)

    // 횟수는 기록이 되는 대로 덧붙임. 서버가 없거나 실패해도 "복사됨"은 그대로
    try {
      const response = await fetch('/api/copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      })
      const { count } = await response.json()
      if (response.ok && typeof count === 'number') setCopied((prev) => (prev ? { count } : prev))
    } catch {
      // 횟수 기록 실패는 사용자에게 알리지 않음
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="paint-key shadow-raised-sm hover:bg-key-hover mt-3 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-[background-color,box-shadow,translate] duration-200 active:translate-y-px active:shadow-inset-sm"
    >
      {copied ? <Check className="size-4" strokeWidth={2.75} /> : <Copy className="size-4" strokeWidth={2.5} />}
      <span aria-live="polite">
        {copied ? (copied.count === null ? '복사됨' : `복사됨 · ${copied.count.toLocaleString()}번째`) : '지시문 복사'}
      </span>
    </button>
  )
}

const DOC_LABEL = { rn: 'RN 문서', motion: 'motion.dev', gsap: 'gsap.com', native: 'MDN' } as const

/** 라이브러리별 핵심 API 와 대조한 공식 문서. 기본은 접어 둔다 */
function ApiDetails({ technique, libs }: { technique: Technique; libs: readonly Lib[] }) {
  const docs = (Object.keys(DOC_LABEL) as (keyof typeof DOC_LABEL)[]).filter((key) => technique.docs[key])

  return (
    <details className="group border-line mt-4 border-t pt-3">
      <summary className="text-ink-2 hover:text-ink flex cursor-pointer items-center gap-1.5 text-xs font-semibold">
        <ChevronRight className="size-3.5 transition-transform duration-200 group-open:rotate-90" strokeWidth={2.5} />
        API 비교 · 공식 문서
        <span className="text-ink-3 ml-auto font-mono text-[11px] font-medium">{libs.map((lib) => LIB_LABEL[lib]).join(' · ')}</span>
      </summary>
      <dl className="mt-3 grid gap-2 text-xs">
        {libs.map((lib) => (
          <ApiRow key={lib} lib={LIB_LABEL[lib]} lines={technique[lib] ?? []} />
        ))}
      </dl>
      <p className="text-ink-3 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold">
        공식 문서
        {docs.map((key) => (
          <a
            key={key}
            href={technique.docs[key]}
            target="_blank"
            rel="noreferrer"
            className="text-key-text inline-flex items-center gap-0.5 underline decoration-1 underline-offset-2 hover:decoration-2"
          >
            {DOC_LABEL[key]}
            <ArrowUpRight className="size-3" strokeWidth={2.5} />
          </a>
        ))}
      </p>
    </details>
  )
}

/** 첫 줄이 기본 API, 나머지는 보강 (흐리게) */
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

import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { SearchX } from 'lucide-react'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SectionHeading } from './components/SectionHeading'
import { ApiRow, TechniqueCard } from './components/TechniqueCard'
import { useTheme } from './components/theme'
import { TECHNIQUE_SECTIONS, type Technique } from './techniques/registry'
import { UI_ELEMENTS } from './techniques/ui-elements'

const sectionId = (index: number) => `section-${index + 1}`

/** 검색어가 이름 · 원어 · 뜻 · 폴더 이름 중 하나에 들어 있으면 */
const matches = (technique: Technique, q: string) =>
  [technique.name, technique.english, technique.meaning, technique.slug].some((text) => text.toLowerCase().includes(q))

/** 화면 위쪽 25~30% 띠에 걸친 섹션을 "지금 보는 섹션"으로 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-25% 0px -70% 0px' }
    )
    key.split(',').forEach((id) => {
      const el = id && document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [key])

  return active
}

/** id 로 찾은 요소가 고정 헤더 아래 화면에 보이는지 */
function useVisible(id: string) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '-64px 0px 0px 0px'
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  return visible
}

export default function App() {
  const { theme, toggle } = useTheme()
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  // 카드 번호는 검색으로 걸러져도 원래 순서를 유지
  const allSections = useMemo(
    () =>
      TECHNIQUE_SECTIONS.map((section, sectionIndex) => ({
        id: sectionId(sectionIndex),
        number: sectionIndex + 1,
        heading: section.heading,
        lead: section.lead,
        items: section.techniques.map((technique, index) => ({ technique, index }))
      })),
    []
  )
  const sections = allSections
    .map((section) => ({ ...section, items: q ? section.items.filter(({ technique }) => matches(technique, q)) : section.items }))
    .filter((section) => section.items.length > 0)
  const resultCount = sections.reduce((sum, section) => sum + section.items.length, 0)

  const activeId = useActiveSection(sections.map((section) => section.id))
  const heroIndexVisible = useVisible('hero-index')

  // 검색을 시작하면 결과 목록 맨 위로
  const wasSearching = useRef(false)
  useEffect(() => {
    const searching = q !== ''
    if (searching && !wasSearching.current) document.getElementById('techniques')?.scrollIntoView({ block: 'start' })
    wasSearching.current = searching
  }, [q])

  // 검색 중에 히어로 칩을 누르면 걸러져 숨은 섹션일 수 있어서, 검색을 풀고 나서 이동
  const jump = (event: MouseEvent, id: string) => {
    if (!q) return
    event.preventDefault()
    setQuery('')
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
  }

  return (
    <>
      <Header
        sections={sections.map(({ id, heading }) => ({ id, heading }))}
        activeId={activeId}
        showChips={!heroIndexVisible}
        query={query}
        onQuery={setQuery}
        resultCount={resultCount}
        theme={theme}
        onToggleTheme={toggle}
      />
      <main>
        <Hero
          sections={allSections.map(({ id, heading, items }) => ({ id, heading, count: items.length }))}
          onJump={jump}
        />

        <div id="techniques" className="mx-auto max-w-[1280px] space-y-20 px-4 pt-16 pb-24 sm:px-6 lg:px-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <SectionHeading index={section.number} title={section.heading} count={section.items.length} lead={section.lead} />
              <ol className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {section.items.map(({ technique, index }) => (
                  <TechniqueCard key={technique.slug} technique={technique} index={index} />
                ))}
              </ol>
            </section>
          ))}

          {sections.length === 0 && <EmptyResult query={query} onClear={() => setQuery('')} />}

          {!q && (
            <>
              <CommonRule />
              <UiElements />
            </>
          )}

          <Footer />
        </div>
      </main>
    </>
  )
}

/** 동작 줄이기 설정. 기법마다 반복하지 않고 한 번만 */
function CommonRule() {
  return (
    <section>
      <SectionHeading title="공통 규칙" lead="모든 기법에 적용해요. 움직임을 싫어하는 사람을 배려하는 설정이에요." />
      <div className="border-line bg-surface shadow-raised rounded-card max-w-3xl border p-5">
        <p className="text-ink-2 text-[13px] leading-relaxed break-keep">
          OS에서 "동작 줄이기"를 켠 사람(어지러움 · 멀미)에게는 큰 움직임을 끄고 페이드 정도만 남겨요. CSS에서는{' '}
          <code className="text-ink font-mono">prefers-reduced-motion</code>으로 이 설정을 읽어요.
        </p>
        <dl className="mt-4 grid gap-2 text-xs">
          <ApiRow lib="Motion" lines={["<MotionConfig reducedMotion='user'>", 'useReducedMotion()으로 패럴랙스 · 자동재생 끄기']} />
          <ApiRow lib="GSAP" lines={["gsap.matchMedia().add({ reduce: '(prefers-reduced-motion: reduce)' }, ctx => …)"]} />
        </dl>
      </div>
    </section>
  )
}

function UiElements() {
  return (
    <section>
      <SectionHeading
        title="UI 요소"
        count={UI_ELEMENTS.length}
        lead="연출이 붙는 대상이에요. 이름을 정확히 말해야 위치나 닫는 방식 같은 흔한 구현 관례까지 함께 전달돼요."
      />
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {UI_ELEMENTS.map((element) => (
          <li key={element.name} className="border-line bg-surface rounded-2xl border px-4 py-3">
            <span className="font-semibold">{element.name}</span>
            <span className="text-ink-3 ml-2 font-mono text-[11px]">{element.english}</span>
            <p className="text-ink-2 mt-1 text-[13px] break-keep">{element.meaning}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function EmptyResult({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="border-line-strong rounded-card flex flex-col items-center gap-3 border border-dashed px-6 py-16 text-center">
      <SearchX className="text-ink-3 size-6" strokeWidth={2} />
      <p className="font-semibold break-keep">"{query.trim()}"에 맞는 기법이 없어요</p>
      <p className="text-ink-2 text-sm break-keep">이름, 영문 이름, 뜻으로 찾을 수 있어요. 예: 스태거, spring, 스크롤</p>
      <button
        type="button"
        onClick={onClear}
        className="border-line bg-surface shadow-raised-sm active:shadow-inset-sm mt-2 rounded-full border px-4 py-1.5 text-xs font-semibold transition-shadow duration-200"
      >
        검색어 지우기
      </button>
    </div>
  )
}

import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

import { SECTIONS } from './sections'
import type { DemoProps, TechniqueMeta } from './types'

/**
 * `src/techniques/<slug>/` 폴더를 읽어 홈 화면 목록을 만든다.
 * 폴더에 `meta.ts` 와 `demo.tsx` 만 두면 자동으로 붙는다. 등록 코드는 없다.
 * API 는 motion.dev · gsap.com 문서와 대조함 (2026-10, motion 14 · gsap 3.15).
 */

export interface Technique extends TechniqueMeta {
  slug: string
  Demo: LazyExoticComponent<ComponentType<DemoProps>>
}

const metaFiles = import.meta.glob<TechniqueMeta>('./*/meta.ts', { import: 'default', eager: true })
const demoFiles = import.meta.glob<{ default: ComponentType<DemoProps> }>('./*/demo.tsx')

const slugOf = (path: string) => path.split('/')[1]

const techniques: Technique[] = Object.entries(metaFiles).flatMap(([path, meta]) => {
  const slug = slugOf(path)
  const loadDemo = demoFiles[`./${slug}/demo.tsx`]
  if (!loadDemo) {
    console.warn(`[techniques] ${slug}: demo.tsx 가 없어 건너뜁니다`)
    return []
  }
  return [{ ...meta, slug, Demo: lazy(loadDemo) }]
})

/** 섹션 순서대로, 섹션 안은 order 순 */
export const TECHNIQUE_SECTIONS = SECTIONS.map((section) => ({
  ...section,
  techniques: techniques.filter((t) => t.section === section.key).sort((a, b) => a.order - b.order)
}))

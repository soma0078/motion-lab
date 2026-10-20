import type { SectionKey } from './sections'

export type Accent = 'yellow' | 'blue' | 'green' | 'purple' | 'orange'

/** 이 기법에 더 잘 맞는 쪽. 둘 다 무난하면 both · 브라우저 기본 기능으로 충분하면 native */
export type Fit = 'motion' | 'gsap' | 'both' | 'native'

/** 카드에서 슬라이더로 조절하는 수치 하나 */
export interface Param {
  key: string
  label: string
  min: number
  max: number
  step: number
  default: number
  unit?: string
}

export type ParamValues = Record<string, number>


/** demo.tsx 가 받는 props. 슬라이더 값이 그대로 들어옴 */
export interface DemoProps {
  params: ParamValues
}

/** `<slug>/meta.ts` 의 default export */
export interface TechniqueMeta {
  /** 표준 용어 */
  name: string
  english: string
  meaning: string
  section: SectionKey
  /** 섹션 안 순서. 10 단위라 사이에 끼워 넣기 쉬움 */
  order: number
  /** 데모 화면 오른쪽 위 수치 라벨 */
  param: string
  /** Motion(motion/react) 핵심 API. 첫 줄이 기본, 나머지는 보강 */
  motion: string[]
  /** GSAP 핵심 API. 첫 줄이 기본, 나머지는 보강 */
  gsap: string[]
  /** 라이브러리 없이 CSS · Web API 로 할 때 */
  native?: string[]
  fit: Fit
  /** 공식 문서. 대조할 때 본 페이지 */
  docs: { motion?: string; gsap?: string; native?: string }
  /** 조절 가능한 수치. 없으면 슬라이더 없이 복사만 */
  params?: Param[]
  /** AI 에게 보낼 지시 한두 문장. 수치는 여기에 넣는다. 없으면 이름 + 뜻으로 만든다 */
  prompt?: (values: ParamValues) => string
  /** 복사할 때 붙는 라이브러리별 코드. 없으면 motion[0] · gsap[0] */
  snippet?: { motion: (values: ParamValues) => string; gsap: (values: ParamValues) => string }
}

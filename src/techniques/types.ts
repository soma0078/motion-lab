import type { SectionKey } from './sections'

export type Accent = 'yellow' | 'blue' | 'green' | 'purple' | 'orange'

/** 이 기법에 더 잘 맞는 쪽. 둘 다 무난하면 both · 브라우저 기본 기능으로 충분하면 native · 앱(React Native) 기법이면 rn */
export type Fit = 'motion' | 'gsap' | 'both' | 'native' | 'rn'

/** 카드에서 슬라이더로 조절하는 수치 하나 */
export interface Param {
  key: string
  label: string
  min: number
  max: number
  step: number
  default: number
  unit?: string
  /** 이 값을 바꾸면 무엇이 달라지는지. 카드의 슬라이더 아래에 보인다 */
  effect: string
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
  fit: Fit
  /** 공식 문서. 대조할 때 본 페이지 */
  docs: { motion?: string; gsap?: string; native?: string; rn?: string }
  /** 조절 가능한 수치. 없으면 슬라이더 없이 복사만 */
  params?: Param[]
  /**
   * 지시문 첫 줄. 작성 규칙 (scripts/check-prompts.mjs 가 검사한다):
   * - 기법 용어를 "이름(원어)" 로 문장 안에 넣는다. 예: 스태거(stagger)로 …
   * - 명령체로 쓰고, 문장마다 "~해." 로 끝낸다
   * - 수치는 여기에 넣는다. 슬라이더 값은 values 로 받는다
   */
  prompt: (values: ParamValues) => string
}

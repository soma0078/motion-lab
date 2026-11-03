import type { Technique } from './registry'
import type { Fit, ParamValues } from './types'

/** 기본값으로 채운 수치 */
export const defaultValues = (technique: Technique): ParamValues =>
  Object.fromEntries((technique.params ?? []).map((param) => [param.key, param.default]))

/**
 * 추천이 분명한 기법에만 붙는 구현 문장.
 * "둘 다 무난"은 Motion · GSAP 어느 쪽이든 지시문이 같아서 라이브러리를 정하지 않는다
 */
const IMPLEMENT: Record<Fit, string | null> = {
  motion: 'Motion으로 구현해.',
  gsap: 'GSAP으로 구현해.',
  native: '라이브러리 없이 CSS · Web API로 구현해.',
  rn: 'React Native로 구현해.',
  both: null
}

/**
 * 카드의 "복사" 버튼이 만드는 지시문.
 * 1줄: 기법 용어를 넣은 명령문 (수치 포함, meta.prompt) / 2줄: 추천 라이브러리 (있을 때만).
 * 세부 API 와 코드는 쓰는 AI 가 정한다
 */
export const buildPrompt = (technique: Technique, values: ParamValues) =>
  [technique.prompt(values), IMPLEMENT[technique.fit]].filter(Boolean).join('\n')

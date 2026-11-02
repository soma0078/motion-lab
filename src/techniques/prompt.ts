import type { Technique } from './registry'
import type { ParamValues } from './types'

export type Lib = 'motion' | 'gsap' | 'native' | 'rn'

export const LIB_LABEL: Record<Lib, string> = { motion: 'Motion', gsap: 'GSAP', native: 'CSS·Web', rn: 'React Native' }

/** 기본값으로 채운 수치 */
export const defaultValues = (technique: Technique): ParamValues =>
  Object.fromEntries((technique.params ?? []).map((param) => [param.key, param.default]))

/** "Motion으로" · "React Native로" 처럼 라이브러리 이름 읽는 소리에 맞춘 조사 */
const WITH: Record<Lib, string> = { motion: '으로', gsap: '으로', native: '으로', rn: '로' }

/**
 * 카드의 "복사" 버튼이 만드는 지시문.
 * 1줄: 기법 용어를 넣은 명령문 (수치 포함, meta.prompt) / 2줄: 어느 라이브러리로 구현할지만.
 * 세부 API 와 코드는 쓰는 AI 가 정한다
 */
export const buildPrompt = (technique: Technique, lib: Lib, values: ParamValues) =>
  [technique.prompt(values), `${LIB_LABEL[lib]}${WITH[lib]} 구현해.`].join('\n')

import type { Technique } from './registry'
import type { ParamValues } from './types'

export type Lib = 'motion' | 'gsap' | 'native' | 'rn'

export const LIB_LABEL: Record<Lib, string> = { motion: 'Motion', gsap: 'GSAP', native: 'CSS·Web', rn: 'React Native' }

/** 기본값으로 채운 수치 */
export const defaultValues = (technique: Technique): ParamValues =>
  Object.fromEntries((technique.params ?? []).map((param) => [param.key, param.default]))

/**
 * 카드의 "복사" 버튼이 만드는 지시문.
 * 1줄: 표준 용어 + 원하는 결과 (수치 포함) / 2줄: 구현 라이브러리와 핵심 코드
 */
export const buildPrompt = (technique: Technique, lib: Lib, values: ParamValues) => {
  const request = technique.prompt?.(values) ?? `${technique.meaning}.`
  const code =
    lib === 'native' ? technique.native?.[0] : (technique.snippet?.[lib]?.(values) ?? technique[lib]?.[0])

  return [`${technique.name}(${technique.english}): ${request}`, `구현: ${LIB_LABEL[lib]} — ${code}`].join('\n')
}

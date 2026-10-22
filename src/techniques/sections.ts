import type { Accent } from './types'

/** 홈 화면 섹션 순서. 기법은 meta.ts 의 section 키로 여기에 붙는다 */
export const SECTIONS = [
  { key: 'timing', heading: '시간 · 곡선', lead: '무엇이 움직이든 먼저 정하는 것. 얼마나 빨리, 어떤 가감속으로, 어떤 순서로', accent: 'yellow' as Accent },
  { key: 'transition', heading: '나타남 · 전환', lead: '요소가 생기고, 사라지고, 다른 것으로 바뀌는 순간', accent: 'blue' as Accent },
  { key: 'shape', heading: '모양 · 경로', lead: '위치가 아니라 생김새 자체가 변하거나, 정해진 길을 따라감. 주로 SVG', accent: 'purple' as Accent },
  { key: 'scroll', heading: '스크롤', lead: '시간 대신 스크롤 위치가 진행도를 정하거나, 스크롤이 재생을 시작함', accent: 'green' as Accent },
  { key: 'interaction', heading: '인터랙션', lead: '사용자가 올리고, 누르고, 끌 때의 반응', accent: 'orange' as Accent },
  { key: 'app', heading: '앱 · 제스처', lead: '손가락으로 끌고 밀고 누르는 앱의 움직임이에요. React Native(Reanimated · Gesture Handler) 기준이고, 데모는 웹에서 같은 움직임을 비슷하게 보여드려요', accent: 'blue' as Accent },
  { key: 'loop', heading: '반복', lead: '입력 없이 계속 도는 배경 · 로딩 연출', accent: 'yellow' as Accent }
] as const

export type SectionKey = (typeof SECTIONS)[number]['key']

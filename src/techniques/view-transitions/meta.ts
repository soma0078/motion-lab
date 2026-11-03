import type { TechniqueMeta } from '../types'

export default {
  name: 'View Transitions',
  english: 'view transitions API',
  meaning: '화면 상태가 바뀔 때 브라우저가 이전 · 다음 스냅샷을 이어 붙여 전환',
  section: 'transition',
  order: 120,
  param: 'old → new',
  fit: 'native',
  docs: { motion: 'https://motion.dev/docs/animate-view', gsap: 'https://gsap.com/docs/v3/Plugins/Flip/', native: 'https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API' },
  prompt: () => 'View Transitions(view transitions API)로 화면 상태가 바뀔 때 브라우저가 이전과 다음 스냅샷을 이어 붙여 전환하게 해.'
} satisfies TechniqueMeta

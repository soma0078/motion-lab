import type { TechniqueMeta } from '../types'

export default {
  name: 'View Transitions',
  english: 'view transitions API',
  meaning: '화면 상태가 바뀔 때 브라우저가 이전 · 다음 스냅샷을 이어 붙여 전환',
  section: 'transition',
  order: 120,
  param: 'old → new',
  motion: [
    'animateView(() => update()) (무료 motion 패키지)',
    'React 안에서는 layoutId 로도 같은 효과'
  ],
  gsap: [
    'JS 대안: Flip'
  ],
  native: [
    'React 19.3: <ViewTransition> + startTransition (startViewTransition 직접 호출 금지)',
    'React 밖: document.startViewTransition(() => update())',
    'CSS view-transition-name: hero · ::view-transition-old/new(hero)',
    '지원 Chrome 111 · Safari 18 · Firefox 144'
  ],
  fit: 'native',
  docs: { motion: 'https://motion.dev/docs/animate-view', gsap: 'https://gsap.com/docs/v3/Plugins/Flip/', native: 'https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API' }
} satisfies TechniqueMeta

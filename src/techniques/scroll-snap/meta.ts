import type { TechniqueMeta } from '../types'

export default {
  name: '스크롤 스냅',
  english: 'scroll snap',
  meaning: '스크롤이 정해진 지점에 맞춰 멈춤',
  section: 'scroll',
  order: 60,
  param: 'snap',
  motion: [
    'CSS scroll-snap-type (라이브러리 불필요)'
  ],
  gsap: [
    'scrollTrigger: { snap: 1 / (n - 1) }'
  ],
  fit: 'both',
  docs: { gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/', native: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type' }
} satisfies TechniqueMeta

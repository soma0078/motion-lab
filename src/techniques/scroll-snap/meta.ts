import type { TechniqueMeta } from '../types'

export default {
  name: '스크롤 스냅',
  english: 'scroll snap',
  meaning: '스크롤이 정해진 지점에 맞춰 멈춤',
  tags: ['딱 멈추는', '칸칸이 넘어가는'],
  section: 'scroll',
  order: 60,
  param: 'snap',
  fit: 'both',
  docs: { gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/', native: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type' },
  prompt: () => '스크롤 스냅(scroll snap)으로 스크롤이 항목마다 정해진 지점에 맞춰 멈추게 해.'
} satisfies TechniqueMeta

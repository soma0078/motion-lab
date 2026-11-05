import type { TechniqueMeta } from '../types'

export default {
  name: '스크롤 진입',
  english: 'scroll-triggered reveal',
  meaning: '요소가 화면에 들어오면 자기 시간으로 끝까지 재생',
  tags: ['스크롤하면 나타나는', '스르륵 올라오는'],
  section: 'scroll',
  order: 10,
  param: 'once',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' },
  prompt: () => '스크롤 진입(scroll-triggered reveal)으로 요소가 화면에 들어오면 한 번만, 자기 시간으로 끝까지 재생되게 해.'
} satisfies TechniqueMeta

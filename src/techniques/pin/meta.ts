import type { TechniqueMeta } from '../types'

export default {
  name: '핀',
  english: 'pin (sticky)',
  meaning: '화면을 고정해 둔 채 스크롤로 진행',
  section: 'scroll',
  order: 30,
  param: 'sticky',
  motion: [
    '긴 wrapper + CSS position: sticky + useScroll({ target })'
  ],
  gsap: [
    'scrollTrigger: { pin: true, end: \'+=1500\', scrub: true }',
    'pin 만 쓰면 고정만 됨 · pinSpacing'
  ],
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' }
} satisfies TechniqueMeta

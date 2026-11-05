import type { TechniqueMeta } from '../types'

export default {
  name: '핀',
  english: 'pin (sticky)',
  meaning: '화면을 고정해 둔 채 스크롤로 진행',
  tags: ['고정되는', '달라붙는', '멈춰 있는'],
  section: 'scroll',
  order: 30,
  param: 'sticky',
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' },
  prompt: () => '핀(pin)으로 화면을 고정해 둔 채 스크롤에 따라 안쪽 내용이 진행되게 해.'
} satisfies TechniqueMeta

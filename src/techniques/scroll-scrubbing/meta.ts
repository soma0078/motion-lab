import type { TechniqueMeta } from '../types'

export default {
  name: '스크롤 스크러빙',
  english: 'scroll scrubbing',
  meaning: '스크롤 진행도에 애니메이션을 직접 묶음',
  tags: ['스크롤 따라 움직이는', '되감기는'],
  section: 'scroll',
  order: 20,
  param: 'scroll → 0~1',
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' },
  prompt: () => '스크롤 스크러빙(scroll scrubbing)으로 스크롤 진행도 0~1에 애니메이션 진행을 직접 묶어, 스크롤을 멈추면 애니메이션도 멈추게 해.'
} satisfies TechniqueMeta

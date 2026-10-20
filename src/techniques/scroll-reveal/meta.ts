import type { TechniqueMeta } from '../types'

export default {
  name: '스크롤 진입',
  english: 'scroll-triggered reveal',
  meaning: '요소가 화면에 들어오면 자기 시간으로 끝까지 재생',
  section: 'scroll',
  order: 10,
  param: 'once',
  motion: [
    'whileInView + viewport={{ once: true }}',
    '여러 개면 variants + delayChildren: stagger()'
  ],
  gsap: [
    'scrollTrigger: { toggleActions: \'play none none reverse\' }',
    '여러 개면 ScrollTrigger.batch(\'.card\', { onEnter })'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-scroll-animations', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/' }
} satisfies TechniqueMeta

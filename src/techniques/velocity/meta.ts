import type { TechniqueMeta } from '../types'

export default {
  name: '속도 반응',
  english: 'velocity-based',
  meaning: '스크롤 · 드래그 속도에 따라 기울기 · 흐림이 변함',
  section: 'scroll',
  order: 80,
  param: 'useVelocity',
  motion: [
    'useVelocity(scrollY) → useTransform(v, [-400, 400], [-10, 10]) → useSpring'
  ],
  gsap: [
    'ScrollTrigger onUpdate: self => skewTo(self.getVelocity() / -300)'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-use-velocity', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/getVelocity()' }
} satisfies TechniqueMeta

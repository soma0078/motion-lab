import type { TechniqueMeta } from '../types'

export default {
  name: '속도 반응',
  english: 'velocity-based',
  meaning: '스크롤 · 드래그 속도에 따라 기울기 · 흐림이 변함',
  section: 'scroll',
  order: 80,
  param: 'useVelocity',
  motion: [
    'useVelocity(scrollY) → useTransform(v, [-400, 400], [-10, 10]) → useSpring',
    'style={{ skewY }} · 속도는 px/s 라 수천까지 튐 → 범위 밖은 clamp'
  ],
  gsap: [
    'ScrollTrigger onUpdate: self => skewTo(self.getVelocity() / -300)',
    'const skewTo = gsap.quickTo(el, \'skewY\')'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-use-velocity', gsap: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/getVelocity()' }
} satisfies TechniqueMeta

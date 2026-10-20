import type { TechniqueMeta } from '../types'

export default {
  name: '마그네틱',
  english: 'magnetic',
  meaning: '커서 쪽으로 끌려옴',
  section: 'interaction',
  order: 30,
  param: '35%',
  motion: [
    'useMotionValue + useSpring(src, { stiffness, damping })',
    'v14: useFollowValue(src, transition) · spring 외 tween 도 (타입 정의 기준)'
  ],
  gsap: [
    'const xTo = gsap.quickTo(el, \'x\', { duration: 0.4, ease: \'power3\' })',
    'mousemove 에서 xTo(v) · y 도 하나 더'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-use-spring', gsap: 'https://gsap.com/docs/v3/GSAP/gsap.quickTo()' },
  params: [
    { key: 'range', label: '범위', min: 40, max: 140, step: 5, default: 90, unit: 'px' },
    { key: 'pull', label: '끌림', min: 0.1, max: 0.8, step: 0.05, default: 0.35 },
    { key: 'stiffness', label: 'stiffness', min: 50, max: 500, step: 10, default: 220 },
    { key: 'damping', label: 'damping', min: 4, max: 40, step: 1, default: 12 }
  ],
  prompt: (v) => `커서가 ${v.range}px 안에 들어오면 버튼이 커서 거리의 ${Math.round(v.pull * 100)}%만큼 끌려오게. 따라오고 돌아올 때 spring(stiffness ${v.stiffness}, damping ${v.damping}).`,
  snippet: {
    motion: (v) => `pointer 오프셋 × ${v.pull} → useMotionValue → useSpring(mv, { stiffness: ${v.stiffness}, damping: ${v.damping} })`,
    gsap: (v) => `const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' }) · mousemove 에서 xTo(dx * ${v.pull})`
  }
} satisfies TechniqueMeta

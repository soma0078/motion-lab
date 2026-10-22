import type { TechniqueMeta } from '../types'

export default {
  name: '커스텀 커서',
  english: 'custom cursor',
  meaning: '기본 커서 대신 따라다니는 원. 올린 요소에 따라 모양이 바뀜',
  section: 'interaction',
  order: 70,
  param: '300 / 28',
  motion: [
    'useMotionValue(clientX) + useSpring · pointer-events: none',
    'Cursor 컴포넌트는 Motion+ 유료'
  ],
  gsap: [
    'gsap.quickTo(cursor, \'x\', { duration: 0.6, ease: \'power3\' }) + mousemove'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-use-spring', gsap: 'https://gsap.com/docs/v3/GSAP/gsap.quickTo()' },
  params: [
    { key: 'stiffness', label: 'stiffness', min: 50, max: 800, step: 10, default: 300 },
    { key: 'damping', label: 'damping', min: 5, max: 50, step: 1, default: 28 }
  ],
  prompt: (v) => `기본 커서 대신 점과 원을 그리고, 원은 spring(stiffness ${v.stiffness}, damping ${v.damping})으로 한 박자 늦게 따라오게. 링크 위에서는 원이 커짐.`,
  snippet: {
    motion: (v) => `useMotionValue(clientX) → useSpring(mv, { stiffness: ${v.stiffness}, damping: ${v.damping} }) · pointer-events: none`,
    gsap: () => `gsap.quickTo(ring, 'x', { duration: 0.6, ease: 'power3' }) + mousemove · xPercent: -50`
  }
} satisfies TechniqueMeta

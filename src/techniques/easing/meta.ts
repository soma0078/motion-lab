import type { TechniqueMeta } from '../types'

export default {
  name: '이징',
  english: 'easing',
  meaning: '시작 · 끝의 가감속 곡선',
  section: 'timing',
  order: 10,
  param: '0.25 1 0.5 1',
  motion: [
    'ease: [0.25, 1, 0.5, 1]'
  ],
  gsap: [
    'ease: \'power3.out\''
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-transitions', gsap: 'https://gsap.com/docs/v3/Eases' },
  params: [
    { key: 'duration', label: '길이', min: 0.4, max: 2.4, step: 0.1, default: 1.4, unit: 's' }
  ],
  prompt: (v) => `ease-out-quart 곡선 cubic-bezier(0.25, 1, 0.5, 1)로 ${v.duration}s 동안 빠르게 출발해 길게 감속하게.`,
  snippet: {
    motion: (v) => `transition={{ duration: ${v.duration}, ease: [0.25, 1, 0.5, 1] }}`,
    gsap: (v) => `{ duration: ${v.duration}, ease: 'power3.out' }`
  }
} satisfies TechniqueMeta

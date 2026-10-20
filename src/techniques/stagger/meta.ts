import type { TechniqueMeta } from '../types'

export default {
  name: '스태거',
  english: 'stagger',
  meaning: '여러 요소의 시작을 일정 간격으로 어긋나게',
  section: 'timing',
  order: 50,
  param: '0.08s',
  motion: [
    '컴포넌트: 부모 variant transition: { delayChildren: stagger(0.08) }',
    'animate() 에서는 delay: stagger(0.08) · 역순 { from: \'last\' }',
    'staggerChildren 은 deprecated'
  ],
  gsap: [
    'stagger: 0.08',
    'stagger: { each: 0.08, from: \'center\', grid: \'auto\' } · each 와 amount 중 하나'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/stagger', gsap: 'https://gsap.com/resources/getting-started/Staggers' },
  params: [
    { key: 'gap', label: '간격', min: 0.02, max: 0.3, step: 0.01, default: 0.08, unit: 's' },
    { key: 'duration', label: '각 길이', min: 0.2, max: 1.2, step: 0.05, default: 0.5, unit: 's' }
  ],
  prompt: (v) => `스태거로 ${v.gap}s 간격을 두고, 하나씩 ${v.duration}s ease-out-quart로 아래에서 올라오게.`,
  snippet: {
    motion: (v) => `부모 variant transition: { delayChildren: stagger(${v.gap}) } · 자식 { duration: ${v.duration}, ease: [0.25, 1, 0.5, 1] }`,
    gsap: (v) => `gsap.from(items, { y: '110%', duration: ${v.duration}, ease: 'power3.out', stagger: ${v.gap} })`
  }
} satisfies TechniqueMeta

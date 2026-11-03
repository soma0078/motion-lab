import type { TechniqueMeta } from '../types'

export default {
  name: '스태거',
  english: 'stagger',
  meaning: '여러 요소의 시작을 일정 간격으로 어긋나게',
  section: 'timing',
  order: 50,
  param: '0.08s',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/stagger', gsap: 'https://gsap.com/resources/getting-started/Staggers' },
  params: [
    { key: 'gap', label: '간격', min: 0.02, max: 0.3, step: 0.01, default: 0.08, unit: 's', effect: '항목과 항목 사이의 시작 간격이에요. 작을수록 한꺼번에 쏟아지고, 클수록 하나씩 또렷하게 등장해요.' },
    { key: 'duration', label: '각 길이', min: 0.2, max: 1.2, step: 0.05, default: 0.5, unit: 's', effect: '항목 하나가 올라오는 시간이에요. 전체 길이는 간격 × (항목 수 − 1) + 각 길이예요.' }
  ],
  prompt: (v) => `스태거(stagger)로 항목마다 ${v.gap}s 간격을 두고, 하나씩 ${v.duration}s ease-out-quart로 아래에서 올라오게 해.`
} satisfies TechniqueMeta

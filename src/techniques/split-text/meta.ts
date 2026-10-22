import type { TechniqueMeta } from '../types'

export default {
  name: '텍스트 스플릿',
  english: 'split text',
  meaning: '글자 · 단어 · 줄 단위로 쪼개 하나씩 움직임',
  section: 'transition',
  order: 50,
  param: 'chars 0.06s',
  motion: [
    '직접 span 분리 + delayChildren: stagger()',
    'splitText 는 Motion+ 유료 (motion-plus)'
  ],
  gsap: [
    'SplitText.create(el, { type: \'words,chars\' })'
  ],
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-split-text', gsap: 'https://gsap.com/docs/v3/Plugins/SplitText/' },
  params: [
    { key: 'gap', label: '글자 간격', min: 0.02, max: 0.2, step: 0.01, default: 0.06, unit: 's' }
  ],
  prompt: (v) => `글자 단위로 쪼개 ${v.gap}s 스태거로, spring(stiffness 320, damping 18)으로 아래에서 튀어 오르게.`,
  snippet: {
    motion: (v) => `글자마다 span 분리 + { type: 'spring', stiffness: 320, damping: 18, delay: stagger(${v.gap}) }`,
    gsap: (v) => `SplitText.create(el, { type: 'words,chars' }) → gsap.from(split.chars, { yPercent: 110, ease: 'back.out(2)', stagger: ${v.gap} })`
  }
} satisfies TechniqueMeta

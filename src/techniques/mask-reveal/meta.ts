import type { TechniqueMeta } from '../types'

export default {
  name: '마스크 리빌',
  english: 'mask reveal',
  meaning: '틀 밖을 가린 채 열어 드러냄',
  section: 'transition',
  order: 40,
  param: '110% → 0',
  motion: [
    'overflow-hidden 틀 + y: \'110%\' → 0',
    'clipPath: \'inset(0 100% 0 0)\' → \'inset(0 0% 0 0)\''
  ],
  gsap: [
    'SplitText.create(el, { type: \'lines\', mask: \'lines\', autoSplit: true, onSplit })',
    'onSplit 에서 트윈을 return (리스플릿 때 진행도 유지)'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/docs/v3/Plugins/SplitText/' },
  params: [
    { key: 'duration', label: '길이', min: 0.4, max: 1.6, step: 0.05, default: 0.9, unit: 's' },
    { key: 'gap', label: '줄 간격', min: 0, max: 0.4, step: 0.02, default: 0.12, unit: 's' }
  ],
  prompt: (v) => `overflow: hidden 틀 아래 110%에서 줄마다 ${v.gap}s 스태거로 ${v.duration}s ease-out-quart로 올라오게. 투명도는 쓰지 않는다.`,
  snippet: {
    motion: (v) => `overflow-hidden 틀 + 줄 y: '110%' → 0, { duration: ${v.duration}, ease: [0.25, 1, 0.5, 1], delay: stagger(${v.gap}) }`,
    gsap: (v) => `SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: (s) => gsap.from(s.lines, { yPercent: 110, duration: ${v.duration}, ease: 'power3.out', stagger: ${v.gap} }) })`
  }
} satisfies TechniqueMeta

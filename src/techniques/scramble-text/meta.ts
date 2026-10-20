import type { TechniqueMeta } from '../types'

export default {
  name: '스크램블 텍스트',
  english: 'scramble text',
  meaning: '글자가 무작위 문자로 뒤섞이다 원래 글자로 맞춰짐',
  section: 'transition',
  order: 60,
  param: '1.4s linear',
  motion: [
    '무료 API 없음 → 직접 구현 (interval + 문자 치환)'
  ],
  gsap: [
    'scrambleText: { text, chars: \'upperCase\', revealDelay: 0.5, speed: 0.3 }'
  ],
  fit: 'gsap',
  docs: { gsap: 'https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/' },
  params: [
    { key: 'duration', label: '길이', min: 0.4, max: 3, step: 0.1, default: 1.4, unit: 's' }
  ],
  prompt: (v) => `글자가 무작위 문자로 뒤섞이다 앞에서부터 ${v.duration}s 동안 차례로 원래 글자로 확정되게.`,
  snippet: {
    motion: (v) => `progress 0 → 1 (${v.duration}s linear) 를 useTransform 으로 문자열 변환해 motion.span 자식으로`,
    gsap: (v) => `gsap.to(el, { duration: ${v.duration}, scrambleText: { text, chars: 'upperCase' } })`
  }
} satisfies TechniqueMeta

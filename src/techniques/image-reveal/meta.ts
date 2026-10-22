import type { TechniqueMeta } from '../types'

export default {
  name: '이미지 리빌',
  english: 'image reveal',
  meaning: '틀이 열리며 이미지가 드러나고, 안쪽 이미지는 확대에서 제자리로',
  section: 'transition',
  order: 100,
  param: 'clip + scale 1.3',
  motion: [
    '틀 clipPath: \'inset(100% 0% 0% 0%)\' → \'inset(0% 0% 0% 0%)\''
  ],
  gsap: [
    'tl.from(frame, { clipPath: \'inset(100% 0% 0% 0%)\' }).from(img, { scale: 1.3 }, \'<\')'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/' },
  params: [
    { key: 'scale', label: '시작 배율', min: 1, max: 1.8, step: 0.05, default: 1.3, unit: '×' },
    { key: 'duration', label: '길이', min: 0.4, max: 2, step: 0.05, default: 0.9, unit: 's' }
  ],
  prompt: (v) => `틀이 아래에서 위로 ${v.duration}s 동안 열리고, 안쪽 이미지는 ${v.scale}배에서 1배로 조금 더 길게 줄어들게.`,
  snippet: {
    motion: (v) => `틀 clipPath: 'inset(100% 0% 0% 0%)' → 'inset(0% 0% 0% 0%)' (${v.duration}s) · img scale: ${v.scale} → 1 (${(v.duration * 1.45).toFixed(2)}s)`,
    gsap: (v) => `tl.from(frame, { clipPath: 'inset(100% 0% 0% 0%)', duration: ${v.duration} }).from(img, { scale: ${v.scale}, duration: ${(v.duration * 1.45).toFixed(2)} }, '<')`
  }
} satisfies TechniqueMeta

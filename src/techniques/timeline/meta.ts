import type { TechniqueMeta } from '../types'

export default {
  name: '타임라인',
  english: 'timeline',
  meaning: '여러 모션을 한 줄에 놓고 겹침 · 순서를 정해 통째로 재생 · 되감기',
  section: 'timing',
  order: 60,
  param: 'at 0 · 0.35',
  motion: [
    'useAnimate() → animate([[a, …], [b, …, { at: \'<\' }]])',
    'at: 숫자 · \'+0.5\' · \'-0.2\' · \'<+0.2\' · 라벨'
  ],
  gsap: [
    'gsap.timeline({ defaults }) + 위치 \'<\' · \'>\' · \'-=0.2\' · \'<0.1\'',
    'tl.addLabel(\'in\') → \'in+=0.2\''
  ],
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/animate', gsap: 'https://gsap.com/docs/v3/GSAP/Timeline/' }
} satisfies TechniqueMeta

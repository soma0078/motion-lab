import type { TechniqueMeta } from '../types'

export default {
  name: '크로스페이드',
  english: 'crossfade',
  meaning: '앞 요소가 사라지는 동안 뒤 요소가 겹쳐 나타남',
  section: 'transition',
  order: 30,
  param: '0.7s',
  motion: [
    '<AnimatePresence> 기본 mode=\'sync\' + absolute 겹치기'
  ],
  gsap: [
    'tl.to(a, { autoAlpha: 0 }).to(b, { autoAlpha: 1 }, \'<\')'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animate-presence', gsap: 'https://gsap.com/docs/v3/Plugins/Flip/' }
} satisfies TechniqueMeta

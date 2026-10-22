import type { TechniqueMeta } from '../types'

export default {
  name: '진입 · 퇴장',
  english: 'enter · exit',
  meaning: '요소가 나타날 때 · 사라질 때의 모션',
  section: 'transition',
  order: 20,
  param: 'in 0.4 · out 0.25',
  motion: [
    '<AnimatePresence> + 자식 key + exit'
  ],
  gsap: [
    'useGSAP 는 언마운트 시 revert 만 → 퇴장 트윈 onComplete 에서 setState'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-animate-presence', gsap: 'https://gsap.com/resources/React/' },
  params: [
    { key: 'enter', label: '진입', min: 0.1, max: 1, step: 0.05, default: 0.4, unit: 's' },
    { key: 'exit', label: '퇴장', min: 0.1, max: 1, step: 0.05, default: 0.25, unit: 's' }
  ],
  prompt: (v) => `토스트가 아래 24px에서 ${v.enter}s ease-out-quart로 올라오며 나타나고, 사라질 때는 ${v.exit}s ease-in으로 위로 빠지게. 퇴장은 진입보다 짧게.`,
  snippet: {
    motion: (v) => `<AnimatePresence> + initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: ${v.enter} } }} exit={{ y: -12, opacity: 0, transition: { duration: ${v.exit} } }}`,
    gsap: (v) => `진입 gsap.from(el, { y: 24, autoAlpha: 0, duration: ${v.enter} }) · 퇴장 gsap.to(el, { y: -12, autoAlpha: 0, duration: ${v.exit}, onComplete: unmount })`
  }
} satisfies TechniqueMeta

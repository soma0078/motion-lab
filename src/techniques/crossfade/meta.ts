import type { TechniqueMeta } from '../types'

export default {
  name: '크로스페이드',
  english: 'crossfade',
  meaning: '앞 요소가 사라지는 동안 뒤 요소가 겹쳐 나타남',
  section: 'transition',
  order: 30,
  param: '0.7s',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animate-presence', gsap: 'https://gsap.com/docs/v3/Plugins/Flip/' },
  prompt: () => '크로스페이드(crossfade)로 앞 요소가 0.7s 동안 사라지는 사이 뒤 요소가 같은 자리에 겹쳐 나타나게 해.'
} satisfies TechniqueMeta

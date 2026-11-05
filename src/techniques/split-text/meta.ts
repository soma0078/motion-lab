import type { TechniqueMeta } from '../types'

export default {
  name: '텍스트 스플릿',
  english: 'split text',
  meaning: '글자 · 단어 · 줄 단위로 쪼개 하나씩 움직임',
  tags: ['한 글자씩', '튀어 오르는', '차례로 나오는'],
  section: 'transition',
  order: 50,
  param: 'chars 0.06s',
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/react-split-text', gsap: 'https://gsap.com/docs/v3/Plugins/SplitText/' },
  params: [
    { key: 'gap', label: '글자 간격', min: 0.02, max: 0.2, step: 0.01, default: 0.06, unit: 's', effect: '글자와 글자 사이의 시작 간격이에요. 작을수록 단어가 한꺼번에 튀어 오르고, 클수록 한 글자씩 또렷해져요.' }
  ],
  prompt: (v) => `텍스트 스플릿(split text)으로 글자 단위로 쪼개고, ${v.gap}s 스태거와 스프링(stiffness 320, damping 18)으로 아래에서 튀어 오르게 해.`
} satisfies TechniqueMeta

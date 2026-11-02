import type { TechniqueMeta } from '../types'

export default {
  name: '마그네틱',
  english: 'magnetic',
  meaning: '커서 쪽으로 끌려옴',
  section: 'interaction',
  order: 30,
  param: '35%',
  motion: [
    'useMotionValue + useSpring(src, { stiffness, damping })'
  ],
  gsap: [
    'const xTo = gsap.quickTo(el, \'x\', { duration: 0.4, ease: \'power3\' })'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-use-spring', gsap: 'https://gsap.com/docs/v3/GSAP/gsap.quickTo()' },
  params: [
    { key: 'range', label: '범위', min: 40, max: 140, step: 5, default: 90, unit: 'px', effect: '버튼이 반응하기 시작하는 커서 거리예요. 클수록 멀리서부터 끌려와요.' },
    { key: 'pull', label: '끌림', min: 0.1, max: 0.8, step: 0.05, default: 0.35, effect: '커서 쪽으로 따라가는 비율이에요. 0.35면 커서 거리의 35%만큼 움직이고, 클수록 더 많이 따라와요.' },
    { key: 'stiffness', label: 'stiffness', min: 50, max: 500, step: 10, default: 220, effect: '따라가고 돌아오는 힘이에요. 클수록 빠르고 바짝 붙어요.' },
    { key: 'damping', label: 'damping', min: 4, max: 40, step: 1, default: 12, effect: '출렁임을 줄이는 힘이에요. 낮으면 제자리로 돌아올 때 흔들려요.' }
  ],
  prompt: (v) => `마그네틱(magnetic) 효과로 커서가 ${v.range}px 안에 들어오면 버튼이 커서 거리의 ${Math.round(v.pull * 100)}%만큼 끌려오게 해. 따라오고 돌아올 때는 스프링(stiffness ${v.stiffness}, damping ${v.damping})으로 움직이게 해.`
} satisfies TechniqueMeta

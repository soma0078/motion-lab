import type { TechniqueMeta } from '../types'

export default {
  name: '커스텀 커서',
  english: 'custom cursor',
  meaning: '기본 커서 대신 따라다니는 원. 올린 요소에 따라 모양이 바뀜',
  section: 'interaction',
  order: 70,
  param: '300 / 28',
  motion: [
    'useMotionValue(clientX) + useSpring · pointer-events: none',
    'Cursor 컴포넌트는 Motion+ 유료'
  ],
  gsap: [
    'gsap.quickTo(cursor, \'x\', { duration: 0.6, ease: \'power3\' }) + mousemove'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-use-spring', gsap: 'https://gsap.com/docs/v3/GSAP/gsap.quickTo()' },
  params: [
    { key: 'stiffness', label: 'stiffness', min: 50, max: 800, step: 10, default: 300, effect: '원이 커서를 쫓아가는 힘이에요. 클수록 바짝 붙어 따라오고, 작을수록 느슨하게 뒤처져요.' },
    { key: 'damping', label: 'damping', min: 5, max: 50, step: 1, default: 28, effect: '따라붙을 때의 출렁임을 줄이는 힘이에요. 낮으면 커서를 지나쳤다 돌아오고, 높으면 출렁임 없이 멈춰요.' }
  ],
  prompt: (v) => `커스텀 커서(custom cursor)로 기본 커서 대신 점과 원을 그리고, 원은 스프링(stiffness ${v.stiffness}, damping ${v.damping})으로 한 박자 늦게 따라오게 해. 링크 위에서는 원이 커지게 해.`
} satisfies TechniqueMeta

import type { TechniqueMeta } from '../types'

export default {
  name: '스프링',
  english: 'spring',
  meaning: '시간 대신 stiffness · damping 같은 물리값으로 움직임',
  section: 'timing',
  order: 20,
  param: '220 / 8',
  motion: [
    'type: \'spring\', stiffness, damping, mass',
    '또는 visualDuration: 0.4, bounce: 0.25 (stiffness 주면 무시)'
  ],
  gsap: [
    '진짜 스프링 없음 → \'elastic.out(1, 0.3)\' 근사'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-transitions', gsap: 'https://gsap.com/docs/v3/Eases/CustomBounce' },
  params: [
    { key: 'stiffness', label: 'stiffness', min: 50, max: 600, step: 10, default: 220 },
    { key: 'damping', label: 'damping', min: 2, max: 40, step: 1, default: 8 }
  ],
  prompt: (v) => `스프링(stiffness ${v.stiffness}, damping ${v.damping}, mass 0.6)으로 출렁이며 제자리로 돌아오게.`,
  snippet: {
    motion: (v) => `transition={{ type: 'spring', stiffness: ${v.stiffness}, damping: ${v.damping}, mass: 0.6 }}`,
    gsap: () => `물리 스프링 없음 → ease: 'elastic.out(1, 0.3)' 로 근사하고 눈으로 맞춤`
  }
} satisfies TechniqueMeta

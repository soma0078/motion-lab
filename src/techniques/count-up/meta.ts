import type { TechniqueMeta } from '../types'

export default {
  name: '숫자 카운트업',
  english: 'count up',
  meaning: '숫자가 목표값까지 올라감',
  section: 'transition',
  order: 70,
  param: '0 → 1284',
  motion: [
    'animate(motionValue, 1000) + useTransform(Math.round)',
    'AnimateNumber 는 Motion+ 유료'
  ],
  gsap: [
    'const o = { v: 0 }; gsap.to(o, { v: 1000, onUpdate: () => el.textContent = Math.round(o.v).toLocaleString() })'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animate-number', gsap: 'https://gsap.com/docs/v3/GSAP/CorePlugins/Snap' },
  params: [
    { key: 'duration', label: '길이', min: 0.4, max: 3, step: 0.1, default: 1.6, unit: 's', effect: '숫자가 목표값까지 올라가는 시간이에요. 길수록 끝에서 천천히 감속하는 구간도 길어져요.' }
  ],
  prompt: (v) => `숫자 카운트업(count up)으로 숫자가 0에서 목표값까지 ${v.duration}s 동안 ease-out-quart로 올라가 끝에서 감속하게 해. 정수로 표시하고 천 단위마다 콤마를 표시해.`
} satisfies TechniqueMeta

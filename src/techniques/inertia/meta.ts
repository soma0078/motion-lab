import type { TechniqueMeta } from '../types'

export default {
  name: '관성',
  english: 'inertia (fling)',
  meaning: '던지면 속도를 이어받아 미끄러지다 감속해 멈춤',
  tags: ['던지는', '미끄러지는', '점점 느려지는'],
  section: 'interaction',
  order: 80,
  param: 'power 0.8 · 350ms',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-drag', gsap: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/' },
  params: [
    { key: 'power', label: 'power', min: 0.2, max: 1.5, step: 0.05, default: 0.8, effect: '던진 속도를 미끄러지는 거리로 바꾸는 비율이에요. 클수록 같은 세기로 던져도 더 멀리 가요.' },
    { key: 'timeConstant', label: 'timeConstant', min: 100, max: 900, step: 25, default: 350, unit: 'ms', effect: '감속이 이어지는 시간이에요. 클수록 천천히 멈추며 오래 미끄러지고, 작을수록 금방 멈춰요.' }
  ],
  prompt: (v) => `관성(inertia)으로 던진 속도를 이어받아 미끄러지다 감속해 멈추게 하고, 값은 power ${v.power}, timeConstant ${v.timeConstant}ms로 해. 벽에 닿으면 튕겨 돌아오게 해.`
} satisfies TechniqueMeta

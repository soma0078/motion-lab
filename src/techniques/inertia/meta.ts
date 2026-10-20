import type { TechniqueMeta } from '../types'

export default {
  name: '관성',
  english: 'inertia (fling)',
  meaning: '던지면 속도를 이어받아 미끄러지다 감속해 멈춤',
  section: 'interaction',
  order: 80,
  param: 'power 0.8 · 350ms',
  motion: [
    'drag 기본 관성 (끄기 dragMomentum={false}) · dragTransition: { power, timeConstant }',
    'animate(x, 0, { type: \'inertia\', velocity, min, max }) · 기본 power 0.8 · timeConstant 700'
  ],
  gsap: [
    'gsap.registerPlugin(Draggable, InertiaPlugin) → Draggable.create(el, { inertia: true, snap })',
    '트윈: InertiaPlugin.track(el, \'x\') 후 inertia: { x: \'auto\' }'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-drag', gsap: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/' },
  params: [
    { key: 'power', label: 'power', min: 0.2, max: 1.5, step: 0.05, default: 0.8 },
    { key: 'timeConstant', label: 'timeConstant', min: 100, max: 900, step: 25, default: 350, unit: 'ms' }
  ],
  prompt: (v) => `던지면 속도를 이어받아 미끄러지다 감속해 멈추게 (power ${v.power}, timeConstant ${v.timeConstant}ms). 벽에 닿으면 튕겨 돌아옴.`,
  snippet: {
    motion: (v) => `drag dragTransition={{ power: ${v.power}, timeConstant: ${v.timeConstant} }}`,
    gsap: () => `Draggable.create(el, { inertia: true, bounds, throwResistance: 1000 }) · 감속 방식이 달라 power · timeConstant 와 1:1 대응 안 됨 → 눈으로 맞춤`
  }
} satisfies TechniqueMeta

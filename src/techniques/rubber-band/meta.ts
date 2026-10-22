import type { TechniqueMeta } from '../types'

export default {
  name: '러버밴드',
  english: 'rubber band',
  meaning: '끝을 넘겨 끌면 저항하다 놓으면 되돌아옴',
  section: 'interaction',
  order: 40,
  param: 'elastic 0.35',
  motion: [
    'drag + dragConstraints + dragElastic (0~1)'
  ],
  gsap: [
    'Draggable.create(el, { bounds, edgeResistance: 0.65, inertia: true })'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-drag', gsap: 'https://gsap.com/docs/v3/Plugins/Draggable/' },
  params: [
    { key: 'elastic', label: '따라옴', min: 0.05, max: 1, step: 0.05, default: 0.35 },
    { key: 'damping', label: '복귀 damping', min: 5, max: 40, step: 1, default: 14 }
  ],
  prompt: (v) => `끌 범위를 넘겨 끌면 거리의 ${Math.round(v.elastic * 100)}%만 따라오며 저항하고, 놓으면 bounce(stiffness 400, damping ${v.damping})로 되돌아오게.`,
  snippet: {
    motion: (v) => `drag dragConstraints={{ left: 0, right: 0 }} dragElastic={${v.elastic}} dragTransition={{ bounceStiffness: 400, bounceDamping: ${v.damping} }}`,
    gsap: (v) => `Draggable.create(el, { bounds, edgeResistance: ${(1 - v.elastic).toFixed(2)}, inertia: true }) (근사)`
  }
} satisfies TechniqueMeta

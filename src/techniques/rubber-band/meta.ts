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
    { key: 'elastic', label: '따라옴', min: 0.05, max: 1, step: 0.05, default: 0.35, effect: '범위를 넘겨 끌 때 따라오는 비율이에요. 작을수록 강하게 저항하고, 1이면 저항 없이 그대로 따라와요.' },
    { key: 'damping', label: '복귀 damping', min: 5, max: 40, step: 1, default: 14, effect: '놓은 뒤 제자리로 돌아올 때 출렁임을 줄이는 힘이에요. 낮으면 돌아오며 흔들려요.' }
  ],
  prompt: (v) => `러버밴드(rubber band)로 끌 범위를 넘겨 끌면 거리의 ${Math.round(v.elastic * 100)}%만 따라오며 저항하게 하고, 놓으면 bounce(stiffness 400, damping ${v.damping})로 되돌아오게 해.`
} satisfies TechniqueMeta

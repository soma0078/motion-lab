import type { TechniqueMeta } from '../types'

export default {
  name: '3D 틸트 · 플립',
  english: '3D tilt · flip',
  meaning: 'perspective 로 카드가 커서 쪽으로 기울거나 뒤집힘',
  section: 'interaction',
  order: 60,
  param: '±18° · perspective 500',
  motion: [
    'style={{ rotateX, rotateY, transformPerspective: 500 }}',
    '플립 rotateY: 180 + backfaceVisibility: \'hidden\''
  ],
  gsap: [
    'gsap.to(el, { rotationY: 180 }) (rotateY 별칭도 동작)',
    '공통 소실점 gsap.set(parent, { perspective: 500 }) · 개별 transformPerspective'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/' },
  params: [
    { key: 'angle', label: '최대 기울기', min: 5, max: 35, step: 1, default: 18, unit: '°' },
    { key: 'perspective', label: 'perspective', min: 200, max: 1200, step: 50, default: 500, unit: 'px' }
  ],
  prompt: (v) => `카드가 커서 쪽으로 최대 ${v.angle}°까지 기울게 (perspective ${v.perspective}px, spring으로 따라옴). 클릭하면 rotateY 180°로 뒤집힘.`,
  snippet: {
    motion: (v) => `style={{ rotateX, rotateY, transformPerspective: ${v.perspective} }} · useTransform(pointer, [-1, 1], [-${v.angle}, ${v.angle}])`,
    gsap: (v) => `gsap.set(parent, { perspective: ${v.perspective} }) · gsap.to(card, { rotationY: dx * ${v.angle}, rotationX: -dy * ${v.angle} })`
  }
} satisfies TechniqueMeta

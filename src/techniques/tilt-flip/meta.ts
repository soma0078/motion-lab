import type { TechniqueMeta } from '../types'

export default {
  name: '3D 틸트 · 플립',
  english: '3D tilt · flip',
  meaning: 'perspective 로 카드가 커서 쪽으로 기울거나 뒤집힘',
  section: 'interaction',
  order: 60,
  param: '±18° · perspective 500',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/' },
  params: [
    { key: 'angle', label: '최대 기울기', min: 5, max: 35, step: 1, default: 18, unit: '°', effect: '커서를 따라 기울어지는 최대 각도예요. 클수록 입체감이 커지지만 카드 내용을 읽기 어려워져요.' },
    { key: 'perspective', label: 'perspective', min: 200, max: 1200, step: 50, default: 500, unit: 'px', effect: '보는 사람과 카드 사이의 거리예요. 작을수록 원근이 강해 기울기가 과장되고, 클수록 평평해 보여요.' }
  ],
  prompt: (v) => `3D 틸트 · 플립(3D tilt · flip)으로 카드가 perspective ${v.perspective}px에서 커서 쪽으로 최대 ${v.angle}°까지 기울며 스프링으로 따라오게 해. 클릭하면 rotateY 180°로 뒤집히게 해.`
} satisfies TechniqueMeta

import type { TechniqueMeta } from '../types'

export default {
  name: '마스크 리빌',
  english: 'mask reveal',
  meaning: '틀 밖을 가린 채 열어 드러냄',
  tags: ['스르륵 올라오는', '가려졌다 드러나는'],
  section: 'transition',
  order: 40,
  param: '110% → 0',
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/docs/v3/Plugins/SplitText/' },
  params: [
    { key: 'duration', label: '길이', min: 0.4, max: 1.6, step: 0.05, default: 0.9, unit: 's', effect: '줄 하나가 틀 아래에서 올라오는 시간이에요.' },
    { key: 'gap', label: '줄 간격', min: 0, max: 0.4, step: 0.02, default: 0.12, unit: 's', effect: '줄과 줄 사이의 시작 간격이에요. 0이면 모든 줄이 한꺼번에, 클수록 한 줄씩 차례로 올라와요.' }
  ],
  prompt: (v) => `마스크 리빌(mask reveal)로 overflow: hidden 틀 아래 110%에서 줄마다 ${v.gap}s 스태거를 두고 ${v.duration}s ease-out-quart로 올라오게 해. 투명도는 바꾸지 않게 해.`
} satisfies TechniqueMeta

import type { TechniqueMeta } from '../types'

export default {
  name: '이미지 리빌',
  english: 'image reveal',
  meaning: '틀이 열리며 이미지가 드러나고, 안쪽 이미지는 확대에서 제자리로',
  section: 'transition',
  order: 100,
  param: 'clip + scale 1.3',
  motion: [
    '틀 clipPath: \'inset(100% 0% 0% 0%)\' → \'inset(0% 0% 0% 0%)\''
  ],
  gsap: [
    'tl.from(frame, { clipPath: \'inset(100% 0% 0% 0%)\' }).from(img, { scale: 1.3 }, \'<\')'
  ],
  fit: 'both',
  docs: { motion: 'https://motion.dev/docs/react-animation', gsap: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/' },
  params: [
    { key: 'scale', label: '시작 배율', min: 1, max: 1.8, step: 0.05, default: 1.3, unit: '×', effect: '안쪽 이미지가 처음에 확대된 정도예요. 클수록 틀이 열리며 줄어드는 움직임이 커지고, 1×면 확대 없이 틀만 열려요.' },
    { key: 'duration', label: '길이', min: 0.4, max: 2, step: 0.05, default: 0.9, unit: 's', effect: '틀이 다 열리는 시간이에요. 안쪽 이미지는 이보다 조금 더 길게 줄어들어요.' }
  ],
  prompt: (v) => `이미지 리빌(image reveal)로 틀이 아래에서 위로 ${v.duration}s 동안 열리게 하고, 안쪽 이미지는 ${v.scale}배에서 1배로 조금 더 길게 줄어들게 해.`
} satisfies TechniqueMeta

import type { TechniqueMeta } from '../types'

export default {
  name: '누르기 피드백',
  english: 'press feedback',
  meaning: '누르는 동안 살짝 줄어들었다가 놓으면 스프링으로 돌아와, 눌렸다는 걸 손끝으로 알려 줌',
  section: 'app',
  order: 50,
  param: 'scale 0.96',
  rn: [
    '<Pressable onPressIn={() => (s.value = withSpring(0.96))} onPressOut={() => (s.value = withSpring(1))} />'
  ],
  fit: 'rn',
  docs: { rn: 'https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/' },
  params: [{ key: 'scale', label: '눌렸을 때', min: 0.85, max: 0.99, step: 0.01, default: 0.96 }],
  prompt: (v) => `누르는 동안 ${v.scale}배로 줄어들고, 놓으면 스프링(stiffness 400, damping 12)으로 1배로 돌아오게.`,
  snippet: {
    rn: (v) =>
      `onPressIn={() => (s.value = withSpring(${v.scale}))} onPressOut={() => (s.value = withSpring(1, { stiffness: 400, damping: 12 }))}`
  }
} satisfies TechniqueMeta

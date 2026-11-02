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
  params: [{ key: 'scale', label: '눌렸을 때', min: 0.85, max: 0.99, step: 0.01, default: 0.96, effect: '누르는 동안 줄어드는 크기예요. 0.96이면 96%로 줄고, 작을수록 눌린 느낌이 강하지만 너무 작으면 과해 보여요.' }],
  prompt: (v) => `누르기 피드백(press feedback)으로 누르는 동안 ${v.scale}배로 줄어들게 하고, 놓으면 스프링(stiffness 400, damping 12)으로 1배로 돌아오게 해.`
} satisfies TechniqueMeta

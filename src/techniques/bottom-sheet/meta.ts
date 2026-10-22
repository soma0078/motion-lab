import type { TechniqueMeta } from '../types'

export default {
  name: '바텀시트 스냅',
  english: 'bottom sheet snap',
  meaning: '아래에서 올라온 시트를 끌다 놓으면 가장 가까운 높이(peek · half · full)로 붙음',
  section: 'app',
  order: 20,
  param: '80 / 500',
  rn: [
    '<BottomSheet snapPoints={[\'25%\', \'50%\', \'90%\']} enableDynamicSizing={false} />',
    'animationConfigs={useBottomSheetSpringConfigs({ damping: 80, stiffness: 500 })}'
  ],
  fit: 'rn',
  docs: { rn: 'https://gorhom.dev/react-native-bottom-sheet/props' },
  params: [
    { key: 'damping', label: 'damping', min: 20, max: 120, step: 5, default: 80 },
    { key: 'stiffness', label: 'stiffness', min: 100, max: 800, step: 50, default: 500 }
  ],
  prompt: (v) =>
    `바텀시트를 25% · 50% · 90% 높이에 스냅시키고, 끌다 놓으면 가장 가까운 지점에 스프링(damping ${v.damping}, stiffness ${v.stiffness}, 넘치지 않게)으로 붙게.`,
  snippet: {
    rn: (v) =>
      `<BottomSheet snapPoints={['25%', '50%', '90%']} enableDynamicSizing={false} animationConfigs={useBottomSheetSpringConfigs({ damping: ${v.damping}, stiffness: ${v.stiffness}, overshootClamping: true })} />`
  }
} satisfies TechniqueMeta

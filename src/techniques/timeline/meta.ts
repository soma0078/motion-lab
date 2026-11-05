import type { TechniqueMeta } from '../types'

export default {
  name: '타임라인',
  english: 'timeline',
  meaning: '여러 모션을 한 줄에 놓고 겹침 · 순서를 정해 통째로 재생 · 되감기',
  tags: ['순서대로 이어지는', '겹쳐 재생되는', '되감는'],
  section: 'timing',
  order: 60,
  param: 'at 0 · 0.35',
  fit: 'gsap',
  docs: { motion: 'https://motion.dev/docs/animate', gsap: 'https://gsap.com/docs/v3/GSAP/Timeline/' },
  prompt: () => '타임라인(timeline)으로 여러 모션을 한 줄에 놓고 0s · 0.35s처럼 시작 시점을 정해 겹치거나 순서대로 재생하게 해. 통째로 재생하고 되감을 수 있게 해.'
} satisfies TechniqueMeta

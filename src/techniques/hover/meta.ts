import type { TechniqueMeta } from '../types'

export default {
  name: '호버',
  english: 'hover',
  meaning: '포인터가 올라가 있는 동안',
  section: 'interaction',
  order: 10,
  param: '0.15s',
  motion: [
    'whileHover · onHoverStart / onHoverEnd'
  ],
  gsap: [
    'const { contextSafe } = useGSAP({ scope })',
    'onMouseEnter={contextSafe(() => gsap.to(…))}'
  ],
  fit: 'motion',
  docs: { motion: 'https://motion.dev/docs/react-gestures', gsap: 'https://gsap.com/resources/React/' }
} satisfies TechniqueMeta

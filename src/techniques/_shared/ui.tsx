import { MousePointer2 } from 'lucide-react'

import { cn } from '../../lib/utils'

/** 커서 아이콘. 위치는 부모가 x · y로 옮김 */
export const Cursor = () => (
  <MousePointer2 className="size-5 fill-white" strokeWidth={2.5} />
)

/** 페이드 · 크로스페이드에 쓰는 작은 카드 */
export const MiniCard = ({
  label,
  className
}: {
  label: string
  className: string
}) => (
  <div
    className={cn(
      'shadow-nb-sm absolute inset-0 border-2 border-black p-2.5',
      className
    )}
  >
    <span className="font-extrabold">{label}</span>
    <div className="mt-2 h-1.5 w-3/4 bg-black" />
    <div className="mt-1.5 h-1.5 w-1/2 bg-black" />
  </div>
)

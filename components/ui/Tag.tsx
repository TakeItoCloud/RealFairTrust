// Tag — quiet outline chip for metadata (§2.13): specialities, zones, deal type.
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TagProps {
  /** Set true on the ivory light section. */
  onIvory?: boolean
  children?: ReactNode
  className?: string
}

export function Tag({ onIvory = false, children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-sm)] border px-2 py-0.5 text-[12.5px] font-medium',
        onIvory ? 'border-line-lt text-ink-on-light/80' : 'border-line text-cream-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

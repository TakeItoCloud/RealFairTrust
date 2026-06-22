// StatBlock — a single performance metric (§2.13): the building block of agent / rating
// surfaces. Value in Fraunces 30px; `gold` clips the bright title gradient; `delta` renders
// verified-green when positive, muted when negative. Supersedes StatTile (which is retained
// until its consumers migrate).
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface StatBlockProps {
  value: ReactNode
  label: string
  /** Signed delta, e.g. "+4%". Positive (no leading "-") renders verified-green. */
  delta?: string
  /** Render the value in the bright gold title gradient (use for the headline metric). */
  gold?: boolean
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function StatBlock({ value, label, delta, gold = false, align = 'start', className }: StatBlockProps) {
  const positive = delta ? !delta.trim().startsWith('-') : false
  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        align === 'center' && 'items-center text-center',
        align === 'end' && 'items-end text-right',
        className,
      )}
    >
      <span className={cn('font-display text-[30px] font-semibold leading-none', gold ? 'gold-title' : 'text-cream')}>
        {value}
      </span>
      <span className="flex items-center gap-1.5 text-meta text-cream-muted">
        {label}
        {delta ? (
          <span className={cn('font-medium', positive ? 'text-verified' : 'text-cream-muted')}>{delta}</span>
        ) : null}
      </span>
    </div>
  )
}

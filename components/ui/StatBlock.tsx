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
  /** md (default) = 30px headline metric · sm = 18px in-card stat (zip AgentCard stats row). */
  size?: 'sm' | 'md'
  className?: string
}

export function StatBlock({ value, label, delta, gold = false, align = 'start', size = 'md', className }: StatBlockProps) {
  const positive = delta ? !delta.trim().startsWith('-') : false
  return (
    <div
      className={cn(
        'flex flex-col',
        size === 'sm' ? 'gap-0.5' : 'gap-1',
        align === 'center' && 'items-center text-center',
        align === 'end' && 'items-end text-right',
        className,
      )}
    >
      <span
        className={cn(
          'font-display font-semibold leading-none',
          size === 'sm' ? 'text-[18px]' : 'text-[30px]',
          gold ? 'gold-title' : 'text-cream',
        )}
      >
        {value}
      </span>
      <span className={cn('flex items-center gap-1.5 text-cream-muted', size === 'sm' ? 'text-xs' : 'text-meta')}>
        {label}
        {delta ? (
          <span className={cn('font-medium', positive ? 'text-verified-strong' : 'text-cream-muted')}>{delta}</span>
        ) : null}
      </span>
    </div>
  )
}

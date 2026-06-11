// PerformanceBadge — a styling primitive for the headline performance signal.
// Per Decision #18 the numeric composite is hidden until the sample is fair, so the
// consumer chooses the variant; this component only owns the look + the translated label.
import { cn } from '@/lib/cn'
import { IconTrophy } from './icons'

type PerformanceVariant = 'top' | 'building' | 'score'

interface PerformanceBadgeProps {
  variant: PerformanceVariant
  /** Translated label (e.g. "Top this month", "Building track record"). */
  label: string
  /** Composite score 0–100 — only shown for the 'score' variant. */
  value?: number
  tone?: 'dark' | 'light'
  className?: string
}

export function PerformanceBadge({
  variant,
  label,
  value,
  tone = 'dark',
  className,
}: PerformanceBadgeProps) {
  const basePill = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium'

  if (variant === 'top') {
    return (
      <span className={cn(basePill, 'bg-gold text-ink', className)}>
        <IconTrophy className="text-[1.05em]" />
        {label}
      </span>
    )
  }

  if (variant === 'building') {
    return (
      <span
        className={cn(
          basePill,
          tone === 'dark'
            ? 'border border-line bg-surface text-cream-muted'
            : 'border border-line-lt bg-surface-lt text-ink-on-light/70',
          className,
        )}
      >
        {label}
      </span>
    )
  }

  // 'score' — number revealed once confidence is high enough.
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-1',
        tone === 'dark' ? 'text-cream' : 'text-ink-on-light',
        className,
      )}
    >
      <span className="font-display text-2xl leading-none text-gold">{value ?? '—'}</span>
      <span className={cn('text-xs', tone === 'dark' ? 'text-cream-muted' : 'text-ink-on-light/60')}>/100</span>
      <span className="sr-only">{label}</span>
    </span>
  )
}

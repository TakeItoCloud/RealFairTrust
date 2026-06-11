// RankIndicator — the consultant's position on the ranked board this month.
// Top-3 get the gold treatment; everyone else a quiet outline. Decorative number is
// announced via aria-label so screen readers get "Rank 3" rather than just "#3".
import { cn } from '@/lib/cn'

interface RankIndicatorProps {
  rank: number
  /** Accessible prefix, e.g. t('score.rank') → "Rank". */
  label: string
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md'
  className?: string
}

export function RankIndicator({ rank, label, tone = 'dark', size = 'md', className }: RankIndicatorProps) {
  const isTop = rank <= 3
  const dims = size === 'sm' ? 'h-7 min-w-7 text-xs' : 'h-9 min-w-9 text-sm'

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-2 font-display font-semibold tabular-nums',
        isTop
          ? 'bg-gold text-ink'
          : tone === 'dark'
            ? 'border border-line bg-ink-elev text-cream'
            : 'border border-line-lt bg-surface-lt text-ink-on-light',
        dims,
        className,
      )}
      aria-label={`${label} ${rank}`}
    >
      <span aria-hidden>#{rank}</span>
    </span>
  )
}

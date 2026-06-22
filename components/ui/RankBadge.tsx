// RankBadge — the merit-ranking position coin (§2.13). Ranks 1–3 render in the bright gold
// title gradient on a dark plate with a gold glow; 4+ are quiet/neutral, no glow. Supersedes
// RankIndicator + ConsultantCard's hand-rolled coin (the card's coin migrates in Step 4).
import { cn } from '@/lib/cn'

interface RankBadgeProps {
  rank: number
  /** Accessible prefix, e.g. t('score.rank') → "Rank". */
  label: string
  /** Coin size in px (default 40). */
  size?: number
  className?: string
}

export function RankBadge({ rank, label, size = 40, className }: RankBadgeProps) {
  const top = rank <= 3
  return (
    <span
      role="img"
      aria-label={`${label} ${rank}`}
      style={{ width: size, height: size, boxShadow: top ? 'var(--shadow-gold-glow)' : undefined }}
      className={cn(
        'inline-grid shrink-0 place-items-center rounded-[var(--radius-md)] border font-display font-semibold tabular-nums',
        top ? 'border-[var(--gold-border)] bg-[var(--surface-card-solid)]' : 'border-line bg-[var(--surface-card-solid)] text-cream-muted',
        className,
      )}
    >
      <span aria-hidden className={cn('leading-none', top && 'gold-title')} style={{ fontSize: Math.round(size * 0.4) }}>
        {rank}
      </span>
    </span>
  )
}

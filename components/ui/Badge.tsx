// Badge — unified status chip (§2.13). gold = merit/standing · rising = Rising Talent ·
// success = verified/success (#34) · neutral = quiet metadata. Pill, 12px/600. Unifies
// PerformanceBadge (pill variants) + RisingTalentTag for NON-CARD use; card-internal usages
// migrate in Step 4.
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeVariant = 'gold' | 'rising' | 'success' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  iconLeft?: ReactNode
  /** Set on the ivory light section so colours stay legible (uses the AA on-light inks). */
  onIvory?: boolean
  children?: ReactNode
  className?: string
}

function variantClasses(variant: BadgeVariant, onIvory: boolean): string {
  switch (variant) {
    case 'gold':
      return cn('bg-[var(--gold-tint)] border border-[var(--gold-border)]', onIvory ? 'text-gold-deep' : 'text-gold')
    case 'rising':
      return onIvory
        ? 'border border-gold-deep/30 bg-gold-deep/10 text-gold-deep'
        : 'border border-gold/40 bg-gold/10 text-gold'
    case 'success':
      return cn(
        'bg-[var(--green-tint)] border border-[var(--green-border)]',
        onIvory ? 'text-verified-ink' : 'text-verified',
      )
    case 'neutral':
      return onIvory
        ? 'border border-line-lt bg-surface-lt text-ink-on-light/70'
        : 'border border-line bg-surface text-cream-muted'
  }
}

export function Badge({ variant = 'neutral', iconLeft, onIvory = false, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none',
        variantClasses(variant, onIvory),
        className,
      )}
    >
      {iconLeft ? <span className="text-[1.05em]" aria-hidden>{iconLeft}</span> : null}
      {children}
    </span>
  )
}

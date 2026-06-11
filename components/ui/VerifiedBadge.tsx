// VerifiedBadge — the in-product "Verified" mark (Concept B seal lineage).
// Uses the verified-green token only (Decision #34). Label is passed in for i18n.
import { cn } from '@/lib/cn'
import { IconVerified } from './icons'

interface VerifiedBadgeProps {
  /** Translated label, e.g. t('score.verified'). Required for the labelled variant. */
  label?: string
  /** Icon-only (no text) — still exposes the label via aria-label. */
  iconOnly?: boolean
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md'
  className?: string
}

export function VerifiedBadge({
  label,
  iconOnly = false,
  tone = 'dark',
  size = 'md',
  className,
}: VerifiedBadgeProps) {
  const text = tone === 'dark' ? 'text-verified' : 'text-verified-ink'
  const sizing = size === 'sm' ? 'text-xs gap-1 px-2 py-0.5' : 'text-sm gap-1.5 px-2.5 py-1'

  if (iconOnly) {
    return (
      <span
        className={cn('inline-flex items-center justify-center', text, className)}
        role="img"
        aria-label={label}
        title={label}
      >
        <IconVerified className={size === 'sm' ? 'text-base' : 'text-lg'} />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-verified/12 font-medium',
        text,
        sizing,
        className,
      )}
    >
      <IconVerified className="text-[1.1em]" />
      {label}
    </span>
  )
}

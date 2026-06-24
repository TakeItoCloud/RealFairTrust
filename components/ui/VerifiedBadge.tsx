// VerifiedBadge — the in-product "Verified" mark (Concept B seal lineage, #12),
// verification-only (#34). Two forms:
//  • pill  — inline "Verificado" chip (default; iconOnly drops the label).
//  • seal  — gold-ring "RFT" coin + green check, for profile headers.
// On dark it uses the bright verified-green; on LIGHT/ivory the label/ink uses the AA
// on-light verified ink #157048 (--rft-verified-ink → text-verified-ink, #53).
import { cn } from '@/lib/cn'
import { IconCheck, IconVerified } from './icons'

interface VerifiedBadgeProps {
  variant?: 'pill' | 'seal'
  /** Translated label, e.g. t('score.verified'). Required for the labelled pill / aria. */
  label?: string
  /** Pill only: icon-only (no text) — still exposes the label via aria-label. */
  iconOnly?: boolean
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md'
  /** Seal only: diameter in px (default 64). */
  sealSize?: number
  className?: string
}

export function VerifiedBadge({
  variant = 'pill',
  label,
  iconOnly = false,
  tone = 'dark',
  size = 'md',
  sealSize = 64,
  className,
}: VerifiedBadgeProps) {
  // --- Seal (Concept B) ---
  if (variant === 'seal') {
    return (
      <span
        role="img"
        aria-label={label}
        title={label}
        style={{ width: sealSize, height: sealSize, boxShadow: 'var(--shadow-gold-glow)' }}
        className={cn(
          'relative inline-grid place-items-center rounded-full border-2 border-[var(--gold-border)] bg-[var(--surface-card-solid)]',
          className,
        )}
      >
        <span aria-hidden className="gold-title font-display font-semibold" style={{ fontSize: Math.round(sealSize * 0.3) }}>
          RFT
        </span>
        <span
          aria-hidden
          className="absolute -bottom-1 -right-1 grid place-items-center rounded-full bg-[var(--surface-card-solid)] text-verified"
          style={{ width: Math.round(sealSize * 0.4), height: Math.round(sealSize * 0.4) }}
        >
          <IconCheck className="text-[0.7em]" />
        </span>
      </span>
    )
  }

  // --- Pill ---
  const text = tone === 'dark' ? 'text-verified' : 'text-verified-ink'
  const sizing = size === 'sm' ? 'text-xs gap-1 px-2 py-0.5' : 'text-sm gap-1.5 px-2.5 py-1'

  if (iconOnly) {
    return (
      <span className={cn('inline-flex items-center justify-center', text, className)} role="img" aria-label={label} title={label}>
        <IconVerified className={size === 'sm' ? 'text-base' : 'text-lg'} />
      </span>
    )
  }

  // R5 AA: the labelled pill uses a SOLID dark chip (not bg-verified/12 over the bright stage,
  // which dropped green text to 2.97 @centre). On the dark chip #3fb984 holds 6.78:1. On light the
  // chip stays a faint green-tint with the on-light verified ink (#157048). Green icon ≥3 either way.
  const chip = tone === 'dark'
    ? 'bg-[var(--surface-card-solid)] border border-[var(--green-border)]'
    : 'bg-verified/12'
  return (
    <span className={cn('inline-flex items-center rounded-full font-medium', chip, text, sizing, className)}>
      <IconVerified className="text-[1.1em]" />
      {label}
    </span>
  )
}

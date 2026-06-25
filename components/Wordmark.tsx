// Wordmark — three-tone "RealFairTrust" (Decision #45 / hand-off §4): Real · Fair · Trust.
// On navy: Real = cream, Fair = bright title-gold gradient, Trust = slate. On ivory/champagne:
// Real/Trust → dark navy-ink AND Fair → --gold-on-light (#8C5E12) — the bright gradient is
// ≈invisible on a light surface, so the on-light variant must swap it (Home handoff RH3 §8).
import { cn } from '@/lib/cn'

export function Wordmark({ className, onIvory = false }: { className?: string; onIvory?: boolean }) {
  return (
    <span className={cn('font-display font-semibold tracking-[-0.01em]', className)} aria-label="RealFairTrust">
      <span aria-hidden className={onIvory ? 'text-[var(--text-ink-strong)]' : 'text-cream'}>
        Real
      </span>
      <span aria-hidden className={onIvory ? 'text-[var(--gold-on-light)]' : 'gold-title'}>Fair</span>
      <span aria-hidden className={onIvory ? 'text-[var(--text-ink)]' : 'text-slate'}>
        Trust
      </span>
    </span>
  )
}

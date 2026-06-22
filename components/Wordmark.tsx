// Wordmark — three-tone "RealFairTrust" (Decision #45 / hand-off §4): Real · Fair · Trust.
// On navy: Real = cream, Fair = gold-title gradient, Trust = slate. On ivory: Real/Trust
// switch to dark ink (Fair stays the gold gradient). One accessible name; parts are decorative.
import { cn } from '@/lib/cn'

export function Wordmark({ className, onIvory = false }: { className?: string; onIvory?: boolean }) {
  return (
    <span className={cn('font-display font-semibold tracking-[-0.01em]', className)} aria-label="RealFairTrust">
      <span aria-hidden className={onIvory ? 'text-[var(--text-ink-strong)]' : 'text-cream'}>
        Real
      </span>
      <span aria-hidden className="gold-title">Fair</span>
      <span aria-hidden className={onIvory ? 'text-[var(--text-ink)]' : 'text-slate'}>
        Trust
      </span>
    </span>
  )
}

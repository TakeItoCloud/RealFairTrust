// Wordmark — three-tone "RealFairTrust" (Decision #45): Real (cream) · Fair (gold-title
// gradient) · Trust (slate). One accessible name; the coloured parts are decorative.
import { cn } from '@/lib/cn'

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-display font-semibold tracking-[-0.01em]', className)} aria-label="RealFairTrust">
      <span aria-hidden className="text-cream">Real</span>
      <span aria-hidden className="gold-title">Fair</span>
      <span aria-hidden className="text-slate">Trust</span>
    </span>
  )
}

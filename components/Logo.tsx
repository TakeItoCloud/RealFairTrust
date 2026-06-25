// Logo — the RealFairTrust lockup (#12 "Verified Roofline"): the roofline-check MARK + the
// tri-tone "RealFairTrust" wordmark. Reuses Wordmark for the word; adds the brand mark that was
// missing from the header. Sized via the parent font-size (em-based) to match our className
// convention (e.g. <Logo className="text-xl" />); the mark scales with it.
//   - on navy: mark = bright gold gradient (Real cream / Fair gold / Trust slate via Wordmark).
//   - on ivory/champagne (onIvory): mark + Fair = solid --gold-on-light (#8C5E12); Real/Trust ink
//     (the bright gradient ≈disappears on light — Home handoff §8). onIvory ≡ onLight (#63).
import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Wordmark } from './Wordmark'

type LogoVariant = 'full' | 'mark' | 'wordmark'

function Mark({ onIvory }: { onIvory: boolean }) {
  const gid = useId()
  const stroke = onIvory ? 'var(--gold-on-light)' : `url(#${gid})`
  return (
    <svg
      viewBox="0 0 96 74"
      role="img"
      aria-hidden
      focusable="false"
      style={{ height: '1.2em', width: 'auto' }}
      className="block shrink-0"
    >
      {!onIvory && (
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe6a0" />
            <stop offset="0.3" stopColor="#ffd86e" />
            <stop offset="1" stopColor="#e3a812" />
          </linearGradient>
        </defs>
      )}
      <path d="M6 50 L48 8 L90 50" fill="none" stroke={stroke} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 50 l13 14 l31 -40" fill="none" stroke={stroke} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({
  variant = 'full',
  tagline = false,
  taglineText = 'PERFORMANCE YOU CAN SEE',
  onIvory = false,
  className,
}: {
  variant?: LogoVariant
  tagline?: boolean
  taglineText?: string
  onIvory?: boolean
  className?: string
}) {
  if (variant === 'mark') {
    return (
      <span className={cn('inline-flex', className)} role="img" aria-label="RealFairTrust">
        <Mark onIvory={onIvory} />
      </span>
    )
  }
  if (variant === 'wordmark') return <Wordmark className={className} onIvory={onIvory} />

  return (
    <span className={cn('inline-flex items-center gap-[0.4em]', className)}>
      <Mark onIvory={onIvory} />
      <span className="inline-flex flex-col gap-[0.15em]">
        <Wordmark onIvory={onIvory} />
        {tagline ? (
          <span
            className={cn(
              'text-[0.4em] font-medium uppercase tracking-[0.22em]',
              onIvory ? 'text-[var(--champagne-ink-muted)]' : 'text-faint',
            )}
          >
            {taglineText}
          </span>
        ) : null}
      </span>
    </span>
  )
}

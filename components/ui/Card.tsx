// Card — the base surface that floats content on the navy stage (§2.13).
// NOTE (Step 3): the surface STAYS SOLID this step; backdrop-blur is wired but inert over
// the solid fill — it becomes visible in Step 4 when the surface flips translucent. Card/raised
// shadows are NOT deepened here (Step 4 owns that).
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CardVariant = 'default' | 'raised' | 'featured' | 'ivory'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  /** Inner padding (px number or CSS string). Defaults to --card-pad (26px). */
  padding?: number | string
  children?: ReactNode
}

export function Card({ variant = 'default', padding, className, style, children, ...rest }: CardProps) {
  const isIvory = variant === 'ivory'
  return (
    <div
      className={cn(
        'relative rounded-[var(--card-radius)] border',
        // Wired-but-inert frosting (solid surface today; reveals in Step 4):
        !isIvory && 'backdrop-blur-[var(--blur-panel)]',
        variant === 'default' && 'border-line bg-[var(--surface-card)] shadow-[var(--shadow-card)]',
        variant === 'raised' && 'border-line bg-[var(--surface-card-raised)] shadow-[var(--shadow-raised)]',
        variant === 'featured' &&
          'border-[var(--gold-border)] bg-[var(--surface-card-raised)] shadow-[var(--shadow-gold-glow)]',
        isIvory &&
          'border-[var(--ivory-200)] bg-[var(--ivory-card)] text-[var(--text-ink)] shadow-[var(--shadow-ivory)]',
        className,
      )}
      style={{ padding: padding ?? 'var(--card-pad)', ...style }}
      {...rest}
    >
      {variant === 'featured' ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[var(--card-radius)]"
          style={{ background: 'var(--gradient-gold-hairline)' }}
        />
      ) : null}
      {children}
    </div>
  )
}

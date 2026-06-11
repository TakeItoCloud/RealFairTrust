'use client'

// StarRating — two modes:
//  • read-only (default): displays a rating with fractional fill (e.g. reviews).
//  • interactive (pass onChange): a keyboard-operable radiogroup for forms.
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { focusRing } from './styles'
import { IconStar } from './icons'

interface StarRatingProps {
  /** Current value, 0–max. */
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  /** Provide to make the control interactive; omit for a read-only display. */
  onChange?: (value: number) => void
  /** Accessible group name, e.g. "Rating". */
  label?: string
  className?: string
}

const sizeClasses: Record<NonNullable<StarRatingProps['size']>, string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
}

/** One star with fractional gold fill over a muted base. */
function Star({ fill, sizeClass }: { fill: number; sizeClass: string }) {
  const pct = Math.max(0, Math.min(1, fill)) * 100
  return (
    <span className={cn('relative inline-block', sizeClass)} aria-hidden>
      <IconStar className="text-cream/20" />
      <span className="absolute inset-0 overflow-hidden text-gold" style={{ width: `${pct}%` }}>
        <IconStar />
      </span>
    </span>
  )
}

export function StarRating({ value, max = 5, size = 'md', onChange, label, className }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null)
  const sizeClass = sizeClasses[size]
  const stars = Array.from({ length: max }, (_, i) => i + 1)

  // ---- Read-only display ----
  if (!onChange) {
    return (
      <span
        className={cn('inline-flex items-center gap-0.5', className)}
        role="img"
        aria-label={label ? `${label}: ${value} / ${max}` : `${value} / ${max}`}
      >
        {stars.map((n) => (
          <Star key={n} fill={value - (n - 1)} sizeClass={sizeClass} />
        ))}
      </span>
    )
  }

  // ---- Interactive radiogroup ----
  const shown = hover ?? value
  return (
    <span role="radiogroup" aria-label={label} className={cn('inline-flex items-center gap-0.5', className)}>
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} / ${max}`}
          tabIndex={value === n || (value === 0 && n === 1) ? 0 : -1}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(n)}
          onBlur={() => setHover(null)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              e.preventDefault()
              onChange(Math.min(max, value + 1))
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              e.preventDefault()
              onChange(Math.max(1, value - 1))
            }
          }}
          className={cn('rounded-sm leading-none', focusRing)}
        >
          <Star fill={shown - (n - 1)} sizeClass={sizeClass} />
        </button>
      ))}
    </span>
  )
}

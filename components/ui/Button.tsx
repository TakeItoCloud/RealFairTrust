'use client'

// Button — primary / secondary / ghost, in three sizes, with all interaction states.
// Tap targets stay ≥ 44px (min-h-11). Subtle press feedback is CSS-only and
// motion-safe; loading shows a spinner and blocks interaction.
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { focusRing } from './styles'
import { IconSpinner } from './icons'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  /** Use the light-surface palette (warm content sections). */
  onLight?: boolean
  children: ReactNode
}

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-11 px-3.5 text-sm gap-1.5',
  md: 'min-h-11 px-5 text-base gap-2',
  lg: 'min-h-13 px-7 text-lg gap-2.5',
}

function variantClasses(variant: Variant, onLight: boolean): string {
  switch (variant) {
    case 'primary':
      return 'bg-gold text-ink hover:bg-gold-bright'
    case 'secondary':
      return onLight
        ? 'border border-gold-deep/50 text-gold-deep hover:bg-gold-deep/10'
        : 'border border-gold/50 text-gold hover:bg-gold/10'
    case 'ghost':
      return onLight ? 'text-ink-on-light hover:bg-ink/5' : 'text-cream hover:bg-cream/10'
  }
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  onLight = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'relative inline-flex items-center justify-center rounded-md font-medium',
        'transition-[background-color,color,transform] duration-150',
        'motion-safe:active:scale-[0.98]',
        'disabled:pointer-events-none disabled:opacity-50',
        sizeClasses[size],
        variantClasses(variant, onLight),
        focusRing,
        className,
      )}
      {...rest}
    >
      {loading ? (
        <IconSpinner className="text-[1.2em] motion-safe:animate-spin" aria-hidden />
      ) : null}
      <span className={cn(loading && 'opacity-90')}>{children}</span>
    </button>
  )
}

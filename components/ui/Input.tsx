'use client'

// Input — styled text field. Forwards ref (works with React Hook Form in 4.2).
// Invalid state keys off aria-invalid so consumers just set it from validation.
import type { InputHTMLAttributes, Ref } from 'react'
import { cn } from '@/lib/cn'
import { focusRing, focusRingLight } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onLight?: boolean
  ref?: Ref<HTMLInputElement>
}

export function Input({ onLight = false, className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        'min-h-11 w-full rounded-md border px-4 text-base transition-colors',
        onLight
          ? 'border-line-lt bg-surface-lt text-ink-on-light placeholder:text-ink-on-light/45'
          : 'border-line bg-surface text-cream placeholder:text-cream-muted',
        'aria-[invalid=true]:border-danger',
        'disabled:cursor-not-allowed disabled:opacity-50',
        onLight ? focusRingLight : focusRing,
        className,
      )}
      {...rest}
    />
  )
}

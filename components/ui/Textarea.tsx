'use client'

// Textarea — multiline sibling of Input. Same states + aria-invalid styling.
import type { Ref, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { focusRing, focusRingLight } from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onLight?: boolean
  ref?: Ref<HTMLTextAreaElement>
}

export function Textarea({ onLight = false, className, rows = 4, ...rest }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(
        'w-full rounded-[var(--radius-sm)] border px-4 py-3 text-base transition-colors',
        onLight
          ? 'border-line-lt bg-surface-lt text-ink-on-light placeholder:text-ink-on-light/45 hover:border-[var(--gold-border-soft)]'
          : 'border-line bg-[var(--surface-inset)] text-cream placeholder:text-cream-muted hover:border-[var(--gold-border-soft)]',
        'aria-[invalid=true]:border-danger',
        'disabled:cursor-not-allowed disabled:opacity-50',
        onLight ? focusRingLight : focusRing,
        className,
      )}
      {...rest}
    />
  )
}

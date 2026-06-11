// Eyebrow — small uppercase kicker above a heading.
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EyebrowProps {
  children: ReactNode
  /** 'dark' (default) for dark surfaces; 'light' for warm content sections. */
  tone?: 'dark' | 'light'
  className?: string
}

export function Eyebrow({ children, tone = 'dark', className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-semibold uppercase tracking-[0.18em]',
        tone === 'dark' ? 'text-gold' : 'text-gold-deep',
        className,
      )}
    >
      {children}
    </span>
  )
}

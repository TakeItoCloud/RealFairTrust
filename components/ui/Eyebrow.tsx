// Eyebrow — small uppercase kicker above a heading.
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EyebrowProps {
  children: ReactNode
  /** 'dark' (default) for the navy stage; 'light' for ivory; 'champagne' for the champagne band. */
  tone?: 'dark' | 'light' | 'champagne'
  className?: string
}

const toneClass: Record<NonNullable<EyebrowProps['tone']>, string> = {
  dark: 'text-gold', // #efb52a — R2 AA on the bright navy centre
  light: 'text-gold-deep', // #8C5E12 on ivory (#53)
  champagne: 'text-[var(--champagne-eyebrow)]', // #7c5a12 — AA 4.90 on champagne (R2/R4)
}

export function Eyebrow({ children, tone = 'dark', className }: EyebrowProps) {
  return (
    <span
      className={cn(
        // Labels/eyebrows are SOLID gold (Decision #45) — the clip gradient is for titles only.
        'inline-block text-eyebrow',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

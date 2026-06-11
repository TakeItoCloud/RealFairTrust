// SectionWrapper — a full-width section with a centered, max-width inner container.
// Tones map to the Midnight Gold surfaces: dark marketing, warm light content, elevated surface.
import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionWrapperProps {
  children: ReactNode
  tone?: 'dark' | 'warm' | 'surface'
  /** Vertical padding rhythm. */
  size?: 'sm' | 'md' | 'lg'
  as?: ElementType
  id?: string
  className?: string
  /** Set false to drop the inner container (e.g. for full-bleed children). */
  contained?: boolean
}

const toneClasses: Record<NonNullable<SectionWrapperProps['tone']>, string> = {
  dark: 'bg-ink text-cream',
  warm: 'bg-warm text-ink-on-light',
  surface: 'bg-surface text-cream',
}

const sizeClasses: Record<NonNullable<SectionWrapperProps['size']>, string> = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-20',
  lg: 'py-16 md:py-28',
}

export function SectionWrapper({
  children,
  tone = 'dark',
  size = 'md',
  as: Tag = 'section',
  id,
  className,
  contained = true,
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={cn(toneClasses[tone], sizeClasses[size], className)}>
      {contained ? <div className="container-page">{children}</div> : children}
    </Tag>
  )
}

'use client'

// StatTile — a single metric (label + value + optional sublabel). Used in the score
// breakdown and dashboard. Subtle, reduced-motion-safe fade-in via Framer Motion.
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface StatTileProps {
  label: string
  value: ReactNode
  /** Optional secondary line (e.g. "vs target 80"). */
  sub?: string
  tone?: 'dark' | 'light'
  className?: string
}

export function StatTile({ label, value, sub, tone = 'dark', className }: StatTileProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'rounded-lg border p-4',
        tone === 'dark' ? 'border-line bg-surface text-cream' : 'border-line-lt bg-surface-lt text-ink-on-light',
        className,
      )}
    >
      <p className={cn('text-xs font-semibold uppercase tracking-[0.14em]', tone === 'dark' ? 'text-cream-muted' : 'text-ink-on-light/60')}>
        {label}
      </p>
      <p className="mt-1 font-display text-2xl leading-tight text-gold">{value}</p>
      {sub ? (
        <p className={cn('mt-0.5 text-xs', tone === 'dark' ? 'text-cream-muted' : 'text-ink-on-light/60')}>{sub}</p>
      ) : null}
    </motion.div>
  )
}

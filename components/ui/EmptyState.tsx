'use client'

// EmptyState — shown when a list/section has no data (e.g. a consultant with no reviews).
// Subtle Framer Motion fade/slide-in, disabled under prefers-reduced-motion.
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { IconInbox } from './icons'

interface EmptyStateProps {
  title: string
  description?: string
  /** Defaults to an inbox glyph. Pass any node to override. */
  icon?: ReactNode
  /** Optional action (e.g. a Button). */
  action?: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}

export function EmptyState({ title, description, icon, action, tone = 'dark', className }: EmptyStateProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center',
        tone === 'dark' ? 'border-line bg-ink-elev text-cream' : 'border-line-lt bg-surface-lt text-ink-on-light',
        className,
      )}
    >
      <span className={cn('mb-3 text-3xl', tone === 'dark' ? 'text-gold' : 'text-gold-deep')} aria-hidden>
        {icon ?? <IconInbox />}
      </span>
      <p className="font-display text-lg">{title}</p>
      {description ? (
        <p className={cn('mt-1 max-w-sm text-sm', tone === 'dark' ? 'text-cream-muted' : 'text-ink-on-light/65')}>
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </motion.div>
  )
}

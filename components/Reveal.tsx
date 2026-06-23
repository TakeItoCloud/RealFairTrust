'use client'

// Reveal — a subtle, reduced-motion-safe entrance wrapper (#37) for server-rendered blocks
// (profile header/panels/about/reviews). opacity 0→1 + y 16→0 on first scroll-in, locked
// --ease-out; under prefers-reduced-motion it renders instantly (no transform). No bounce/loop.
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.42, ease: EASE, delay: reduce ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

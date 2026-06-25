'use client'

// HeroFullBleed — the full-bleed cinematic hero (Home handoff RH3b, README §3.1/§3.3/§3.4).
// Composes HeroMedia (background) + the foreground cluster (headline 2 lines, gold rule, sub-text,
// two CTAs) with the staged entrance, a local left text-scrim for AA over any bright frame, and the
// scroll cue. Copy comes in via props (i18n-wired in RH4). Built here for /dev/hero; the live Home
// adopts it in RH4.
//
// EXPORT-SAFETY CONTRACT (README §3.4): the base/default state is VISIBLE (opacity 1). The entrance
// hides each element then reveals it at runtime ONLY (via Framer animation controls, set before
// paint). SSR / no-JS / prefers-reduced-motion therefore show the FINAL layout instantly — never a
// blank pre-animation hero. Motion is gated on useReducedMotion(); the brand-reveal loop (in
// HeroMedia) starts only after the entrance (startDelay 2750ms). #37.
import { useEffect, useLayoutEffect, type ReactNode } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui'
import { HeroMedia, type HeroBeat } from './HeroMedia'

const ENTRANCE_EASE = [0.2, 0.62, 0.2, 1] as const
// useLayoutEffect on the client (hide before paint → no flash); useEffect on the server (no warn).
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** One staged element: visible by default; on mount (non-reduced) it hides then reveals after
 *  `delay`. Renders as a block <span> (valid inside <h1>) or a <div>. */
function Staged({
  as = 'div',
  delay,
  dur,
  rise = 14,
  accent = false,
  className,
  children,
}: {
  as?: 'div' | 'span'
  delay: number
  dur: number
  rise?: number
  accent?: boolean
  className?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const controls = useAnimationControls()
  const MotionTag = as === 'span' ? motion.span : motion.div

  useIsoLayoutEffect(() => {
    if (reduce) return
    let cancelled = false
    controls.set({ opacity: 0, y: rise }) // hide before paint
    const id = setTimeout(() => {
      if (cancelled) return
      controls.start({
        opacity: 1,
        y: 0,
        ...(accent ? { filter: 'drop-shadow(0 2px 14px rgba(255,216,110,0.18))' } : {}),
        transition: { duration: dur / 1000, ease: ENTRANCE_EASE },
      })
    }, delay)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
    // mount-only: the entrance plays once (controls/reduce are stable for the element's life).
  }, [])

  return (
    <MotionTag animate={controls} className={cn(as === 'span' && 'block', className)}>
      {children}
    </MotionTag>
  )
}

export function HeroFullBleed({
  line1,
  line2,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  scrollCue,
  beats,
  ariaLabel,
}: {
  line1: string
  line2: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  scrollCue: string
  beats: HeroBeat[]
  ariaLabel?: string
}) {
  return (
    <section
      aria-label={ariaLabel ?? `${line1} ${line2}`}
      className="relative left-1/2 -mt-16 min-h-[84vh] w-screen -translate-x-1/2 overflow-hidden"
    >
      <HeroMedia beats={beats} startDelay={2750} />

      {/* Local left text-scrim (AA fail-closed): the README vertical scrim is ~.30 behind the text
          band, which over a bright video frame (region YMAX 241) drops cream text below 4.5. This
          left gradient stacks with it so the headline/sub stay AA on any frame, while the right
          stays cinematic for the brand reveal. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(90deg, rgba(2,8,18,0.82) 0%, rgba(2,8,18,0.58) 38%, rgba(2,8,18,0.22) 62%, rgba(2,8,18,0) 80%)',
        }}
      />

      {/* Foreground cluster — vertically centered, left */}
      <div className="absolute inset-y-0 left-0 z-[2] flex max-w-[860px] flex-col items-start justify-center gap-[22px] px-8 sm:px-14">
        <h1
          className="m-0 font-display text-[clamp(38px,4.5vw,62px)] leading-[1.12] tracking-[-0.016em]"
          style={{ textShadow: '0 2px 24px rgba(2,8,18,0.82)' }}
        >
          <Staged as="span" delay={0} dur={560} className="whitespace-nowrap text-cream">
            {line1}
          </Staged>
          <Staged as="span" delay={700} dur={580} rise={18} accent className="gold-title whitespace-nowrap font-display font-medium italic">
            {line2}
          </Staged>
          <Staged as="span" delay={1250} dur={460} rise={14} className="mt-5">
            <span aria-hidden className="block h-[3px] w-[58px] rounded-[2px]" style={{ background: 'var(--gradient-gold-title)' }} />
          </Staged>
        </h1>

        <Staged delay={1700} dur={540} className="max-w-[480px]">
          <p className="text-[19px] leading-[1.6] text-cream" style={{ textShadow: '0 2px 18px rgba(2,8,18,0.78)' }}>
            {subtitle}
          </p>
        </Staged>

        <Staged delay={2100} dur={540} className="mt-3 flex flex-wrap gap-3.5">
          <Button size="lg">{ctaPrimary}</Button>
          <Button size="lg" variant="secondary">
            {ctaSecondary}
          </Button>
        </Staged>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-[22px] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-muted">{scrollCue}</span>
        <svg
          className="rft-scrollcue"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold-300)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  )
}

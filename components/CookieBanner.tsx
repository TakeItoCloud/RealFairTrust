'use client'

// CookieBanner — GDPR consent (Phase 1 legal). Persists the choice in localStorage so it
// only shows until the visitor decides. Slide-up is reduced-motion-safe via Framer Motion.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui'
import { focusRing } from '@/components/ui/styles'

const STORAGE_KEY = 'rft-cookie-consent'

export function CookieBanner() {
  const t = useTranslations('cookie')
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let show = true
    try {
      show = !localStorage.getItem(STORAGE_KEY)
    } catch {
      show = true
    }
    // One-time read of persisted consent on mount; must run client-side to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(show)
  }, [])

  function decide(choice: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      /* storage unavailable — just dismiss for this session */
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduce ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          role="dialog"
          aria-label={t('message')}
          className="fixed inset-x-0 bottom-0 z-50 p-4"
        >
          <div className="container-page flex flex-col items-start gap-3 rounded-lg border border-line bg-ink-elev p-4 text-cream shadow-2xl sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-cream-muted">
              {t('message')}{' '}
              <Link href="/cookies" className={cn('text-gold underline-offset-2 hover:underline', focusRing)}>
                {t('learnMore')}
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <Button variant="ghost" size="sm" onClick={() => decide('declined')}>
                {t('decline')}
              </Button>
              <Button size="sm" onClick={() => decide('accepted')}>
                {t('accept')}
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

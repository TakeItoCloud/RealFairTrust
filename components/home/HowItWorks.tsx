'use client'

// HowItWorks — REVISION R4: the champagne "Como Funciona" band (#E/#F). The ONLY in-page
// champagne surface (the footer is the other). Navy `.rft-step-card`s float on the warm sand,
// each with a gold `.rft-step-coin` (01/02/03). Reduced-motion-safe staggered entrance (#37);
// the gold accent-bar hover lives in the base.css `.rft-step-card` rule.
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Eyebrow } from '@/components/ui'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function HowItWorks() {
  const t = useTranslations('home.howItWorks')
  const reduce = useReducedMotion()

  const steps = [
    { n: 1, title: t('step1Title'), desc: t('step1Desc') },
    { n: 2, title: t('step2Title'), desc: t('step2Desc') },
    { n: 3, title: t('step3Title'), desc: t('step3Desc') },
  ]

  return (
    <section className="rft-champagne rft-champagne--fade-both">
      <div className="container-page py-20 md:py-24">
        <div className="flex max-w-2xl flex-col gap-3.5">
          <Eyebrow tone="champagne">{t('eyebrow')}</Eyebrow>
          <h2 className="text-section text-[var(--champagne-ink)]">{t('title')}</h2>
          <p className="text-[var(--champagne-ink-muted)]">{t('lede')}</p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.42, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
              className="rft-step-card flex flex-col gap-3.5"
            >
              <span className="rft-step-coin">
                <span>{String(step.n).padStart(2, '0')}</span>
              </span>
              <h3 className="text-[21px]">{step.title}</h3>
              <p className="text-[14.5px] leading-relaxed">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

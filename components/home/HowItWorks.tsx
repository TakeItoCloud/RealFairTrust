'use client'

// HowItWorks — three-step explainer. Subtle, reduced-motion-safe staggered fade-in.
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Eyebrow } from '@/components/ui'

export function HowItWorks() {
  const t = useTranslations('home.howItWorks')
  const reduce = useReducedMotion()

  const steps = [
    { n: 1, title: t('step1Title'), desc: t('step1Desc') },
    { n: 2, title: t('step2Title'), desc: t('step2Desc') },
    { n: 3, title: t('step3Title'), desc: t('step3Desc') },
  ]

  return (
    <section className="bg-surface">
      <div className="container-page py-14 md:py-20">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-3xl text-cream">{t('title')}</h2>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.25, ease: 'easeOut', delay: reduce ? 0 : i * 0.08 }}
              className="rounded-lg border border-line bg-ink-elev p-6"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold font-display font-semibold text-ink">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-xl text-cream">{step.title}</h3>
              <p className="mt-2 text-sm text-cream-muted">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

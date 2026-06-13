'use client'

// ConsultantCard — "Spotlight" (Decision #45): a horizontal card led by a gold rank coin +
// ringed avatar, with the close rate as the hero numeral. Honors Decision #18 — the gold
// rank coin/number shows only for statistically-confident consultants; low-sample shows a
// "building track record" badge; Rising Talent gets its tag. Keeps every existing field.
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { ConsultantSummary } from '@/lib/types'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { Avatar, PerformanceBadge, RisingTalentTag, VerifiedBadge } from '@/components/ui'

export function ConsultantCard({ consultant, index = 0 }: { consultant: ConsultantSummary; index?: number }) {
  const t = useTranslations()
  const reduce = useReducedMotion()
  const score = consultant.score

  const confident = !!score && !score.risingTalent && score.confidence !== 'low'
  const buildingTrackRecord = !!score && !score.risingTalent && score.confidence === 'low'

  return (
    <Link
      href={{ pathname: '/consultores/[slug]', params: { slug: consultant.slug } }}
      className="group block"
    >
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.42, ease: 'easeOut', delay: reduce ? 0 : Math.min(index * 0.07, 0.42) }}
        whileHover={reduce ? undefined : { y: -4 }}
        whileTap={reduce ? undefined : { y: 1 }}
        style={{ boxShadow: 'var(--shadow-card)' }}
        className={cn(
          'relative overflow-hidden rounded-[var(--card-radius)] border border-line bg-[var(--surface-card)]',
          'transition-shadow duration-300 group-hover:shadow-[var(--shadow-raised)]',
        )}
      >
        {/* gold top accent bar — wipes in on hover */}
        <span
          aria-hidden
          style={{ backgroundImage: 'var(--accent-bar)' }}
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
        />

        <div className="p-[var(--card-pad)]">
          {/* Row 1 — lead + name + hero close rate */}
          <div className="flex items-start gap-4">
            {confident && score?.rank ? (
              <span
                aria-hidden
                style={{ backgroundImage: 'var(--rft-gold-button)' }}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-semibold text-on-gold"
              >
                #{score.rank}
              </span>
            ) : null}

            <Avatar src={consultant.photo} name={consultant.name} size="lg" className="ring-2 ring-gold/30" />

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-display text-[21px] font-semibold text-cream group-hover:text-gold">
                  {consultant.name}
                </p>
                {consultant.verified ? <VerifiedBadge label={t('score.verified')} iconOnly size="sm" /> : null}
              </div>
              <p className="mt-0.5 truncate text-meta text-cream-muted">
                {consultant.specializations.map((s) => t(`specializations.${s}`)).join(' · ')}
              </p>
            </div>

            {score ? (
              <div className="shrink-0 text-right transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_2px_10px_rgba(227,168,18,0.35))]">
                <p className="gold-title font-display text-[38px] font-semibold leading-none">{score.sub.closeRate}%</p>
                <p className="mt-1 text-eyebrow text-cream-muted">{t('score.closeRate')}</p>
              </div>
            ) : null}
          </div>

          {/* Row 2 — tag / status pills */}
          {score ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {score.risingTalent ? <RisingTalentTag label={t('score.risingTalent')} size="sm" /> : null}
              {buildingTrackRecord ? (
                <PerformanceBadge variant="building" label={t('score.buildingTrackRecord')} />
              ) : null}
              {confident && score.rank === 1 ? (
                <PerformanceBadge variant="top" label={t('score.topThisMonth')} />
              ) : null}
            </div>
          ) : null}

          {/* Footer — gold hairline + response-time meta + CTA */}
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            {score ? (
              <span className="text-meta text-cream-muted">
                {t('score.responsiveness')} · {score.sub.responsiveness}
              </span>
            ) : (
              <span />
            )}
            <span className="text-meta font-medium text-gold">
              {t('common.actions.viewProfile')} →
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

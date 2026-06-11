'use client'

// ConsultantCard — badges + close rate + specialization (Decision #27). The composite
// number is never shown on the card; it's revealed only on the profile and only when the
// sample is fair (Decision #18). Rising Talent and Verified marks appear where applicable.
import { useTranslations } from 'next-intl'
import type { ConsultantSummary } from '@/lib/types'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import {
  Avatar,
  PerformanceBadge,
  RankIndicator,
  RisingTalentTag,
  VerifiedBadge,
} from '@/components/ui'
import { focusRing } from '@/components/ui/styles'

export function ConsultantCard({ consultant }: { consultant: ConsultantSummary }) {
  const t = useTranslations()
  const score = consultant.score

  return (
    <Link
      href={{ pathname: '/consultores/[slug]', params: { slug: consultant.slug } }}
      className={cn(
        'group flex flex-col rounded-lg border border-line bg-surface p-5 transition-transform',
        'hover:-translate-y-0.5 motion-reduce:transform-none',
        focusRing,
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar src={consultant.photo} name={consultant.name} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-semibold text-cream group-hover:text-gold">
            {consultant.name}
          </p>
          <p className="mt-0.5 truncate text-sm text-cream-muted">
            {consultant.specializations.map((s) => t(`specializations.${s}`)).join(' · ')}
          </p>
        </div>
        {consultant.verified ? <VerifiedBadge label={t('score.verified')} iconOnly /> : null}
      </div>

      {/* Performance signals */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {score?.risingTalent ? (
          <RisingTalentTag label={t('score.risingTalent')} size="sm" />
        ) : score?.rank === 1 ? (
          <PerformanceBadge variant="top" label={t('score.topThisMonth')} />
        ) : score?.rank ? (
          <RankIndicator rank={score.rank} label={t('score.rank')} size="sm" />
        ) : null}
        {score && score.confidence === 'low' && !score.risingTalent ? (
          <PerformanceBadge variant="building" label={t('score.buildingTrackRecord')} />
        ) : null}
      </div>

      {/* Close rate (a sub-signal — fine to show; only the composite is gated) */}
      {score ? (
        <div className="mt-4 border-t border-line pt-3">
          <p className="text-xs uppercase tracking-[0.14em] text-cream-muted">{t('score.closeRate')}</p>
          <p className="font-display text-xl text-gold">{score.sub.closeRate}%</p>
        </div>
      ) : null}
    </Link>
  )
}

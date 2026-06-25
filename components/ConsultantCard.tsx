'use client'

// ConsultantCard — "Spotlight" (zip AgentCard reference; #51). Rebuilt on the Step-3 primitives
// and the now-translucent frosted Card surface. Honors #18: the merit composite numeral shows
// ONLY when statistically confident; otherwise the "building track record" treatment (Diogo,
// 0 reviews → building). Top-3 get a gold RankBadge + ringed avatar; #1 confident = featured.
// Motion (#37): Framer entrance + lift, CSS group-hover accent-bar/score-glow, reduced-motion-safe.
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { ConsultantSummary } from '@/lib/types'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { Avatar, Badge, RankBadge, StatBlock, Tag, VerifiedBadge } from '@/components/ui'
import { IconTrophy } from '@/components/ui/icons'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function ConsultantCard({
  consultant,
  index = 0,
  featured: featuredProp,
  displayRank,
}: {
  consultant: ConsultantSummary
  index?: number
  /** Force the "featured" spotlight treatment (kit AgentCard `featured`). Defaults to the
   *  computed #1-confident rule; the Home hero forces it on the top-ranked card. */
  featured?: boolean
  /** Override the rank-coin number with a context-specific position. The seed's `score.rank` is
   *  PER-REGION; the Home "Top este mês" is a GLOBAL cross-region leaderboard, so it passes the
   *  global position (1,2,3,4) here. Omitted elsewhere → the coin falls back to the region rank. */
  displayRank?: number
}) {
  const t = useTranslations()
  const reduce = useReducedMotion()
  const score = consultant.score

  const confident = !!score && !score.risingTalent && score.confidence !== 'low'
  const building = !!score && !score.risingTalent && score.confidence === 'low'
  // #18: the coin only shows for statistically-confident consultants. Use the global displayRank
  // when given, else the per-region score.rank.
  const rank = confident ? displayRank ?? score?.rank ?? null : null
  const topRanked = rank != null && rank <= 3
  // Coin: top-3 get the gold coin everywhere; in the Home spotlight (displayRank given) every
  // position shows its coin (RankBadge renders 4+ as neutral) so the row reads 2·3·4, not 2·3.
  const showCoin = rank != null && (topRanked || displayRank != null)
  const featured = featuredProp ?? (confident && rank === 1)

  return (
    <Link
      href={{ pathname: '/consultores/[slug]', params: { slug: consultant.slug } }}
      className="group block h-full"
    >
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.42, ease: EASE, delay: reduce ? 0 : Math.min(index * 0.07, 0.42) }}
        whileHover={reduce ? undefined : { y: -4 }}
        whileTap={reduce ? undefined : { y: 1 }}
        style={{ boxShadow: featured ? 'var(--shadow-gold-glow)' : 'var(--shadow-card)' }}
        className={cn(
          'relative flex h-full flex-col gap-[18px] overflow-hidden rounded-[var(--card-radius)] p-[var(--card-pad)]',
          'border transition-[box-shadow,border-color] duration-[var(--dur-base)] ease-[cubic-bezier(0.22,0.61,0.36,1)]',
          // Home handoff RH3 (§A.2): AgentCard fill = the SOLID --surface-card-solid (#0c1d39) base,
          // not the translucent .035. The solid base stops the bright radial centre bleeding through
          // → text contrast improves (cream-muted .70 → 8.46:1 here vs 4.66:1 on the translucent fill).
          // Featured still reads featured via the gold border + --shadow-gold-glow + always-on accent.
          featured
            ? 'border-[var(--gold-border)] bg-[var(--surface-card-solid)]'
            : 'border-line bg-[var(--surface-card-solid)] group-hover:border-[var(--gold-border-soft)] group-hover:shadow-[var(--shadow-raised)]',
        )}
      >
        {/* Gold accent bar — always on when featured; wipes in on hover otherwise. */}
        <span
          aria-hidden
          style={{ backgroundImage: 'var(--accent-bar)' }}
          className={cn(
            'absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-[var(--dur-slow)] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none',
            featured ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
          )}
        />

        {/* Top row — rank + avatar + name / score */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3.5">
            {showCoin && rank != null ? <RankBadge rank={rank} label={t('score.rank')} size={40} /> : null}
            {/* Compact cards use a smaller avatar so the full name fits; featured keeps lg. */}
            <Avatar src={consultant.photo} name={consultant.name} size={featured ? 'lg' : 'md'} ring={featured || topRanked} />
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {/* Full name always shows — wraps to a second line rather than truncating. */}
              <p className="min-w-0 font-display text-[21px] font-semibold leading-tight text-cream">
                {consultant.name}
              </p>
              {consultant.verified ? (
                <VerifiedBadge iconOnly size="sm" label={t('score.verified')} className="shrink-0" />
              ) : null}
            </div>
          </div>

          {confident && score ? (
            <div className="shrink-0 text-right">
              {/* Featured (#1 / Home spotlight) uses the larger 56px merit score (handoff §4). */}
              <p
                className={cn(
                  'gold-title font-display font-semibold leading-none transition-[filter] duration-[var(--dur-base)] group-hover:[filter:drop-shadow(0_0_14px_rgba(255,216,110,0.45))] motion-reduce:transition-none',
                  featured ? 'text-[56px]' : 'text-[38px]',
                )}
              >
                {score.composite}
              </p>
              <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cream-muted">
                {t('score.merit90d')}
              </p>
            </div>
          ) : null}
        </div>

        {/* Tags row — standing badge + specialities */}
        <div className="flex flex-wrap items-center gap-2">
          {score?.risingTalent ? <Badge variant="rising">{t('score.risingTalent')}</Badge> : null}
          {building ? <Badge variant="neutral">{t('score.buildingTrackRecord')}</Badge> : null}
          {featured ? (
            <Badge variant="gold" iconLeft={<IconTrophy />}>
              {t('score.topThisMonth')}
            </Badge>
          ) : null}
          {consultant.specializations.map((s) => (
            <Tag key={s}>{t(`specializations.${s}`)}</Tag>
          ))}
        </div>

        {/* Stats row */}
        {score ? (
          <div className="flex gap-6 border-t border-line pt-4">
            <StatBlock size="sm" value={`${score.sub.closeRate}%`} label={t('score.closeRate')} />
            <StatBlock size="sm" value={score.sub.satisfaction} label={t('score.satisfaction')} />
            <StatBlock size="sm" value={score.sub.responsiveness} label={t('score.responsiveness')} />
          </div>
        ) : null}

        {/* Footer — mt-auto pins it to the bottom so equal-height cards align + read balanced */}
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span className="text-[12.5px] text-cream-muted">{rank != null ? `#${rank}` : ''}</span>
          <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-gold transition-[gap] duration-[var(--dur-base)] group-hover:gap-2.5">
            {t('common.actions.viewProfile')} →
          </span>
        </div>
      </motion.article>
    </Link>
  )
}

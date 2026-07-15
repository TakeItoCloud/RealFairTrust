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
import { IconPin, IconTrophy } from '@/components/ui/icons'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function ConsultantCard({
  consultant,
  index = 0,
  featured: featuredProp,
  displayRank,
  showMetrics = false,
  showWorkArea = true,
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
  /** Opt in to the DEMO outcome-metrics block — units sold (rolling 12mo) + avg time-to-sell
   *  (Decision #90, Cycle 1). OFF by default → existing call-sites are byte-for-byte unchanged; the
   *  block also needs BOTH values present on the summary. Cycles 2/3 flip this on for Vender/Consultores. */
  showMetrics?: boolean
  /** Show the always-on work-area line (Decision #93, Cycle 4). Defaults to true. Vender passes false:
   *  its page-level wrapper already shows a search-relative matched-tier coverage line, so the card's
   *  intrinsic most-specific line would duplicate (and can name a different district than the one picked). */
  showWorkArea?: boolean
}) {
  const t = useTranslations()
  const reduce = useReducedMotion()
  const score = consultant.score

  // Outcome-metrics block: opt-in via `showMetrics` AND both demo values present (the muted caption
  // marks the metric PAIR, so a lone value renders nothing). Values are DEMO until Phase 5.
  const metrics =
    showMetrics && consultant.unitsSold12mo != null && consultant.avgDaysToSell != null
      ? { unitsSold12mo: consultant.unitsSold12mo, avgDaysToSell: consultant.avgDaysToSell }
      : null

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

        {/* Work-area line (Decision #93, Cycle 4) — the consultant's most-specific coverage level.
            Always on wherever the card appears (showWorkArea default true); hidden when coverage can't
            be resolved, and opted out on Vender (its wrapper shows a search-relative coverage line). */}
        {showWorkArea && consultant.workArea ? (
          <p className="-mt-1 inline-flex items-center gap-1.5 text-[12px] font-medium text-cream-muted">
            <IconPin className="text-sm text-gold" aria-hidden />
            {t(`score.worksIn.${consultant.workArea.level}`, { area: consultant.workArea.name })}
          </p>
        ) : null}

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

        {/* Outcome metrics (DEMO, #90) — opt-in via showMetrics; one muted caption on the PAIR.
            Caption is muted (NOT verified-green, #34/#89) because these are demo, not verified, values. */}
        {metrics ? (
          <div className="border-t border-line pt-4">
            <div className="flex gap-6">
              <StatBlock size="sm" value={metrics.unitsSold12mo} label={t('score.sales12mo')} />
              <StatBlock
                size="sm"
                value={t('score.daysValue', { n: metrics.avgDaysToSell })}
                label={t('score.avgTimeToSell')}
              />
            </div>
            <p className="mt-2 text-[10.5px] uppercase tracking-[0.12em] text-cream-muted">
              {t('score.demoValues')}
            </p>
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

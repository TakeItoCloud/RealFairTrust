// Consultant profile — /consultores/[slug] (the key conversion page; Phase 4 §4.3.3,
// Phase 2 wireframe, Decisions #18/#6/#28/#22). Server component: getConsultant(slug),
// notFound() for unknown slugs; data via lib/data, components by props.
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getConsultant } from '@/lib/data'
import {
  Avatar,
  Badge,
  Button,
  EmptyState,
  Eyebrow,
  RankBadge,
  StarRating,
  StatBlock,
  Tag,
  VerifiedBadge,
} from '@/components/ui'
import { IconPin, IconTrophy } from '@/components/ui/icons'
import { PropertyCard, Reveal, ReviewItem, ScoreBreakdown } from '@/components'
import { ProfileContact } from '@/components/consultores/ProfileContact'

export default async function ConsultantProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const consultant = await getConsultant(slug)
  if (!consultant) notFound()

  const t = await getTranslations({ locale, namespace: 'profile' })
  const ts = await getTranslations({ locale, namespace: 'score' })
  const tspec = await getTranslations({ locale, namespace: 'specializations' })

  const score = consultant.score
  const confident = !!score && !score.risingTalent && score.confidence !== 'low'
  const serviceRegion = consultant.serviceRegionIds[0]

  return (
    <section className="bg-transparent">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* ---- Content ---- */}
          <div className="space-y-12 pb-24 lg:pb-0">
            {/* Header */}
            <Reveal>
              <header className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <Avatar src={consultant.photo} name={consultant.name} size="xl" ring />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-section text-cream">{consultant.name}</h1>
                    {consultant.verified ? (
                      <VerifiedBadge variant="seal" sealSize={44} label={ts('verified')} />
                    ) : null}
                  </div>

                  {/* Work-area line (Decision #93, Cycle 4) — most-specific coverage level; hidden if absent. */}
                  {consultant.workArea ? (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-cream-muted">
                      <IconPin className="text-sm text-gold" aria-hidden />
                      {ts(`worksIn.${consultant.workArea.level}`, { area: consultant.workArea.name })}
                    </p>
                  ) : null}

                  {/* Standing badge — rank/top gated by #18 (confident only); Rising always */}
                  {score ? (
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {score.risingTalent ? (
                        <Badge variant="rising">{ts('risingTalent')}</Badge>
                      ) : confident && score.rank === 1 ? (
                        <Badge variant="gold" iconLeft={<IconTrophy />}>{ts('topThisMonth')}</Badge>
                      ) : confident && score.rank ? (
                        <RankBadge rank={score.rank} label={ts('rank')} />
                      ) : null}
                    </div>
                  ) : null}

                  {/* Header stats */}
                  {score ? (
                    <div className="mt-5 flex flex-wrap gap-8">
                      <StatBlock value={`${score.sub.closeRate}%`} label={ts('closeRate')} />
                      <StatBlock value={score.sub.satisfaction} label={ts('satisfaction')} />
                      <StatBlock value={score.sub.responsiveness} label={ts('responsiveness')} />
                    </div>
                  ) : null}

                  <a href="#contact" className="mt-6 hidden lg:inline-block">
                    <Button>{t('contact')}</Button>
                  </a>
                </div>

                {/* Merit score (Decision #18): the gold numeral only when confident, else building */}
                {score ? (
                  <div className="shrink-0 sm:text-right">
                    {confident ? (
                      <>
                        <p className="gold-title font-display text-[38px] font-semibold leading-none">
                          {score.composite}
                        </p>
                        <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cream-muted">
                          {ts('merit90d')}
                        </p>
                      </>
                    ) : (
                      <Badge variant="neutral">{ts('buildingTrackRecord')}</Badge>
                    )}
                  </div>
                ) : null}
              </header>
            </Reveal>

            {/* Performance panel */}
            {score ? (
              <Reveal>
                <section aria-labelledby="perf">
                  <Eyebrow>{t('performance')}</Eyebrow>
                  <h2 id="perf" className="mt-2 text-subsection text-cream">{ts('composite')}</h2>
                  <ScoreBreakdown score={score} className="mt-4 max-w-xl" />
                </section>
              </Reveal>
            ) : null}

            {/* About */}
            <Reveal>
              <section aria-labelledby="about">
                <Eyebrow>{t('about')}</Eyebrow>
                <h2 id="about" className="mt-2 text-subsection text-cream">{consultant.name}</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-cream-muted">{consultant.bio}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {consultant.specializations.map((s) => (
                    <Tag key={s}>{tspec(s)}</Tag>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Listings */}
            <section aria-labelledby="listings">
              <h2 id="listings" className="text-subsection text-cream">{t('listings')}</h2>
              {consultant.listings.length > 0 ? (
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {consultant.listings.map((l, i) => (
                    <PropertyCard key={l.id} listing={l} index={i} />
                  ))}
                </div>
              ) : (
                <EmptyState title={t('noListings')} className="mt-5" />
              )}
            </section>

            {/* Reviews */}
            <Reveal>
              <section aria-labelledby="reviews">
                <h2 id="reviews" className="text-subsection text-cream">{t('reviews')}</h2>
                {consultant.reviewCount > 0 ? (
                  <>
                    <div className="mt-3 flex items-center gap-3">
                      <StarRating value={consultant.avgRating ?? 0} size="lg" label={t('reviews')} />
                      <span className="font-display text-cream">
                        {consultant.avgRating?.toFixed(1)}
                      </span>
                      <span className="text-meta text-cream-muted">
                        ({consultant.reviewCount} {ts('reviews')})
                      </span>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {consultant.reviews.map((r) => (
                        <ReviewItem key={r.id} review={r} />
                      ))}
                    </div>
                  </>
                ) : (
                  // Diogo (0 reviews) — #18-consistent "building track record" empty state.
                  <EmptyState title={ts('noReviews')} description={ts('buildingTrackRecord')} className="mt-5" />
                )}
              </section>
            </Reveal>
          </div>

          {/* ---- Contact (sticky desktop / sticky-bar mobile) ---- */}
          <aside>
            <ProfileContact
              consultantId={consultant.id}
              consultantName={consultant.name}
              regionId={serviceRegion}
            />
          </aside>
        </div>
      </div>
    </section>
  )
}

// Property detail — /imovel/[id] (PT) · /en/property/[id] (EN). Presents one listing and converts
// to a lead. Server component: getListing(id) → notFound() for unknown/inactive ids; similar via the
// additive getSimilarListings (same concelho → distrito, CAOP). Location shown Freguesia · Concelho ·
// Distrito from the CAOP loader. Reuses PropertyGallery/PropertyContact (composition) + PropertyCard,
// Avatar, VerifiedBadge, Badge. No map (deferred). Data via lib/data; copy via next-intl.
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import type { LeadIntent, Locale } from '@/lib/types'
import { getListing, getSimilarListings } from '@/lib/data'
import { concelhoDistrito, getConcelho, getDistrito, getFreguesia } from '@/lib/data/geo/caop'
import { formatArea, formatListingPrice } from '@/lib/format'
import { Link } from '@/i18n/navigation'
import { Avatar, Badge, Eyebrow, VerifiedBadge } from '@/components/ui'
import { IconArea, IconArrowRight, IconBath, IconBed, IconBolt, IconPin } from '@/components/ui/icons'
import { PropertyCard, Reveal } from '@/components'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { PropertyContact } from '@/components/property/PropertyContact'

export default async function ImovelPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const listing = await getListing(id)
  if (!listing) notFound()

  const t = await getTranslations({ locale, namespace: 'property' })
  const tl = await getTranslations({ locale, namespace: 'listing' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const ts = await getTranslations({ locale, namespace: 'score' })
  const tk = await getTranslations({ locale, namespace: 'discovery' })

  const loc = locale as Locale
  const concelhoId = listing.freguesiaId.slice(0, 4)
  const distritoId = concelhoDistrito(concelhoId)
  const locationParts = [
    getFreguesia(listing.freguesiaId)?.name,
    getConcelho(concelhoId)?.name,
    distritoId ? getDistrito(distritoId)?.name : undefined,
  ].filter((p): p is string => Boolean(p))

  const similar = await getSimilarListings(listing)

  const agent = listing.agent
  const score = agent.score
  const confident = !!score && !score.risingTalent && score.confidence !== 'low'
  const intent: LeadIntent = listing.type === 'rent' ? 'rent' : 'buy'

  const specs = [
    { icon: <IconBed aria-hidden />, value: listing.beds, label: tl('beds') },
    { icon: <IconBath aria-hidden />, value: listing.baths, label: tl('baths') },
    { icon: <IconArea aria-hidden />, value: formatArea(listing.areaM2, loc), label: tl('area') },
    { icon: null, value: tk(`f.kinds.${listing.kind}`), label: t('specType') },
  ]

  return (
    <section className="bg-transparent">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* ---- Content ---- */}
          <div className="space-y-10 pb-24 lg:pb-0">
            <Reveal className="space-y-6">
              <PropertyGallery media={listing.media} alt={listing.title} />

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-card-solid)] px-2.5 py-1 text-[11.5px] font-semibold text-cream">
                    {listing.type === 'sale' ? tl('forSale') : tl('forRent')}
                  </span>
                  {listing.isDemo ? (
                    <span className="inline-flex items-center rounded-full border border-[var(--gold-border)] bg-[var(--surface-card-solid)] px-2.5 py-1 text-[11.5px] font-semibold tracking-[0.02em] text-[var(--gold-300)]">
                      {tc('demoBadge')}
                    </span>
                  ) : null}
                </div>

                <h1 className="mt-3 text-section text-cream">{listing.title}</h1>
                <p className="mt-2 flex items-center gap-1.5 text-cream-muted">
                  <IconPin className="text-base" aria-hidden /> {locationParts.join(' · ')}
                </p>
                <p className="gold-title mt-4 font-display text-[40px] font-semibold leading-none">
                  {formatListingPrice(listing.price, listing.type, loc, tl('perMonth'))}
                </p>
              </div>
            </Reveal>

            {/* Specs */}
            <Reveal>
              <ul className="flex flex-wrap gap-x-8 gap-y-4 border-y border-line py-5 text-cream-muted">
                {specs.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {s.icon ? <span className="text-lg text-gold">{s.icon}</span> : null}
                    <b className="font-semibold text-cream">{s.value}</b>
                    <span className="text-meta">{s.label}</span>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--green-border)] bg-[var(--surface-card-solid)] px-2.5 py-1 text-verified"
                    title={tl('energyCert')}
                  >
                    <IconBolt className="text-base" aria-hidden />
                    <b className="font-semibold">{listing.energyCert}</b>
                    <span className="sr-only">{tl('energyCert')}</span>
                  </span>
                </li>
              </ul>
            </Reveal>

            {/* Description */}
            <Reveal>
              <section aria-labelledby="descr">
                <Eyebrow>{t('description')}</Eyebrow>
                <h2 id="descr" className="sr-only">
                  {t('description')}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-cream-muted">{listing.description}</p>
              </section>
            </Reveal>

            {/* Attributed consultant mini-card */}
            <Reveal>
              <section aria-labelledby="consultant">
                <Eyebrow>{t('consultant')}</Eyebrow>
                <h2 id="consultant" className="sr-only">
                  {t('consultant')}
                </h2>
                <Link
                  href={{ pathname: '/consultores/[slug]', params: { slug: agent.slug } }}
                  className="group mt-3 flex items-center gap-4 rounded-[var(--card-radius)] border border-line bg-[var(--surface-card-solid)] p-5 transition-colors hover:border-[var(--gold-border-soft)]"
                >
                  <Avatar name={agent.name} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-cream">
                      <span className="truncate font-semibold">{agent.name}</span>
                      {agent.verified ? <VerifiedBadge size="sm" label={ts('verified')} /> : null}
                    </p>
                    {score ? (
                      confident ? (
                        <p className="mt-1 flex items-baseline gap-1.5">
                          <span className="gold-title font-display text-2xl font-semibold leading-none">{score.composite}</span>
                          <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cream-muted">
                            {ts('merit90d')}
                          </span>
                        </p>
                      ) : (
                        <span className="mt-1 inline-block">
                          <Badge variant="neutral">{ts('buildingTrackRecord')}</Badge>
                        </span>
                      )
                    ) : null}
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--gold-300)] transition-[gap] group-hover:gap-2.5">
                    {t('viewProfile')} <IconArrowRight className="text-base" aria-hidden />
                  </span>
                </Link>
              </section>
            </Reveal>
          </div>

          {/* ---- Contact (sticky desktop / sticky-bar mobile) ---- */}
          <aside>
            <PropertyContact
              propertyId={listing.id}
              agentId={agent.id}
              agentName={agent.name}
              intent={intent}
              regionId={listing.regionId}
            />
          </aside>
        </div>

        {/* Similar listings */}
        {similar.length > 0 ? (
          <section aria-labelledby="similar" className="mt-16">
            <h2 id="similar" className="text-subsection text-cream">
              {t('similar')}
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((l, i) => (
                <PropertyCard key={l.id} listing={l} index={i} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  )
}

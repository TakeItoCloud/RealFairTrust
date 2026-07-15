// Discovery — shared property-discovery body for /comprar (sale, total) and /arrendar (rent, €/mês).
// Server component: reads filters (incl. the CAOP location chain) from the URL, fetches via lib/data,
// and renders header + FilterBar + results. Location is Distrito→Concelho→Freguesia (CAOP2025,
// standalone; the old Region model is untouched). If the chosen location has no houses it widens
// freguesia→concelho→distrito ("nearby", grouped, re-sortable via the sort control) and surfaces an
// area-specialist CTA (a consultant attributed to that distrito). Copy via next-intl; merit default.
import { getTranslations } from 'next-intl/server'
import type { ConsultantSummary, ListingSort, ListingType, ListingWithAgent, PropertyKind } from '@/lib/types'
import { getConsultants, getListings } from '@/lib/data'
import { concelhoDistrito, getConcelho, getDistrito, getFreguesia } from '@/lib/data/geo/caop'
import { AREA_BANDS, KIND_VALUES, PRICE_BANDS, SORT_VALUES, findBand } from '@/lib/listingFilters'
import { Link } from '@/i18n/navigation'
import { Button, EmptyState, Eyebrow, SectionWrapper } from '@/components/ui'
import { IconArrowRight, IconPin, IconSearch, IconVerified } from '@/components/ui/icons'
import { FilterBar, PropertyCard, Reveal, UrlPagination } from '@/components'
import { ClearFiltersButton } from './ClearFiltersButton'

const PAGE_SIZE = 9

function str(v: string | string[] | undefined): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined
}

interface WideGroup {
  level: 'concelho' | 'distrito' | 'other'
  name?: string
  items: ListingWithAgent[]
}

export async function Discovery({
  dealType,
  params,
  searchParams,
}: {
  dealType: ListingType
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const sp = await searchParams
  const t = await getTranslations({ locale, namespace: 'discovery' })
  const ts = await getTranslations({ locale, namespace: 'score' })

  // --- Filters from the URL ---
  const kindRaw = str(sp.kind)
  const kind = KIND_VALUES.includes(kindRaw as PropertyKind) ? (kindRaw as PropertyKind) : undefined
  const beds = str(sp.beds) ? Number(str(sp.beds)) : undefined
  const priceBand = findBand(PRICE_BANDS[dealType], str(sp.price))
  const areaBand = findBand(AREA_BANDS, str(sp.area))
  const sortRaw = str(sp.sort)
  const sort: ListingSort = SORT_VALUES.includes(sortRaw as ListingSort) ? (sortRaw as ListingSort) : 'merit'
  const page = Math.max(1, Number(str(sp.page)) || 1)

  // --- CAOP location chain ---
  const freguesiaId = str(sp.freguesia)
  const concelhoId = str(sp.concelho) ?? (freguesiaId ? freguesiaId.slice(0, 4) : undefined)
  const distritoId = str(sp.distrito) ?? (concelhoId ? concelhoDistrito(concelhoId) : undefined)
  const hasLocation = Boolean(str(sp.freguesia) || str(sp.concelho) || str(sp.distrito))

  const distritoNode = distritoId ? getDistrito(distritoId) : undefined
  const concelhoNode = concelhoId ? getConcelho(concelhoId) : undefined
  const freguesiaNode = freguesiaId ? getFreguesia(freguesiaId) : undefined
  const location = {
    distrito: distritoNode ? { id: distritoNode.id, name: distritoNode.name } : undefined,
    concelho: concelhoNode ? { id: concelhoNode.id, name: concelhoNode.name } : undefined,
    freguesia: freguesiaNode ? { id: freguesiaNode.id, name: freguesiaNode.name } : undefined,
  }

  // Base filter (everything except location), reused for the primary query + the nearby widening.
  const base = {
    type: dealType,
    kind,
    minPrice: priceBand?.min,
    maxPrice: priceBand?.max,
    minArea: areaBand?.min,
    maxArea: areaBand?.max,
    beds: Number.isFinite(beds) ? beds : undefined,
    sort,
  }
  const locationFilter = str(sp.freguesia)
    ? { freguesiaId }
    : str(sp.concelho)
      ? { concelhoId: str(sp.concelho) }
      : str(sp.distrito)
        ? { distritoId }
        : {}

  const all = await getListings({ ...base, ...locationFilter })

  // --- Area specialists (consultant attributed to the selected distrito) ---
  const specialists: ConsultantSummary[] = distritoId
    ? (await getConsultants())
        .filter((c) => c.coverageDistrictIds.includes(distritoId))
        .sort((a, b) => (b.score?.composite ?? -1) - (a.score?.composite ?? -1))
    : []
  const specialistName = distritoNode?.name ?? ''

  const totalCount = all.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const from = totalCount === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const to = Math.min(safePage * PAGE_SIZE, totalCount)
  const pageItems = all.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  // --- Nearby fallback (only when a location was chosen and it has no houses) ---
  const groups: WideGroup[] = []
  if (totalCount === 0 && hasLocation) {
    const shown = new Set<string>()
    const add = (items: ListingWithAgent[]) => items.filter((i) => !shown.has(i.id))
    if (freguesiaId && concelhoId) {
      const fresh = add(await getListings({ ...base, concelhoId }))
      if (fresh.length) {
        fresh.forEach((i) => shown.add(i.id))
        groups.push({ level: 'concelho', name: concelhoNode?.name, items: fresh })
      }
    }
    if ((freguesiaId || str(sp.concelho)) && distritoId) {
      const fresh = add(await getListings({ ...base, distritoId }))
      if (fresh.length) {
        fresh.forEach((i) => shown.add(i.id))
        groups.push({ level: 'distrito', name: distritoNode?.name, items: fresh })
      }
    }
    if (groups.length === 0) {
      const fresh = add(await getListings({ ...base }))
      if (fresh.length) groups.push({ level: 'other', items: fresh })
    }
  }

  const specialistBlock =
    specialists.length > 0 ? (
      <SpecialistCTA
        top={specialists[0]}
        extra={specialists.length - 1}
        labels={{
          eyebrow: t('specialist.eyebrow', { distrito: specialistName }),
          view: t('specialist.view'),
          more: t('specialist.more', { count: specialists.length - 1 }),
          workArea: specialists[0].workArea
            ? ts(`worksIn.${specialists[0].workArea.level}`, { area: specialists[0].workArea.name })
            : undefined,
        }}
      />
    ) : null

  return (
    <>
      {/* Header */}
      <SectionWrapper tone="dark" size="sm">
        <div className="max-w-2xl">
          <Eyebrow>{t(`eyebrow.${dealType}`)}</Eyebrow>
          <h1 className="mt-3 text-section text-cream">{t(`title.${dealType}`)}</h1>
          <p className="mt-3 text-lg text-cream-muted">{t('subtitle')}</p>
          <p className="mt-3 text-meta font-semibold text-gold" aria-live="polite">
            {t('count', { count: totalCount })}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper tone="dark" size="sm">
        <FilterBar dealType={dealType} location={location} totalCount={totalCount} from={from} to={to} />
        <p className="mt-2 text-[11.5px] text-cream-muted/80">{t('geoAttribution')}</p>

        {/* Direct-hit specialist CTA sits near the top of the results. */}
        {totalCount > 0 && specialistBlock ? <div className="mt-6">{specialistBlock}</div> : null}

        <section aria-label={t(`title.${dealType}`)} className="mt-8">
          {totalCount > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((l, i) => (
                  <PropertyCard key={l.id} listing={l} index={i} />
                ))}
              </div>
              <UrlPagination totalPages={totalPages} className="mt-10 justify-center" />
            </>
          ) : hasLocation ? (
            /* Nearby fallback */
            <div className="flex flex-col gap-8">
              <Reveal className="rounded-[var(--radius-lg)] border border-[var(--gold-border-soft)] bg-[var(--surface-card-solid)] px-6 py-8 text-center">
                <p className="font-display text-subsection text-cream">
                  {t('nearby.title', { location: location.freguesia?.name ?? location.concelho?.name ?? location.distrito?.name ?? '' })}
                </p>
                <p className="mx-auto mt-2 max-w-lg text-meta text-cream-muted">{t('nearby.lede')}</p>
              </Reveal>

              {specialistBlock}

              {groups.map((g) => (
                <section key={g.level} aria-label={g.name ?? t('nearby.other')}>
                  <h2 className="mb-4 flex items-center gap-2 text-subsection text-cream">
                    {g.level === 'concelho'
                      ? t('nearby.concelho', { name: g.name ?? '' })
                      : g.level === 'distrito'
                        ? t('nearby.distrito', { name: g.name ?? '' })
                        : t('nearby.other')}
                    <span className="text-meta font-normal text-cream-muted">· {g.items.length}</span>
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((l, i) => (
                      <PropertyCard key={l.id} listing={l} index={i} />
                    ))}
                  </div>
                </section>
              ))}

              {groups.length === 0 ? (
                <EmptyState
                  title={t('empty.title')}
                  description={t('empty.body')}
                  icon={<IconSearch />}
                  action={<ClearFiltersButton label={t('empty.clear')} />}
                />
              ) : null}
            </div>
          ) : (
            /* No location, filters returned nothing */
            <EmptyState
              title={t('empty.title')}
              description={t('empty.body')}
              icon={<IconSearch />}
              action={<ClearFiltersButton label={t('empty.clear')} />}
            />
          )}
        </section>
      </SectionWrapper>

      {/* Consultant CTA band */}
      <SectionWrapper tone="dark" size="md">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--gold-border)] px-6 py-12 text-center md:px-12"
            style={{
              background: 'linear-gradient(135deg, rgba(18,42,79,0.92), rgba(8,20,40,0.96))',
              boxShadow: 'var(--shadow-gold-glow)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-28 h-[420px] w-[420px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(227,168,18,0.18), transparent 70%)' }}
            />
            <div className="relative mx-auto max-w-2xl">
              <Eyebrow>{t('cta.eyebrow')}</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.018em] text-cream sm:text-5xl lg:text-[length:var(--fs-display-2)]">
                {t.rich('cta.title', { gold: (chunks) => <span className="gold-title">{chunks}</span> })}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-cream-muted">{t('cta.body')}</p>
              <div className="mt-7 flex justify-center">
                <Link href="/consultores">
                  <Button size="lg">{t('cta.button')}</Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>
    </>
  )
}

function SpecialistCTA({
  top,
  extra,
  labels,
}: {
  top: ConsultantSummary
  extra: number
  labels: { eyebrow: string; view: string; more: string; workArea?: string }
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--gold-border-soft)] bg-[var(--surface-card-solid)] px-5 py-4">
      <div className="min-w-0 flex-1">
        <Eyebrow>{labels.eyebrow}</Eyebrow>
        <p className="mt-1.5 flex items-center gap-1.5 text-cream">
          <span className="font-semibold">{top.name}</span>
          {top.verified ? <IconVerified className="text-base text-verified" aria-hidden /> : null}
          {extra > 0 ? <span className="text-meta text-cream-muted">· {labels.more}</span> : null}
        </p>
        {/* Work-area line (Decision #93, Cycle 4) — most-specific coverage level; hidden if absent. */}
        {labels.workArea ? (
          <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-medium text-cream-muted">
            <IconPin className="text-sm text-gold" aria-hidden />
            {labels.workArea}
          </p>
        ) : null}
      </div>
      <Link
        href={{ pathname: '/consultores/[slug]', params: { slug: top.slug } }}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold-300)] underline-offset-4 hover:underline"
      >
        {labels.view} <IconArrowRight className="text-base" aria-hidden />
      </Link>
    </div>
  )
}

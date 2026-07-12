// Discovery — the shared property-discovery page body for /comprar (Buy, total price) and
// /arrendar (Rent, €/month). One template, two modes keyed off `dealType`. Server component:
// reads filters from the URL, fetches via lib/data (getListings with explicit sort — merit
// default, #78), slices to PAGE_SIZE, and renders header + FilterBar + PropertyCard grid +
// pagination + a consultant CTA band, with a "no results" empty state. Mirrors the Consultores
// RSC pattern. Copy via next-intl; deal type is route-fixed, so it is not a filter control.
import { getTranslations } from 'next-intl/server'
import type { ListingSort, ListingType, PropertyKind } from '@/lib/types'
import { getListings, getRegions } from '@/lib/data'
import { AREA_BANDS, KIND_VALUES, PRICE_BANDS, SORT_VALUES, findBand } from '@/lib/listingFilters'
import { Link } from '@/i18n/navigation'
import { Button, EmptyState, Eyebrow, SectionWrapper } from '@/components/ui'
import { IconSearch } from '@/components/ui/icons'
import { FilterBar, PropertyCard, Reveal, UrlPagination } from '@/components'
import { ClearFiltersButton } from './ClearFiltersButton'

const PAGE_SIZE = 9

function str(v: string | string[] | undefined): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined
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

  // Parse + validate the URL filters (unknown values fall back to "no filter").
  const regionId = str(sp.region)
  const zoneId = str(sp.zone)
  const kindRaw = str(sp.kind)
  const kind = KIND_VALUES.includes(kindRaw as PropertyKind) ? (kindRaw as PropertyKind) : undefined
  const beds = str(sp.beds) ? Number(str(sp.beds)) : undefined
  const priceBand = findBand(PRICE_BANDS[dealType], str(sp.price))
  const areaBand = findBand(AREA_BANDS, str(sp.area))
  const sortRaw = str(sp.sort)
  const sort: ListingSort = SORT_VALUES.includes(sortRaw as ListingSort) ? (sortRaw as ListingSort) : 'merit'
  const page = Math.max(1, Number(str(sp.page)) || 1)

  const [cities, zones, all] = await Promise.all([
    getRegions('city'),
    getRegions('zone'),
    getListings({
      type: dealType,
      regionId,
      zoneId,
      kind,
      beds: Number.isFinite(beds) ? beds : undefined,
      minPrice: priceBand?.min,
      maxPrice: priceBand?.max,
      minArea: areaBand?.min,
      maxArea: areaBand?.max,
      sort,
    }),
  ])

  const totalCount = all.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const from = totalCount === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const to = Math.min(safePage * PAGE_SIZE, totalCount)
  const pageItems = all.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <>
      {/* Header — eyebrow + per-mode title + live result count */}
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

      {/* Filters + results */}
      <SectionWrapper tone="dark" size="sm">
        <FilterBar dealType={dealType} cities={cities} zones={zones} totalCount={totalCount} from={from} to={to} />

        <section aria-label={t(`title.${dealType}`)} className="mt-8">
          {pageItems.length === 0 ? (
            <EmptyState
              title={t('empty.title')}
              description={t('empty.body')}
              icon={<IconSearch />}
              action={<ClearFiltersButton label={t('empty.clear')} />}
            />
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((l, i) => (
                  <PropertyCard key={l.id} listing={l} index={i} />
                ))}
              </div>
              <UrlPagination totalPages={totalPages} className="mt-10 justify-center" />
            </>
          )}
        </section>
      </SectionWrapper>

      {/* Consultant CTA band — gold-glow navy panel (reuses the Home #73 pattern) */}
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

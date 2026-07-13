'use client'

// FilterBar — property discovery filters whose state lives in the URL query (shareable,
// back-button friendly). Reused across /comprar + /arrendar; the `dealType` prop is the
// Buy/Rent mode distinction (drives the price bands + price label). Deal type itself is
// route-fixed, so there is no deal-type control here. Selects commit immediately and reset
// pagination; the second row shows the result range + sort. Reads initial values from the query.
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import type { ListingType, Locale, Region } from '@/lib/types'
import { cn } from '@/lib/cn'
import { formatArea, formatPrice } from '@/lib/format'
import { AREA_BANDS, BED_VALUES, KIND_VALUES, PRICE_BANDS, SORT_VALUES, type Band } from '@/lib/listingFilters'
import { Button, Select } from '@/components/ui'
import type { SelectOption } from '@/components/ui'

interface FilterBarProps {
  /** Buy/Rent mode — route-fixed. Drives the price bands + price label. */
  dealType: ListingType
  /** City-level regions for the "Localização" select. */
  cities: Region[]
  /** All live zones; the select scopes them to the selected city. */
  zones?: Region[]
  totalCount: number
  /** 1-based range of the current page, for the "showing x–y of n" line. */
  from: number
  to: number
  className?: string
}

// Non-empty sentinels for the "no filter" option of each Select (Radix forbids value="").
const ALL = 'all'
const ANY = 'any'

export function FilterBar({ dealType, cities, zones = [], totalCount, from, to, className }: FilterBarProps) {
  const t = useTranslations('discovery')
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentCity = searchParams.get('region') ?? ALL
  const currentZone = searchParams.get('zone') ?? ALL
  const currentKind = searchParams.get('kind') ?? ALL
  const currentPrice = searchParams.get('price') ?? ALL
  const currentArea = searchParams.get('area') ?? ALL
  const currentBeds = searchParams.get('beds') ?? ANY
  const currentSort = searchParams.get('sort') ?? 'merit'

  // Any change resets pagination (drops the page param).
  function commit(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value)
      else params.delete(key)
    }
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  function clearAll() {
    router.replace(pathname, { scroll: false })
  }

  // Zones scoped to the selected city (all zones when no city is chosen).
  const scopedZones = currentCity === ALL ? zones : zones.filter((z) => z.parentId === currentCity)

  const priceLabel = (b: Band): string => {
    const f = (n: number) => formatPrice(n, locale)
    if (b.min != null && b.max != null) return `${f(b.min)} – ${f(b.max)}`
    if (b.max != null) return t('f.upTo', { value: f(b.max) })
    return t('f.over', { value: f(b.min!) })
  }
  const areaLabel = (b: Band): string => {
    if (b.min != null && b.max != null) return `${b.min} – ${formatArea(b.max, locale)}`
    if (b.max != null) return t('f.upTo', { value: formatArea(b.max, locale) })
    return t('f.over', { value: formatArea(b.min!, locale) })
  }

  const cityOptions: SelectOption[] = [
    { value: ALL, label: t('f.locationAll') },
    ...cities.map((c) => ({ value: c.id, label: c.name })),
  ]
  const zoneOptions: SelectOption[] = [
    { value: ALL, label: t('f.zoneAll') },
    ...scopedZones.map((z) => ({ value: z.id, label: z.name })),
  ]
  const kindOptions: SelectOption[] = [
    { value: ALL, label: t('f.kindAll') },
    ...KIND_VALUES.map((k) => ({ value: k, label: t(`f.kinds.${k}`) })),
  ]
  const priceOptions: SelectOption[] = [
    { value: ALL, label: t('f.priceAll') },
    ...PRICE_BANDS[dealType].map((b) => ({ value: b.key, label: priceLabel(b) })),
  ]
  const areaOptions: SelectOption[] = [
    { value: ALL, label: t('f.areaAll') },
    ...AREA_BANDS.map((b) => ({ value: b.key, label: areaLabel(b) })),
  ]
  const bedsOptions: SelectOption[] = [
    { value: ANY, label: t('f.bedsAny') },
    ...BED_VALUES.map((n) => ({ value: String(n), label: n === 4 ? 'T4+' : `T${n}+` })),
  ]
  const sortOptions: SelectOption[] = SORT_VALUES.map((s) => ({ value: s, label: t(`f.sortOptions.${s}`) }))

  const field = 'flex min-w-[8.5rem] flex-1 flex-col gap-1.5 text-xs font-medium text-cream-muted'

  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-line bg-[var(--surface-inset)] p-5 shadow-[inset_0_1px_0_rgba(245,241,234,0.04)]',
        className,
      )}
    >
      <div className="flex flex-wrap items-end gap-3">
        <label className={field}>
          {t('f.location')}
          <Select
            options={cityOptions}
            value={currentCity}
            onValueChange={(v) => commit({ region: v === ALL ? undefined : v, zone: undefined })}
            aria-label={t('f.location')}
          />
        </label>

        <label className={field}>
          {t('f.zone')}
          <Select
            options={zoneOptions}
            value={scopedZones.some((z) => z.id === currentZone) ? currentZone : ALL}
            onValueChange={(v) => commit({ zone: v === ALL ? undefined : v })}
            aria-label={t('f.zone')}
          />
        </label>

        <label className={field}>
          {t('f.kind')}
          <Select
            options={kindOptions}
            value={currentKind}
            onValueChange={(v) => commit({ kind: v === ALL ? undefined : v })}
            aria-label={t('f.kind')}
          />
        </label>

        <label className={field}>
          {dealType === 'rent' ? t('f.priceRent') : t('f.price')}
          <Select
            options={priceOptions}
            value={currentPrice}
            onValueChange={(v) => commit({ price: v === ALL ? undefined : v })}
            aria-label={dealType === 'rent' ? t('f.priceRent') : t('f.price')}
          />
        </label>

        <label className={field}>
          {t('f.area')}
          <Select
            options={areaOptions}
            value={currentArea}
            onValueChange={(v) => commit({ area: v === ALL ? undefined : v })}
            aria-label={t('f.area')}
          />
        </label>

        <label className={cn(field, 'min-w-[7rem] flex-none')}>
          {t('f.beds')}
          <Select
            options={bedsOptions}
            value={currentBeds}
            onValueChange={(v) => commit({ beds: v === ANY ? undefined : v })}
            aria-label={t('f.beds')}
          />
        </label>

        <Button variant="ghost" size="sm" onClick={clearAll} className="ml-auto self-end">
          {t('f.clear')}
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <p className="text-meta text-cream-muted" aria-live="polite">
          {t('showing', { from, to, count: totalCount })}
        </p>
        <label className="flex items-center gap-2 text-meta font-medium text-cream-muted">
          {t('f.sort')}
          <Select
            options={sortOptions}
            value={currentSort}
            onValueChange={(v) => commit({ sort: v === 'merit' ? undefined : v })}
            aria-label={t('f.sort')}
            className="w-40"
          />
        </label>
      </div>
    </div>
  )
}

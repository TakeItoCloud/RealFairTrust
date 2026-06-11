'use client'

// FilterBar — listing filters whose state lives in the URL query (shareable, back-button
// friendly). Selects commit immediately; text inputs commit on blur/Enter. Reads its
// initial values from the current query string.
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { ListingType, Region } from '@/lib/types'
import { cn } from '@/lib/cn'
import { Button, Input, Select } from '@/components/ui'
import { focusRing } from '@/components/ui/styles'

interface FilterBarProps {
  /** City-level regions for the area select. */
  regions: Region[]
  resultCount?: number
  className?: string
}

const TYPES: (ListingType | 'all')[] = ['all', 'sale', 'rent']
const BEDS = ['1', '2', '3', '4']

// Non-empty sentinels for the "no filter" option of each Select (Radix forbids value="").
const REGION_ALL = 'all'
const BEDS_ANY = 'any'

export function FilterBar({ regions, resultCount, className }: FilterBarProps) {
  const t = useTranslations('filter')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [q, setQ] = useState(searchParams.get('q') ?? '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '')

  // Radix Select forbids an empty-string item value (it's reserved for clearing), so the
  // "all/any" options use non-empty sentinels. A sentinel means "no filter": it's never
  // written to the URL, and an absent param maps back to the sentinel so that option shows.
  const currentType = searchParams.get('type') ?? 'all'
  const currentRegion = searchParams.get('region') ?? REGION_ALL
  const currentBeds = searchParams.get('beds') ?? BEDS_ANY

  function commit(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value)
      else params.delete(key)
    }
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  function clearAll() {
    setQ('')
    setMinPrice('')
    setMaxPrice('')
    router.replace(pathname, { scroll: false })
  }

  const regionOptions = [
    { value: REGION_ALL, label: t('allRegions') },
    ...regions.map((r) => ({ value: r.id, label: r.name })),
  ]
  const bedsOptions = [
    { value: BEDS_ANY, label: t('anyBeds') },
    ...BEDS.map((b) => ({ value: b, label: `${b}+` })),
  ]

  return (
    <div className={cn('rounded-lg border border-line bg-surface p-4', className)}>
      <div className="flex flex-wrap items-end gap-3">
        {/* Type segmented control */}
        <div role="group" aria-label={t('type')} className="inline-flex rounded-md border border-line p-0.5">
          {TYPES.map((type) => {
            const active = currentType === type
            return (
              <button
                key={type}
                type="button"
                aria-pressed={active}
                onClick={() => commit({ type: type === 'all' ? undefined : type })}
                className={cn(
                  'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
                  active ? 'bg-gold text-ink' : 'text-cream-muted hover:text-cream',
                  focusRing,
                )}
              >
                {t(type)}
              </button>
            )
          })}
        </div>

        <label className="flex flex-col gap-1 text-xs text-cream-muted">
          {t('region')}
          <Select
            options={regionOptions}
            value={currentRegion}
            onValueChange={(v) => commit({ region: v === REGION_ALL ? undefined : v })}
            aria-label={t('region')}
            className="w-44"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-cream-muted">
          {t('beds')}
          <Select
            options={bedsOptions}
            value={currentBeds}
            onValueChange={(v) => commit({ beds: v === BEDS_ANY ? undefined : v })}
            aria-label={t('beds')}
            className="w-28"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-cream-muted">
          {t('minPrice')}
          <Input
            type="number"
            inputMode="numeric"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={() => commit({ minPrice: minPrice || undefined })}
            onKeyDown={(e) => e.key === 'Enter' && commit({ minPrice: minPrice || undefined })}
            aria-label={t('minPrice')}
            className="w-28"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-cream-muted">
          {t('maxPrice')}
          <Input
            type="number"
            inputMode="numeric"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={() => commit({ maxPrice: maxPrice || undefined })}
            onKeyDown={(e) => e.key === 'Enter' && commit({ maxPrice: maxPrice || undefined })}
            aria-label={t('maxPrice')}
            className="w-28"
          />
        </label>

        <label className="flex flex-1 flex-col gap-1 text-xs text-cream-muted">
          {t('search')}
          <Input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={() => commit({ q: q || undefined })}
            onKeyDown={(e) => e.key === 'Enter' && commit({ q: q || undefined })}
            aria-label={t('search')}
            className="min-w-40"
          />
        </label>

        <Button variant="ghost" size="sm" onClick={clearAll}>
          {t('clear')}
        </Button>
      </div>

      {resultCount !== undefined ? (
        <p className="mt-3 text-sm text-cream-muted" aria-live="polite">
          {t('results', { count: resultCount })}
        </p>
      ) : null}
    </div>
  )
}

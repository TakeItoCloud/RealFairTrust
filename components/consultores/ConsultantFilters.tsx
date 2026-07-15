'use client'

// ConsultantFilters — CAOP location picker + specialization select and a Ranked/All toggle, all
// synced to the URL query (like FilterBar). Sentinels ('all') mean "no filter" and are never
// written to the URL; changing any filter resets pagination to page 1. The location picker
// (Distrito→Concelho→Freguesia, coverage mode) replaces the old Region select (Cycle 3, Decision #92);
// it reuses the exact discovery LocationPicker and writes ?distrito/?concelho/?freguesia.
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { Specialization } from '@/lib/types'
import { cn } from '@/lib/cn'
import { Select } from '@/components/ui'
import { focusRing } from '@/components/ui/styles'
import { LocationPicker } from '@/components/discovery/LocationPicker'

const SPEC_ALL = 'all'

const SPECIALIZATIONS: Specialization[] = [
  'apartments',
  'luxury',
  'investment',
  'rental',
  'commercial',
  'first-time-buyers',
  'relocation',
  'new-developments',
]

interface Selected {
  id: string
  name: string
}

export function ConsultantFilters({
  location,
}: {
  location: { distrito?: Selected; concelho?: Selected; freguesia?: Selected }
}) {
  const tc = useTranslations('consultores')
  const tspec = useTranslations('specializations')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentSpec = searchParams.get('specialization') ?? SPEC_ALL
  const currentView = searchParams.get('view') === 'all' ? 'all' : 'ranked'
  const sortParam = searchParams.get('sort')
  const currentSort = sortParam === 'houses' || sortParam === 'time' ? sortParam : 'merit'

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

  const specOptions = [
    { value: SPEC_ALL, label: tc('allSpecializations') },
    ...SPECIALIZATIONS.map((s) => ({ value: s, label: tspec(s) })),
  ]
  const sortOptions = [
    { value: 'merit', label: tc('sort.merit') },
    { value: 'houses', label: tc('sort.houses') },
    { value: 'time', label: tc('sort.time') },
  ]

  return (
    <div className="flex flex-wrap items-end justify-between gap-4 rounded-lg border border-line bg-surface p-4">
      <div className="flex flex-wrap items-end gap-3">
        {/* CAOP location picker (coverage mode) — reused from discovery; URL-synced itself.
            everywhereLabel adds the "Todo o país" default option (Cycle 4). */}
        <LocationPicker
          dealType="sale"
          source="coverage"
          everywhereLabel={tc('everywhere')}
          distrito={location.distrito}
          concelho={location.concelho}
          freguesia={location.freguesia}
        />
        <label className="flex flex-col gap-1 text-xs text-cream-muted">
          {tc('specialization')}
          <Select
            options={specOptions}
            value={currentSpec}
            onValueChange={(v) => commit({ specialization: v === SPEC_ALL ? undefined : v })}
            aria-label={tc('specialization')}
            className="w-48"
          />
        </label>
        {/* Sort — All view only (Ranked is the leaderboard, no sort). Cycle 4. */}
        {currentView === 'all' ? (
          <label className="flex flex-col gap-1 text-xs text-cream-muted">
            {tc('sortLabel')}
            <Select
              options={sortOptions}
              value={currentSort}
              onValueChange={(v) => commit({ sort: v === 'merit' ? undefined : v })}
              aria-label={tc('sortLabel')}
              className="w-48"
            />
          </label>
        ) : null}
      </div>

      {/* Ranked / All toggle (ranked is the default → no param) */}
      <div role="group" aria-label={tc('viewRanked')} className="inline-flex rounded-md border border-line p-0.5">
        {(['ranked', 'all'] as const).map((view) => {
          const active = currentView === view
          return (
            <button
              key={view}
              type="button"
              aria-pressed={active}
              onClick={() => commit({ view: view === 'ranked' ? undefined : 'all' })}
              className={cn(
                'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
                active ? 'bg-gold text-ink' : 'text-cream-muted hover:text-cream',
                focusRing,
              )}
            >
              {view === 'ranked' ? tc('viewRanked') : tc('viewAll')}
            </button>
          )
        })}
      </div>
    </div>
  )
}

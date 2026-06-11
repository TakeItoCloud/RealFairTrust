'use client'

// ConsultantFilters — region + specialization selects and a Ranked/All toggle, all synced
// to the URL query (like FilterBar). Sentinels ('all') mean "no filter" and are never
// written to the URL; changing any filter resets pagination to page 1.
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { Region, Specialization } from '@/lib/types'
import { cn } from '@/lib/cn'
import { Select } from '@/components/ui'
import { focusRing } from '@/components/ui/styles'

const REGION_ALL = 'all'
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

export function ConsultantFilters({ regions }: { regions: Region[] }) {
  const tc = useTranslations('consultores')
  const tf = useTranslations('filter')
  const tspec = useTranslations('specializations')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentRegion = searchParams.get('region') ?? REGION_ALL
  const currentSpec = searchParams.get('specialization') ?? SPEC_ALL
  const currentView = searchParams.get('view') === 'all' ? 'all' : 'ranked'

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

  const regionOptions = [
    { value: REGION_ALL, label: tf('allRegions') },
    ...regions.map((r) => ({ value: r.id, label: r.name })),
  ]
  const specOptions = [
    { value: SPEC_ALL, label: tc('allSpecializations') },
    ...SPECIALIZATIONS.map((s) => ({ value: s, label: tspec(s) })),
  ]

  return (
    <div className="flex flex-wrap items-end justify-between gap-4 rounded-lg border border-line bg-surface p-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs text-cream-muted">
          {tf('region')}
          <Select
            options={regionOptions}
            value={currentRegion}
            onValueChange={(v) => commit({ region: v === REGION_ALL ? undefined : v })}
            aria-label={tf('region')}
            className="w-44"
          />
        </label>
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

'use client'

// LocationPicker — Distrito → Concelho → Freguesia drill-down, URL-synced (?distrito/?concelho/
// ?freguesia). Replaces the old Localização + Zona selects. On-demand: each level's options are
// fetched from /api/geo only when that level's popover opens, so the 355 KB CAOP dataset never
// ships to the client. Inventory-driven lists come from the API; selected names are passed in
// from the server (Discovery) so chips render without a fetch. Type-to-search + removable per level.
import { useEffect, useId, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { ListingType } from '@/lib/types'
import { cn } from '@/lib/cn'
import { Input } from '@/components/ui'
import { focusRing } from '@/components/ui/styles'
import { IconChevronDown, IconSearch } from '@/components/ui/icons'

interface GeoOption {
  id: string
  name: string
  hasHouses?: boolean
}
interface Selected {
  id: string
  name: string
}

interface LocationPickerProps {
  dealType: ListingType
  distrito?: Selected
  concelho?: Selected
  freguesia?: Selected
  /** Geo option source (Decision #86 / D-V1). 'houses' (default) = Buy/Rent inventory, unchanged;
   *  'coverage' = houses ∪ consultant-attribution (Vender). */
  source?: 'houses' | 'coverage'
  className?: string
}

const norm = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export function LocationPicker({ dealType, distrito, concelho, freguesia, source = 'houses', className }: LocationPickerProps) {
  const q = `deal=${dealType}&source=${source}`
  const t = useTranslations('discovery')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function commit(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    for (const [k, v] of Object.entries(updates)) {
      if (v) params.set(k, v)
      else params.delete(k)
    }
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <div className={cn('flex flex-wrap items-end gap-3', className)}>
      <GeoLevel
        label={t('f.distrito')}
        placeholder={t('f.distritoAny')}
        selected={distrito}
        loader={() => fetchGeo(`/api/geo/distritos?${q}`)}
        searchPlaceholder={t('f.searchDistrito')}
        emptyText={t('f.noOptions')}
        onSelect={(o) => commit({ distrito: o.id, concelho: undefined, freguesia: undefined })}
        onClear={() => commit({ distrito: undefined, concelho: undefined, freguesia: undefined })}
      />
      <GeoLevel
        label={t('f.concelho')}
        placeholder={t('f.concelhoAny')}
        selected={concelho}
        disabled={!distrito}
        // Re-fetch keyed on the current distrito.
        loaderKey={distrito?.id}
        loader={() => (distrito ? fetchGeo(`/api/geo/concelhos?${q}&distrito=${distrito.id}`) : Promise.resolve([]))}
        searchPlaceholder={t('f.searchConcelho')}
        emptyText={t('f.noOptions')}
        onSelect={(o) => commit({ concelho: o.id, freguesia: undefined })}
        onClear={() => commit({ concelho: undefined, freguesia: undefined })}
      />
      <GeoLevel
        label={t('f.freguesia')}
        placeholder={t('f.freguesiaAny')}
        selected={freguesia}
        disabled={!concelho}
        loaderKey={concelho?.id}
        loader={() => (concelho ? fetchGeo(`/api/geo/freguesias?${q}&concelho=${concelho.id}`) : Promise.resolve([]))}
        searchPlaceholder={t('f.searchFreguesia')}
        emptyText={t('f.noOptions')}
        onSelect={(o) => commit({ freguesia: o.id })}
        onClear={() => commit({ freguesia: undefined })}
      />
    </div>
  )
}

async function fetchGeo(url: string): Promise<GeoOption[]> {
  try {
    const r = await fetch(url)
    if (!r.ok) return []
    return (await r.json()) as GeoOption[]
  } catch {
    return []
  }
}

interface GeoLevelProps {
  label: string
  placeholder: string
  selected?: Selected
  disabled?: boolean
  loader: () => Promise<GeoOption[]>
  loaderKey?: string
  searchPlaceholder: string
  emptyText: string
  onSelect: (o: GeoOption) => void
  onClear: () => void
}

function GeoLevel({
  label, placeholder, selected, disabled, loader, loaderKey, searchPlaceholder, emptyText, onSelect, onClear,
}: GeoLevelProps) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<GeoOption[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fetchedKeyRef = useRef<string | undefined>(undefined)
  const listId = useId()

  function loadOptions() {
    setLoading(true)
    const key = loaderKey
    loader().then((o) => {
      fetchedKeyRef.current = key
      setOptions(o)
      setLoading(false)
    })
  }

  // Toggle from the trigger (event handler — fetches on open, refetching if the parent changed).
  function toggle() {
    if (disabled) return
    const next = !open
    setOpen(next)
    if (next && !loading && (options === null || fetchedKeyRef.current !== loaderKey)) {
      loadOptions()
    }
  }

  // Focus the search box when the panel opens (DOM side-effect only — no state update).
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const filtered = (options ?? []).filter((o) => norm(o.name).includes(norm(query)))

  return (
    <div ref={rootRef} className="relative flex min-w-[9rem] flex-col gap-1.5 text-xs font-medium text-cream-muted">
      <span>{label}</span>
      <div className="flex items-stretch">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          onClick={toggle}
          className={cn(
            'inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] border border-line bg-[var(--surface-inset)] px-4 text-base transition-colors',
            selected ? 'text-cream' : 'text-cream-muted',
            'hover:border-[var(--gold-border-soft)] disabled:cursor-not-allowed disabled:opacity-50',
            focusRing,
          )}
        >
          <span className="truncate">{selected ? selected.name : placeholder}</span>
          {selected ? (
            <span
              role="button"
              tabIndex={0}
              aria-label={`${label}: limpar`}
              onClick={(e) => { e.stopPropagation(); onClear() }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onClear() } }}
              className="shrink-0 rounded-full px-1 text-cream-muted hover:text-cream"
            >
              ✕
            </span>
          ) : (
            <IconChevronDown className="shrink-0 text-lg text-cream-muted" aria-hidden />
          )}
        </button>
      </div>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-1 w-[min(20rem,88vw)] rounded-md border border-line bg-ink-elev p-1 shadow-xl">
          <div className="relative p-1">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-cream-muted" aria-hidden />
            <Input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="pl-9"
            />
          </div>
          <ul id={listId} role="listbox" aria-label={label} className="mt-1 max-h-64 overflow-auto">
            {loading ? (
              <li className="px-3 py-2 text-sm text-cream-muted">…</li>
            ) : filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-cream-muted">{emptyText}</li>
            ) : (
              filtered.map((o) => (
                <li key={o.id} role="option" aria-selected={selected?.id === o.id}>
                  <button
                    type="button"
                    onClick={() => { onSelect(o); setOpen(false); setQuery('') }}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 rounded-sm px-3 py-2 text-left text-sm text-cream hover:bg-gold/15',
                      selected?.id === o.id && 'text-gold',
                    )}
                  >
                    <span className="truncate">{o.name}</span>
                    {o.hasHouses === false ? (
                      <span className="shrink-0 text-[11px] text-cream-muted">○</span>
                    ) : null}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

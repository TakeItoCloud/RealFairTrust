// Consultores — discovery + leaderboard (Phase 4 §4.3.2; Phase 2 wireframe; Decisions
// #26 card grid + subtle rank, #6 separate Rising Talent board for consultants < 6 months).
// Server component: reads filters from the URL, fetches via lib/data, passes objects down.
//
// Cycle 3 (Decision #92): the old Region filter is replaced by the CAOP Distrito→Concelho→Freguesia
// picker. NO location selected → the page behaves exactly as today (full ranked board + Rising strip +
// per-region rank-1 highlight; no metrics). Location selected → both boards are scoped to consultants
// covering that area (getConsultantsByArea — inclusive coverage + strict tiered widening, #86), ranked
// composite-desc with option-(i) confidence handling, the #1 confident consultant highlighted, and the
// Cycle-1 demo metrics turned on. Specialization + Ranked/All still compose on top. Repository unchanged.
import { getTranslations } from 'next-intl/server'
import type { ConsultantSummary, Specialization } from '@/lib/types'
import { getConsultants, getConsultantsByArea } from '@/lib/data'
import { concelhoDistrito, getConcelho, getDistrito, getFreguesia } from '@/lib/data/geo/caop'
import { flags } from '@/lib/flags'
import { Eyebrow, EmptyState, SectionWrapper } from '@/components/ui'
import { ConsultantCard, UrlPagination } from '@/components'
import { ConsultantFilters } from '@/components/consultores/ConsultantFilters'

const PAGE_SIZE = 9

function str(v: string | string[] | undefined): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined
}

/** Confidence gate — verbatim from ConsultantCard/profile (#18): a confidently-shown composite. */
function isConfident(c: ConsultantSummary): boolean {
  return !!c.score && !c.score.risingTalent && c.score.confidence !== 'low'
}

export default async function ConsultoresPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const sp = await searchParams
  const t = await getTranslations({ locale, namespace: 'consultores' })

  const specialization = str(sp.specialization) as Specialization | undefined
  const view = sp.view === 'all' ? 'all' : 'ranked'
  const page = Math.max(1, Number(str(sp.page)) || 1)

  // --- CAOP selection chain from the URL (same params/idiom as the discovery + Vender pickers) ---
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

  // --- Build the two boards (default path == today; location path scopes + ranks) ---
  let mainList: ConsultantSummary[]
  let risingList: ConsultantSummary[]
  let highlightId: string | null = null
  let locationHeader: string | null = null
  let emptyTitle = t('empty')

  if (!hasLocation) {
    // DEFAULT — identical to today (region was already undefined in the default state).
    const [main, rising] = await Promise.all([
      view === 'all'
        ? getConsultants({ specialization })
        : getConsultants({ view: 'ranked', specialization }),
      getConsultants({ risingTalentOnly: true, specialization }),
    ])
    mainList = main
    risingList = rising
  } else {
    // LOCATION — coverage scope FIRST, then specialization, then the ranked/rising split.
    const match = await getConsultantsByArea({
      distritoId: str(sp.distrito),
      concelhoId: str(sp.concelho),
      freguesiaId,
    })
    const scoped = match.consultants.filter(
      (c) => !specialization || c.specializations.includes(specialization),
    )
    risingList = scoped.filter((c) => c.score?.risingTalent)
    const established = scoped.filter((c) => c.score && !c.score.risingTalent)
    const mainScope = view === 'all' ? scoped : established

    // Option (i): building/unscored sink to the bottom and can never be the highlight.
    const confident = mainScope.filter(isConfident)
    mainList = [...confident, ...mainScope.filter((c) => !isConfident(c))]
    highlightId = confident[0]?.id ?? null

    if (match.tier && scoped.length > 0) {
      locationHeader = t(`locationResults.${match.tier}`, { area: match.areaName ?? '' })
    } else if (!match.tier) {
      // No consultant covers the area at any tier → location-specific empty message.
      const areaName =
        location.freguesia?.name ?? location.concelho?.name ?? location.distrito?.name ?? ''
      emptyTitle = t('locationEmpty', { area: areaName })
    }
    // (coverage exists but specialization excluded everyone → generic t('empty') stays)
  }

  // Rising Talent has its own board; in "All" view they appear inline in the main grid,
  // so the separate board only shows in the (default) Ranked view to avoid duplication.
  const showRisingBoard = view !== 'all' && risingList.length > 0

  const totalPages = Math.max(1, Math.ceil(mainList.length / PAGE_SIZE))
  const pageItems = mainList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const scopedCount = mainList.length + risingList.length

  return (
    <>
      <SectionWrapper tone="dark" size="sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1 className="mt-3 text-section text-cream">{t('title')}</h1>
            <p className="mt-3 text-lg text-cream-muted">{t('subtitle')}</p>
          </div>
          {/* "Suggest one for me" — structurally present, gated off until match mode ships. */}
          {flags.matchMode ? (
            <span className="text-sm text-gold">{t('suggestForMe')}</span>
          ) : null}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="dark" size="sm">
        <ConsultantFilters location={location} />

        {/* Location context header (only when a location is selected and there are matches) */}
        {locationHeader ? (
          <h2 className="mt-8 text-subsection text-cream">
            {locationHeader}
            <span className="ml-2 text-meta font-normal text-cream-muted">· {scopedCount}</span>
          </h2>
        ) : null}

        {/* Rising Talent board (separate from the ranking) */}
        {showRisingBoard ? (
          <section aria-labelledby="rising-talent" className="mt-10">
            <h2 id="rising-talent" className="text-subsection text-cream">
              {t('risingTalentTitle')}
            </h2>
            <p className="mt-1 text-meta text-cream-muted">{t('risingTalentSubtitle')}</p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {risingList.map((c, i) => (
                <ConsultantCard key={c.id} consultant={c} index={i} showMetrics={hasLocation} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Main ranked / all grid */}
        <section aria-label={view === 'all' ? t('viewAll') : t('viewRanked')} className="mt-10">
          {pageItems.length === 0 ? (
            <EmptyState title={emptyTitle} />
          ) : (
            <>
              <div className="grid gap-5 lg:grid-cols-2">
                {pageItems.map((c, i) => (
                  <ConsultantCard
                    key={c.id}
                    consultant={c}
                    index={i}
                    featured={hasLocation ? c.id === highlightId : undefined}
                    showMetrics={hasLocation}
                  />
                ))}
              </div>
              <UrlPagination totalPages={totalPages} className="mt-8 justify-center" />
            </>
          )}
        </section>
      </SectionWrapper>
    </>
  )
}

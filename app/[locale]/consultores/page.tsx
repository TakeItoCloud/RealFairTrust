// Consultores — discovery + leaderboard (Phase 4 §4.3.2; Decisions #26, #6).
// Server component: reads filters from the URL, fetches via lib/data, passes objects down.
//
// Cycle 3 (#92): the old Region filter → the CAOP Distrito→Concelho→Freguesia picker; NO location =
// the full national board, location = coverage-scoped (getConsultantsByArea, tiered widening #86).
// Cycle 4 (#93): (a) Ranked view = ranked board FIRST, Rising Talent strip BELOW; (b) All view = one
// grid + a Merit/Houses/Time sort control (metrics visible); (c) an explicit "Everywhere" default
// district option (== today's no-location board); (d) an always-on card work-area line. Metrics are
// now VIEW-BASED: All view = on, Ranked view = off (supersedes #92's location-gating). Repository is
// unchanged except the additive workArea field on ConsultantSummary.
import { getTranslations } from 'next-intl/server'
import type { ConsultantSummary, Specialization } from '@/lib/types'
import { getConsultants, getConsultantsByArea } from '@/lib/data'
import { concelhoDistrito, getConcelho, getDistrito, getFreguesia } from '@/lib/data/geo/caop'
import { flags } from '@/lib/flags'
import { Eyebrow, EmptyState, SectionWrapper } from '@/components/ui'
import { ConsultantCard, UrlPagination } from '@/components'
import { ConsultantFilters } from '@/components/consultores/ConsultantFilters'

const PAGE_SIZE = 9

type SortKey = 'merit' | 'houses' | 'time'

function str(v: string | string[] | undefined): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined
}

/** Confidence gate — verbatim from ConsultantCard/profile (#18): a confidently-shown composite. */
function isConfident(c: ConsultantSummary): boolean {
  return !!c.score && !c.score.risingTalent && c.score.confidence !== 'low'
}

/** All-view sort. Merit = composite desc; Houses = units sold desc; Time = days-to-sell asc.
 *  Missing values sink to the bottom in every key. */
function sortBy(list: ConsultantSummary[], key: SortKey): ConsultantSummary[] {
  const arr = [...list]
  if (key === 'houses') return arr.sort((a, b) => (b.unitsSold12mo ?? -1) - (a.unitsSold12mo ?? -1))
  if (key === 'time') return arr.sort((a, b) => (a.avgDaysToSell ?? Infinity) - (b.avgDaysToSell ?? Infinity))
  return arr.sort((a, b) => (b.score?.composite ?? -1) - (a.score?.composite ?? -1))
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
  // Sort only applies in the All view (Ranked is the leaderboard). Merit is the default.
  const sortRaw = str(sp.sort)
  const sort: SortKey = view === 'all' && (sortRaw === 'houses' || sortRaw === 'time') ? sortRaw : 'merit'
  // Cycle 4: metrics are view-based — All view shows them (drives the demo sorts); Ranked hides them.
  const showMetrics = view === 'all'

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

  // --- Build established / rising / everyone (default path == today; location path scopes) ---
  let established: ConsultantSummary[]
  let rising: ConsultantSummary[]
  let everyone: ConsultantSummary[]
  let locationHeader: string | null = null
  let emptyTitle = t('empty')

  if (!hasLocation) {
    const [est, ris, all] = await Promise.all([
      getConsultants({ view: 'ranked', specialization }),
      getConsultants({ risingTalentOnly: true, specialization }),
      getConsultants({ specialization }),
    ])
    established = est
    rising = ris
    everyone = all
  } else {
    const match = await getConsultantsByArea({
      distritoId: str(sp.distrito),
      concelhoId: str(sp.concelho),
      freguesiaId,
    })
    const scoped = match.consultants.filter(
      (c) => !specialization || c.specializations.includes(specialization),
    )
    rising = scoped.filter((c) => c.score?.risingTalent)
    established = scoped.filter((c) => c.score && !c.score.risingTalent)
    everyone = scoped

    if (match.tier && scoped.length > 0) {
      locationHeader = t(`locationResults.${match.tier}`, { area: match.areaName ?? '' })
    } else if (!match.tier) {
      const areaName =
        location.freguesia?.name ?? location.concelho?.name ?? location.distrito?.name ?? ''
      emptyTitle = t('locationEmpty', { area: areaName })
    }
  }

  // --- Assemble the grid + highlight per view ---
  // Ranked: established (composite desc; option-(i) confident-first when scoped). All: everyone, sorted.
  const rankedEstablished = hasLocation
    ? [...established.filter(isConfident), ...established.filter((c) => !isConfident(c))]
    : established
  const gridList = view === 'all' ? sortBy(everyone, sort) : rankedEstablished

  // Highlight the #1 confident consultant — only in the location state, and in All view only under the
  // Merit sort (a Houses/Time comparison grid has no merit spotlight).
  const highlightBase = view === 'all' ? everyone : established
  const highlightId =
    hasLocation && (view !== 'all' || sort === 'merit')
      ? (highlightBase.filter(isConfident)[0]?.id ?? null)
      : null
  // In All view under a non-merit sort, suppress the per-region auto-highlight entirely.
  const suppressFeatured = view === 'all' && sort !== 'merit'

  // Rising Talent has its own board only in Ranked view (in All they appear inline in the grid).
  const showRisingBoard = view !== 'all' && rising.length > 0

  const totalPages = Math.max(1, Math.ceil(gridList.length / PAGE_SIZE))
  const pageItems = gridList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const scopedCount = everyone.length

  const gridSection = (
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
                featured={suppressFeatured ? false : hasLocation ? c.id === highlightId : undefined}
                showMetrics={showMetrics}
              />
            ))}
          </div>
          <UrlPagination totalPages={totalPages} className="mt-8 justify-center" />
        </>
      )}
    </section>
  )

  const risingSection = showRisingBoard ? (
    <section aria-labelledby="rising-talent" className="mt-12 border-t border-line pt-10">
      <h2 id="rising-talent" className="text-subsection text-cream">
        {t('risingTalentTitle')}
      </h2>
      <p className="mt-1 text-meta text-cream-muted">{t('risingTalentSubtitle')}</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {rising.map((c, i) => (
          <ConsultantCard key={c.id} consultant={c} index={i} showMetrics={showMetrics} />
        ))}
      </div>
    </section>
  ) : null

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

        {/* Cycle 4 (a): ranked board FIRST, then the Rising Talent strip below. */}
        {gridSection}
        {risingSection}
      </SectionWrapper>
    </>
  )
}

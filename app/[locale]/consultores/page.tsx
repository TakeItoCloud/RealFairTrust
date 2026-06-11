// Consultores — discovery + leaderboard (Phase 4 §4.3.2; Phase 2 wireframe; Decisions
// #26 card grid + subtle rank, #6 separate Rising Talent board for consultants < 6 months).
// Server component: reads filters from the URL, fetches via lib/data, passes objects down.
import { getTranslations } from 'next-intl/server'
import type { Specialization } from '@/lib/types'
import { getConsultants, getRegions } from '@/lib/data'
import { flags } from '@/lib/flags'
import { Eyebrow, EmptyState, SectionWrapper } from '@/components/ui'
import { ConsultantCard, UrlPagination } from '@/components'
import { ConsultantFilters } from '@/components/consultores/ConsultantFilters'

const PAGE_SIZE = 9

function str(v: string | string[] | undefined): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined
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

  const regionId = str(sp.region)
  const specialization = str(sp.specialization) as Specialization | undefined
  const view = sp.view === 'all' ? 'all' : 'ranked'
  const page = Math.max(1, Number(str(sp.page)) || 1)

  const [cityRegions, mainList, risingList] = await Promise.all([
    getRegions('city'),
    view === 'all'
      ? getConsultants({ regionId, specialization })
      : getConsultants({ view: 'ranked', regionId, specialization }),
    getConsultants({ risingTalentOnly: true, regionId, specialization }),
  ])

  // Rising Talent has its own board; in "All" view they appear inline in the main grid,
  // so the separate board only shows in the (default) Ranked view to avoid duplication.
  const showRisingBoard = view !== 'all' && risingList.length > 0

  const totalPages = Math.max(1, Math.ceil(mainList.length / PAGE_SIZE))
  const pageItems = mainList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <SectionWrapper tone="dark" size="sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1 className="mt-3 font-display text-4xl text-cream">{t('title')}</h1>
            <p className="mt-3 text-cream-muted">{t('subtitle')}</p>
          </div>
          {/* "Suggest one for me" — structurally present, gated off until match mode ships. */}
          {flags.matchMode ? (
            <span className="text-sm text-gold">{t('suggestForMe')}</span>
          ) : null}
        </div>
      </SectionWrapper>

      <SectionWrapper tone="dark" size="sm">
        <ConsultantFilters regions={cityRegions} />

        {/* Rising Talent board (separate from the ranking) */}
        {showRisingBoard ? (
          <section aria-labelledby="rising-talent" className="mt-10">
            <h2 id="rising-talent" className="font-display text-2xl text-cream">
              {t('risingTalentTitle')}
            </h2>
            <p className="mt-1 text-sm text-cream-muted">{t('risingTalentSubtitle')}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {risingList.map((c) => (
                <ConsultantCard key={c.id} consultant={c} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Main ranked / all grid */}
        <section aria-label={view === 'all' ? t('viewAll') : t('viewRanked')} className="mt-10">
          {pageItems.length === 0 ? (
            <EmptyState title={t('empty')} />
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((c) => (
                  <ConsultantCard key={c.id} consultant={c} />
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

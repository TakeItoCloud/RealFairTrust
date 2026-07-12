'use client'

// Renders every milestone 4.2 composite with real seed data passed in from the server
// page. Demonstrates the data-via-props rule: nothing here imports mock fixtures.
import { Suspense, useState } from 'react'
import { useTranslations } from 'next-intl'
import type {
  ConsultantDetail,
  ConsultantSummary,
  CreateLeadInput,
  ListingWithAgent,
  Region,
} from '@/lib/types'
import { createLead } from '@/lib/data'
import {
  ConsultantCard,
  CookieBanner,
  FilterBar,
  Footer,
  Header,
  LeadForm,
  Modal,
  Pagination,
  PropertyCard,
  ReviewItem,
  ScoreBreakdown,
  ToastProvider,
  useToast,
} from '@/components'
import { Button } from '@/components/ui'

interface Props {
  consultants: ConsultantSummary[]
  listings: ListingWithAgent[]
  regions: Region[]
  detail: ConsultantDetail | null
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-cream">{title}</h2>
      {children}
    </section>
  )
}

function LeadDemo() {
  const toast = useToast()
  const t = useTranslations('leadForm')
  return (
    <LeadForm
      onSubmit={async (input: CreateLeadInput) => {
        await createLead(input) // returns a constructed lead; no persistence in Phase 4
        toast({ title: t('successTitle'), description: t('successDesc') })
      }}
    />
  )
}

function ToastDemo() {
  const toast = useToast()
  return (
    <Button variant="secondary" onClick={() => toast({ title: 'Toast', description: 'Triggered from the showcase.' })}>
      Trigger toast
    </Button>
  )
}

export function ComponentsShowcase({ consultants, listings, regions, detail }: Props) {
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <ToastProvider>
      <Header />
      <main className="min-h-screen bg-ink text-cream">
        <div className="container-page space-y-16 py-12">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Dev only · not in nav</p>
            <h1 className="text-cream">Composite Components — Milestone 4.2</h1>
            <p className="text-cream-muted">Real seed data via lib/data, passed down as props.</p>
          </header>

          <Section title="ConsultantCard — Spotlight (entrance stagger + hover)">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {consultants.slice(0, 6).map((c, i) => (
                <ConsultantCard key={c.id} consultant={c} index={i} />
              ))}
            </div>
          </Section>

          <Section title="PropertyCard — Editorial Overlay (entrance stagger + hover)">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.slice(0, 6).map((l, i) => (
                <PropertyCard key={l.id} listing={l} index={i} />
              ))}
            </div>
          </Section>

          <Section title="FilterBar (URL-synced) + Pagination">
            <Suspense fallback={null}>
              <FilterBar
                dealType="sale"
                cities={regions}
                totalCount={listings.length}
                from={1}
                to={listings.length}
              />
            </Suspense>
            <Pagination page={page} totalPages={5} onPageChange={setPage} className="justify-center" />
          </Section>

          {detail?.score ? (
            <Section title="ScoreBreakdown">
              <div className="max-w-md">
                <ScoreBreakdown score={detail.score} />
              </div>
            </Section>
          ) : null}

          {detail ? (
            <Section title="ReviewItem">
              <div className="grid gap-3 sm:grid-cols-2">
                {detail.reviews.map((r) => (
                  <ReviewItem key={r.id} review={r} />
                ))}
              </div>
            </Section>
          ) : null}

          <Section title="LeadForm (RHF + Zod) · Modal · Toast">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="max-w-md">
                <LeadDemo />
              </div>
              <div className="flex flex-wrap items-start gap-3">
                <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                <Modal
                  open={modalOpen}
                  onOpenChange={setModalOpen}
                  title="Demo modal"
                  description="Radix Dialog — focus trap, Esc to close, scroll lock."
                >
                  <p className="text-sm text-cream-muted">Modal body content goes here.</p>
                </Modal>
                <ToastDemo />
              </div>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </ToastProvider>
  )
}

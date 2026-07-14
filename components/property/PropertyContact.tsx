'use client'

// PropertyContact — "talk to this consultant" for a property (mirrors ProfileContact, #28):
// an inline sticky panel on desktop, a sticky bottom bar → dialog on mobile. Composes the shared
// LeadForm + Modal (no onSubmit → success confirmation only, no persistence in Phase 4).
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { LeadIntent } from '@/lib/types'
import { Button } from '@/components/ui'
import { LeadForm, Modal } from '@/components'

interface PropertyContactProps {
  propertyId: string
  agentId: string
  agentName: string
  intent: LeadIntent
  regionId?: string
}

export function PropertyContact({ propertyId, agentId, agentName, intent, regionId }: PropertyContactProps) {
  const t = useTranslations('property')
  const [open, setOpen] = useState(false)

  const form = (
    <LeadForm defaultIntent={intent} relatedPropertyId={propertyId} relatedAgentId={agentId} regionId={regionId} />
  )

  return (
    <>
      {/* Desktop — inline sticky panel */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-[var(--card-radius)] border border-line bg-[var(--surface-card-solid)] p-[var(--card-pad)]">
          <h2 className="text-subsection text-cream">{t('contactTitle')}</h2>
          <p className="mt-1 text-meta text-cream-muted">{t('contactSubtitle', { name: agentName })}</p>
          <div className="mt-4">{form}</div>
        </div>
      </div>

      {/* Mobile — sticky bar → dialog */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[var(--plate-bg)] p-3 backdrop-blur lg:hidden">
        <Button className="w-full" onClick={() => setOpen(true)}>
          {t('contactCta')}
        </Button>
      </div>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title={t('contactCta')}
        className="max-h-[88vh] w-[94vw] max-w-lg overflow-y-auto"
      >
        {form}
      </Modal>
    </>
  )
}

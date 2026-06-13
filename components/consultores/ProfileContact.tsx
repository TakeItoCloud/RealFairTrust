'use client'

// ProfileContact — consultant contact (Decision #28): inline beside the content on desktop
// (sticky), a sticky bottom bar that opens a full-width dialog on mobile. Success state only,
// no persistence (LeadForm with no onSubmit handler just confirms).
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'
import { LeadForm, Modal } from '@/components'

interface ProfileContactProps {
  consultantId: string
  consultantName: string
  regionId?: string
}

export function ProfileContact({ consultantId, consultantName, regionId }: ProfileContactProps) {
  const t = useTranslations('profile')
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop — inline sticky panel */}
      <div id="contact" className="hidden lg:block">
        <div className="sticky top-24 rounded-[var(--card-radius)] border border-line bg-[var(--surface-card)] p-[var(--card-pad)]">
          <h2 className="text-subsection text-cream">{t('contact')}</h2>
          <div className="mt-4">
            <LeadForm relatedAgentId={consultantId} regionId={regionId} />
          </div>
        </div>
      </div>

      {/* Mobile — sticky bar → dialog */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[var(--plate-bg)] p-3 backdrop-blur lg:hidden">
        <Button className="w-full" onClick={() => setOpen(true)}>
          {t('contactName', { name: consultantName })}
        </Button>
      </div>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title={t('contactName', { name: consultantName })}
        className="max-h-[88vh] w-[94vw] max-w-lg overflow-y-auto"
      >
        <LeadForm relatedAgentId={consultantId} regionId={regionId} />
      </Modal>
    </>
  )
}

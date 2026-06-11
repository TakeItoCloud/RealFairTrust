'use client'

// Modal — thin styled wrapper over @radix-ui/react-dialog (focus trap, Esc, scroll lock,
// aria wiring all handled by Radix — Decision #36). Works controlled or with a trigger.
import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/cn'
import { focusRing } from '@/components/ui/styles'

interface ModalProps {
  title: string
  description?: string
  children: ReactNode
  /** Element that opens the modal (uncontrolled). Omit when using `open`/`onOpenChange`. */
  trigger?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function Modal({ title, description, children, trigger, open, onOpenChange, className }: ModalProps) {
  const t = useTranslations('common')

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2',
            'rounded-lg border border-line bg-ink-elev p-6 text-cream shadow-2xl',
            'focus:outline-none',
            className,
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="font-display text-xl">{title}</Dialog.Title>
            <Dialog.Close
              aria-label={t('close')}
              className={cn('inline-flex h-9 w-9 items-center justify-center rounded-md text-cream-muted hover:text-cream', focusRing)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>
          {description ? (
            <Dialog.Description className="mt-1 text-sm text-cream-muted">{description}</Dialog.Description>
          ) : null}
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

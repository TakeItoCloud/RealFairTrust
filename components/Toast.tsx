'use client'

// Toast — Radix Toast (live region + swipe/dismiss a11y). Wrap a subtree in
// <ToastProvider> and call useToast() to push messages.
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import * as RadixToast from '@radix-ui/react-toast'

interface ToastMessage {
  id: number
  title: string
  description?: string
}

type ToastInput = Omit<ToastMessage, 'id'>

const ToastContext = createContext<((t: ToastInput) => void) | null>(null)

export function ToastProvider({ children, duration = 4000 }: { children: ReactNode; duration?: number }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const push = useCallback((t: ToastInput) => {
    setToasts((prev) => [...prev, { id: Date.now() + Math.random(), ...t }])
  }, [])

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <RadixToast.Provider swipeDirection="right" duration={duration}>
      <ToastContext.Provider value={push}>{children}</ToastContext.Provider>
      {toasts.map((t) => (
        <RadixToast.Root
          key={t.id}
          onOpenChange={(open) => !open && remove(t.id)}
          className="rounded-md border border-line bg-ink-elev p-4 text-cream shadow-xl"
        >
          <RadixToast.Title className="font-display text-sm font-semibold">{t.title}</RadixToast.Title>
          {t.description ? (
            <RadixToast.Description className="mt-0.5 text-xs text-cream-muted">{t.description}</RadixToast.Description>
          ) : null}
        </RadixToast.Root>
      ))}
      <RadixToast.Viewport className="fixed bottom-4 right-4 z-60 flex w-80 max-w-[92vw] flex-col gap-2 outline-none" />
    </RadixToast.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>')
  return ctx
}

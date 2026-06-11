'use client'

// LeadForm — React Hook Form + Zod with inline validation and a success state.
// No persistence in Phase 4: on a valid submit we call the optional `onSubmit` (the page
// wires this to lib/data.createLead) and then show the confirmation.
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import type { CreateLeadInput, LeadIntent } from '@/lib/types'
import { cn } from '@/lib/cn'
import { Button, Input, Select, Textarea } from '@/components/ui'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[+]?[\d\s()-]{9,}$/
const isEmailOrPhone = (v: string) => emailRe.test(v) || phoneRe.test(v)

// Error messages are leaf keys under leadForm.errors, translated at render time.
const schema = z.object({
  intent: z.enum(['buy', 'rent', 'sell']),
  name: z.string().trim().min(1, { message: 'nameRequired' }),
  contact: z
    .string()
    .trim()
    .min(1, { message: 'contactRequired' })
    .refine((v) => v === '' || isEmailOrPhone(v), { message: 'contactInvalid' }),
  message: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length >= 10, { message: 'messageTooShort' }),
})

type FormValues = z.infer<typeof schema>

interface LeadFormProps {
  defaultIntent?: LeadIntent
  relatedAgentId?: string
  relatedPropertyId?: string
  regionId?: string
  /** Page wires this to lib/data.createLead. Component never imports the data layer itself. */
  onSubmit?: (input: CreateLeadInput) => Promise<void> | void
  onLight?: boolean
  className?: string
}

export function LeadForm({
  defaultIntent = 'buy',
  relatedAgentId,
  relatedPropertyId,
  regionId,
  onSubmit,
  onLight = false,
  className,
}: LeadFormProps) {
  const t = useTranslations('leadForm')
  const te = useTranslations('leadForm.errors')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { intent: defaultIntent, name: '', contact: '', message: '' },
  })

  const labelCls = cn('text-sm font-medium', onLight ? 'text-ink-on-light' : 'text-cream')
  const errCls = 'mt-1 text-xs text-danger'

  async function submit(values: FormValues) {
    const input: CreateLeadInput = {
      intent: values.intent,
      name: values.name,
      contact: values.contact,
      message: values.message,
      relatedAgentId,
      relatedPropertyId,
      regionId,
    }
    await onSubmit?.(input)
    setSuccess(true)
  }

  if (success) {
    return (
      <div
        className={cn(
          'rounded-lg border p-6 text-center',
          onLight ? 'border-line-lt bg-surface-lt text-ink-on-light' : 'border-line bg-surface text-cream',
          className,
        )}
        role="status"
      >
        <p className="font-display text-lg text-verified">{t('successTitle')}</p>
        <p className={cn('mt-1 text-sm', onLight ? 'text-ink-on-light/70' : 'text-cream-muted')}>{t('successDesc')}</p>
        <Button variant="secondary" size="sm" onLight={onLight} className="mt-4" onClick={() => { reset(); setSuccess(false) }}>
          {t('sendAnother')}
        </Button>
      </div>
    )
  }

  const intentOptions = [
    { value: 'buy', label: t('intentBuy') },
    { value: 'rent', label: t('intentRent') },
    { value: 'sell', label: t('intentSell') },
  ]

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submit)}
      className={cn(
        'space-y-4 rounded-lg border p-5',
        onLight ? 'border-line-lt bg-surface-lt' : 'border-line bg-surface',
        className,
      )}
    >
      <div className="space-y-1.5">
        <label htmlFor="lead-intent" className={labelCls}>{t('intent')}</label>
        <Controller
          control={control}
          name="intent"
          render={({ field }) => (
            <Select
              id="lead-intent"
              options={intentOptions}
              value={field.value}
              onValueChange={field.onChange}
              onLight={onLight}
              aria-label={t('intent')}
            />
          )}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="lead-name" className={labelCls}>{t('name')}</label>
        <Input
          id="lead-name"
          onLight={onLight}
          placeholder={t('namePlaceholder')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'lead-name-err' : undefined}
          {...register('name')}
        />
        {errors.name ? <p id="lead-name-err" className={errCls}>{te(errors.name.message ?? '')}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="lead-contact" className={labelCls}>{t('contact')}</label>
        <Input
          id="lead-contact"
          onLight={onLight}
          placeholder={t('contactPlaceholder')}
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? 'lead-contact-err' : undefined}
          {...register('contact')}
        />
        {errors.contact ? <p id="lead-contact-err" className={errCls}>{te(errors.contact.message ?? '')}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="lead-message" className={labelCls}>{t('message')}</label>
        <Textarea
          id="lead-message"
          onLight={onLight}
          placeholder={t('messagePlaceholder')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'lead-message-err' : undefined}
          {...register('message')}
        />
        {errors.message ? <p id="lead-message-err" className={errCls}>{te(errors.message.message ?? '')}</p> : null}
      </div>

      <Button type="submit" onLight={onLight} loading={isSubmitting} className="w-full">
        {isSubmitting ? t('sending') : t('submit')}
      </Button>
    </form>
  )
}

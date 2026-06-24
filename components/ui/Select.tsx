'use client'

// Select — built on @radix-ui/react-select for full keyboard + screen-reader support
// (this is the a11y-critical primitive Radix is justified for, per Decision #36).
// Styled to match Input; the trigger carries the same gold focus ring.
import * as RadixSelect from '@radix-ui/react-select'
import { cn } from '@/lib/cn'
import { focusRing, focusRingLight } from './styles'
import { IconCheck, IconChevronDown } from './icons'

export interface SelectOption {
  value: string
  label: string
}

/** Options accept either a plain string (value === label) or an explicit {value,label}
 *  (handoff §6.5: `(string | {value,label})[]` — e.g. the R4 hero pill passes ["Lisboa","Porto"]). */
export type SelectOptions = (string | SelectOption)[]

interface SelectProps {
  options: SelectOptions
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Shown when nothing is selected. */
  placeholder?: string
  id?: string
  name?: string
  disabled?: boolean
  invalid?: boolean
  onLight?: boolean
  /** Accessible name when there is no visible <label>. */
  'aria-label'?: string
  className?: string
}

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  id,
  name,
  disabled,
  invalid,
  onLight = false,
  className,
  ...aria
}: SelectProps) {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        id={id}
        aria-label={aria['aria-label']}
        aria-invalid={invalid || undefined}
        className={cn(
          'inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] border px-4 text-base transition-colors',
          onLight
            ? 'border-line-lt bg-surface-lt text-ink-on-light data-[placeholder]:text-ink-on-light/45 hover:border-[var(--gold-border-soft)]'
            : 'border-line bg-[var(--surface-inset)] text-cream data-[placeholder]:text-cream-muted hover:border-[var(--gold-border-soft)]',
          invalid && 'border-danger',
          'disabled:cursor-not-allowed disabled:opacity-50',
          onLight ? focusRingLight : focusRing,
          className,
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className={onLight ? 'text-ink-on-light/60' : 'text-cream-muted'}>
          <IconChevronDown className="text-lg" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={6}
          className={cn(
            'z-50 max-h-72 overflow-hidden rounded-md border shadow-xl',
            'min-w-[var(--radix-select-trigger-width)]',
            onLight ? 'border-line-lt bg-surface-lt text-ink-on-light' : 'border-line bg-ink-elev text-cream',
          )}
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((raw) => {
              const opt: SelectOption = typeof raw === 'string' ? { value: raw, label: raw } : raw
              return (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'relative flex min-h-10 cursor-pointer select-none items-center rounded-sm pl-8 pr-3 text-base outline-none',
                  'data-[highlighted]:bg-gold/15',
                  onLight ? 'data-[highlighted]:text-ink-on-light' : 'data-[highlighted]:text-cream',
                  'data-[state=checked]:text-gold',
                )}
              >
                <RadixSelect.ItemIndicator className="absolute left-2 inline-flex items-center text-gold">
                  <IconCheck className="text-base" />
                </RadixSelect.ItemIndicator>
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
              )
            })}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

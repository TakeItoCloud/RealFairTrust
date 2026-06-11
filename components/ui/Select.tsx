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

interface SelectProps {
  options: SelectOption[]
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
          'inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-md border px-4 text-base transition-colors',
          onLight
            ? 'border-line-lt bg-surface-lt text-ink-on-light data-[placeholder]:text-ink-on-light/45'
            : 'border-line bg-surface text-cream data-[placeholder]:text-cream-muted',
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
            {options.map((opt) => (
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
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

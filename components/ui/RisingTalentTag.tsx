// RisingTalentTag — marks consultants on the Rising Talent board (< 6 months).
// Distinct from the ranked board; gold-forward, never green (green = verified only).
import { cn } from '@/lib/cn'
import { IconSparkUp } from './icons'

interface RisingTalentTagProps {
  /** Translated label, e.g. t('score.risingTalent'). */
  label: string
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md'
  className?: string
}

export function RisingTalentTag({ label, tone = 'dark', size = 'md', className }: RisingTalentTagProps) {
  const sizing = size === 'sm' ? 'text-xs gap-1 px-2 py-0.5' : 'text-sm gap-1.5 px-2.5 py-1'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        tone === 'dark'
          ? 'border-gold/40 bg-gold/10 text-gold'
          : 'border-gold-deep/30 bg-gold-deep/10 text-gold-deep',
        sizing,
        className,
      )}
    >
      <IconSparkUp className="text-[1.1em]" />
      {label}
    </span>
  )
}

// Icon set — thin wrappers over lucide-react (Decision #47, 2px stroke, currentColor).
// Each keeps the prior inline-SVG component's NAME + API (className, standard SVG props),
// so every existing consumer is unchanged — only the glyph source moved to lucide. A 1em
// box is forced so `text-*` font-size still controls icon size as before.
import type { LucideIcon, LucideProps } from 'lucide-react'
import {
  Check,
  ShieldCheck,
  Star,
  TrendingUp,
  Trophy,
  Inbox,
  ChevronDown,
  Bed,
  Bath,
  Ruler,
  Zap,
  MapPin,
  Loader2,
  // Canonical set (README §5) for new code:
  Search,
  ArrowRight,
  ChevronRight,
  Clock,
  Scale,
  RefreshCw,
  Globe,
  Menu,
  BarChart3,
  Users,
} from 'lucide-react'

function icon(Glyph: LucideIcon, fixed?: LucideProps) {
  function Icon(props: LucideProps) {
    return (
      <Glyph
        width="1em"
        height="1em"
        strokeWidth={2}
        aria-hidden
        focusable={false}
        {...fixed}
        {...props}
      />
    )
  }
  Icon.displayName = `Icon(${Glyph.displayName ?? 'lucide'})`
  return Icon
}

/* --- Backward-compatible names (existing imports keep working unchanged) --- */
export const IconCheck = icon(Check)
export const IconVerified = icon(ShieldCheck) // verification only (#34)
export const IconStar = icon(Star, { fill: 'currentColor' }) // filled for star ratings
export const IconSparkUp = icon(TrendingUp) // Rising Talent
export const IconTrophy = icon(Trophy) // "Top this month"
export const IconInbox = icon(Inbox) // empty states
export const IconChevronDown = icon(ChevronDown)
export const IconBed = icon(Bed)
export const IconBath = icon(Bath)
export const IconArea = icon(Ruler) // m² / area
export const IconBolt = icon(Zap) // energy cert (neutral in Step 3; green flip is Step 4 / #52)
export const IconPin = icon(MapPin)
export const IconSpinner = icon(Loader2) // pair with motion-safe:animate-spin

/* --- Canonical lucide set (README §5), wrapped for consistent 1em sizing --- */
export const IconSearch = icon(Search)
export const IconArrowRight = icon(ArrowRight)
export const IconChevronRight = icon(ChevronRight)
export const IconClock = icon(Clock)
export const IconScale = icon(Scale)
export const IconRefresh = icon(RefreshCw)
export const IconGlobe = icon(Globe)
export const IconMenu = icon(Menu)
export const IconBarChart = icon(BarChart3)
export const IconUsers = icon(Users)

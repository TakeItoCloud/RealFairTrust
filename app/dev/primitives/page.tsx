// Dev-only primitive showcase — NOT part of the localized site and NOT linked in nav.
// Lives outside `app/[locale]` (and is excluded from the i18n middleware) so it never
// enters the stable route contract. Gated by flags.devShowcase — set false before prod.
import { notFound } from 'next/navigation'
import { flags } from '@/lib/flags'
import { Showcase } from './Showcase'

export const metadata = {
  title: 'Primitives — Dev Showcase · RealFairTrust',
  robots: { index: false, follow: false },
}

export default function PrimitivesDevPage() {
  if (!flags.devShowcase) notFound()
  return <Showcase />
}

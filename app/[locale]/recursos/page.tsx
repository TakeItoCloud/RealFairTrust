// Resources hub — /recursos (PT) · /en/resources (EN)
// FLAGGED OFF at launch (flags.recursos = false). Route reserved; returns 404 until enabled.
import { notFound } from 'next/navigation'
import { flags } from '@/lib/flags'

export default function RecursosPage() {
  if (!flags.recursos) notFound()
  return (
    <main>
      <h1>Recursos</h1>
      <p>Scaffold — Phase 4</p>
    </main>
  )
}

'use client'

// ClearFiltersButton — resets all discovery filters by replacing the URL with the bare
// pathname (drops the query). Used as the "no results" empty-state action.
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui'

export function ClearFiltersButton({ label }: { label: string }) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Button variant="secondary" onClick={() => router.replace(pathname, { scroll: false })}>
      {label}
    </Button>
  )
}

'use client'

// UrlPagination — wraps the controlled Pagination primitive and syncs the active page to
// the `page` query param (page 1 omits the param). Reusable across listing/discovery pages.
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from './Pagination'

export function UrlPagination({ totalPages, className }: { totalPages: number; className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)

  function go(next: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (next <= 1) params.delete('page')
    else params.set('page', String(next))
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return <Pagination page={page} totalPages={totalPages} onPageChange={go} className={className} />
}

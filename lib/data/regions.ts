// Regions repository. Phase 4 reads mock fixtures; Phase 5 swaps to Supabase with the
// same async signatures.
import { regions } from '@/lib/mock'
import type { Region, RegionType } from '@/lib/types'

export async function getRegions(type?: RegionType): Promise<Region[]> {
  const live = regions.filter((r) => r.live)
  return type ? live.filter((r) => r.type === type) : live
}

export async function getRegion(id: string): Promise<Region | null> {
  return regions.find((r) => r.id === id) ?? null
}

// Inventory-driven geo options (server-only, per deal type). Powers the on-demand LocationPicker
// and the /api/geo routes. Rules (agreed): a distrito appears if it has a house OR an attributed
// consultant; a concelho/freguesia appears only if it has a house. Empty places never appear.
import type { ListingType } from '@/lib/types'
import { getListings } from '@/lib/data/listings'
import { getConsultants } from '@/lib/data/consultants'
import { concelhoDistrito, getConcelhos, getDistrito, getFreguesias } from './caop'

export interface GeoOption {
  id: string
  name: string
  /** distrito level only: false = consultant-only (fallback) district. */
  hasHouses?: boolean
}

const byName = (a: GeoOption, b: GeoOption) => a.name.localeCompare(b.name, 'pt')

/** Freguesia ids that currently have ≥1 active house of this deal type. */
async function houseFreguesias(dealType: ListingType): Promise<Set<string>> {
  const houses = await getListings({ type: dealType })
  return new Set(houses.map((h) => h.freguesiaId))
}

/** Distritos/RA to offer: has a house OR an attributed consultant. */
export async function districtsInventory(dealType: ListingType): Promise<GeoOption[]> {
  const fregs = await houseFreguesias(dealType)
  const houseDistricts = new Set(
    [...fregs].map((f) => concelhoDistrito(f.slice(0, 4))).filter((d): d is string => Boolean(d)),
  )
  const consultants = await getConsultants()
  const consultantDistricts = new Set(consultants.flatMap((c) => c.coverageDistrictIds))

  const ids = new Set<string>([...houseDistricts, ...consultantDistricts])
  return [...ids]
    .map((id): GeoOption | null => {
      const node = getDistrito(id)
      return node ? { id, name: node.name, hasHouses: houseDistricts.has(id) } : null
    })
    .filter((o): o is GeoOption => o !== null)
    .sort(byName)
}

/** Concelhos under a distrito/RA that have a house. */
export async function concelhosInventory(dealType: ListingType, distritoId: string): Promise<GeoOption[]> {
  const fregs = await houseFreguesias(dealType)
  const houseConcelhos = new Set([...fregs].map((f) => f.slice(0, 4)))
  return getConcelhos(distritoId)
    .filter((c) => houseConcelhos.has(c.id))
    .map((c) => ({ id: c.id, name: c.name }))
    .sort(byName)
}

/** Freguesias under a concelho that have a house. */
export async function freguesiasInventory(dealType: ListingType, concelhoId: string): Promise<GeoOption[]> {
  const fregs = await houseFreguesias(dealType)
  return getFreguesias(concelhoId)
    .filter((f) => fregs.has(f.id))
    .map((f) => ({ id: f.id, name: f.name }))
    .sort(byName)
}

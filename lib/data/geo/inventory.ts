// Inventory-driven geo options (server-only, per deal type). Powers the on-demand LocationPicker
// and the /api/geo routes.
//
// Two sources (Decision #86 / D-V1):
//   'houses'   (DEFAULT) — the Buy/Rent behaviour, byte-for-byte unchanged: a distrito appears if it
//              has a house OR an attributed consultant (coverageDistrictIds); a concelho/freguesia
//              appears only if it has a house.
//   'coverage' — Vender's seller-facing basis: houses ∪ consultant-attribution at each level, so
//              consultant-covered areas surface even without active listings. A strict SUPERSET of
//              'houses' (no house area is ever hidden). We deliberately do NOT expand a district-level
//              consultant into all its concelhos/freguesias (full inclusive expansion = picker bloat,
//              #86) — only specifically-attributed concelho/freguesia ids are added.
import type { ConsultantSummary, ListingType } from '@/lib/types'
import { getListings } from '@/lib/data/listings'
import { getConsultants } from '@/lib/data/consultants'
import {
  concelhoDistrito,
  freguesiaDistrito,
  getConcelho,
  getConcelhos,
  getDistrito,
  getFreguesia,
  getFreguesias,
} from './caop'

export type GeoSource = 'houses' | 'coverage'

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

/** Distrito/RA ids a consultant is attributed to. In 'coverage' mode, concelho/freguesia-level
 *  attributions are also rolled up to their distrito (a house-less consultant district still shows). */
function consultantDistricts(c: ConsultantSummary, source: GeoSource): string[] {
  const ids = [...c.coverageDistrictIds]
  if (source === 'coverage') {
    for (const cc of c.coverageConcelhoIds ?? []) {
      const d = concelhoDistrito(cc)
      if (d) ids.push(d)
    }
    for (const f of c.coverageFreguesiaIds ?? []) {
      const d = freguesiaDistrito(f)
      if (d) ids.push(d)
    }
  }
  return ids
}

/** Distritos/RA to offer: has a house OR an attributed consultant. */
export async function districtsInventory(
  dealType: ListingType,
  source: GeoSource = 'houses',
): Promise<GeoOption[]> {
  const fregs = await houseFreguesias(dealType)
  const houseDistricts = new Set(
    [...fregs].map((f) => concelhoDistrito(f.slice(0, 4))).filter((d): d is string => Boolean(d)),
  )
  const consultants = await getConsultants()
  const coverageDistricts = new Set(consultants.flatMap((c) => consultantDistricts(c, source)))

  const ids = new Set<string>([...houseDistricts, ...coverageDistricts])
  return [...ids]
    .map((id): GeoOption | null => {
      const node = getDistrito(id)
      return node ? { id, name: node.name, hasHouses: houseDistricts.has(id) } : null
    })
    .filter((o): o is GeoOption => o !== null)
    .sort(byName)
}

/** Concelhos under a distrito/RA to offer: has a house (+ consultant-attributed in 'coverage'). */
export async function concelhosInventory(
  dealType: ListingType,
  distritoId: string,
  source: GeoSource = 'houses',
): Promise<GeoOption[]> {
  const fregs = await houseFreguesias(dealType)
  const houseConcelhos = new Set([...fregs].map((f) => f.slice(0, 4)))
  const ids = new Set<string>()
  for (const c of getConcelhos(distritoId)) {
    if (houseConcelhos.has(c.id)) ids.add(c.id)
  }
  if (source === 'coverage') {
    const consultants = await getConsultants()
    for (const con of consultants) {
      for (const cc of con.coverageConcelhoIds ?? []) {
        if (concelhoDistrito(cc) === distritoId) ids.add(cc)
      }
      for (const f of con.coverageFreguesiaIds ?? []) {
        if (freguesiaDistrito(f) === distritoId) ids.add(f.slice(0, 4))
      }
    }
  }
  return [...ids]
    .map((id): GeoOption | null => {
      const node = getConcelho(id)
      return node ? { id, name: node.name } : null
    })
    .filter((o): o is GeoOption => o !== null)
    .sort(byName)
}

/** Freguesias under a concelho to offer: has a house (+ consultant-attributed in 'coverage'). */
export async function freguesiasInventory(
  dealType: ListingType,
  concelhoId: string,
  source: GeoSource = 'houses',
): Promise<GeoOption[]> {
  const fregs = await houseFreguesias(dealType)
  const ids = new Set<string>()
  for (const f of getFreguesias(concelhoId)) {
    if (fregs.has(f.id)) ids.add(f.id)
  }
  if (source === 'coverage') {
    const consultants = await getConsultants()
    for (const con of consultants) {
      for (const f of con.coverageFreguesiaIds ?? []) {
        if (f.slice(0, 4) === concelhoId) ids.add(f)
      }
    }
  }
  return [...ids]
    .map((id): GeoOption | null => {
      const node = getFreguesia(id)
      return node ? { id, name: node.name } : null
    })
    .filter((o): o is GeoOption => o !== null)
    .sort(byName)
}

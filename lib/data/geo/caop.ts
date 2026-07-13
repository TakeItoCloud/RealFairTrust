// CAOP typed geo loader — the ONLY module that reads the CAOP2025 dataset JSON.
//
// SERVER-ONLY BY CONVENTION: this module statically imports the 355 KB dataset, so it must
// never be imported by a client component (that would ship the whole file to the browser).
// It is imported only by the data layer (getListings) and the on-demand /api/geo route
// handlers; the client LocationPicker fetches small per-level lists from those routes instead.
//
// Standalone dataset — deliberately NOT wired into the existing district→city→zone Region
// model (that model still powers Home/Consultores/profile). Unifying the two is a later
// decision (see docs/DISCOVERY-PLAN.md "two-model split").
//
// Source: Direção-Geral do Território (DGT), CAOP2025. Licence: CC BY 4.0.
import rawData from './pt-caop2025.json'

export type GeoLevel = 'distrito' | 'regiao_autonoma' | 'concelho' | 'freguesia'

export interface GeoNode {
  /** DICOFRE: distrito 2-digit ('11') / RA synthetic ('AC','MA') / concelho 4-digit ('1106') /
   *  freguesia 6-digit ('110658', alphanumeric last-2 for Barcelos/Guimarães). */
  id: string
  /** Only present on top-level nodes. */
  type?: GeoLevel
  /** Parent id; null/absent on top-level nodes. */
  parentId?: string | null
  name: string
  /** Ilha name for autonomous-region concelhos/freguesias. */
  ilha?: string
}

interface CaopDoc {
  meta: Record<string, unknown>
  topLevel: GeoNode[]
  concelhos: GeoNode[]
  freguesias: GeoNode[]
}

const data = rawData as unknown as CaopDoc

const topById = new Map(data.topLevel.map((t) => [t.id, t]))
const concById = new Map(data.concelhos.map((c) => [c.id, c]))
const fregById = new Map(data.freguesias.map((f) => [f.id, f]))

/** Top-level id (distrito or RA) for a 4-digit concelho id. */
export function concelhoDistrito(concelhoId: string): string | undefined {
  return concById.get(concelhoId)?.parentId ?? undefined
}

/** Top-level id (distrito or RA) for a 6-digit freguesia id. */
export function freguesiaDistrito(freguesiaId: string): string | undefined {
  return concelhoDistrito(freguesiaId.slice(0, 4))
}

export function getDistritos(): GeoNode[] {
  return data.topLevel
}
export function getConcelhos(topLevelId: string): GeoNode[] {
  return data.concelhos.filter((c) => c.parentId === topLevelId)
}
export function getFreguesias(concelhoId: string): GeoNode[] {
  return data.freguesias.filter((f) => f.parentId === concelhoId)
}

export function getDistrito(id: string): GeoNode | undefined {
  return topById.get(id)
}
export function getConcelho(id: string): GeoNode | undefined {
  return concById.get(id)
}
export function getFreguesia(id: string): GeoNode | undefined {
  return fregById.get(id)
}

export const caopMeta = data.meta

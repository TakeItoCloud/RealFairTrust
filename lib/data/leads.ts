// Leads repository. In Phase 4 createLead does NOT persist — forms validate and show a
// success state only (Phase 4 §1). Phase 5 makes this an insert with the same signature.
import { leads } from '@/lib/mock'
import type { CreateLeadInput, Lead } from '@/lib/types'

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  // Constructs the Lead a successful submission would create. Not stored anywhere.
  return {
    id: `lead-${Date.now()}`,
    intent: input.intent,
    name: input.name,
    contact: input.contact,
    message: input.message ?? '',
    relatedPropertyId: input.relatedPropertyId ?? null,
    relatedAgentId: input.relatedAgentId ?? null,
    regionId: input.regionId ?? null,
    status: 'new',
    createdAt: new Date().toISOString(),
  }
}

/** Read seeded leads for the agent dashboard "contactos" shell (4.4). */
export async function getLeads(agentId?: string): Promise<Lead[]> {
  const result = agentId ? leads.filter((l) => l.relatedAgentId === agentId) : [...leads]
  return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

// Seed users — one auth identity per consultant + one admin. Real auth in Phase 5.
import type { User } from '@/lib/types'

export const users: User[] = [
  { id: 'usr-admin', email: 'admin@realfairtrust.pt', role: 'admin', authProvider: 'email', createdAt: '2025-09-01T09:00:00Z' },
  { id: 'usr-ana', email: 'ana.silva@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2021-03-12T09:00:00Z' },
  { id: 'usr-joao', email: 'joao.pereira@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2020-06-01T09:00:00Z' },
  { id: 'usr-maria', email: 'maria.santos@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2022-01-20T09:00:00Z' },
  { id: 'usr-pedro', email: 'pedro.costa@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2021-09-05T09:00:00Z' },
  { id: 'usr-sofia', email: 'sofia.martins@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2022-11-15T09:00:00Z' },
  { id: 'usr-rui', email: 'rui.oliveira@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2020-02-10T09:00:00Z' },
  { id: 'usr-catarina', email: 'catarina.ferreira@realfairtrust.pt', role: 'agent', authProvider: 'google', createdAt: '2023-04-18T09:00:00Z' },
  { id: 'usr-miguel', email: 'miguel.rodrigues@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2021-07-22T09:00:00Z' },
  { id: 'usr-beatriz', email: 'beatriz.almeida@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2026-03-15T09:00:00Z' },
  { id: 'usr-tiago', email: 'tiago.sousa@realfairtrust.pt', role: 'agent', authProvider: 'google', createdAt: '2026-02-20T09:00:00Z' },
  { id: 'usr-ines', email: 'ines.carvalho@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2026-01-10T09:00:00Z' },
  { id: 'usr-diogo', email: 'diogo.fernandes@realfairtrust.pt', role: 'agent', authProvider: 'email', createdAt: '2026-04-02T09:00:00Z' },
]

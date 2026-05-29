import { defineRouting } from 'next-intl/routing'

// Stable route contracts — do not change paths once set (Phase 1 §4).
// PT is the hidden default (no prefix). EN paths are localized.
export const routing = defineRouting({
  locales: ['pt', 'en'] as const,
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/comprar': { pt: '/comprar', en: '/buying' },
    '/arrendar': { pt: '/arrendar', en: '/renting' },
    '/vender': { pt: '/vender', en: '/selling' },
    '/imovel/[id]': { pt: '/imovel/[id]', en: '/property/[id]' },
    '/consultores': { pt: '/consultores', en: '/consultants' },
    '/consultores/aderir': { pt: '/consultores/aderir', en: '/consultants/join' },
    '/consultores/[slug]': { pt: '/consultores/[slug]', en: '/consultants/[slug]' },
    '/como-funciona': { pt: '/como-funciona', en: '/how-it-works' },
    '/recursos': { pt: '/recursos', en: '/resources' },
    '/sobre': { pt: '/sobre', en: '/about' },
    '/contacto': { pt: '/contacto', en: '/contact' },
    '/privacidade': { pt: '/privacidade', en: '/privacy' },
    '/termos': { pt: '/termos', en: '/terms' },
    '/cookies': { pt: '/cookies', en: '/cookies' },
    '/entrar': { pt: '/entrar', en: '/login' },
    '/registar': { pt: '/registar', en: '/register' },
    '/painel': { pt: '/painel', en: '/dashboard' },
    '/painel/perfil': { pt: '/painel/perfil', en: '/dashboard/profile' },
    '/painel/imoveis': { pt: '/painel/imoveis', en: '/dashboard/listings' },
    '/painel/contactos': { pt: '/painel/contactos', en: '/dashboard/leads' },
    '/painel/desempenho': { pt: '/painel/desempenho', en: '/dashboard/performance' },
    // Admin routes are PT-only (internal tool)
    '/admin': '/admin',
    '/admin/consultores': '/admin/consultores',
    '/admin/moderacao': '/admin/moderacao',
    '/admin/avaliacoes': '/admin/avaliacoes',
  },
})

export type Locale = (typeof routing.locales)[number]

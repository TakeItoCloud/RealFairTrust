import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all paths except Next.js internals, static files, API routes, and the
  // non-localized dev showcase (/dev/*), which is served outside the i18n tree.
  matcher: ['/((?!api|_next|_vercel|dev|.*\\..*).*)'],
}

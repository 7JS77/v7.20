import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Explicitly match the root so the front door doesn't 404
    '/',
    // Match all language paths
    '/(en|de|es)/:path*',
    // Ignore internal files and APIs
    '/((?!_next|api|.*\\..*).*)'
  ],
};

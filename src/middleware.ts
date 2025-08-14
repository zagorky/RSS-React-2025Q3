import { routing } from '~i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
  matcher: String.raw`/((?!api|trpc|_next|_vercel|.*\..*).*)`,
};

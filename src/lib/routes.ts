import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { siteConfig } from '@/config/site';

/** Locale-agnostic paths (trailing slash matches `trailingSlash: true`). */
export const routes = {
  home: '/',
  about: '/about/',
  services: '/services/',
  reviews: '/reviews/',
  videos: '/videos/',
  articles: '/articles/',
  contact: '/contact/',
} as const;

export type RouteKey = keyof typeof routes;

export const navOrder: RouteKey[] = ['home', 'about', 'services', 'reviews', 'videos', 'articles', 'contact'];

export function articlePath(slug: string): string {
  return `/articles/${slug}/`;
}

/** Prefix a locale-agnostic path with the locale: ('ar', '/about/') → '/ar/about/'. */
export function localizedPath(locale: Locale, path: string = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/** hreflang alternates for a locale-agnostic path. */
export function languageAlternates(path: string): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const locale of locales) entries[locale] = localizedPath(locale, path);
  entries['x-default'] = localizedPath(defaultLocale, path);
  return entries;
}

/** Swap the locale segment of a pathname, keeping the rest of the path. */
export function switchLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split('/');
  // ['', 'ar', 'about', '']
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1] ?? '')) {
    segments[1] = target;
    const joined = segments.join('/');
    return joined.endsWith('/') ? joined : `${joined}/`;
  }
  return localizedPath(target, '/');
}

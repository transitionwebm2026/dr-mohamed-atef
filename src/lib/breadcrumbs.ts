import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { breadcrumbSchema } from './schema';
import { localizedPath, routes } from './routes';

/** Builds the visible hero breadcrumb trail and its BreadcrumbList JSON-LD in one go. */
export function buildBreadcrumbs(lang: Locale, dict: Dictionary, trail: { label: string; path: string }[]) {
  const all = [{ label: dict.common.home, path: routes.home }, ...trail];
  return {
    items: all.map((crumb, i) => ({
      label: crumb.label,
      href: i < all.length - 1 ? localizedPath(lang, crumb.path) : undefined,
    })),
    schema: breadcrumbSchema(all.map((crumb) => ({ name: crumb.label, path: localizedPath(lang, crumb.path) }))),
  };
}

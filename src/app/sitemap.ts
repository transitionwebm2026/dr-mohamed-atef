import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { articles } from '@/data/articles';
import { absoluteUrl, articlePath, languageAlternates, localizedPath, routes } from '@/lib/routes';

export const dynamic = 'force-static';

type Entry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  lastModified?: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date().toISOString();

  const entries: Entry[] = [
    { path: routes.home, priority: 1, changeFrequency: 'weekly' },
    { path: routes.about, priority: 0.8, changeFrequency: 'monthly' },
    { path: routes.services, priority: 0.9, changeFrequency: 'monthly' },
    { path: routes.reviews, priority: 0.7, changeFrequency: 'monthly' },
    { path: routes.videos, priority: 0.7, changeFrequency: 'weekly' },
    { path: routes.articles, priority: 0.8, changeFrequency: 'weekly' },
    { path: routes.contact, priority: 0.9, changeFrequency: 'yearly' },
    ...articles.map((a) => ({
      path: articlePath(a.slug),
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: a.updatedAt,
    })),
  ];

  return entries.flatMap((entry) => {
    const alternates = Object.fromEntries(
      Object.entries(languageAlternates(entry.path)).map(([key, path]) => [key, absoluteUrl(path)]),
    );
    return locales.map((lang) => ({
      url: absoluteUrl(localizedPath(lang, entry.path)),
      lastModified: entry.lastModified ?? buildDate,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages: alternates },
    }));
  });
}

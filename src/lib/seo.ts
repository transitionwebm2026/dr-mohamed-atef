import type { Metadata } from 'next';
import { localeMeta, otherLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/dictionaries';
import { ogImage } from '@/data/media';
import { languageAlternates, localizedPath } from './routes';

interface PageMetadataInput {
  lang: Locale;
  /** Locale-agnostic path, e.g. '/about/'. */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is (skip the "%s | Site" template) — used on the home page. */
  absoluteTitle?: boolean;
  image?: { src: string; width: number; height: number; alt?: string };
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Per-route metadata: canonical, hreflang alternates, Open Graph and Twitter cards.
 * `metadataBase` (set in the root layout) turns relative URLs into absolute ones.
 */
export function buildPageMetadata({
  lang,
  path,
  title,
  description,
  absoluteTitle = false,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const dict = getDictionary(lang);
  const url = localizedPath(lang, path);
  const img = image ?? { ...ogImage, alt: dict.meta.siteTitle };
  const images = [{ url: img.src, width: img.width, height: img.height, alt: img.alt ?? title }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: dict.meta.siteName,
      locale: localeMeta[lang].ogLocale,
      alternateLocale: [localeMeta[otherLocale(lang)].ogLocale],
      images,
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

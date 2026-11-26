import { siteConfig } from '@/config/site';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/dictionaries';
import { doctor } from '@/data/doctor';
import { clinicOpeningHours, clinics } from '@/data/clinics';
import { departmentProcedures, departments } from '@/data/services';
import { doctorPortrait, ogImage } from '@/data/media';
import { articleCategories } from '@/data/articles';
import type { Article, Faq } from '@/data/types';
import { absoluteUrl, articlePath, localizedPath, routes } from './routes';

type JsonLdNode = Record<string, unknown>;

const PHYSICIAN_ID = `${siteConfig.url}/#physician`;
const WEBSITE_ID = `${siteConfig.url}/#website`;
const clinicId = (id: string) => `${siteConfig.url}/#clinic-${id}`;

function postalAddress(c: (typeof clinics)[number]) {
  return {
    '@type': 'PostalAddress',
    streetAddress: c.street,
    addressLocality: c.locality,
    addressRegion: c.region,
    addressCountry: 'EG',
  };
}

function openingHours(clinicKey: string) {
  const h = clinicOpeningHours[clinicKey];
  if (!h) return undefined;
  return [{ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes }];
}

/** Site-wide graph: WebSite + Physician + MedicalClinic branches. Injected in the root layout. */
export function siteSchema(lang: Locale): JsonLdNode {
  const dict = getDictionary(lang);
  const main = clinics[0]!;
  const homeUrl = absoluteUrl(localizedPath(lang, routes.home));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: homeUrl,
        name: dict.meta.siteName,
        description: dict.meta.siteDescription,
        inLanguage: lang,
        publisher: { '@id': PHYSICIAN_ID },
      },
      {
        '@type': 'Physician',
        '@id': PHYSICIAN_ID,
        name: doctor.name[lang],
        alternateName: doctor.name[lang === 'ar' ? 'en' : 'ar'],
        description: dict.meta.siteDescription,
        url: homeUrl,
        image: absoluteUrl(doctorPortrait.src),
        logo: absoluteUrl('/images/brand/logo-full.webp'),
        telephone: siteConfig.phone.e164,
        ...(siteConfig.email ? { email: siteConfig.email } : {}),
        priceRange: '$$',
        medicalSpecialty: ['https://schema.org/Oncologic', 'https://schema.org/Surgical'],
        address: postalAddress(main),
        ...(main.geo ? { geo: { '@type': 'GeoCoordinates', latitude: main.geo.lat, longitude: main.geo.lng } } : {}),
        openingHoursSpecification: openingHours(main.id),
        areaServed: { '@type': 'City', name: lang === 'ar' ? 'القاهرة' : 'Cairo' },
        // Only real profile URLs (skip empty values and bare domain placeholders)
        sameAs: Object.values(siteConfig.social).filter((u) => /^https?:\/\/[^/]+\/.+/.test(u)),
        availableService: departments.flatMap((d) =>
          departmentProcedures(d).map((p) => ({
            '@type': 'MedicalProcedure',
            name: p.title[lang],
            procedureType: 'https://schema.org/SurgicalProcedure',
          })),
        ),
        location: clinics.map((c) => ({ '@id': clinicId(c.id) })),
      },
      ...clinics.map((c) => ({
        '@type': 'MedicalClinic',
        '@id': clinicId(c.id),
        name: `${doctor.name[lang]} — ${c.name[lang]}`,
        url: absoluteUrl(localizedPath(lang, routes.contact)),
        image: absoluteUrl(ogImage.src),
        telephone: c.phone.e164,
        address: postalAddress(c),
        ...(c.geo ? { geo: { '@type': 'GeoCoordinates', latitude: c.geo.lat, longitude: c.geo.lng } } : {}),
        openingHoursSpecification: openingHours(c.id),
        medicalSpecialty: ['https://schema.org/Oncologic', 'https://schema.org/Surgical'],
        employee: { '@id': PHYSICIAN_ID },
      })),
    ],
  };
}

export function faqSchema(faqs: Faq[], lang: Locale): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question[lang],
      acceptedAnswer: { '@type': 'Answer', text: f.answer[lang] },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Services page: a MedicalWebPage describing every procedure offered. */
export function servicesSchema(lang: Locale, title: string, description: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    description,
    inLanguage: lang,
    url: absoluteUrl(localizedPath(lang, routes.services)),
    specialty: 'https://schema.org/Surgical',
    author: { '@id': PHYSICIAN_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: departments.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'MedicalProcedure',
          name: s.title[lang],
          description: s.description[lang],
          url: `${absoluteUrl(localizedPath(lang, routes.services))}#${s.id}`,
        },
      })),
    },
  };
}

/** Articles index: a MedicalWebPage + ItemList of articles. */
export function articlesIndexSchema(lang: Locale, title: string, description: string, list: Article[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalWebPage', 'CollectionPage'],
    name: title,
    description,
    inLanguage: lang,
    url: absoluteUrl(localizedPath(lang, routes.articles)),
    reviewedBy: { '@id': PHYSICIAN_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: list.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(localizedPath(lang, articlePath(a.slug))),
        name: a.title[lang],
      })),
    },
  };
}

/** Article detail: MedicalWebPage whose main entity is the Article. */
export function articleSchema(article: Article, lang: Locale): JsonLdNode {
  const url = absoluteUrl(localizedPath(lang, articlePath(article.slug)));
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${url}#webpage`,
    url,
    name: article.title[lang],
    description: article.excerpt[lang],
    inLanguage: lang,
    lastReviewed: article.updatedAt,
    reviewedBy: { '@id': PHYSICIAN_ID },
    about: { '@type': 'MedicalCondition', name: articleCategories[article.category][lang] },
    mainEntity: {
      '@type': 'Article',
      headline: article.title[lang],
      description: article.excerpt[lang],
      image: absoluteUrl(article.image),
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      inLanguage: lang,
      articleSection: articleCategories[article.category][lang],
      author: { '@type': 'Person', name: doctor.name[lang], jobTitle: doctor.title[lang], url: absoluteUrl(localizedPath(lang, routes.about)) },
      publisher: { '@id': PHYSICIAN_ID },
      mainEntityOfPage: url,
    },
  };
}

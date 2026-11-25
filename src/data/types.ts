import type { Localized } from '@/i18n/config';

/** Keys resolved to Lucide icons by `components/shared/DataIcon.tsx`. */
export type IconKey =
  | 'breast'
  | 'colorectal'
  | 'gastric'
  | 'liver'
  | 'gynecologic'
  | 'general'
  | 'oncology'
  | 'patients'
  | 'surgeries'
  | 'years'
  | 'satisfaction'
  | 'conferences'
  | 'degree'
  | 'hospital'
  | 'award'
  | 'fellowship'
  | 'membership'
  | 'consultant';

export interface HeroImage {
  desktop: string;
  mobile: string;
  alt: Localized;
}

export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: IconKey;
  label: Localized;
}

export interface Procedure {
  id: string;
  /** Defaults to /images/procedures/<id>.webp (see `procedureImage()`). */
  image?: string;
  title: Localized;
  description: Localized;
  stay: Localized;
  recovery: Localized;
}

export interface Specialty {
  /** Used as the in-page anchor on /services/ (e.g. /services/#hernia-surgery). */
  id: string;
  icon: IconKey;
  image: string;
  title: Localized;
  short: Localized;
  description: Localized;
  highlights: Localized<string[]>;
  procedures: Procedure[];
}

export interface FeaturedSurgery {
  id: string;
  specialtyId: string;
  image: string;
  title: Localized;
  description: Localized;
  tag: Localized;
}

export interface Review {
  id: string;
  name: Localized;
  procedure: Localized;
  rating: 1 | 2 | 3 | 4 | 5;
  text: Localized;
}

export interface VideoItem {
  id: string;
  /** YouTube video / Shorts ID. When empty, the card opens the YouTube channel instead. */
  youtubeId?: string;
  thumbnail: string;
  duration: string;
  title: Localized;
  topic: Localized;
}

export type ArticleCategory = 'anorectal' | 'colorectal' | 'breast' | 'gastric' | 'recovery';

export interface ArticleSection {
  heading: string;
  text: string;
}

export interface Article {
  slug: string;
  category: ArticleCategory;
  image: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  featured?: boolean;
  title: Localized;
  excerpt: Localized;
  body: Localized<ArticleSection[]>;
  takeaways: Localized<string[]>;
}

export interface Faq {
  id: string;
  question: Localized;
  answer: Localized;
}

export interface TimelineItem {
  /** Short label shown in the pill (a year once confirmed, or a place/degree). */
  badge: Localized;
  icon: IconKey;
  title: Localized;
  place: Localized;
  description: Localized;
}

export interface Certification {
  id: string;
  icon: IconKey;
  title: Localized;
  issuer: Localized;
  /** Short label shown in the corner pill (city / country / year). */
  badge: Localized;
}

export interface Clinic {
  id: string;
  name: Localized;
  address: Localized;
  /** Free-text query used for the Google Maps embed + directions link. */
  mapQuery: string;
  phone: { display: string; e164: string };
  hours: Localized;
  /** Exact coordinates (optional — omitted from JSON-LD until confirmed). */
  geo?: { lat: number; lng: number };
  street: string;
  locality: string;
  region: string;
}

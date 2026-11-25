export const locales = ['ar', 'en'] as const;

export type Locale = (typeof locales)[number];

/** Arabic is the primary language of the site. */
export const defaultLocale: Locale = 'ar';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeMeta: Record<
  Locale,
  { dir: 'rtl' | 'ltr'; ogLocale: string; shortLabel: string; name: string; intl: string }
> = {
  ar: { dir: 'rtl', ogLocale: 'ar_EG', shortLabel: 'عربي', name: 'العربية', intl: 'ar-EG' },
  en: { dir: 'ltr', ogLocale: 'en_US', shortLabel: 'EN', name: 'English', intl: 'en-US' },
};

/** A value provided in every supported locale (content data layer). */
export type Localized<T = string> = Record<Locale, T>;

export function otherLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}

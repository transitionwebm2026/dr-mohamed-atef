import { siteConfig } from '@/config/site';

type ClassValue = string | false | null | undefined;

/** Tiny className joiner (no runtime dependency). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}

/** wa.me deep link with an optional pre-filled message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telUrl(e164: string = siteConfig.phone.e164): string {
  return `tel:${e164.replace(/[^\d+]/g, '')}`;
}

/** Latin digits in both locales keep numbers crisp and consistent with phone numbers. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatDate(iso: string, intlLocale: string): string {
  // Date-only ISO strings parse as UTC midnight — format in UTC so the day never shifts.
  return new Intl.DateTimeFormat(`${intlLocale}-u-nu-latn`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

/** Safe JSON serialisation for <script type="application/ld+json">. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

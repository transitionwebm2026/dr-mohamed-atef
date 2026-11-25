import { siteConfig } from '@/config/site';
import type { Clinic } from './types';

/**
 * Clinic branches — from the doctor's public directory listings:
 *  - Vezeeta:        "المعادي : شارع اللاسلكى - بجوار ميدان مؤمن"
 *  - Dalili Medical: "4018 ش احمد البدوى المعراج العلوى البساتين خلف كارفور المعادى"
 * ⚠️ Confirm with the clinic which address(es) are current, plus the exact working hours.
 */
export const clinics: Clinic[] = [
  {
    id: 'maadi-laselki',
    name: { ar: 'عيادة المعادي — شارع اللاسلكي', en: 'Maadi Clinic — El Laselki St.' },
    address: {
      ar: 'شارع اللاسلكي، بجوار ميدان مؤمن، المعادي، القاهرة',
      en: 'El Laselki St., next to Momen Square, Maadi, Cairo',
    },
    mapQuery: 'شارع اللاسلكي ميدان مؤمن المعادي القاهرة',
    phone: siteConfig.phone,
    hours: {
      ar: 'بالحجز المسبق — تواصل معنا لتحديد الموعد',
      en: 'By appointment — contact us to schedule',
    },
    street: 'El Laselki St., next to Momen Square',
    locality: 'Maadi',
    region: 'Cairo',
  },
  {
    id: 'maadi-meraj',
    name: { ar: 'عيادة المعراج — خلف كارفور المعادي', en: 'El Meraj Clinic — behind Carrefour Maadi' },
    address: {
      ar: '4018 شارع أحمد البدوي، المعراج العلوي، خلف كارفور المعادي، القاهرة',
      en: '4018 Ahmed El Badawy St., Upper Meraj, behind Carrefour Maadi, Cairo',
    },
    mapQuery: 'المعراج العلوي خلف كارفور المعادي القاهرة',
    phone: siteConfig.phone,
    hours: {
      ar: 'بالحجز المسبق — تواصل معنا لتحديد الموعد',
      en: 'By appointment — contact us to schedule',
    },
    street: '4018 Ahmed El Badawy St., Upper Meraj',
    locality: 'Maadi',
    region: 'Cairo',
  },
];

/**
 * Opening hours in schema.org format, keyed by clinic id.
 * Left empty until the real schedule is confirmed (JSON-LD omits it when missing).
 */
export const clinicOpeningHours: Record<string, { days: string[]; opens: string; closes: string }> = {};

export function mapEmbedUrl(query: string, lang: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=${lang}&z=15&output=embed`;
}

export function directionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

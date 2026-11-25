import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { localizedPath, routes } from '@/lib/routes';
import { CtaBanner } from '@/components/shared/CtaBanner';

interface PageCtaBannerProps {
  lang: Locale;
  dict: Dictionary;
  copy: { title: string; subtitle: string };
  /** Override the Contact button target (e.g. '#booking' on the contact page). */
  contactHref?: string;
}

export function PageCtaBanner({ lang, dict, copy, contactHref }: PageCtaBannerProps) {
  return (
    <CtaBanner
      title={copy.title}
      subtitle={copy.subtitle}
      contactLabel={dict.common.contactUs}
      contactHref={contactHref ?? localizedPath(lang, routes.contact)}
      whatsappLabel={dict.common.whatsapp}
      whatsappMessage={dict.floating.whatsappGreeting}
    />
  );
}

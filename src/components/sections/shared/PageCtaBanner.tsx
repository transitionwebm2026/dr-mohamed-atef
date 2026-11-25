import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { localizedPath, routes } from '@/lib/routes';
import { CtaBanner } from '@/components/shared/CtaBanner';

interface PageCtaBannerProps {
  lang: Locale;
  dict: Dictionary;
  copy: { title: string; subtitle: string };
  /** Override the booking target (e.g. '#booking' on the contact page itself). */
  contactHref?: string;
}

export function PageCtaBanner({ lang, dict, copy, contactHref }: PageCtaBannerProps) {
  return (
    <CtaBanner
      title={copy.title}
      subtitle={copy.subtitle}
      bookLabel={dict.common.bookConsultation}
      bookHref={contactHref ?? `${localizedPath(lang, routes.contact)}#booking`}
      callLabel={dict.common.callUs}
      whatsappLabel={dict.common.whatsapp}
      whatsappMessage={dict.floating.whatsappGreeting}
    />
  );
}

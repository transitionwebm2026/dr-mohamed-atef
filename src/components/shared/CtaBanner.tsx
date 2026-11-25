import { Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { telUrl, whatsappUrl } from '@/lib/utils';
import { WhatsAppIcon } from './BrandIcons';
import { CtaMagnet } from './CtaMagnet';
import { Reveal } from './Reveal';

interface CtaBannerProps {
  title: string;
  subtitle: string;
  bookLabel: string;
  bookHref: string;
  callLabel: string;
  whatsappLabel: string;
  whatsappMessage: string;
}

/**
 * Page-closing call-to-action on the primary gold: an oversized outlined "book" line drifts
 * behind the band, and the booking button is a magnetic disc inside a turning ring of text.
 * WhatsApp and a direct call sit under the headline.
 */
export function CtaBanner({ title, subtitle, bookLabel, bookHref, callLabel, whatsappLabel, whatsappMessage }: CtaBannerProps) {
  const drift = Array.from({ length: 4 }, (_, i) => i);
  const chip =
    'group inline-flex h-12 items-center gap-3 rounded-full ps-1.5 pe-5 text-sm font-bold ring-1 ring-ink/30 ring-inset transition-colors duration-300 hover:bg-ink hover:text-white';

  return (
    <section className="relative isolate overflow-hidden bg-gold text-ink">
      {/* Oversized outlined line, drifting (RTL drifts the other way) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 [--outline:rgb(58_58_56/0.18)]">
        <div className="flex w-max animate-[marquee_70s_linear_infinite] rtl:[--marquee-to:25%]">
          {drift.map((i) => (
            <span
              key={i}
              className="shrink-0 pe-16 font-display text-[6.5rem] leading-none font-bold whitespace-nowrap text-outline sm:text-[9rem] lg:text-[13rem]"
            >
              {bookLabel} ✦
            </span>
          ))}
        </div>
      </div>

      <div className="container-x grid items-center gap-8 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <Reveal className="lg:col-span-7">
          <h2 className="max-w-2xl text-[2.1rem] leading-[1.3] font-bold text-balance sm:text-5xl lg:text-[3.5rem] ltr:tracking-tight">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-loose text-ink/80 sm:text-lg">{subtitle}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className={chip}>
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-ink text-whatsapp transition-colors group-hover:bg-whatsapp group-hover:text-ink">
                <WhatsAppIcon className="size-4" />
              </span>
              {whatsappLabel}
            </a>
            <a href={telUrl()} aria-label={`${callLabel}: ${siteConfig.phone.display}`} className={chip}>
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-ink text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                <Phone className="size-4" />
              </span>
              <span dir="ltr" className="whitespace-nowrap">{siteConfig.phone.display}</span>
            </a>
          </div>
        </Reveal>

        <Reveal variant="zoom" delay={0.15} className="flex justify-center lg:col-span-5 lg:justify-end">
          <CtaMagnet id="cta-ring" href={bookHref} label={bookLabel} ringText={`${bookLabel}  ✦  `} />
        </Reveal>
      </div>
    </section>
  );
}

import { ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '@/lib/utils';
import { ButtonLink } from './ButtonLink';
import { WhatsAppIcon } from './BrandIcons';
import { Reveal } from './Reveal';

interface CtaBannerProps {
  title: string;
  subtitle: string;
  contactLabel: string;
  contactHref: string;
  whatsappLabel: string;
  whatsappMessage: string;
}

/** Page-closing call-to-action: punchy 2-line headline + Contact & WhatsApp buttons. */
export function CtaBanner({ title, subtitle, contactLabel, contactHref, whatsappLabel, whatsappMessage }: CtaBannerProps) {
  return (
    <section className="bg-white pt-20 pb-14 lg:pt-28 lg:pb-16">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center sm:px-12 lg:py-20">
            <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
            <div
              aria-hidden="true"
              className="absolute -top-40 -z-10 size-[30rem] rounded-full bg-gold/25 blur-3xl ltr:-left-24 rtl:-right-24"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-48 -z-10 size-[28rem] rounded-full bg-silver/15 blur-3xl ltr:-right-24 rtl:-left-24"
            />
            <div aria-hidden="true" className="absolute inset-3 -z-10 rounded-[1.6rem] border border-white/10" />

            <h2 className="mx-auto max-w-3xl text-3xl leading-[1.3] font-extrabold text-balance text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-loose text-white/75 sm:text-lg">{subtitle}</p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink href={contactHref} size="lg">
                {contactLabel}
                <ArrowUpRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
              </ButtonLink>
              <ButtonLink href={whatsappUrl(whatsappMessage)} external size="lg" variant="whatsapp">
                <WhatsAppIcon className="size-5" />
                {whatsappLabel}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

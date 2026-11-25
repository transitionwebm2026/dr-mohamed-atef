import { CalendarCheck } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { localizedPath, routes } from '@/lib/routes';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function WhyChoose({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.why;

  return (
    <section className="section-y relative overflow-hidden bg-white">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading align="start" title={copy.title} description={copy.description} />
          <ButtonLink href={`${localizedPath(lang, routes.contact)}#booking`} size="lg" className="mt-10">
            <CalendarCheck aria-hidden="true" className="size-5" />
            {copy.cta}
          </ButtonLink>
        </Reveal>

        <ol className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
          {copy.pillars.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar.title}
              delay={(i % 2) * 0.1}
              className="group relative overflow-hidden card-smart rounded-3xl border border-silver bg-white p-8 shadow-card transition duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-card-hover sm:even:translate-y-8 sm:even:hover:translate-y-6"
            >
              <span
                aria-hidden="true"
                className="absolute -top-10 size-32 rounded-full bg-gold/10 transition-transform duration-700 group-hover:scale-150 ltr:-right-10 rtl:-left-10"
              />
              <span className="relative grid size-14 place-items-center rounded-2xl bg-gold text-xl font-extrabold text-ink shadow-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" dir="ltr">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="relative mt-6 text-xl leading-relaxed font-extrabold text-ink">{pillar.title}</h3>
              <p className="relative mt-3 leading-loose text-ink-500">{pillar.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

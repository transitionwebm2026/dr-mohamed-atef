import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { featuredSurgeries } from '@/data/services';
import { localizedPath, routes } from '@/lib/routes';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function FeaturedSurgeries({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.featured;
  const servicesHref = localizedPath(lang, routes.services);

  return (
    <section className="section-y bg-paper">
      <div className="container-x">
        <Reveal>
          <SectionHeading title={copy.title} description={copy.description} />
        </Reveal>

        <ul className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredSurgeries.map((item, i) => (
            <Reveal as="li" variant="zoom" key={item.id} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col overflow-hidden card-smart rounded-3xl border border-silver bg-white shadow-card transition duration-500 hover:-translate-y-2 hover:shadow-card-hover">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title[lang]}
                    width={960}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-transparent" />
                  <span className="absolute start-5 top-5 rounded-full bg-silver px-3 py-1 text-xs font-bold text-ink shadow-sm">
                    {item.tag[lang]}
                  </span>
                </div>
                <div className="relative flex flex-1 flex-col p-7">
                  <span aria-hidden="true" className="absolute start-7 top-0 h-1 w-14 -translate-y-1/2 rounded-full bg-gold transition-all duration-500 group-hover:w-28" />
                  <h3 className="text-xl leading-relaxed font-extrabold text-ink">
                    <Link href={`${servicesHref}#${item.specialtyId}`} className="after:absolute after:inset-0 after:content-['']">
                      {item.title[lang]}
                    </Link>
                  </h3>
                  <p className="mt-3 leading-loose text-ink-500">{item.description[lang]}</p>
                  <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-ink transition-colors group-hover:text-gold-600">
                    {copy.details}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href={servicesHref} size="lg">
            {copy.cta}
            <ArrowRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

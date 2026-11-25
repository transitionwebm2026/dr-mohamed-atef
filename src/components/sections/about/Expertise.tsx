import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { specialties } from '@/data/services';
import { localizedPath, routes } from '@/lib/routes';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { DataIcon } from '@/components/shared/DataIcon';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Expertise({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.about.expertise;
  const servicesHref = localizedPath(lang, routes.services);

  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <Reveal>
          <SectionHeading title={copy.title} description={copy.description} />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal as="li" variant="zoom" key={s.id} delay={(i % 3) * 0.08}>
              <article className="group relative flex h-full flex-col card-smart rounded-3xl border border-silver bg-white p-7 shadow-card transition duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-card-hover">
                <span className="grid size-14 place-items-center rounded-2xl bg-silver/40 text-ink transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-gold">
                  <DataIcon name={s.icon} className="size-7" />
                </span>
                <h3 className="mt-6 text-lg leading-relaxed font-extrabold text-ink">
                  <Link href={`${servicesHref}#${s.id}`} className="after:absolute after:inset-0 after:content-['']">
                    {s.title[lang]}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-loose text-ink-500">{s.short[lang]}</p>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-6 size-5 text-gold-600 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                />
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

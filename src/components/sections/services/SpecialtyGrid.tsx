import { ArrowDown } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { specialties } from '@/data/services';
import { DataIcon } from '@/components/shared/DataIcon';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

/** Interactive anchor cards — each smoothly scrolls to its detailed section below. */
export function SpecialtyGrid({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.services.grid;

  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <Reveal>
          <SectionHeading title={copy.title} description={copy.description} />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal as="li" variant="zoom" key={s.id} delay={(i % 3) * 0.08}>
              <a
                href={`#${s.id}`}
                className="card-smart group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-card-hover sm:aspect-[5/4] lg:aspect-[4/3]"
              >
                <img
                  src={s.image}
                  alt=""
                  width={960}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-20 size-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/60 to-ink/10" />
                <span className="absolute start-6 top-6 grid size-12 place-items-center rounded-2xl bg-white/15 text-gold backdrop-blur-md transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                  <DataIcon name={s.icon} className="size-6" />
                </span>
                <h3 className="text-xl leading-relaxed font-extrabold">{s.title[lang]}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/75">{s.short[lang]}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold">
                  {copy.jump}
                  <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
                </span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-center scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

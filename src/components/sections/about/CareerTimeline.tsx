import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { timeline } from '@/data/doctor';
import { DataIcon } from '@/components/shared/DataIcon';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function CareerTimeline({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.about.timeline;

  return (
    <section className="section-y bg-paper">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <SectionHeading align="start" title={copy.title} description={copy.description} />
        </Reveal>

        <ol className="relative lg:col-span-8">
          <span aria-hidden="true" className="absolute start-7 top-2 bottom-2 w-px bg-linear-to-b from-gold via-silver to-silver/30" />
          {timeline.map((item, i) => (
            <Reveal as="li" variant="zoom" key={item.title.en} delay={i * 0.06} className="relative ps-20 pb-10 last:pb-0">
              <span className="absolute start-0 top-0 grid size-14 place-items-center rounded-2xl border border-gold/60 bg-gold/15 text-ink shadow-card">
                <DataIcon name={item.icon} className="size-6" />
              </span>
              <article className="group card-smart rounded-3xl border border-silver bg-white p-6 shadow-card transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-card-hover sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-ink px-3.5 py-1 text-sm font-extrabold text-gold">
                    {item.badge[lang]}
                  </span>
                  <span className="text-sm font-bold text-ink-500">{item.place[lang]}</span>
                </div>
                <h3 className="mt-4 text-xl leading-relaxed font-extrabold text-ink">{item.title[lang]}</h3>
                <p className="mt-2 leading-loose text-ink-500">{item.description[lang]}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

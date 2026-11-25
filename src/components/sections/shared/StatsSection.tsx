import type { Locale } from '@/i18n/config';
import type { Stat } from '@/data/types';
import { CountUp } from '@/components/shared/CountUp';
import { DataIcon } from '@/components/shared/DataIcon';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';

interface StatsSectionProps {
  lang: Locale;
  stats: Stat[];
  /** `band`: full-bleed dark strip (Home). `cards`: headed grid (About). */
  variant?: 'band' | 'cards';
  title: string;
  description?: string;
}

export function StatsSection({ lang, stats, variant = 'band', title, description }: StatsSectionProps) {
  if (variant === 'band') {
    return (
      <section aria-labelledby="impact-title" className="relative isolate overflow-hidden bg-ink py-14 text-white lg:py-20">
        <h2 id="impact-title" className="sr-only">
          {title}
        </h2>
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
        <ul className="container-x grid gap-10 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.id}
              delay={i * 0.1}
              className={cn(
                'flex flex-col items-center gap-4 text-center sm:px-6',
                i > 0 && 'border-t border-white/10 pt-10 sm:border-t-0 sm:border-s sm:pt-0',
              )}
            >
              <span className="grid size-14 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                <DataIcon name={stat.icon} className="size-7" />
              </span>
              <span className="text-5xl font-extrabold text-gold lg:text-6xl">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </span>
              <span className="text-base font-bold text-white/80 sm:text-lg">{stat.label[lang]}</span>
            </Reveal>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="section-y relative overflow-hidden bg-paper">
      <div className="container-x">
        <Reveal>
          <SectionHeading title={title} description={description} />
        </Reveal>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.id}
              delay={(i % 3) * 0.08}
              className="group relative flex items-center gap-5 overflow-hidden card-smart rounded-3xl border border-silver bg-white p-7 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-ink text-gold transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                <DataIcon name={stat.icon} className="size-8" />
              </span>
              <span className="flex flex-col">
                <span className="text-4xl font-extrabold text-ink">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
                <span className="mt-1 text-sm font-bold text-ink-500">{stat.label[lang]}</span>
              </span>
              <span aria-hidden="true" className="absolute inset-y-0 start-0 w-1 bg-gold" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { localeMeta, type Locale } from '@/i18n/config';
import type { Stat } from '@/data/types';
import { DataIcon } from '@/components/shared/DataIcon';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Odometer, PercentBar } from '@/components/shared/Odometer';
import { Reveal } from '@/components/shared/Reveal';
import { RingIcon } from '@/components/shared/RingIcon';
import { SectionHeading, headingClass } from '@/components/shared/SectionHeading';
import { PulseStats } from '@/components/sections/home/PulseStats';
import { cn } from '@/lib/utils';

interface StatsSectionProps {
  lang: Locale;
  stats: Stat[];
  /** `band`: dark "vital signs" strip with a heartbeat trace under the figures (Home). `cards`: bento of glass tiles with rolling counters (About). */
  variant?: 'band' | 'cards';
  title: string;
  description?: string;
}

export function StatsSection({ lang, stats, variant = 'band', title, description }: StatsSectionProps) {
  if (variant === 'band') {
    return (
      <PulseStats
        dir={localeMeta[lang].dir}
        heading={
          <Reveal>
            <h2 id="impact-title" className={cn(headingClass, 'flex items-center gap-4 text-white')}>
              {/* A live monitor's beat beside the title */}
              <span aria-hidden="true" className="relative grid size-3.5 shrink-0 place-items-center">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold/60" />
                <span className="relative size-2.5 rounded-full bg-gold" />
              </span>
              {title}
            </h2>
          </Reveal>
        }
        stats={stats.map((s) => ({ id: s.id, value: s.value, prefix: s.prefix, suffix: s.suffix, label: s.label[lang] }))}
      />
    );
  }

  // Bento of 3D glass tiles; figures roll in like a counter. Unknown ids fall back to a single tile.
  const ordered = [...stats].sort((a, b) => bentoOrder(a.id) - bentoOrder(b.id));

  return (
    <section className="section-y bg-white">
      <GlassStage tone="light" layout="a" />
      <div className="container-x">
        <Reveal>
          <SectionHeading align="split" title={title} description={description} />
        </Reveal>
        <ul className="mt-14 grid grid-flow-dense grid-cols-2 gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {ordered.map((stat, i) => (
            <li key={stat.id} className={cn('min-w-0', tileSpan[stat.id] ?? '')}>
              <BentoTile stat={stat} lang={lang} delay={i * 0.08} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const ORDER = ['patients', 'surgeries', 'years', 'satisfaction', 'oncology', 'conferences'];
const bentoOrder = (id: string) => {
  const i = ORDER.indexOf(id);
  return i === -1 ? ORDER.length : i;
};

const tileSpan: Record<string, string> = {
  patients: 'col-span-2 lg:row-span-2',
  satisfaction: 'col-span-2',
  oncology: 'lg:col-span-2',
  conferences: 'lg:col-span-2',
};

function BentoTile({ stat, lang, delay }: { stat: Stat; lang: Locale; delay: number }) {
  const hero = stat.id === 'patients';
  const percent = stat.suffix === '%';

  return (
    <GlassCard
      tone="light"
      gold={hero}
      delay={delay}
      maxTilt={hero ? 6 : 9}
      contentClassName={cn('flex h-full flex-col justify-between overflow-hidden rounded-[2rem]', hero ? 'p-7 sm:p-10' : 'p-5 sm:p-7')}
    >
      {hero ? (
        // Concentric rings floating in the corner of the lead tile
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          fill="none"
          className="pointer-events-none absolute -end-16 -bottom-16 size-72 animate-spin-slow text-gold-600/40 [transform:translateZ(10px)] sm:size-96"
        >
          <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 6" />
          <circle cx="100" cy="100" r="52" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="196" cy="100" r="4" className="fill-gold" />
        </svg>
      ) : null}

      <div className="[transform:translateZ(40px)]">
        <RingIcon size={hero ? 'md' : 'sm'} interactive={false} className="bg-white/80 shadow-[0_12px_24px_-12px_rgb(58_58_56/0.4)]">
          <DataIcon name={stat.icon} className="ring-icon" />
        </RingIcon>
      </div>

      <div className={cn('[transform:translateZ(55px)]', hero ? 'mt-16 sm:mt-24' : 'mt-8')}>
        <Odometer
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          delay={0.15 + delay}
          className={cn(
            'block font-display leading-none font-semibold text-ink',
            hero ? 'text-[3.6rem] sm:text-7xl lg:text-[6.5rem]' : 'text-[2rem] sm:text-5xl',
          )}
        />
        <p className={cn('mt-3 leading-relaxed font-bold text-ink-700', hero ? 'text-lg sm:text-xl' : 'text-sm sm:text-base')}>
          {stat.label[lang]}
        </p>
        {percent ? <PercentBar value={stat.value} delay={0.3 + delay} /> : null}
      </div>
    </GlassCard>
  );
}

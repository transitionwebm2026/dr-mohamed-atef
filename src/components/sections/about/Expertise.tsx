import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { departments } from '@/data/services';
import { localizedPath, routes } from '@/lib/routes';
import { ButtonLink, KnobArrow } from '@/components/shared/ButtonLink';
import { DataIcon } from '@/components/shared/DataIcon';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { RingIcon } from '@/components/shared/RingIcon';
import { SectionHeading } from '@/components/shared/SectionHeading';

/** The three departments as 3D liquid-glass slabs; each slab links to its section on Services. */
export function Expertise({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.about.expertise;
  const servicesHref = localizedPath(lang, routes.services);

  return (
    <section className="section-y bg-paper">
      <GlassStage tone="light" layout="b" />
      <div className="container-x">
        <Reveal>
          <SectionHeading
            align="split"
            title={copy.title}
            description={copy.description}
            action={<ButtonLink href={servicesHref}>{copy.cta}</ButtonLink>}
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {departments.map((s, i) => (
            <li key={s.id} className="min-w-0 sm:last:col-span-2 lg:last:col-span-1">
              <GlassCard tone="light" gold={i === 0} delay={(i % 3) * 0.1} contentClassName="group/btn flex h-full flex-col p-7 sm:p-8">
                {/* Whole slab is the link (content layers are transformed, so the link is its own layer) */}
                <Link
                  href={`${servicesHref}#${s.id}`}
                  aria-labelledby={`expertise-${s.id}`}
                  className="absolute inset-0 z-20 rounded-[2rem] focus-visible:outline-offset-4"
                />
                <div className="flex items-start justify-between gap-4 [transform:translateZ(55px)]">
                  <RingIcon size="md" className="bg-white/80 shadow-[0_12px_24px_-12px_rgb(58_58_56/0.4)]">
                    <DataIcon name={s.icon} className="ring-icon" />
                  </RingIcon>
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-white/70 text-ink ring-1 ring-white transition duration-500 group-hover:bg-gold"
                  >
                    <KnobArrow />
                  </span>
                </div>
                <h3 id={`expertise-${s.id}`} className="mt-7 font-display text-xl leading-relaxed font-semibold text-ink [transform:translateZ(36px)]">
                  {s.title[lang]}
                </h3>
                <p className="mt-2 text-sm leading-loose text-ink-700 [transform:translateZ(20px)]">{s.short[lang]}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6 [transform:translateZ(28px)]">
                  {s.tags[lang].map((tag) => (
                    <li key={tag} className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-ink-700 ring-1 ring-white">
                      {tag}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

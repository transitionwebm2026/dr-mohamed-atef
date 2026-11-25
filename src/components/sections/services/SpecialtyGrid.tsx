import { ArrowDown } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { specialties } from '@/data/services';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

/**
 * Specialties as 3D glass slabs: the round photo and the arrow float highest, the title and
 * summary just above the glass. Each slab jumps to its detailed section below.
 */
export function SpecialtyGrid({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.services.grid;

  return (
    <section className="section-y bg-white">
      <GlassStage tone="light" layout="b" />
      <div className="container-x">
        <Reveal>
          <SectionHeading align="split" title={copy.title} description={copy.description} />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {specialties.map((s, i) => (
            <li key={s.id}>
              <GlassCard tone="light" gold={i === 0} delay={(i % 3) * 0.1} contentClassName="p-7">
                {/* Whole slab is the link (content layers are transformed, so the link is its own layer) */}
                <a
                  href={`#${s.id}`}
                  aria-labelledby={`${s.id}-card`}
                  className="absolute inset-0 z-20 rounded-[2rem] focus-visible:outline-offset-4"
                >
                  <span className="sr-only">{copy.jump}</span>
                </a>
                <div className="flex items-start justify-between gap-4 [transform:translateZ(55px)]">
                  <span className="relative size-20 shrink-0 overflow-hidden rounded-full shadow-[0_16px_30px_-14px_rgb(58_58_56/0.55)] ring-4 ring-white sm:size-[5.5rem]">
                    <img
                      src={s.image}
                      alt=""
                      width={320}
                      height={320}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition duration-700 ease-out group-hover:scale-110"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-white/70 text-ink ring-1 ring-white transition duration-500 group-hover:bg-gold"
                  >
                    <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
                  </span>
                </div>
                <h3 id={`${s.id}-card`} className="mt-7 font-display text-xl leading-relaxed font-semibold text-ink [transform:translateZ(36px)]">
                  {s.title[lang]}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-700 [transform:translateZ(20px)]">{s.short[lang]}</p>
              </GlassCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { CalendarCheck } from 'lucide-react';
import { localeMeta, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { procedureImage, specialties } from '@/data/services';
import { localizedPath, routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { DataIcon } from '@/components/shared/DataIcon';
import { GoldCheck } from '@/components/shared/GoldCheck';
import { headingClass } from '@/components/shared/SectionHeading';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { ProcedureShowcase, type ProcedureView } from './ProcedureShowcase';

const stageLayouts = ['c', 'a', 'b'] as const;

/** One rich section per specialty, each addressable by its id (#hernia-surgery …). */
export function SpecialtyDetails({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.services.detail;
  const contactHref = localizedPath(lang, routes.contact);

  return (
    <div>
      {specialties.map((s, index) => {
        const procedures: ProcedureView[] = s.procedures.map((p, i) => ({
          id: p.id,
          title: p.title[lang],
          description: p.description[lang],
          stay: p.stay[lang],
          recovery: p.recovery[lang],
          // The first procedure keeps the specialty's hero image
          image: i === 0 ? s.image : procedureImage(p),
        }));

        // Split header: title + description on the start side, highlights + CTA on the end side
        const intro = (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 id={`${s.id}-title`} className={headingClass}>
                {s.title[lang]}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-loose text-ink-500 sm:text-lg">{s.description[lang]}</p>
            </div>
            <div className="lg:col-span-5 lg:pt-3">
              <ul className="grid gap-3.5">
                {s.highlights[lang].map((h) => (
                  <li key={h} className="flex items-start gap-3 font-bold text-ink">
                    <GoldCheck className="mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`${contactHref}?service=${encodeURIComponent(`spec:${s.id}`)}#booking`}
                className="mt-8"
                variant="dark"
                icon={<CalendarCheck />}
              >
                {copy.book}
              </ButtonLink>
            </div>
          </div>
        );

        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={cn('section-y', index % 2 === 0 ? 'bg-paper' : 'bg-white')}
          >
            {/* Lit backdrop for the glass (static here — six sections in a row) */}
            <GlassStage tone="light" layout={stageLayouts[index % stageLayouts.length]} animated={false} />
            <div className="container-x">
              <ProcedureShowcase
                procedures={procedures}
                intro={intro}
                badge={<DataIcon name={s.icon} className="size-6" />}
                reversed={index % 2 === 1}
                dir={localeMeta[lang].dir}
                labels={{
                  title: copy.proceduresTitle,
                  hint: copy.proceduresHint,
                }}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

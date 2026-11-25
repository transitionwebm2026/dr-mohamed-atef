import { CalendarCheck } from 'lucide-react';
import { localeMeta, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { procedureImage, specialties } from '@/data/services';
import { localizedPath, routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { DataIcon } from '@/components/shared/DataIcon';
import { GoldCheck } from '@/components/shared/GoldCheck';
import { ProcedureShowcase, type ProcedureView } from './ProcedureShowcase';

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
          bookHref: `${contactHref}?service=${encodeURIComponent(`proc:${p.id}`)}#booking`,
        }));

        const intro = (
          <>
            <h2 id={`${s.id}-title`} className="text-3xl leading-[1.3] font-extrabold text-ink sm:text-4xl">
              {s.title[lang]}
            </h2>
            <p className="mt-5 text-base leading-loose text-ink-500 sm:text-lg">{s.description[lang]}</p>
            <ul className="mt-7 grid gap-3">
              {s.highlights[lang].map((h) => (
                <li key={h} className="flex items-start gap-3 font-bold text-ink">
                  <GoldCheck className="mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
            <ButtonLink href={`${contactHref}?service=${encodeURIComponent(`spec:${s.id}`)}#booking`} className="mt-9">
              <CalendarCheck aria-hidden="true" className="size-4" />
              {copy.book}
            </ButtonLink>
          </>
        );

        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={cn('section-y', index % 2 === 0 ? 'bg-paper' : 'bg-white')}
          >
            <div className="container-x">
              <ProcedureShowcase
                procedures={procedures}
                intro={intro}
                badge={<DataIcon name={s.icon} className="size-8" />}
                reversed={index % 2 === 1}
                dir={localeMeta[lang].dir}
                labels={{
                  title: copy.proceduresTitle,
                  hint: copy.proceduresHint,
                  nowShowing: copy.nowShowing,
                  bookProcedure: copy.bookProcedure,
                }}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

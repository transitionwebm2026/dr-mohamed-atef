import { localeMeta, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { timeline } from '@/data/doctor';
import { CareerJourney } from './CareerJourney';

/** "Milestones that built the expertise" — localised data for the scroll-driven journey. */
export function CareerTimeline({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.about.timeline;

  return (
    <CareerJourney
      title={copy.title}
      description={copy.description}
      hint={copy.hint}
      dir={localeMeta[lang].dir}
      stations={timeline.map((item) => ({
        badge: item.badge[lang],
        title: item.title[lang],
        place: item.place[lang],
        description: item.description[lang],
        icon: item.icon,
      }))}
    />
  );
}

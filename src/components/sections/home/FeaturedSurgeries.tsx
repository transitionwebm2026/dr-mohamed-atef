import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { featuredSurgeries } from '@/data/services';
import { localizedPath, routes } from '@/lib/routes';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { FeaturedPanels } from './FeaturedPanels';

export function FeaturedSurgeries({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.featured;
  const servicesHref = localizedPath(lang, routes.services);

  return (
    <section className="section-y bg-paper">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            align="split"
            title={copy.title}
            description={copy.description}
            action={<ButtonLink href={servicesHref}>{copy.cta}</ButtonLink>}
          />
        </Reveal>

        <Reveal className="mt-14 lg:mt-16" delay={0.08}>
          <FeaturedPanels
            items={featuredSurgeries.map((item) => ({
              id: item.id,
              href: `${servicesHref}#${item.specialtyId}`,
              image: item.image,
              title: item.title[lang],
              description: item.description[lang],
              tag: item.tag[lang],
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}

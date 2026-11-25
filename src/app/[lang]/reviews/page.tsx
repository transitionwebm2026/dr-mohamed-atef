import type { Metadata } from 'next';
import { CalendarCheck } from 'lucide-react';
import { resolveLocale, type LangParams } from '@/i18n/server';
import { getDictionary, t } from '@/dictionaries';
import { heroImages } from '@/data/media';
import { reviews } from '@/data/reviews';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';
import { toReviewCard } from '@/lib/localize';
import { localizedPath, routes } from '@/lib/routes';
import { UnifiedHero } from '@/components/shared/UnifiedHero';
import { JsonLd } from '@/components/shared/JsonLd';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';
import { GlassReviewWall } from '@/components/sections/reviews/GlassReviewWall';
import { GlassStage } from '@/components/shared/glass/GlassStage';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { meta } = getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: routes.reviews,
    title: meta.pages.reviews.title,
    description: meta.pages.reviews.description,
  });
}

export default async function ReviewsPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dict = getDictionary(lang);
  const hero = dict.hero.reviews;
  const copy = dict.reviews.grid;
  const crumbs = buildBreadcrumbs(lang, dict, [{ label: dict.nav.reviews, path: routes.reviews }]);
  const items = reviews.slice(0, 9).map((r) => toReviewCard(r, lang));

  return (
    <>
      <UnifiedHero
        lang={lang}
        image={heroImages.reviews}
        title={hero.title}
        accent={hero.accent}
        subtitle={hero.subtitle}
        breadcrumbs={crumbs.items}
        breadcrumbLabel={dict.common.breadcrumb}
        ctas={[
          {
            label: dict.common.bookConsultation,
            href: `${localizedPath(lang, routes.contact)}#booking`,
            icon: <CalendarCheck aria-hidden="true" className="size-5" />,
          },
          { label: dict.common.ourServices, href: localizedPath(lang, routes.services) },
        ]}
      />

      {/* Glass wall: reviews float as 3D liquid-glass slabs over drifting gold/silver light */}
      <section className="relative isolate overflow-clip bg-ink py-24 text-white lg:py-32">
        <GlassStage tone="dark" layout="a" />

        <div className="container-x">
          <Reveal>
            <SectionHeading align="split" tone="dark" title={copy.title} description={copy.description} />
          </Reveal>
          <div className="mt-16 lg:mt-24">
            <GlassReviewWall
              reviews={items}
              labels={{
                verified: dict.common.verifiedPatient,
                ratings: items.map((r) => t(dict.common.rating, { n: r.rating })),
              }}
            />
          </div>
        </div>
      </section>

      <PageCtaBanner lang={lang} dict={dict} copy={dict.reviews.cta} />
      <JsonLd data={crumbs.schema} />
    </>
  );
}

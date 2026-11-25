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
import { ReviewCard } from '@/components/shared/ReviewCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';

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

      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading title={copy.title} description={copy.description} />
          </Reveal>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((review, i) => (
              <Reveal as="li" variant="zoom" key={review.id} delay={(i % 3) * 0.08}>
                <ReviewCard
                  review={review}
                  verifiedLabel={dict.common.verifiedPatient}
                  ratingLabel={t(dict.common.rating, { n: review.rating })}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <PageCtaBanner lang={lang} dict={dict} copy={dict.reviews.cta} />
      <JsonLd data={crumbs.schema} />
    </>
  );
}

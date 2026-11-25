import { localeMeta, type Locale } from '@/i18n/config';
import { t, type Dictionary } from '@/dictionaries';
import { reviews } from '@/data/reviews';
import { localizedPath, routes } from '@/lib/routes';
import { toReviewCard } from '@/lib/localize';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ReviewsSlider } from './ReviewsSlider';

export function ReviewsSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.reviews;
  const items = reviews.slice(0, 6).map((r) => toReviewCard(r, lang));

  return (
    <section className="section-y bg-paper">
      <GlassStage tone="light" layout="c" />
      <div className="container-x">
        <Reveal>
          <SectionHeading
            align="split"
            title={copy.title}
            description={copy.description}
            action={
              <ButtonLink href={localizedPath(lang, routes.reviews)} variant="outline">
                {dict.common.viewAllReviews}
              </ButtonLink>
            }
          />
        </Reveal>
        <Reveal className="mt-14 lg:mt-16" delay={0.1}>
          <ReviewsSlider
            reviews={items}
            dir={localeMeta[lang].dir}
            labels={{
              ...dict.common.carousel,
              verified: dict.common.verifiedPatient,
              ratings: items.map((r) => t(dict.common.rating, { n: r.rating })),
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}

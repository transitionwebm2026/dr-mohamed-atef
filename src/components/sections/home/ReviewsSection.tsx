import { ArrowRight } from 'lucide-react';
import { localeMeta, type Locale } from '@/i18n/config';
import { t, type Dictionary } from '@/dictionaries';
import { reviews } from '@/data/reviews';
import { localizedPath, routes } from '@/lib/routes';
import { toReviewCard } from '@/lib/localize';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ReviewsSlider } from './ReviewsSlider';

export function ReviewsSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.reviews;
  const items = reviews.slice(0, 6).map((r) => toReviewCard(r, lang));

  return (
    <section className="section-y overflow-hidden bg-paper">
      <div className="container-x">
        <Reveal>
          <SectionHeading title={copy.title} description={copy.description} />
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
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
        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href={localizedPath(lang, routes.reviews)} variant="secondary" size="lg">
            {dict.common.viewAllReviews}
            <ArrowRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

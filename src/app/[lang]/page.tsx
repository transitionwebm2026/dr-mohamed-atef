import type { Metadata } from 'next';
import { CalendarCheck } from 'lucide-react';
import { resolveLocale, type LangParams } from '@/i18n/server';
import { getDictionary } from '@/dictionaries';
import { heroImages } from '@/data/media';
import { homeStats } from '@/data/doctor';
import { homeFaqs } from '@/data/faqs';
import { buildPageMetadata } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import { localizedPath, routes } from '@/lib/routes';
import { UnifiedHero } from '@/components/shared/UnifiedHero';
import { JsonLd } from '@/components/shared/JsonLd';
import { IntroSection } from '@/components/sections/home/IntroSection';
import { FeaturedSurgeries } from '@/components/sections/home/FeaturedSurgeries';
import { WhyChoose } from '@/components/sections/home/WhyChoose';
import { PatientJourney } from '@/components/sections/home/PatientJourney';
import { ReviewsSection } from '@/components/sections/home/ReviewsSection';
import { VideosSection } from '@/components/sections/home/VideosSection';
import { ArticlesSection } from '@/components/sections/home/ArticlesSection';
import { StatsSection } from '@/components/sections/shared/StatsSection';
import { FaqSection } from '@/components/sections/shared/FaqSection';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { meta } = getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: routes.home,
    title: meta.pages.home.title,
    description: meta.pages.home.description,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dict = getDictionary(lang);
  const hero = dict.hero.home;

  return (
    <>
      <UnifiedHero
        lang={lang}
        image={heroImages.home}
        title={hero.title}
        accent={hero.accent}
        subtitle={hero.subtitle}
        ctas={[
          {
            label: dict.common.bookNow,
            href: `${localizedPath(lang, routes.contact)}#booking`,
            icon: <CalendarCheck aria-hidden="true" className="size-5" />,
          },
          { label: dict.common.ourServices, href: localizedPath(lang, routes.services) },
        ]}
      />
      <IntroSection lang={lang} dict={dict} />
      <StatsSection lang={lang} stats={homeStats} variant="band" title={dict.home.stats.title} />
      <FeaturedSurgeries lang={lang} dict={dict} />
      <WhyChoose lang={lang} dict={dict} />
      <PatientJourney dict={dict} />
      <ReviewsSection lang={lang} dict={dict} />
      <VideosSection lang={lang} dict={dict} />
      <ArticlesSection lang={lang} dict={dict} />
      <FaqSection
        lang={lang}
        faqs={homeFaqs}
        title={dict.home.faq.title}
        description={dict.home.faq.description}
        more={{ label: dict.home.faq.more, href: `${localizedPath(lang, routes.services)}#faq` }}
        ask={{ label: dict.common.askOnWhatsapp, message: dict.common.askMessage }}
      />
      <PageCtaBanner lang={lang} dict={dict} copy={dict.home.cta} />
      <JsonLd data={faqSchema(homeFaqs, lang)} />
    </>
  );
}

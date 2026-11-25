import type { Metadata } from 'next';
import { CalendarCheck } from 'lucide-react';
import { resolveLocale, type LangParams } from '@/i18n/server';
import { getDictionary } from '@/dictionaries';
import { heroImages } from '@/data/media';
import { aboutStats } from '@/data/doctor';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';
import { localizedPath, routes } from '@/lib/routes';
import { UnifiedHero } from '@/components/shared/UnifiedHero';
import { JsonLd } from '@/components/shared/JsonLd';
import { DoctorWord } from '@/components/sections/about/DoctorWord';
import { CareerTimeline } from '@/components/sections/about/CareerTimeline';
import { PromoVideo } from '@/components/sections/about/PromoVideo';
import { Expertise } from '@/components/sections/about/Expertise';
import { Certifications } from '@/components/sections/about/Certifications';
import { StatsSection } from '@/components/sections/shared/StatsSection';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { meta } = getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: routes.about,
    title: meta.pages.about.title,
    description: meta.pages.about.description,
  });
}

export default async function AboutPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dict = getDictionary(lang);
  const hero = dict.hero.about;
  const crumbs = buildBreadcrumbs(lang, dict, [{ label: dict.nav.about, path: routes.about }]);

  return (
    <>
      <UnifiedHero
        lang={lang}
        image={heroImages.about}
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
      <DoctorWord dict={dict} />
      <CareerTimeline lang={lang} dict={dict} />
      <PromoVideo lang={lang} dict={dict} />
      <Expertise lang={lang} dict={dict} />
      <Certifications lang={lang} dict={dict} />
      <StatsSection
        lang={lang}
        stats={aboutStats}
        variant="cards"
        title={dict.about.achievements.title}
        description={dict.about.achievements.description}
      />
      <PageCtaBanner lang={lang} dict={dict} copy={dict.about.cta} />
      <JsonLd data={crumbs.schema} />
    </>
  );
}

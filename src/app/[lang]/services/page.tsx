import type { Metadata } from 'next';
import { CalendarCheck } from 'lucide-react';
import { resolveLocale, type LangParams } from '@/i18n/server';
import { getDictionary } from '@/dictionaries';
import { heroImages } from '@/data/media';
import { serviceFaqs } from '@/data/faqs';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';
import { faqSchema, servicesSchema } from '@/lib/schema';
import { localizedPath, routes } from '@/lib/routes';
import { UnifiedHero } from '@/components/shared/UnifiedHero';
import { JsonLd } from '@/components/shared/JsonLd';
import { SpecialtyGrid } from '@/components/sections/services/SpecialtyGrid';
import { SpecialtyDetails } from '@/components/sections/services/SpecialtyDetails';
import { TreatmentMethod } from '@/components/sections/services/TreatmentMethod';
import { FaqSection } from '@/components/sections/shared/FaqSection';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { meta } = getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: routes.services,
    title: meta.pages.services.title,
    description: meta.pages.services.description,
  });
}

export default async function ServicesPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dict = getDictionary(lang);
  const hero = dict.hero.services;
  const crumbs = buildBreadcrumbs(lang, dict, [{ label: dict.nav.services, path: routes.services }]);
  const page = dict.meta.pages.services;

  return (
    <>
      <UnifiedHero
        lang={lang}
        image={heroImages.services}
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
          { label: dict.services.grid.jump, href: '#specialties' },
        ]}
      />
      <div id="specialties">
        <SpecialtyGrid lang={lang} dict={dict} />
      </div>
      <SpecialtyDetails lang={lang} dict={dict} />
      <TreatmentMethod dict={dict} />
      <FaqSection
        id="faq"
        className="section-y bg-paper"
        lang={lang}
        faqs={serviceFaqs}
        title={dict.services.faq.title}
        description={dict.services.faq.description}
        ask={{ label: dict.common.askOnWhatsapp, message: dict.common.askMessage }}
      />
      <PageCtaBanner lang={lang} dict={dict} copy={dict.services.cta} />
      <JsonLd data={servicesSchema(lang, page.title, page.description)} />
      <JsonLd data={faqSchema(serviceFaqs, lang)} />
      <JsonLd data={crumbs.schema} />
    </>
  );
}

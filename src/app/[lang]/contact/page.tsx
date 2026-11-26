import type { Metadata } from 'next';
import { CalendarCheck } from 'lucide-react';
import { resolveLocale, type LangParams } from '@/i18n/server';
import { localeMeta } from '@/i18n/config';
import { getDictionary, t } from '@/dictionaries';
import { siteConfig } from '@/config/site';
import { heroImages } from '@/data/media';
import { clinics, directionsUrl, mapEmbedUrl } from '@/data/clinics';
import { departmentProcedures, departments } from '@/data/services';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';
import { routes } from '@/lib/routes';
import { telUrl, whatsappUrl } from '@/lib/utils';
import { UnifiedHero } from '@/components/shared/UnifiedHero';
import { JsonLd } from '@/components/shared/JsonLd';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { WhatsAppIcon } from '@/components/shared/BrandIcons';
import { BookingForm } from '@/components/sections/contact/BookingForm';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { ClinicLocations, type ClinicView } from '@/components/sections/contact/ClinicLocations';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { meta } = getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: routes.contact,
    title: meta.pages.contact.title,
    description: meta.pages.contact.description,
  });
}

export default async function ContactPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dict = getDictionary(lang);
  const hero = dict.hero.contact;
  const form = dict.contact.form;
  const info = dict.contact.info;
  const crumbs = buildBreadcrumbs(lang, dict, [{ label: dict.nav.contact, path: routes.contact }]);

  // One option group per department: the department itself, then every procedure in it
  const serviceGroups = departments.map((d) => ({
    label: d.title[lang],
    options: [
      { value: `spec:${d.id}`, label: d.title[lang] },
      ...departmentProcedures(d).map((p) => ({ value: `proc:${p.id}`, label: p.title[lang] })),
    ],
  }));

  const clinicViews: ClinicView[] = clinics.map((c) => ({
    id: c.id,
    name: c.name[lang],
    address: c.address[lang],
    hours: c.hours[lang],
    phoneDisplay: c.phone.display,
    phoneHref: telUrl(c.phone.e164),
    mapSrc: mapEmbedUrl(c.mapQuery, lang),
    mapTitle: t(info.mapTitle, { name: c.name[lang] }),
    directionsHref: directionsUrl(c.mapQuery),
  }));

  return (
    <>
      <UnifiedHero
        lang={lang}
        image={heroImages.contact}
        title={hero.title}
        accent={hero.accent}
        subtitle={hero.subtitle}
        breadcrumbs={crumbs.items}
        breadcrumbLabel={dict.common.breadcrumb}
        ctas={[
          {
            label: dict.common.bookNow,
            href: '#booking',
            icon: <CalendarCheck aria-hidden="true" className="size-5" />,
          },
          {
            label: dict.common.whatsapp,
            href: whatsappUrl(dict.floating.whatsappGreeting),
            external: true,
            variant: 'whatsapp',
            icon: <WhatsAppIcon className="size-5" />,
          },
        ]}
      />

      <section id="booking" className="section-y bg-paper">
        <GlassStage tone="light" layout="a" />
        <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Booking form on a slab of liquid glass (3D tilt; holds still while a field is focused).
              First in DOM = right side in RTL. */}
          <div className="min-w-0 lg:col-span-7">
            <GlassCard tone="light" maxTilt={4} freezeOnFocus contentClassName="p-5 sm:p-9 lg:p-10">
              <div className="[transform:translateZ(36px)]">
                <SectionHeading align="start" title={form.title} description={form.description} className="max-w-none" />
              </div>
              <div className="mt-9 [transform-style:preserve-3d]">
                <BookingForm
                  labels={form}
                  intlLocale={localeMeta[lang].intl}
                  whatsappNumber={siteConfig.whatsapp}
                  serviceGroups={serviceGroups}
                  generalOption={{ value: 'general', label: form.generalConsultation }}
                  branches={clinics.map((c) => ({ value: c.id, label: c.name[lang] }))}
                />
              </div>
            </GlassCard>
          </div>

          <Reveal className="min-w-0 lg:col-span-5 lg:ps-4" delay={0.1}>
            <SectionHeading align="start" title={info.title} description={info.description} className="mb-8" />
            <ClinicLocations
              clinics={clinicViews}
              email={siteConfig.email}
              labels={{
                branches: info.branches,
                hours: info.hours,
                phone: info.phone,
                email: info.email,
                address: info.address,
                directions: info.directions,
              }}
            />
          </Reveal>
        </div>
      </section>

      <PageCtaBanner lang={lang} dict={dict} copy={dict.contact.cta} contactHref="#booking" />
      <JsonLd data={crumbs.schema} />
    </>
  );
}

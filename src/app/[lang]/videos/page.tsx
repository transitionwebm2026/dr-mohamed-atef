import type { Metadata } from 'next';
import { CalendarCheck } from 'lucide-react';
import { resolveLocale, type LangParams } from '@/i18n/server';
import { getDictionary, t } from '@/dictionaries';
import { videoChannel } from '@/config/site';
import { heroImages } from '@/data/media';
import { shortVideos } from '@/data/videos';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';
import { toFacadeVideo } from '@/lib/localize';
import { localizedPath, routes } from '@/lib/routes';
import { UnifiedHero } from '@/components/shared/UnifiedHero';
import { JsonLd } from '@/components/shared/JsonLd';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { VideoFacade } from '@/components/shared/VideoFacade';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { meta } = getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: routes.videos,
    title: meta.pages.videos.title,
    description: meta.pages.videos.description,
  });
}

export default async function VideosPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dict = getDictionary(lang);
  const hero = dict.hero.videos;
  const copy = dict.videos.grid;
  const crumbs = buildBreadcrumbs(lang, dict, [{ label: dict.nav.videos, path: routes.videos }]);
  const videos = shortVideos.slice(0, 9).map((v) => toFacadeVideo(v, lang));

  return (
    <>
      <UnifiedHero
        lang={lang}
        image={heroImages.videos}
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
          <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            {videos.map((video, i) => (
              <Reveal as="li" variant="zoom" key={video.id} delay={(i % 3) * 0.08}>
                <VideoFacade
                  video={video}
                  orientation="portrait"
                  playLabel={t(dict.common.playVideo, { title: video.title })}
                  fallbackHref={videoChannel}
                  fallbackLabel={t(dict.common.openOnYoutube, { title: video.title })}
                  className="shadow-card"
                  sizes="(min-width: 768px) 30vw, 48vw"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <PageCtaBanner lang={lang} dict={dict} copy={dict.videos.cta} />
      <JsonLd data={crumbs.schema} />
    </>
  );
}

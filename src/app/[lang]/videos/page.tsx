import type { Metadata } from 'next';
import { CalendarCheck } from 'lucide-react';
import { resolveLocale, type LangParams } from '@/i18n/server';
import { getDictionary, t } from '@/dictionaries';
import { videoChannel } from '@/config/site';
import { heroImages } from '@/data/media';
import { departmentFilters } from '@/data/services';
import { shortVideos } from '@/data/videos';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';
import { toFacadeVideo } from '@/lib/localize';
import { localizedPath, routes } from '@/lib/routes';
import { UnifiedHero } from '@/components/shared/UnifiedHero';
import { JsonLd } from '@/components/shared/JsonLd';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';
import { VideosExplorer, type ExplorerVideo } from '@/components/sections/videos/VideosExplorer';

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
  const videos: ExplorerVideo[] = shortVideos.map((v) => {
    const video = toFacadeVideo(v, lang);
    return {
      video,
      categoryKey: v.category ?? '',
      playLabel: t(dict.common.playVideo, { title: video.title }),
      fallbackLabel: t(dict.common.openOnYoutube, { title: video.title }),
    };
  });

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

      <section className="section-y bg-white">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="split" title={copy.title} description={copy.description} />
          </Reveal>
          <Reveal className="mt-10" delay={0.08}>
            <VideosExplorer
              videos={videos}
              categories={departmentFilters(lang)}
              fallbackHref={videoChannel}
              labels={{ all: copy.all, filter: copy.filterLabel, empty: copy.empty }}
            />
          </Reveal>
        </div>
      </section>

      <PageCtaBanner lang={lang} dict={dict} copy={dict.videos.cta} />
      <JsonLd data={crumbs.schema} />
    </>
  );
}

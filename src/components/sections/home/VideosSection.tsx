import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { t, type Dictionary } from '@/dictionaries';
import { videoChannel } from '@/config/site';
import { shortVideos } from '@/data/videos';
import { localizedPath, routes } from '@/lib/routes';
import { toFacadeVideo } from '@/lib/localize';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { VideoFacade } from '@/components/shared/VideoFacade';

export function VideosSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.videos;
  const videos = shortVideos.slice(0, 3).map((v) => toFacadeVideo(v, lang));

  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <Reveal>
          <SectionHeading title={copy.title} description={copy.description} />
        </Reveal>

        {/* Mobile: swipeable row · md+: 3-column grid */}
        <ul className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:gap-7 md:overflow-visible md:px-0 md:pb-0">
          {videos.map((video, i) => (
            <Reveal as="li" variant="zoom" key={video.id} delay={i * 0.1} className="w-[68%] shrink-0 snap-center sm:w-[44%] md:w-auto">
              <VideoFacade
                video={video}
                orientation="portrait"
                playLabel={t(dict.common.playVideo, { title: video.title })}
                fallbackHref={videoChannel}
                fallbackLabel={t(dict.common.openOnYoutube, { title: video.title })}
                className="shadow-card"
                sizes="(min-width: 768px) 30vw, 68vw"
              />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href={localizedPath(lang, routes.videos)} variant="secondary" size="lg">
            {dict.common.viewAllVideos}
            <ArrowRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

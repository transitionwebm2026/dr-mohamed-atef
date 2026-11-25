import type { Locale } from '@/i18n/config';
import { t, type Dictionary } from '@/dictionaries';
import { videoChannel } from '@/config/site';
import { promoVideo } from '@/data/videos';
import { toFacadeVideo } from '@/lib/localize';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { VideoFacade } from '@/components/shared/VideoFacade';

/** The promo film in a contained frame: a glass mat around the video that tilts in 3D. */
export function PromoVideo({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.about.promo;
  const video = toFacadeVideo(promoVideo, lang);

  return (
    <section className="section-y bg-white">
      <GlassStage tone="light" layout="c" />
      <div className="container-x">
        <Reveal>
          <SectionHeading align="split" title={copy.title} />
        </Reveal>

        <div className="mx-auto mt-12 max-w-5xl lg:mt-14">
          <GlassCard tone="light" maxTilt={5} contentClassName="p-2.5 sm:p-4">
            <VideoFacade
              video={video}
              orientation="landscape"
              playLabel={t(dict.common.playVideo, { title: video.title })}
              fallbackHref={videoChannel}
              fallbackLabel={t(dict.common.openOnYoutube, { title: video.title })}
              className="[transform:translateZ(24px)]"
              sizes="(min-width: 1024px) 64rem, 100vw"
            />
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

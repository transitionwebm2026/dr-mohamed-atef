import type { Locale } from '@/i18n/config';
import { t, type Dictionary } from '@/dictionaries';
import { videoChannel } from '@/config/site';
import { promoVideo } from '@/data/videos';
import { toFacadeVideo } from '@/lib/localize';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { VideoFacade } from '@/components/shared/VideoFacade';

/** Edge-to-edge cinematic video band. */
export function PromoVideo({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.about.promo;
  const video = toFacadeVideo(promoVideo, lang);

  return (
    <section className="relative isolate overflow-hidden bg-ink pt-20 lg:pt-28">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div className="container-x pb-12 lg:pb-16">
        <Reveal>
          <SectionHeading tone="dark" title={copy.title} />
        </Reveal>
      </div>
      <Reveal y={0}>
        <VideoFacade
          video={video}
          orientation="cinema"
          showMeta={false}
          playLabel={t(dict.common.playVideo, { title: video.title })}
          fallbackHref={videoChannel}
          fallbackLabel={t(dict.common.openOnYoutube, { title: video.title })}
          sizes="100vw"
        />
      </Reveal>
    </section>
  );
}

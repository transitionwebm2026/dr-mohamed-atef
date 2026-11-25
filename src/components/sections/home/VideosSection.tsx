import type { Locale } from '@/i18n/config';
import { t, type Dictionary } from '@/dictionaries';
import { videoChannel } from '@/config/site';
import { shortVideos } from '@/data/videos';
import { localizedPath, routes } from '@/lib/routes';
import { toFacadeVideo } from '@/lib/localize';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { VideoFacade } from '@/components/shared/VideoFacade';

export function VideosSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.videos;
  const videos = shortVideos.slice(0, 3).map((v) => toFacadeVideo(v, lang));

  return (
    <section className="section-y bg-white">
      <GlassStage tone="light" layout="b" />
      <div className="container-x">
        <Reveal>
          <SectionHeading
            align="split"
            title={copy.title}
            description={copy.description}
            action={
              <ButtonLink href={localizedPath(lang, routes.videos)} variant="outline">
                {dict.common.viewAllVideos}
              </ButtonLink>
            }
          />
        </Reveal>

        {/* Arched reels. Phones/tablets: the three stacked one under another · md+: side by side,
            the middle one dropped */}
        <ul className="mt-14 flex flex-col items-center gap-8 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:items-start md:gap-8 md:pb-16">
          {videos.map((video, i) => (
            <Reveal
              as="li"
              variant="zoom"
              key={video.id}
              delay={i * 0.1}
              className={cn('w-full max-w-[19rem] md:max-w-none', i === 1 && 'md:translate-y-16')}
            >
              <GlassCard surface="none" radius="arch" enter={false} maxTilt={9}>
                <VideoFacade
                  video={video}
                  orientation="portrait"
                  playLabel={t(dict.common.playVideo, { title: video.title })}
                  fallbackHref={videoChannel}
                  fallbackLabel={t(dict.common.openOnYoutube, { title: video.title })}
                  className="shadow-[0_40px_70px_-35px_rgb(58_58_56/0.6)]"
                  sizes="(min-width: 768px) 30vw, 19rem"
                />
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

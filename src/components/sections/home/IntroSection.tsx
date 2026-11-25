import { ArrowRight } from 'lucide-react';
import { GoldCheck } from '@/components/shared/GoldCheck';
import type { Locale } from '@/i18n/config';
import { t, type Dictionary } from '@/dictionaries';
import { videoChannel } from '@/config/site';
import { introVideo } from '@/data/videos';
import { homeStats } from '@/data/doctor';
import { localizedPath, routes } from '@/lib/routes';
import { toFacadeVideo } from '@/lib/localize';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { VideoFacade } from '@/components/shared/VideoFacade';
import { formatNumber } from '@/lib/utils';

export function IntroSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.intro;
  const video = toFacadeVideo(introVideo, lang);
  const years = homeStats.find((s) => s.id === 'years');

  return (
    <section className="section-y relative overflow-hidden bg-white">
      <div aria-hidden="true" className="absolute top-24 -z-0 h-72 w-1/3 rounded-full bg-gold/10 blur-3xl ltr:-left-20 rtl:-right-20" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Video — first in DOM = right side in RTL, left side in LTR */}
        <Reveal className="relative">
          <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] border border-silver/80 sm:-inset-4" />
          <div aria-hidden="true" className="absolute -bottom-6 h-24 w-24 rounded-3xl bg-gold ltr:-left-6 rtl:-right-6" />
          <div className="relative overflow-hidden rounded-3xl shadow-card-hover">
            <VideoFacade
              video={video}
              orientation="landscape"
              playLabel={t(dict.common.playVideo, { title: video.title })}
              fallbackHref={videoChannel}
              fallbackLabel={t(dict.common.openOnYoutube, { title: video.title })}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          {years ? (
            <div className="absolute -top-6 z-10 rounded-2xl border border-silver bg-white/95 px-5 py-4 shadow-card backdrop-blur ltr:-right-3 rtl:-left-3 sm:ltr:-right-6 sm:rtl:-left-6">
              <p className="text-3xl font-extrabold text-ink" dir="ltr">
                {years.prefix}
                {formatNumber(years.value)}
              </p>
              <p className="text-xs font-bold text-ink-500">{years.label[lang]}</p>
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.12}>
          <SectionHeading align="start" title={copy.title} />
          <div className="mt-6 space-y-5 text-base leading-loose text-ink-500 sm:text-lg">
            {copy.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3">
            {copy.points.map((point) => (
              <li key={point} className="flex items-center gap-3 font-bold text-ink">
                <GoldCheck />
                {point}
              </li>
            ))}
          </ul>
          <ButtonLink href={localizedPath(lang, routes.about)} variant="secondary" className="mt-10">
            {copy.cta}
            <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

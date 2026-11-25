import { GraduationCap, Hospital, Play, Stethoscope, type LucideIcon } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { t, type Dictionary } from '@/dictionaries';
import { videoChannel } from '@/config/site';
import { introVideo } from '@/data/videos';
import { homeStats } from '@/data/doctor';
import { doctorPortrait } from '@/data/media';
import { localizedPath, routes } from '@/lib/routes';
import { formatNumber } from '@/lib/utils';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { LogoMark } from '@/components/shared/Logo';
import { Reveal } from '@/components/shared/Reveal';
import { RingIcon } from '@/components/shared/RingIcon';
import { headingClass } from '@/components/shared/SectionHeading';

const credentialIcons: LucideIcon[] = [Stethoscope, GraduationCap, Hospital];

/** Centre a satellite on a point of the orbit (logical: mirrors in RTL). */
const satellite = 'absolute z-10 -translate-y-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2';

/**
 * "Orbit" introduction — the logo's circle as a composition: the doctor's portrait sits in
 * the middle of a slowly turning orbit, with the years seal, the logo and the intro film
 * placed on the ring like satellites. The story and credentials sit beside it.
 */
export function IntroSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.intro;
  const years = homeStats.find((s) => s.id === 'years');
  const videoTitle = introVideo.title[lang];
  const videoHref = introVideo.youtubeId ? `https://www.youtube.com/watch?v=${introVideo.youtubeId}` : videoChannel;

  return (
    <section className="section-y bg-white">
      <div className="container-x grid items-center gap-20 lg:grid-cols-12 lg:gap-16">
        {/* ── Orbit (first in DOM = right side in RTL) ── */}
        <Reveal variant="fade" className="lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[21rem] sm:max-w-[28rem] lg:max-w-[33rem]">
            {/* Soft disc behind everything */}
            <span aria-hidden="true" className="absolute inset-[7%] rounded-full bg-paper" />

            {/* Orbit: dashed hairline + travelling gold arc, turning slowly */}
            <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" className="absolute inset-0 size-full animate-spin-slow">
              <circle cx="50" cy="50" r="48.5" strokeWidth="0.3" strokeDasharray="0.6 1.8" className="stroke-ink/30" />
              <circle cx="50" cy="50" r="48.5" pathLength={100} strokeWidth="0.9" strokeLinecap="round" strokeDasharray="12 100" className="stroke-gold" />
              <circle cx="98.5" cy="50" r="1.3" className="fill-gold" />
            </svg>
            {/* Inner fixed ring */}
            <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" className="absolute inset-0 size-full">
              <circle cx="50" cy="50" r="39" strokeWidth="0.25" className="stroke-silver" />
            </svg>

            {/* Portrait */}
            <Reveal variant="zoom" delay={0.1} className="absolute inset-[13%]">
              <div className="size-full overflow-hidden rounded-full bg-paper ring-[6px] ring-white">
                <img
                  src={doctorPortrait.src}
                  alt={dict.about.word.portraitAlt}
                  width={doctorPortrait.width}
                  height={doctorPortrait.height}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-[50%_18%]"
                />
              </div>
            </Reveal>

            {/* Satellite · years seal (top, outer side) */}
            {years ? (
              <Reveal variant="zoom" delay={0.35} className={`${satellite} start-[16%] top-[16%]`}>
                <div className="grid size-[5.5rem] place-items-center rounded-full bg-gold text-center text-ink shadow-gold ring-[6px] ring-white sm:size-28">
                  <span>
                    <span className="block font-display text-[1.65rem] leading-none font-semibold sm:text-[2.1rem]" dir="ltr">
                      {years.prefix}
                      {formatNumber(years.value)}
                    </span>
                    <span className="mt-1 block px-2.5 text-[0.6rem] leading-tight font-bold sm:text-[0.68rem]">{years.label[lang]}</span>
                  </span>
                </div>
              </Reveal>
            ) : null}

            {/* Satellite · logo mark (upper, inner side) */}
            <Reveal variant="zoom" delay={0.5} className={`${satellite} start-[93%] top-[30%]`}>
              <span className="grid size-14 place-items-center rounded-full bg-white shadow-float sm:size-16">
                <LogoMark className="h-9 w-auto sm:h-10" />
              </span>
            </Reveal>

            {/* Satellite · intro film (bottom of the orbit) */}
            <Reveal variant="zoom" delay={0.65} className={`${satellite} start-1/2 top-[97%]`}>
              <a
                href={videoHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(dict.common.openOnYoutube, { title: videoTitle })}
                className="group flex items-center gap-2 rounded-full bg-ink py-1 ps-1 pe-3.5 text-white shadow-float transition-colors duration-300 hover:bg-ink-800 sm:gap-3 sm:py-1.5 sm:ps-1.5 sm:pe-5"
              >
                <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-gold text-ink sm:size-11">
                  <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-gold/60" />
                  <Play aria-hidden="true" className="relative size-4 translate-x-px fill-current" />
                </span>
                <span className="text-xs font-bold whitespace-nowrap sm:text-sm">{copy.watch}</span>
                <span className="text-xs font-bold text-white/60" translate="no">
                  {introVideo.duration}
                </span>
              </a>
            </Reveal>
          </div>
        </Reveal>

        {/* ── Story + credentials ── */}
        <Reveal delay={0.1} className="lg:col-span-6">
          <h2 className={headingClass}>{copy.title}</h2>
          <p className="mt-6 text-lg leading-loose text-ink-700">{copy.paragraphs[0]}</p>
          {copy.paragraphs[1] ? <p className="mt-4 leading-loose text-ink-500">{copy.paragraphs[1]}</p> : null}

          <ul className="mt-9 border-t border-ink/10">
            {copy.points.map((point, i) => {
              const Icon = credentialIcons[i] ?? Stethoscope;
              return (
                <li key={point} className="flex items-center gap-4 border-b border-ink/10 py-4">
                  <RingIcon size="sm" interactive={false}>
                    <Icon className="ring-icon" strokeWidth={1.75} />
                  </RingIcon>
                  <span className="font-bold text-ink">{point}</span>
                </li>
              );
            })}
          </ul>

          <ButtonLink href={localizedPath(lang, routes.about)} variant="dark" className="mt-10">
            {copy.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

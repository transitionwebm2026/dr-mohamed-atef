'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { m, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import type { IconKey } from '@/data/types';
import { cn } from '@/lib/utils';
import { DataIcon } from '@/components/shared/DataIcon';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { SectionHeading } from '@/components/shared/SectionHeading';

export interface JourneyStation {
  badge: string;
  title: string;
  place: string;
  description: string;
  icon: IconKey;
}

interface CareerJourneyProps {
  stations: JourneyStation[];
  title: string;
  description: string;
  hint: string;
  dir: 'rtl' | 'ltr';
}

const pad = (n: number) => String(n).padStart(2, '0');
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** One station's node on the line — fills gold once reached. */
function Node({ icon, lit }: { icon: IconKey; lit: boolean }) {
  return (
    <span
      className={cn(
        'relative z-10 grid size-14 shrink-0 place-items-center rounded-full ring-1 transition-[background-color,color,box-shadow] duration-500 ring-inset',
        lit ? 'bg-gold text-ink shadow-[0_0_0_6px_rgb(255_183_1/0.18),0_0_40px_rgb(255_183_1/0.45)] ring-gold' : 'bg-ink text-gold ring-white/25',
      )}
    >
      <DataIcon name={icon} className="size-6" />
    </span>
  );
}

/**
 * lg+ (motion allowed): the section pins and the stations travel sideways as the page scrolls.
 * A gold line fills from the first node to the last; the station reaching the centre lights up
 * (gold numeral, gold node, gold-tinted glass) and the counter follows.
 */
function JourneyTrack({ stations, title, description, hint, dir }: CareerJourneyProps) {
  const n = stations.length;
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const sign = dir === 'rtl' ? 1 : -1;

  useIsoLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(progress, [0, 1], [0, sign * distance]);
  const numeralsX = useTransform(progress, [0, 1], [0, -sign * 90]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1)))));
  });

  return (
    <section ref={sectionRef} className="relative bg-ink text-white" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <GlassStage tone="dark" layout="c" />

        <div className="container-x pt-28">
          <SectionHeading align="split" tone="dark" title={title} description={description} />
          <div className="mt-6 flex items-center gap-5">
            <p className="font-display" dir="ltr">
              <span className="text-4xl font-semibold text-gold">{pad(active + 1)}</span>
              <span className="ms-1.5 text-sm text-white/45">/ {pad(n)}</span>
            </p>
            <span aria-hidden="true" className="relative h-px flex-1 bg-white/15">
              <m.span style={{ scaleX: progress }} className="absolute inset-0 bg-gold ltr:origin-left rtl:origin-right" />
            </span>
            <p className="flex items-center gap-2 text-xs font-bold text-white/55">
              <MousePointer2 aria-hidden="true" className="size-4 animate-bounce" />
              {hint}
            </p>
          </div>
        </div>

        <div className="container-x flex flex-1 items-center">
          <div ref={viewportRef} className="w-full">
            <m.ol
              ref={trackRef}
              style={{ x }}
              className="relative flex w-max gap-10 pe-[24vw] [--station:21rem] xl:[--station:23rem]"
            >
              {/* Line from the first node to the last, filling with the journey */}
              <span
                aria-hidden="true"
                className="absolute start-7 top-[8.75rem] h-px bg-white/15"
                style={{ width: `calc(${n - 1} * (var(--station) + 2.5rem))` }}
              >
                <m.span style={{ scaleX: progress }} className="absolute inset-0 h-0.5 -translate-y-px bg-gold ltr:origin-left rtl:origin-right" />
              </span>

              {stations.map((s, i) => {
                const lit = i <= active;
                const current = i === active;
                return (
                  <li key={s.title} className="relative w-(--station) shrink-0">
                    <m.span
                      aria-hidden="true"
                      style={{ x: numeralsX }}
                      className={cn(
                        'block h-28 font-display text-[7.5rem] leading-none font-semibold transition-colors duration-500',
                        current ? 'text-gold' : 'text-outline [--outline:rgb(255_255_255/0.22)]',
                      )}
                      dir="ltr"
                    >
                      {pad(i + 1)}
                    </m.span>
                    <div className="mt-4">
                      <Node icon={s.icon} lit={lit} />
                    </div>
                    <div className={cn('mt-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]', current && '-translate-y-2')}>
                      <GlassCard tone="dark" gold={current} enter={false} maxTilt={8} radius="rounded-[1.75rem]" contentClassName="p-6">
                        <p className="flex flex-wrap items-center gap-2 [transform:translateZ(40px)]">
                          <span className="rounded-full bg-gold px-3 py-1 text-xs font-extrabold text-ink">{s.badge}</span>
                          <span className="text-xs text-white/60">{s.place}</span>
                        </p>
                        <h3 className="mt-4 font-sans text-lg leading-relaxed font-bold text-white [transform:translateZ(30px)]">
                          <span className="sr-only">{i + 1}. </span>
                          {s.title}
                        </h3>
                        <p className="mt-2 text-sm leading-loose text-white/70 [transform:translateZ(18px)]">{s.description}</p>
                      </GlassCard>
                    </div>
                  </li>
                );
              })}
            </m.ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Phones / tablets / reduced motion: a vertical rail along the reading start whose gold fill
 * grows as you scroll through it; each station's node lights up as it reaches the middle.
 */
function JourneyStack({ stations, title, description }: CareerJourneyProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] });
  const [reached, setReached] = useState(-1);
  const n = stations.length;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setReached(Math.min(n - 1, Math.floor(v * n + 0.15)));
  });

  return (
    <section className="section-y bg-ink text-white">
      <GlassStage tone="dark" layout="c" />
      <div className="container-x">
        <SectionHeading align="split" tone="dark" title={title} description={description} />

        <ol ref={listRef} className="relative mt-14 grid gap-8">
          <span aria-hidden="true" className="absolute start-7 top-7 bottom-7 w-px bg-white/15">
            <m.span style={{ scaleY: scrollYProgress }} className="absolute inset-0 w-0.5 origin-top -translate-x-px bg-gold" />
          </span>
          {stations.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-4 sm:gap-6">
              <Node icon={s.icon} lit={i <= reached} />
              <div className="min-w-0">
                <span
                  aria-hidden="true"
                  className={cn(
                    'block font-display text-5xl leading-none font-semibold transition-colors duration-500',
                    i <= reached ? 'text-gold' : 'text-outline [--outline:rgb(255_255_255/0.25)]',
                  )}
                  dir="ltr"
                >
                  {pad(i + 1)}
                </span>
                <div className="mt-4">
                  <GlassCard tone="dark" gold={i === reached} delay={0.05} radius="rounded-[1.5rem]" contentClassName="p-5 sm:p-6">
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-gold px-3 py-1 text-xs font-extrabold text-ink">{s.badge}</span>
                      <span className="text-xs text-white/60">{s.place}</span>
                    </p>
                    <h3 className="mt-3 font-sans text-base leading-relaxed font-bold text-white sm:text-lg">
                      <span className="sr-only">{i + 1}. </span>
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-loose text-white/70">{s.description}</p>
                  </GlassCard>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** "Milestones" — picks the pinned sideways journey on large screens, the rail elsewhere. */
export function CareerJourney(props: CareerJourneyProps) {
  const [track, setTrack] = useState(false);

  useEffect(() => {
    const lg = window.matchMedia('(min-width: 1024px) and (min-height: 680px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setTrack(lg.matches && !rm.matches);
    update();
    lg.addEventListener('change', update);
    rm.addEventListener('change', update);
    return () => {
      lg.removeEventListener('change', update);
      rm.removeEventListener('change', update);
    };
  }, []);

  return track ? <JourneyTrack {...props} /> : <JourneyStack {...props} />;
}

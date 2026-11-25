'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuoteMark, ReviewerAvatar, StarRating, type ReviewCardData } from '@/components/shared/ReviewCard';
import { GlassCard } from '@/components/shared/glass/GlassCard';

export interface ReviewsSliderLabels {
  previous: string;
  next: string;
  goTo: string;
  slide: string;
  verified: string;
  ratings: string[];
  region: string;
}

interface ReviewsSliderProps {
  reviews: ReviewCardData[];
  labels: ReviewsSliderLabels;
  dir: 'rtl' | 'ltr';
  interval?: number;
}

/**
 * One testimonial at a time, set large in a speech bubble. The patients are listed beside
 * it as tabs; a thin gold line under the active name shows the autoplay timing
 * (pauses on hover / focus, off with reduced motion). Swipe the bubble on touch.
 */
export function ReviewsSlider({ reviews, labels, dir, interval = 6500 }: ReviewsSliderProps) {
  const uid = useId();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const pointerStart = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = reviews.length;
  const active = reviews[index] ?? reviews[0];
  const paused = hovered || focused;

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(rm.matches);
    update();
    rm.addEventListener('change', update);
    return () => rm.removeEventListener('change', update);
  }, []);

  const go = (next: number) => setIndex(((next % count) + count) % count);

  const onPointerDown = (e: PointerEvent) => {
    pointerStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (pointerStart.current === null) return;
    const dx = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) < 50) return;
    const forward = dir === 'rtl' ? dx > 0 : dx < 0;
    go(forward ? index + 1 : index - 1);
  };

  const onTabsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const prev = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    let target = index;
    if (event.key === next || event.key === 'ArrowDown') target = (index + 1) % count;
    else if (event.key === prev || event.key === 'ArrowUp') target = (index - 1 + count) % count;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = count - 1;
    else return;
    event.preventDefault();
    go(target);
    tabRefs.current[target]?.focus();
  };

  if (!active) return null;

  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = `${uid}-panel`;
  const ringBtn =
    'grid size-11 place-items-center rounded-full text-ink ring-1 ring-inset ring-silver transition duration-300 hover:bg-ink hover:text-white hover:ring-ink';

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14"
    >
      {/* Patients — tabs */}
      <div
        role="tablist"
        aria-label={labels.goTo}
        onKeyDown={onTabsKeyDown}
        className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pt-1 pb-2 lg:order-first lg:col-span-5 lg:mx-0 lg:grid lg:gap-1 lg:overflow-visible lg:p-0"
      >
        {reviews.map((review, i) => {
          const selected = i === index;
          return (
            <button
              key={review.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={tabId(i)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => go(i)}
              className={cn(
                'group relative flex shrink-0 items-center gap-3 overflow-hidden rounded-full p-1.5 text-start transition-colors duration-300 lg:rounded-[1.4rem] lg:p-3',
                selected ? 'liquid-glass liquid-glass-light' : 'hover:bg-white/50',
              )}
            >
              <ReviewerAvatar
                name={review.name}
                className={cn('relative transition-opacity duration-300', !selected && 'opacity-60 ring-transparent group-hover:opacity-100')}
              />
              <span className={cn('relative min-w-0 pe-3 lg:block', selected ? 'block' : 'hidden')}>
                <span className="block truncate text-sm font-bold text-ink">{review.name}</span>
                <span className="mt-0.5 hidden truncate text-xs text-ink-500 lg:block">{review.procedure}</span>
              </span>
              {selected && !reducedMotion ? (
                <span
                  aria-hidden="true"
                  key={`progress-${index}`}
                  onAnimationEnd={() => go(index + 1)}
                  className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-gold ltr:origin-left rtl:origin-right"
                  style={{
                    animation: `progress-fill ${interval}ms linear forwards`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Active quote */}
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(index)}
        aria-live={paused ? 'polite' : 'off'}
        className="min-w-0 lg:col-span-7"
      >
        <div
          className="relative touch-pan-y select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (pointerStart.current = null)}
        >
          <figure>
              {/* The quote as a light glass speech bubble (its tail corner points at the patient).
                  The glass stays put and only the words crossfade — fading the glass itself
                  would drop its blur for the length of the fade. */}
              <GlassCard tone="light" radius="bubble" enter={false} maxTilt={6} contentClassName="px-7 pt-12 pb-8 sm:px-10 sm:pb-10">
                <QuoteMark className="absolute -top-5 h-10 w-14 fill-gold drop-shadow-[0_10px_18px_rgb(255_183_1/0.45)] [transform:translateZ(60px)] ltr:left-7 rtl:right-7 rtl:-scale-x-100" />
                <AnimatePresence mode="wait" initial={false}>
                  <m.blockquote
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="[transform:translateZ(36px)]">
                      <StarRating rating={active.rating} label={labels.ratings[index] ?? ''} />
                    </div>
                    <p className="mt-5 text-lg leading-[2] text-ink [transform:translateZ(22px)] sm:text-xl sm:leading-[2]">{active.text}</p>
                  </m.blockquote>
                </AnimatePresence>
              </GlassCard>
              <figcaption className="mt-5 flex items-center gap-3 ps-1">
                {/* lg+: the active patient is already highlighted in the list beside the bubble */}
                <ReviewerAvatar name={active.name} className="lg:hidden" />
                <span className="min-w-0 flex-1 lg:sr-only">
                  <span className="flex items-center gap-1.5 font-bold text-ink">
                    <span className="truncate">{active.name}</span>
                    <span title={labels.verified} className="inline-flex shrink-0">
                      <BadgeCheck aria-hidden="true" className="size-4 text-gold-600" />
                      <span className="sr-only">{labels.verified}</span>
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-ink-500">{active.procedure}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 lg:ms-auto">
                  <button type="button" onClick={() => go(index - 1)} aria-label={labels.previous} className={ringBtn}>
                    <ChevronLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
                  </button>
                  <button type="button" onClick={() => go(index + 1)} aria-label={labels.next} className={ringBtn}>
                    <ChevronRight aria-hidden="true" className="size-5 rtl:rotate-180" />
                  </button>
                </span>
              </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

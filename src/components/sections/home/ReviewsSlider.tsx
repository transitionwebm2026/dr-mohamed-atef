'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReviewCard, type ReviewCardData } from '@/components/shared/ReviewCard';

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
 * Testimonial carousel: autoplay (pauses on hover / keyboard focus),
 * arrows, dots, swipe, and responsive 1 / 2 / 3 cards per view.
 */
export function ReviewsSlider({ reviews, labels, dir, interval = 5000 }: ReviewsSliderProps) {
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerStart = useRef<number | null>(null);

  const maxIndex = Math.max(0, reviews.length - perView);

  useEffect(() => {
    const lg = window.matchMedia('(min-width: 1024px)');
    const md = window.matchMedia('(min-width: 768px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setPerView(lg.matches ? 3 : md.matches ? 2 : 1);
      setReducedMotion(rm.matches);
    };
    update();
    lg.addEventListener('change', update);
    md.addEventListener('change', update);
    rm.addEventListener('change', update);
    return () => {
      lg.removeEventListener('change', update);
      md.removeEventListener('change', update);
      rm.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const go = useCallback(
    (next: number) => {
      if (next > maxIndex) setIndex(0);
      else if (next < 0) setIndex(maxIndex);
      else setIndex(next);
    },
    [maxIndex],
  );

  const paused = hovered || focused || reducedMotion;

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const timer = window.setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), interval);
    return () => window.clearInterval(timer);
  }, [paused, maxIndex, interval]);

  const sign = dir === 'rtl' ? 1 : -1;
  const offset = (index * 100) / perView;

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

  const arrowClass =
    'grid size-12 place-items-center rounded-full border border-silver bg-white text-ink transition duration-300 hover:border-gold hover:bg-gold disabled:opacity-40';

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
    >
      <div className="-mx-3 overflow-hidden px-0 py-4">
        <ul
          aria-live={paused ? 'polite' : 'off'}
          className="flex touch-pan-y transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none"
          style={{ transform: `translateX(${sign * offset}%)` }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (pointerStart.current = null)}
        >
          {reviews.map((review, i) => {
            const visible = i >= index && i < index + perView;
            return (
              <li
                key={review.id}
                role="group"
                aria-roledescription={labels.slide}
                aria-label={`${i + 1} / ${reviews.length}`}
                aria-hidden={!visible}
                className="w-full shrink-0 grow-0 basis-full px-3 md:basis-1/2 lg:basis-1/3"
              >
                <ReviewCard
                  review={review}
                  verifiedLabel={labels.verified}
                  ratingLabel={labels.ratings[i] ?? ''}
                  className="hover:shadow-card"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="group" aria-label={labels.goTo}>
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`${labels.goTo} ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className="grid h-6 place-items-center"
            >
              <span
                className={cn(
                  'block h-2 rounded-full transition-all duration-500',
                  i === index ? 'w-8 bg-gold' : 'w-2 bg-silver hover:bg-ink-500',
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(index - 1)} aria-label={labels.previous} className={arrowClass}>
            <ChevronLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label={labels.next} className={arrowClass}>
            <ChevronRight aria-hidden="true" className="size-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { QuoteMark, StarRating, type ReviewCardData } from '@/components/shared/ReviewCard';

interface GlassReviewWallProps {
  reviews: ReviewCardData[];
  labels: { verified: string; ratings: string[] };
}

/** Scroll travel per column (px) — different speeds give the wall its depth. */
const TRAVEL = [70, 170, 110] as const;

/**
 * Reviews as a wall of floating 3D glass slabs: three columns that travel at different speeds
 * while scrolling (lg+, motion allowed); every fourth slab is gold-tinted. Inside each slab the
 * quote mark, stars and patient float at different depths above the glass.
 */
export function GlassReviewWall({ reviews, labels }: GlassReviewWallProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y0 = useTransform(scrollYProgress, [0, 1], [TRAVEL[0], -TRAVEL[0]]);
  const y1 = useTransform(scrollYProgress, [0, 1], [TRAVEL[1], -TRAVEL[1]]);
  const y2 = useTransform(scrollYProgress, [0, 1], [TRAVEL[2], -TRAVEL[2]]);
  const columnY = [y0, y1, y2];

  useEffect(() => {
    const lg = window.matchMedia('(min-width: 1024px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setParallax(lg.matches && !rm.matches);
    update();
    lg.addEventListener('change', update);
    rm.addEventListener('change', update);
    return () => {
      lg.removeEventListener('change', update);
      rm.removeEventListener('change', update);
    };
  }, []);

  const columns: { review: ReviewCardData; index: number }[][] = [[], [], []];
  reviews.forEach((review, index) => columns[index % 3]?.push({ review, index }));

  return (
    <div ref={ref} className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
      {columns.map((column, c) => (
        <m.ul key={c} style={{ y: parallax ? columnY[c] : 0 }} className="grid content-start gap-8 lg:gap-10">
          {column.map(({ review, index }) => (
            <li key={review.id}>
              <GlassCard tone="dark" gold={index % 4 === 1} maxTilt={12} delay={(index % 3) * 0.1} contentClassName="px-7 pt-10 pb-7 sm:px-8">
                <figure className="[transform-style:preserve-3d]">
                  <QuoteMark className="absolute -top-5 end-7 h-11 w-14 fill-gold drop-shadow-[0_10px_18px_rgb(255_183_1/0.45)] [transform:translateZ(70px)] rtl:-scale-x-100" />
                  <div className="[transform:translateZ(40px)]">
                    <StarRating rating={review.rating} label={labels.ratings[index] ?? ''} />
                  </div>
                  <blockquote className="mt-5 text-[1.02rem] leading-loose text-white/90 [transform:translateZ(26px)]">
                    <p>{review.text}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5 [transform:translateZ(52px)]">
                    <span
                      aria-hidden="true"
                      className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-gold-300 to-gold-600 font-display text-lg font-semibold text-ink shadow-[0_10px_24px_-8px_rgb(255_183_1/0.8)] ring-2 ring-white/40"
                    >
                      {review.name.trim().charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 font-bold">
                        <span className="truncate">{review.name}</span>
                        <span title={labels.verified} className="inline-flex shrink-0">
                          <BadgeCheck aria-hidden="true" className="size-4 text-gold" />
                          <span className="sr-only">{labels.verified}</span>
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-white/60">{review.procedure}</span>
                    </span>
                  </figcaption>
                </figure>
              </GlassCard>
            </li>
          ))}
        </m.ul>
      ))}
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { FilterPills } from '@/components/shared/FilterPills';
import { VideoFacade, type FacadeVideo } from '@/components/shared/VideoFacade';

export interface ExplorerVideo {
  video: FacadeVideo;
  categoryKey: string;
  playLabel: string;
  fallbackLabel: string;
}

interface VideosExplorerProps {
  videos: ExplorerVideo[];
  /** The three service departments, in order. */
  categories: { key: string; label: string }[];
  fallbackHref: string;
  labels: { all: string; filter: string; empty: string };
}

/** Arched reels with department filter pills; the middle column sits lower for a staggered rhythm. */
export function VideosExplorer({ videos, categories, fallbackHref, labels }: VideosExplorerProps) {
  const [active, setActive] = useState<string>('all');

  const pills = useMemo(
    () => [
      { key: 'all', label: labels.all, count: videos.length },
      ...categories
        .map((c) => ({ ...c, count: videos.filter((v) => v.categoryKey === c.key).length }))
        .filter((c) => c.count > 0),
    ],
    [videos, categories, labels.all],
  );
  const visible = active === 'all' ? videos : videos.filter((v) => v.categoryKey === active);

  return (
    <div>
      <FilterPills pills={pills} active={active} onSelect={setActive} label={labels.filter} />

      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
          className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 md:pb-16 lg:gap-x-8 lg:gap-y-12"
        >
          {visible.length > 0 ? (
            visible.map(({ video, playLabel, fallbackLabel }, i) => (
              <li key={video.id} className={i % 3 === 1 ? 'md:translate-y-16' : undefined}>
                <VideoFacade
                  video={video}
                  orientation="portrait"
                  playLabel={playLabel}
                  fallbackHref={fallbackHref}
                  fallbackLabel={fallbackLabel}
                  sizes="(min-width: 768px) 30vw, 48vw"
                />
              </li>
            ))
          ) : (
            <li className="col-span-full rounded-3xl border border-dashed border-silver p-10 text-center text-ink-500">
              {labels.empty}
            </li>
          )}
        </m.ul>
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { preconnect } from 'react-dom';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FacadeVideo {
  id: string;
  youtubeId?: string;
  thumbnail: string;
  duration: string;
  title: string;
  topic: string;
}

interface VideoFacadeProps {
  video: FacadeVideo;
  orientation: 'landscape' | 'portrait' | 'cinema';
  /** Accessible label for the play button, e.g. "Play video: …". */
  playLabel: string;
  /** Used when the video has no YouTube ID yet (e.g. the channel URL). */
  fallbackHref: string;
  fallbackLabel: string;
  className?: string;
  /** Show the title/topic overlay on the thumbnail. */
  showMeta?: boolean;
  sizes?: string;
}

const aspectClass = {
  landscape: 'aspect-video',
  portrait: 'aspect-[9/16]',
  cinema: 'aspect-video md:aspect-[21/9]',
} as const;

/**
 * Lightweight video facade: renders only a static thumbnail + play button.
 * The YouTube iframe is injected after the user clicks, so video grids add
 * zero third-party JS/bytes to the initial page load (protects LCP / TBT).
 */
export function VideoFacade({
  video,
  orientation,
  playLabel,
  fallbackHref,
  fallbackLabel,
  className,
  showMeta = true,
  sizes,
}: VideoFacadeProps) {
  const [active, setActive] = useState(false);
  const hasVideo = Boolean(video.youtubeId);
  const portrait = orientation === 'portrait';

  const warmConnections = () => {
    preconnect('https://www.youtube-nocookie.com');
    preconnect('https://i.ytimg.com');
  };

  const frame = cn(
    'group relative isolate block w-full overflow-hidden bg-ink',
    aspectClass[orientation],
    orientation === 'portrait' ? 'arch' : orientation === 'landscape' ? 'rounded-[1.75rem]' : '',
    className,
  );

  if (active && hasVideo) {
    return (
      <div className={frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  const inner = (
    <>
      <img
        src={video.thumbnail}
        alt=""
        loading="lazy"
        decoding="async"
        sizes={sizes}
        width={portrait ? 540 : 1280}
        height={portrait ? 960 : 720}
        className="absolute inset-0 -z-10 size-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10',
          portrait
            ? 'bg-linear-to-t from-ink/95 via-ink/20 to-ink/10'
            : 'bg-linear-to-t from-ink/80 via-ink/25 to-ink/10',
        )}
      />
      {/* Play control: a glass disc inside the logo's ring — fills gold on hover */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-500 group-hover:bg-gold group-hover:text-ink',
          portrait ? 'size-16' : 'size-18 sm:size-22',
        )}
      >
        <svg viewBox="0 0 48 48" fill="none" className="absolute inset-0 size-full -rotate-90 transition-transform duration-700 group-hover:rotate-90">
          <circle cx="24" cy="24" r="22.5" strokeWidth="1.25" vectorEffect="non-scaling-stroke" className="stroke-white/50" />
          <circle
            cx="24"
            cy="24"
            r="22.5"
            pathLength={100}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="22 100"
            className="stroke-gold"
          />
        </svg>
        <Play className={cn('relative translate-x-0.5 fill-current', portrait ? 'size-5' : 'size-6 sm:size-7')} />
      </span>

      {showMeta ? (
        // Caption on a plate of liquid glass floating over the thumbnail
        // Caption on a small plate of liquid glass — compact on phones so the picture stays the hero
        <span className={cn('absolute inset-x-0 bottom-0', portrait ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-4')}>
          <span className="relative block">
            <span aria-hidden="true" className="liquid-glass absolute inset-0 rounded-[1.1rem] sm:rounded-[1.4rem]" />
            <span className={cn('relative flex flex-col items-start gap-1.5 text-start sm:gap-2', portrait ? 'p-2.5 sm:p-4' : 'p-3 sm:p-5 lg:p-6')}>
              <span className="flex items-center gap-1.5 text-[0.6rem] font-bold sm:gap-2 sm:text-xs">
                <span className="rounded-full bg-gold px-2 py-0.5 text-ink sm:px-2.5 sm:py-1">{video.topic}</span>
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-white sm:px-2.5 sm:py-1" translate="no">
                  {video.duration}
                </span>
              </span>
              <span
                className={cn(
                  'line-clamp-2 font-bold text-white',
                  portrait ? 'text-xs leading-snug sm:text-[0.95rem]' : 'text-sm sm:text-lg lg:text-xl',
                )}
              >
                {video.title}
              </span>
            </span>
          </span>
        </span>
      ) : null}
    </>
  );

  if (!hasVideo) {
    return (
      <a href={fallbackHref} target="_blank" rel="noopener noreferrer" aria-label={fallbackLabel} className={frame}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      onPointerEnter={warmConnections}
      onFocus={warmConnections}
      aria-label={playLabel}
      className={frame}
    >
      {inner}
    </button>
  );
}

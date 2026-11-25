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
    'card-smart group relative isolate block w-full overflow-hidden bg-ink',
    aspectClass[orientation],
    orientation === 'cinema' ? '' : 'rounded-3xl',
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
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-ink shadow-gold transition duration-500 group-hover:scale-110',
          portrait ? 'size-14' : 'size-16 sm:size-20',
        )}
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold/60" />
        <Play className={cn('relative translate-x-0.5 fill-current', portrait ? 'size-5' : 'size-6 sm:size-7')} />
      </span>

      {showMeta ? (
        <>
          <span className="absolute start-4 top-4 rounded-full bg-silver px-3 py-1 text-xs font-bold text-ink">
            {video.topic}
          </span>
          <span className="absolute end-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur" translate="no">
            {video.duration}
          </span>
          <span
            className={cn(
              'absolute inset-x-0 bottom-0 p-5 text-start font-bold text-white',
              portrait ? 'text-base leading-snug' : 'text-lg sm:text-xl',
            )}
          >
            {video.title}
          </span>
        </>
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

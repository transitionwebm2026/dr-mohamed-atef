import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Shared review pieces — used by the home reviews slider and the reviews page glass wall. */
export interface ReviewCardData {
  id: string;
  name: string;
  procedure: string;
  rating: number;
  text: string;
}

export function StarRating({ rating, label, className }: { rating: number; label: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn('size-4', i < rating ? 'fill-gold text-gold' : 'fill-transparent text-silver')}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/** Quote mark used on glass reviews (add `rtl:-scale-x-100` to mirror in RTL). */
export function QuoteMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 48" className={className}>
      <path d="M0 48V28C0 12 8 3 24 0l3 7C18 10 14 16 14 24h12v24H0Zm38 0V28C38 12 46 3 62 0l2 7c-9 3-13 9-13 17h13v24H38Z" />
    </svg>
  );
}

/** Avatar initial inside a ring — the "speaker" under a review bubble. */
export function ReviewerAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-full bg-ink font-display text-base font-semibold text-gold ring-2 ring-gold ring-offset-2 ring-offset-white',
        className,
      )}
    >
      {name.trim().charAt(0)}
    </span>
  );
}

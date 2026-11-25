import { BadgeCheck, Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReviewCardData {
  id: string;
  name: string;
  procedure: string;
  rating: number;
  text: string;
}

interface ReviewCardProps {
  review: ReviewCardData;
  verifiedLabel: string;
  ratingLabel: string;
  className?: string;
}

export function StarRating({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn('size-[1.1rem]', i < rating ? 'fill-gold text-gold' : 'fill-silver-100 text-silver')}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review, verifiedLabel, ratingLabel, className }: ReviewCardProps) {
  return (
    <figure
      className={cn(
        'relative flex h-full flex-col card-smart rounded-3xl border border-silver bg-white p-7 shadow-card transition duration-500 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <StarRating rating={review.rating} label={ratingLabel} />
        <Quote aria-hidden="true" className="size-9 fill-gold/15 text-gold/70 rtl:-scale-x-100" />
      </div>

      <blockquote className="mt-5 flex-1 leading-loose text-ink-700">
        <p>{review.text}</p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-silver/60 pt-5">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-lg font-extrabold text-gold"
        >
          {review.name.trim().charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-bold text-ink">{review.name}</span>
          <span className="mt-0.5 block truncate text-sm text-gold-ink">{review.procedure}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-silver/35 px-2.5 py-1 text-xs font-bold text-ink-700">
          <BadgeCheck aria-hidden="true" className="size-4 text-gold-600" />
          {verifiedLabel}
        </span>
      </figcaption>
    </figure>
  );
}

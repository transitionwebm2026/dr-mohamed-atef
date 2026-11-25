import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RingSize = 'sm' | 'md' | 'lg';
type RingTone = 'light' | 'dark';

interface RingIconProps {
  children: ReactNode;
  size?: RingSize;
  tone?: RingTone;
  /** Fill the ring with gold when the closest `.group` is hovered / focused. */
  interactive?: boolean;
  className?: string;
}

const sizes: Record<RingSize, string> = {
  sm: 'size-10 [&_svg.ring-icon]:size-4',
  md: 'size-14 [&_svg.ring-icon]:size-6',
  lg: 'size-20 [&_svg.ring-icon]:size-8',
};

/**
 * The site's icon container — echoes the circular colon mark of the logo:
 * a hairline silver ring with a short gold arc that turns half a circle on hover.
 * Pass Lucide icons with `className="ring-icon"` so they pick up the size.
 */
export function RingIcon({ children, size = 'md', tone = 'light', interactive = true, className }: RingIconProps) {
  const dark = tone === 'dark';
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid shrink-0 place-items-center rounded-full transition-colors duration-500',
        sizes[size],
        dark ? 'text-gold' : 'text-ink',
        interactive && 'group-hover:bg-gold group-hover:text-ink group-focus-visible:bg-gold group-focus-visible:text-ink',
        className,
      )}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className={cn(
          'absolute inset-0 size-full -rotate-90 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          interactive && 'group-hover:rotate-90',
        )}
      >
        <circle
          cx="24"
          cy="24"
          r="22.5"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          className={dark ? 'stroke-white/20' : 'stroke-silver'}
        />
        {/* Dashed arc: no non-scaling-stroke, so the dash pattern stays relative to pathLength */}
        <circle
          cx="24"
          cy="24"
          r="22.5"
          pathLength={100}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeDasharray="22 100"
          className="stroke-gold"
        />
      </svg>
      <span className="relative grid place-items-center">{children}</span>
    </span>
  );
}

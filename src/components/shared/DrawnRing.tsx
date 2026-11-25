'use client';

import { m } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * The logo's ring, drawn once to a full circle when it scrolls into view.
 * (Always a full circle — a partial arc beside a number would read as a percentage.)
 */
export function DrawnRing({ tone = 'dark', delay = 0, className }: { tone?: 'dark' | 'light'; delay?: number; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className={cn('absolute inset-0 size-full -rotate-90', className)}>
      <circle
        cx="100"
        cy="100"
        r="97"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
        className={tone === 'dark' ? 'stroke-white/15' : 'stroke-silver'}
      />
      <m.circle
        cx="100"
        cy="100"
        r="97"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-gold"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ duration: 1.8, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

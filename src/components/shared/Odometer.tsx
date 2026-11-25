'use client';

import { m } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

interface OdometerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;
/** Two full turns of digits, so every column rolls through at least ten numbers. */
const STRIP = Array.from({ length: 20 }, (_, i) => i % 10);

/** A gold bar that fills to a real percentage when it scrolls into view. */
export function PercentBar({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <span aria-hidden="true" className="mt-5 block h-2 overflow-hidden rounded-full bg-ink/10">
      <m.span
        className="block h-full rounded-full bg-linear-to-r from-gold-300 to-gold-600 ltr:origin-left rtl:origin-right"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: value / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay, ease: EASE }}
      />
    </span>
  );
}

/**
 * A figure whose digits roll into place like a mechanical counter when it scrolls into view —
 * each column spins through the digits and settles on its value (later columns settle last).
 * The final value is always in the DOM for screen readers; reduced motion shows it at once.
 */
export function Odometer({ value, prefix = '', suffix = '', delay = 0, className }: OdometerProps) {
  const text = `${prefix}${formatNumber(value)}${suffix}`;
  const chars = text.split('');
  let digitIndex = 0;

  return (
    <span dir="ltr" className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex items-baseline tabular-nums">
        {chars.map((ch, i) => {
          if (!/\d/.test(ch)) {
            return (
              <span key={i} className="inline-block">
                {ch}
              </span>
            );
          }
          const target = 10 + Number(ch);
          const order = digitIndex++;
          return (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden leading-none">
              {/* invisible sizer keeps the column exactly one digit wide */}
              <span className="invisible">0</span>
              <m.span
                className="absolute inset-x-0 top-0 flex flex-col"
                initial={{ y: '0%' }}
                whileInView={{ y: `${(-target / STRIP.length) * 100}%` }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 1.6 + order * 0.25, delay, ease: EASE }}
              >
                {STRIP.map((d, k) => (
                  <span key={k} className="block h-[1em] leading-none">
                    {d}
                  </span>
                ))}
              </m.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

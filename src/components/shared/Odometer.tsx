'use client';

import { m } from 'framer-motion';
import { cn, formatNumber } from '@/lib/utils';

interface OdometerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  className?: string;
  /** Applied to the prefix / suffix only (e.g. a gold "+"). */
  affixClassName?: string;
  /**
   * Manual trigger: when set, the digits roll once this turns true (instead of when the
   * figure scrolls into view).
   */
  play?: boolean;
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
export function Odometer({ value, prefix = '', suffix = '', delay = 0, className, affixClassName, play }: OdometerProps) {
  const number = formatNumber(value);
  const text = `${prefix}${number}${suffix}`;
  const chars = text.split('');
  const numberEnd = prefix.length + number.length;
  let digitIndex = 0;

  return (
    <span dir="ltr" className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex items-baseline tabular-nums">
        {chars.map((ch, i) => {
          if (!/\d/.test(ch) || i < prefix.length || i >= numberEnd) {
            const affix = i < prefix.length || i >= numberEnd;
            return (
              <span key={i} className={cn('inline-block', affix && affixClassName)}>
                {ch}
              </span>
            );
          }
          const target = 10 + Number(ch);
          const order = digitIndex++;
          const end = { y: `${(-target / STRIP.length) * 100}%` };
          const trigger =
            play === undefined
              ? { whileInView: end, viewport: { once: true, margin: '0px 0px -60px 0px' } }
              : { animate: play ? end : { y: '0%' } };
          return (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden leading-none">
              {/* invisible sizer keeps the column exactly one digit wide */}
              <span className="invisible">0</span>
              <m.span
                className="absolute inset-x-0 top-0 flex flex-col"
                initial={{ y: '0%' }}
                {...trigger}
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

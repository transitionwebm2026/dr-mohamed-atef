'use client';

import { useEffect, useRef, useState } from 'react';
import { formatNumber } from '@/lib/utils';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/**
 * Animated count-up that starts when the number scrolls into view.
 * The final value is server-rendered (SEO / no-JS) and announced once to screen readers.
 */
export function CountUp({ value, prefix = '', suffix = '', duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    setDisplay(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  const final = `${prefix}${formatNumber(value)}${suffix}`;

  return (
    <span ref={ref} dir="ltr" className="inline-block tabular-nums">
      <span aria-hidden="true">
        {prefix}
        {formatNumber(display)}
        {suffix}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}

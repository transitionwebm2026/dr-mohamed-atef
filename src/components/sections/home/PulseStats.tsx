'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { m, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Odometer } from '@/components/shared/Odometer';

export interface PulseStat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface PulseStatsProps {
  /** Server-rendered section title (h2 with id="impact-title"). */
  heading: ReactNode;
  dir: 'rtl' | 'ltr';
  stats: PulseStat[];
}

type Point = readonly [number, number];

/**
 * One heartbeat (P · Q · R · S · T) as [offset along the trace, height off the baseline]
 * around the point under a figure. Straight segments only, so lengths are exact.
 */
const BEAT_H: Point[] = [[-66, 0], [-56, 9], [-46, 0], [-16, 0], [-9, -11], [0, 78], [9, -34], [18, 0], [40, 0], [55, 15], [70, 0]];
const BEAT_V: Point[] = [[-40, 0], [-34, 6], [-28, 0], [-11, 0], [-6, -7], [0, 48], [6, -16], [12, 0], [26, 0], [35, 9], [44, 0]];
const R_INDEX = 5;

/** Comet: a short bright head over a longer dim tail, both racing at the same speed. */
const HEAD = 46;
const TAIL = 150;

interface Trace {
  d: string;
  total: number;
  width: number;
  height: number;
  horizontal: boolean;
  /** R peaks in reading order; `at` = distance along the path. */
  peaks: { x: number; y: number; at: number }[];
  /** CSS mask that fades the trace out at both ends. */
  mask: string;
}

function buildTrace(opts: {
  horizontal: boolean;
  rtl: boolean;
  width: number;
  height: number;
  anchors: { x: number; y: number }[];
  /** Start / end of the trace along its axis. */
  span: [number, number];
}): Trace {
  const { horizontal, rtl, width, height, anchors, span } = opts;
  const beat = horizontal ? BEAT_H : BEAT_V;
  const first = anchors[0]!;
  const base = horizontal ? first.y : first.x;
  // "main" = distance from where reading starts; "out" = towards the figure (up / into the row)
  const toXY = (main: number, out: number): Point =>
    horizontal ? [rtl ? width - main : main, base - out] : [base + (rtl ? -out : out), main];
  const toMain = (a: { x: number; y: number }) => (horizontal ? (rtl ? width - a.x : a.x) : a.y);

  const points: Point[] = [toXY(span[0], 0)];
  const peakIndex: number[] = [];
  for (const anchor of anchors) {
    const c = toMain(anchor);
    beat.forEach(([along, out], k) => {
      if (k === R_INDEX) peakIndex.push(points.length);
      points.push(toXY(c + along, out));
    });
  }
  points.push(toXY(span[1], 0));

  const cumulative = [0];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]!;
    const [x1, y1] = points[i]!;
    total += Math.hypot(x1 - x0, y1 - y0);
    cumulative.push(total);
  }

  const d = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('');
  const pct = (v: number) => `${((v / (horizontal ? width : height)) * 100).toFixed(2)}%`;
  const fade = 70;
  const mask = horizontal
    ? 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)'
    : `linear-gradient(to bottom, transparent ${pct(span[0])}, #000 ${pct(span[0] + fade)}, #000 ${pct(span[1] - fade)}, transparent ${pct(span[1])})`;

  return {
    d,
    total,
    width,
    height,
    horizontal,
    mask,
    peaks: peakIndex.map((i) => ({ x: points[i]![0], y: points[i]![1], at: cumulative[i]! })),
  };
}

/**
 * "Vital signs" stats band: a heartbeat trace runs the full width of the section with a beat
 * under each figure. Scrolling draws the trace from where reading starts; when it reaches a
 * beat, the peak pings, the figure lights up and rolls to its value, and the label rises.
 * Once drawn, a comet of light keeps running along the trace and flashes each peak as it
 * passes. Phones get a vertical trace down the start side. Reduced motion: drawn and still.
 */
export function PulseStats({ heading, dir, stats }: PulseStatsProps) {
  const rtl = dir === 'rtl';
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [trace, setTrace] = useState<Trace | null>(null);
  const [reached, setReached] = useState<boolean[]>(() => stats.map(() => false));
  const [done, setDone] = useState(false);

  // ── Measure the anchors under each figure and build the trace in real pixels ──
  const measure = useCallback(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;
    const horizontal = window.matchMedia('(min-width: 768px)').matches;
    const s = section.getBoundingClientRect();
    const anchors = Array.from(list.querySelectorAll<HTMLElement>(`[data-anchor="${horizontal ? 'h' : 'v'}"]`)).map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - s.left, y: r.top - s.top };
    });
    if (anchors.length === 0 || s.width === 0) return;
    const l = list.getBoundingClientRect();
    setTrace(
      buildTrace({
        horizontal,
        rtl,
        width: s.width,
        height: s.height,
        anchors,
        span: horizontal ? [0, s.width] : [l.top - s.top - 64, l.bottom - s.top + 64],
      }),
    );
  }, [rtl]);

  useEffect(() => {
    measure();
    const section = sectionRef.current;
    const observer = new ResizeObserver(() => measure());
    if (section) observer.observe(section);
    // Figures change height once the display font arrives
    document.fonts?.ready.then(() => measure()).catch(() => undefined);
    return () => observer.disconnect();
  }, [measure]);

  // ── Scroll drives the drawing; it only ever moves forward ──
  // Desktop: from when the figures' row enters the bottom of the screen until it is mid-screen.
  // Phones: the head stays level with a line ~72% down the screen as the rows pass it.
  const { scrollYProgress: rowProgress } = useScroll({ target: listRef, offset: ['center 95%', 'center 45%'] });
  const { scrollYProgress: columnProgress } = useScroll({ target: listRef, offset: ['start 72%', 'end 72%'] });
  const furthest = useMotionValue(0);
  const advance = useCallback(
    (v: number) => {
      if (v > furthest.get()) furthest.set(v);
    },
    [furthest],
  );
  const horizontal = trace?.horizontal ?? true;
  useMotionValueEvent(rowProgress, 'change', (v) => horizontal && advance(v));
  useMotionValueEvent(columnProgress, 'change', (v) => !horizontal && advance(v));
  useEffect(() => {
    advance((horizontal ? rowProgress : columnProgress).get());
  }, [horizontal, advance, rowProgress, columnProgress, trace]);

  const spring = useSpring(furthest, { stiffness: 70, damping: 22, restDelta: 0.0005 });
  const full = useMotionValue(1);
  const progress = reduce ? full : spring;
  const lineOpacity = useTransform(progress, [0, 0.015], [0, 1]);
  const glowOpacity = useTransform(lineOpacity, (o) => o * 0.3);

  const sync = useCallback(
    (v: number) => {
      if (!trace) return;
      const head = v * trace.total;
      setReached((prev) => {
        const next = trace.peaks.map((p, i) => prev[i] || head >= p.at - 2);
        return next.every((r, i) => r === prev[i]) ? prev : next;
      });
      if (v >= 0.99) setDone(true);
    },
    [trace],
  );
  useMotionValueEvent(spring, 'change', sync);
  useEffect(() => {
    if (reduce) {
      setReached(stats.map(() => true));
      setDone(true);
    } else {
      sync(spring.get());
    }
  }, [reduce, sync, spring, stats]);

  // ── Comet timing: the head covers (total + TAIL) px per loop; peaks flash as it passes ──
  const loop = trace ? Math.min(5.2, Math.max(2.8, trace.total / 480)) : 4;
  const passAt = (at: number) => (trace ? (at / (trace.total + TAIL)) * loop : 0);
  const running = done && !reduce && trace !== null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="impact-title"
      className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28"
    >
      {/* Monitor paper: a faint grid that fades out towards the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            'linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)',
          backgroundSize: '2rem 2rem',
          maskImage: 'radial-gradient(ellipse 75% 70% at 50% 55%, #000 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 55%, #000 25%, transparent 80%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute top-[60%] left-1/2 -z-10 h-72 w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

      {trace ? (
        <svg
          aria-hidden="true"
          width={trace.width}
          height={trace.height}
          viewBox={`0 0 ${trace.width} ${trace.height}`}
          fill="none"
          className="pointer-events-none absolute inset-0 z-0 overflow-visible"
          style={{ maskImage: trace.mask, WebkitMaskImage: trace.mask }}
        >
          {/* Flatline ghost, there from the start */}
          <path d={trace.d} className="stroke-white/10" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
          {/* Glow + trace, drawn by scroll */}
          <m.path
            d={trace.d}
            className="stroke-gold"
            strokeWidth={8}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ pathLength: progress, opacity: glowOpacity, filter: 'blur(8px)' }}
          />
          <m.path
            d={trace.d}
            className="stroke-gold"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ pathLength: progress, opacity: lineOpacity }}
          />

          {/* Comet: dim gold tail + bright head, looping once the trace is complete */}
          {running ? (
            <>
              <m.path
                d={trace.d}
                className="stroke-gold"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={`${TAIL} ${trace.total + TAIL}`}
                initial={{ strokeDashoffset: TAIL, opacity: 0 }}
                animate={{ strokeDashoffset: TAIL - (trace.total + TAIL), opacity: 0.55 }}
                transition={{
                  strokeDashoffset: { duration: loop, ease: 'linear', repeat: Infinity },
                  opacity: { duration: 0.6 },
                }}
              />
              <m.path
                d={trace.d}
                stroke="#fff"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={`${HEAD} ${trace.total + TAIL}`}
                initial={{ strokeDashoffset: HEAD, opacity: 0 }}
                animate={{ strokeDashoffset: HEAD - (trace.total + TAIL), opacity: 1 }}
                transition={{
                  strokeDashoffset: { duration: loop, ease: 'linear', repeat: Infinity },
                  opacity: { duration: 0.6 },
                }}
                style={{ filter: 'drop-shadow(0 0 5px rgb(255 183 1)) drop-shadow(0 0 12px rgb(255 183 1 / 0.7))' }}
              />
            </>
          ) : null}

          {/* Peaks: a ping when the trace first arrives, then a flash each time the comet passes */}
          {trace.peaks.map((p, i) => (
            <g key={stats[i]?.id ?? i}>
              <m.circle
                cx={p.x}
                cy={p.y}
                className="stroke-gold"
                strokeWidth={1.5}
                initial={{ r: 5, opacity: 0 }}
                animate={reached[i] && !reduce ? { r: [5, 30], opacity: [0.9, 0] } : { r: 5, opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              {running ? (
                <m.circle
                  cx={p.x}
                  cy={p.y}
                  className="stroke-gold"
                  strokeWidth={1.25}
                  initial={{ r: 5, opacity: 0 }}
                  animate={{ r: [5, 22], opacity: [0.75, 0] }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: passAt(p.at), repeat: Infinity, repeatDelay: loop - 0.9 }}
                />
              ) : null}
              <m.circle
                cx={p.x}
                cy={p.y}
                r={4.5}
                className="fill-gold"
                initial={{ opacity: 0 }}
                animate={{ opacity: reached[i] ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ filter: 'drop-shadow(0 0 6px rgb(255 183 1 / 0.9))' }}
              />
            </g>
          ))}
        </svg>
      ) : null}

      <div className="container-x relative z-10">
        {heading}

        <ol ref={listRef} className="mt-12 grid gap-y-14 md:mt-14 md:grid-cols-3 md:gap-x-8">
          {stats.map((stat, i) => {
            const lit = reached[i] ?? false;
            return (
              <li key={stat.id} className="relative flex flex-col items-start ps-[5.5rem] md:items-center md:ps-0 md:text-center">
                {/* Where the beat sits: phones → start side, middle of the row */}
                <span data-anchor="v" aria-hidden="true" className="absolute start-7 top-1/2 size-0 md:hidden" />

                <m.span
                  className={cn(
                    'block font-display text-5xl leading-none font-semibold transition-colors duration-700 lg:text-6xl xl:text-7xl',
                    lit ? 'text-white' : 'text-white/20',
                  )}
                  animate={
                    running
                      ? {
                          textShadow: [
                            '0 0 0px rgba(255, 183, 1, 0)',
                            '0 0 26px rgba(255, 183, 1, 0.55)',
                            '0 0 0px rgba(255, 183, 1, 0)',
                          ],
                        }
                      : undefined
                  }
                  transition={
                    running
                      ? {
                          duration: 1.1,
                          ease: 'easeOut',
                          delay: Math.max(0, passAt(trace?.peaks[i]?.at ?? 0) - 0.15),
                          repeat: Infinity,
                          repeatDelay: loop - 1.1,
                        }
                      : undefined
                  }
                >
                  <Odometer value={stat.value} prefix={stat.prefix} suffix={stat.suffix} play={lit} affixClassName="text-gold" />
                </m.span>

                {/* md+: the band the trace runs through — the R peak lands just under the figure */}
                <span aria-hidden="true" className="relative hidden h-[8.5rem] w-full md:block">
                  <span data-anchor="h" className="absolute top-[5.5rem] left-1/2 size-0" />
                </span>

                <m.span
                  className="mt-3 block max-w-[15rem] text-sm leading-relaxed font-bold text-white/70 sm:text-base md:mt-0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={lit ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {stat.label}
                </m.span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

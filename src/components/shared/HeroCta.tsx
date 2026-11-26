'use client';

import Link from 'next/link';
import { useEffect, useState, type PointerEvent, type ReactNode } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { KnobArrow } from './ButtonLink';

interface HeroCtaProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  external?: boolean;
  /**
   * - `disc` the lead action: a gold disc in a turning orbit; on hover the gold flows out of
   *   the disc and wraps the label. Magnetic on desktop.
   * - `ring` the secondary action: a hairline ring + label with an underline; on hover the
   *   ring fills, a gold stroke draws around it and the underline sweeps gold.
   */
  tone?: 'disc' | 'ring';
  /** Fill colour of the ring on hover (WhatsApp green for chat links). */
  accent?: 'white' | 'whatsapp';
}

const SPRING = { stiffness: 220, damping: 18, mass: 0.5 };
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

/** Hero call-to-action — deliberately not a pill: a disc that floods into one, or a ring + underline. */
export function HeroCta({ href, children, icon, external = false, tone = 'disc', accent = 'white' }: HeroCtaProps) {
  const [magnetic, setMagnetic] = useState(false);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);
  const ix = useSpring(useMotionValue(0), SPRING);
  const iy = useSpring(useMotionValue(0), SPRING);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMagnetic(tone === 'disc' && fine && !reduce);
  }, [tone]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!magnetic) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.14);
    y.set(dy * 0.3);
    ix.set(dx * 0.06);
    iy.set(dy * 0.18);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
    ix.set(0);
    iy.set(0);
  };

  const linkProps = {
    href,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
  };
  const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold';

  if (tone === 'ring') {
    const fill = accent === 'whatsapp' ? 'bg-whatsapp' : 'bg-white';
    const content = (
      <>
        <span aria-hidden="true" className="relative grid size-14 shrink-0 place-items-center rounded-full">
          <span className="absolute inset-0 rounded-full ring-1 ring-white/40 ring-inset" />
          <span className={cn('absolute inset-0 scale-0 rounded-full transition-transform duration-500', EASE, fill, 'group-hover/btn:scale-100 group-focus-visible/btn:scale-100')} />
          {/* gold stroke drawn around the ring on hover */}
          <svg viewBox="0 0 56 56" fill="none" className="absolute -inset-1.5 size-[calc(100%+0.75rem)] -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="27"
              pathLength={100}
              strokeWidth="1.5"
              className={cn(
                // butt caps + hidden at rest, so the undrawn stroke leaves no dot behind
                'stroke-gold opacity-0 [stroke-dasharray:100] [stroke-dashoffset:100] transition-[stroke-dashoffset,opacity] duration-700',
                EASE,
                'group-hover/btn:opacity-100 group-hover/btn:[stroke-dashoffset:0] group-focus-visible/btn:opacity-100 group-focus-visible/btn:[stroke-dashoffset:0]',
              )}
            />
          </svg>
          <span className="relative text-white transition-colors duration-300 group-hover/btn:text-ink group-focus-visible/btn:text-ink [&>svg]:size-5">
            {icon ?? <KnobArrow />}
          </span>
        </span>
        <span className="relative pb-1.5">
          {children}
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/30" />
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gold transition-transform duration-500 ltr:origin-left rtl:origin-right',
              EASE,
              'group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100',
            )}
          />
        </span>
      </>
    );
    const classes = cn('group/btn inline-flex h-14 shrink-0 items-center gap-4 text-base font-bold whitespace-nowrap text-white', focus, 'rounded-full');
    return external ? (
      <a {...linkProps} className={classes}>
        {content}
      </a>
    ) : (
      <Link {...linkProps} className={classes}>
        {content}
      </Link>
    );
  }

  // ── disc ──
  const content = (
    <>
      {/* The gold that floods out of the disc to wrap the label */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-y-0 start-0 w-14 rounded-full bg-gold shadow-gold transition-[width] duration-700 sm:w-16',
          EASE,
          'group-hover/btn:w-full group-focus-visible/btn:w-full',
        )}
      />
      {/* Pulse + turning dashed orbit around the disc (they bow out as the gold spreads) */}
      <span aria-hidden="true" className="absolute start-0 top-0 size-14 animate-pulse-ring rounded-full bg-gold/45 transition-opacity duration-300 group-hover/btn:opacity-0 sm:size-16" />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        fill="none"
        className="absolute -start-2 top-1/2 size-[4.5rem] -translate-y-1/2 transition-opacity duration-300 group-hover/btn:opacity-0 sm:size-20"
      >
        <g className="origin-center animate-[ring-spin_14s_linear_infinite]">
          <circle cx="50" cy="50" r="48" strokeWidth="1.25" strokeDasharray="3 7" className="stroke-gold/70" vectorEffect="non-scaling-stroke" />
          <circle cx="98" cy="50" r="3" className="fill-gold" />
        </g>
      </svg>
      <m.span
        aria-hidden="true"
        style={{ x: ix, y: iy }}
        className="absolute start-0 top-0 grid size-14 place-items-center text-ink sm:size-16 [&>svg]:size-6"
      >
        <span className="grid place-items-center transition-transform duration-700 group-hover/btn:-rotate-12 group-hover/btn:scale-110">
          {icon ?? <KnobArrow />}
        </span>
      </m.span>
      <span className="relative transition-colors duration-500 group-hover/btn:text-ink group-focus-visible/btn:text-ink">{children}</span>
      <span aria-hidden="true" className="relative text-gold transition-colors duration-500 group-hover/btn:text-ink group-focus-visible/btn:text-ink">
        <KnobArrow />
      </span>
    </>
  );
  const classes = cn(
    'group/btn relative inline-flex h-14 shrink-0 items-center gap-3 rounded-full ps-[4.75rem] pe-6 text-base font-bold whitespace-nowrap text-white sm:h-16 sm:ps-[5.25rem] sm:pe-7 sm:text-[1.05rem]',
    focus,
  );

  return (
    <m.span style={{ x, y }} className="inline-flex">
      {external ? (
        <a {...linkProps} className={classes}>
          {content}
        </a>
      ) : (
        <Link {...linkProps} className={classes}>
          {content}
        </Link>
      )}
    </m.span>
  );
}

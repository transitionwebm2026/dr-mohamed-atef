'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';

interface CtaMagnetProps {
  href: string;
  label: string;
  /** One unit of the text set around the circle (repeated to close the ring). */
  ringText: string;
  id: string;
}

const SPRING = { stiffness: 180, damping: 18, mass: 0.6 };
/** Ring path radius 90 in a 200 viewBox. */
const CIRCUMFERENCE = 565;
const ringTextClass = 'fill-ink font-display text-[13px] font-bold';

/**
 * The booking button as a large ink disc inside a turning ring of text. On desktop it is
 * magnetic: the disc leans toward the pointer (its label a little further, for depth) and a
 * white fill rises from the centre on hover. Touch devices / reduced motion get a still disc.
 */
export function CtaMagnet({ href, label, ringText, id }: CtaMagnetProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<SVGTextElement>(null);
  const [magnetic, setMagnetic] = useState(false);
  const [reps, setReps] = useState(3);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);
  const ix = useSpring(useMotionValue(0), SPRING);
  const iy = useSpring(useMotionValue(0), SPRING);

  useEffect(() => {
    const length = unitRef.current?.getComputedTextLength();
    if (length) setReps(Math.max(1, Math.round(CIRCUMFERENCE / length)));
  }, [ringText]);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMagnetic(fine && !reduce);
  }, []);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!magnetic || !areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.28);
    y.set(dy * 0.28);
    ix.set(dx * 0.12);
    iy.set(dy * 0.12);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
    ix.set(0);
    iy.set(0);
  };

  return (
    <div
      ref={areaRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative grid size-72 place-items-center sm:size-80 lg:size-[23rem]"
    >
      {/* Turning ring of text (direction="ltr" keeps an Arabic run anchored on the path).
          The unit is measured once and repeated so it closes the circle with almost no stretch. */}
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id={id} d="M100,100 m-90,0 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0" />
        </defs>
        <text ref={unitRef} visibility="hidden" className={ringTextClass} direction="ltr" x="0" y="0">
          {ringText}
        </text>
        <text className={ringTextClass} direction="ltr">
          <textPath href={`#${id}`} textLength={CIRCUMFERENCE} lengthAdjust="spacingAndGlyphs">
            {ringText.repeat(reps)}
          </textPath>
        </text>
      </svg>
      <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className="absolute inset-[14%] size-[72%]">
        <circle cx="100" cy="100" r="98" strokeWidth="1" strokeDasharray="2 5" className="stroke-ink/40" vectorEffect="non-scaling-stroke" />
      </svg>

      <m.div style={{ x, y }} className="relative size-[58%]">
        <Link
          href={href}
          className="group relative grid size-full place-items-center overflow-hidden rounded-full bg-ink text-white shadow-[0_30px_60px_-25px_rgb(38_38_36/0.7)] transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 focus-visible:outline-offset-8"
        >
          {/* White fill rising from the centre */}
          <span aria-hidden="true" className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-focus-visible:scale-100" />
          <m.span style={{ x: ix, y: iy }} className="relative flex flex-col items-center gap-3 px-6 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-gold text-ink transition-transform duration-700 group-hover:rotate-[-12deg] group-hover:scale-110">
              <CalendarCheck aria-hidden="true" className="size-6" />
            </span>
            <span className="font-display text-lg leading-snug font-semibold transition-colors duration-500 group-hover:text-ink group-focus-visible:text-ink sm:text-xl">
              {label}
            </span>
          </m.span>
        </Link>
      </m.div>
    </div>
  );
}

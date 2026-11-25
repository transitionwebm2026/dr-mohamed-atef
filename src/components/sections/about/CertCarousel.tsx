'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { m, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { IconKey } from '@/data/types';
import { cn } from '@/lib/utils';
import { DataIcon } from '@/components/shared/DataIcon';

export interface CertView {
  id: string;
  title: string;
  issuer: string;
  badge: string;
  icon: IconKey;
}

interface CertCarouselProps {
  items: CertView[];
  dir: 'rtl' | 'ltr';
  labels: { previous: string; next: string; region: string };
}

const AUTOPLAY_MS = 3400;
const GAP = 26;
const pad = (n: number) => String(n).padStart(2, '0');
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Credentials on a slowly turning 3D cylinder of liquid glass. The card facing the viewer is
 * gold-tinted; cards turning away dim and their backs are hidden. Turn it with the arrows,
 * the arrow keys, or by dragging; it turns by itself while in view (paused on hover / focus,
 * off with reduced motion). Every credential stays in the DOM as a plain list item.
 */
export function CertCarousel({ items, dir, labels }: CertCarouselProps) {
  const n = items.length;
  const angle = 360 / n;
  const sign = dir === 'rtl' ? -1 : 1;

  const regionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(regionRef, { margin: '-15% 0px -15% 0px' });
  const [step, setStep] = useState(0);
  const [radius, setRadius] = useState(320);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reduced, setReduced] = useState(true);

  const rot = useSpring(0, { stiffness: 55, damping: 16, mass: 0.9 });
  const drag = useMotionValue(0);
  const rotateY = useTransform(() => rot.get() + drag.get());
  const startX = useRef<number | null>(null);

  const front = ((step % n) + n) % n;

  // Cylinder radius from the card width, so neighbours just touch
  useIsoLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const measure = () => setRadius(el.offsetWidth / 2 / Math.tan(Math.PI / n) + GAP);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [n]);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(rm.matches);
    update();
    rm.addEventListener('change', update);
    return () => rm.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    rot.set(-sign * step * angle);
  }, [step, sign, angle, rot]);

  const paused = hovered || focused || dragging || reduced || !inView;
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setStep((s) => s + 1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const next = useCallback(() => setStep((s) => s + 1), []);
  const prev = useCallback(() => setStep((s) => s - 1), []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    setDragging(true);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    drag.set((e.clientX - startX.current) * 0.22);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    setDragging(false);
    // Hand the dragged angle to the spring so nothing jumps, then settle on the nearest card
    rot.jump(rot.get() + drag.get());
    drag.set(0);
    const turned = Math.round((dx * 0.22) / angle) || (Math.abs(dx) > 40 ? Math.sign(dx) : 0);
    if (turned !== 0) setStep((s) => s - sign * turned);
    else rot.set(-sign * step * angle);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === forward) {
      e.preventDefault();
      next();
    } else if (e.key === back) {
      e.preventDefault();
      prev();
    }
  };

  const ringBtn =
    'grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md transition duration-300 ring-inset hover:bg-gold hover:text-ink hover:ring-gold';

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
    >
      <div
        className="relative h-[23rem] cursor-grab touch-pan-y select-none [perspective:1300px] active:cursor-grabbing sm:h-[25rem]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* Pedestal glow under the front card */}
        <span aria-hidden="true" className="absolute start-1/2 bottom-0 h-16 w-[26rem] -translate-x-1/2 rounded-[50%] bg-gold/35 blur-3xl rtl:translate-x-1/2" />

        <m.ul
          style={{ rotateY, z: -radius, transformStyle: 'preserve-3d' }}
          className="absolute inset-x-0 top-4 mx-auto h-[19rem] w-60 sm:h-80 sm:w-64 lg:w-72"
        >
          {items.map((item, i) => {
            const delta = Math.min(Math.abs(i - front), n - Math.abs(i - front));
            const isFront = i === front;
            return (
              <li
                key={item.id}
                className="absolute inset-0 [backface-visibility:hidden]"
                style={{ transform: `rotateY(${sign * i * angle}deg) translateZ(${radius}px)` }}
              >
                <div
                  ref={i === 0 ? cardRef : undefined}
                  className={cn(
                    'relative flex size-full flex-col rounded-[2rem] p-6 text-white transition-[opacity,scale] duration-700 sm:p-7',
                    isFront ? 'scale-105 opacity-100' : delta === 1 ? 'opacity-80' : 'opacity-40',
                  )}
                >
                  <span aria-hidden="true" className={cn('liquid-glass absolute inset-0 rounded-[2rem]', isFront && 'liquid-glass-gold')} />
                  {/* Watermark ring (logo motif) */}
                  <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" className="absolute -end-10 -bottom-10 size-40 text-white/10">
                    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 3" />
                  </svg>
                  <div className="relative flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        'grid size-14 place-items-center rounded-full ring-1 transition-colors duration-500 ring-inset',
                        isFront ? 'bg-gold text-ink ring-gold' : 'bg-white/10 text-gold ring-white/25',
                      )}
                    >
                      <DataIcon name={item.icon} className="size-6" />
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/85 ring-1 ring-white/20 ring-inset">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="relative mt-auto font-sans text-lg leading-relaxed font-bold text-white sm:text-xl">{item.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-gold">{item.issuer}</p>
                </div>
              </li>
            );
          })}
        </m.ul>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button type="button" onClick={prev} aria-label={labels.previous} className={ringBtn}>
          <ChevronRight aria-hidden="true" className="size-5 ltr:rotate-180" />
        </button>
        <p className="min-w-24 text-center font-display text-white" dir="ltr" aria-live={paused ? 'polite' : 'off'}>
          <span className="text-3xl font-semibold text-gold">{pad(front + 1)}</span>
          <span className="ms-1.5 text-sm text-white/50">/ {pad(n)}</span>
          <span className="sr-only">: {items[front]?.title}</span>
        </p>
        <button type="button" onClick={next} aria-label={labels.next} className={ringBtn}>
          <ChevronLeft aria-hidden="true" className="size-5 ltr:rotate-180" />
        </button>
      </div>
    </div>
  );
}

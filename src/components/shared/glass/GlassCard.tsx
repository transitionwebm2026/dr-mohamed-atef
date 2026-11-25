'use client';

import { useEffect, useState, type PointerEvent, type ReactNode } from 'react';
import { m, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Tilt only for fine pointers and when motion is welcome. */
function useTiltAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(fine.matches && !reduce.matches);
    update();
    reduce.addEventListener('change', update);
    return () => reduce.removeEventListener('change', update);
  }, []);
  return allowed;
}

export interface GlassCardProps {
  children: ReactNode;
  tone?: 'dark' | 'light';
  /** Gold-tinted glass. */
  gold?: boolean;
  /** `glass` draws the slab; `none` only tilts + glares (for image / video cards). */
  surface?: 'glass' | 'none';
  tilt?: boolean;
  maxTilt?: number;
  /** Viewport entrance (rises and tips forward into place). */
  enter?: boolean;
  delay?: number;
  /** Border-radius class shared by every layer (e.g. `rounded-[2rem]`, `bubble`, `arch`). */
  radius?: string;
  /** Hold still (and level) while focus is inside — for forms, so fields don't move while typing. */
  freezeOnFocus?: boolean;
  className?: string;
  contentClassName?: string;
}

/**
 * A slab of liquid glass in 3D. It leans toward the pointer, a soft glare follows it, and
 * children can float above the glass with `[transform:translateZ(…)]` (the content layer
 * preserves 3D), so tilting reveals the depth. A faint back plate gives the slab thickness.
 */
export function GlassCard({
  children,
  tone = 'light',
  gold = false,
  surface = 'glass',
  tilt = true,
  maxTilt = 10,
  enter = true,
  delay = 0,
  radius = 'rounded-[2rem]',
  freezeOnFocus = false,
  className,
  contentClassName,
}: GlassCardProps) {
  const allowed = useTiltAllowed();
  const [focused, setFocused] = useState(false);
  const canTilt = tilt && allowed && !(freezeOnFocus && focused);
  const rx = useSpring(0, { stiffness: 160, damping: 16 });
  const ry = useSpring(0, { stiffness: 160, damping: 16 });
  const mx = useMotionValue(30);
  const my = useMotionValue(0);
  const glare = useMotionTemplate`radial-gradient(460px circle at ${mx}% ${my}%, var(--glare), transparent 45%)`;
  const dark = tone === 'dark';

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!canTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 2 * maxTilt);
    rx.set(-(py - 0.5) * 2 * maxTilt);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const glareLayer = (
    <m.span
      aria-hidden="true"
      style={{ background: glare }}
      className={cn(
        'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
        surface === 'none' && 'z-10',
        radius,
      )}
    />
  );

  const slab = (
    <m.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onFocusCapture={
        freezeOnFocus
          ? () => {
              setFocused(true);
              onLeave();
            }
          : undefined
      }
      onBlurCapture={
        freezeOnFocus
          ? (e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
            }
          : undefined
      }
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className={cn(
        'group relative h-full transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        canTilt && 'hover:scale-[1.015]',
        dark ? 'text-white [--glare:rgb(255_255_255/0.22)]' : 'text-ink [--glare:rgb(255_255_255/0.75)]',
        radius,
        className,
      )}
    >
      {surface === 'glass' ? (
        <>
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-0 [transform:translateZ(-14px)]',
              dark ? 'bg-white/[0.05] ring-1 ring-white/10' : 'bg-white/35 ring-1 ring-white/70',
              radius,
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              'liquid-glass absolute inset-0',
              !dark && 'liquid-glass-light',
              gold && (dark ? 'liquid-glass-gold' : 'liquid-glass-gold-light'),
              radius,
            )}
          />
          {glareLayer}
        </>
      ) : null}
      <div className={cn('relative h-full [transform-style:preserve-3d]', contentClassName)}>{children}</div>
      {surface === 'none' ? glareLayer : null}
    </m.div>
  );

  if (!enter) return <div className="h-full [perspective:1200px]">{slab}</div>;

  // No opacity in the entrance: an ancestor with opacity < 1 becomes the backdrop root and the
  // glass would lose its blur until the fade ends. The slab tips forward and rises instead.
  return (
    <m.div
      initial={{ y: 70, rotateX: 24, scale: 0.96 }}
      whileInView={{ y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 1.05, delay, ease: EASE }}
      style={{ transformPerspective: 1200 }}
      className="h-full [perspective:1200px]"
    >
      {slab}
    </m.div>
  );
}

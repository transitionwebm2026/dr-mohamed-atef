'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LogoMark } from './Logo';

type Phase = 'idle' | 'cover' | 'hold' | 'reveal';

interface Target {
  href: string;
  label: string;
  /** Click point + radius that reaches the farthest viewport corner. */
  x: number;
  y: number;
  r: number;
}

interface PageTransitionProps {
  lang: string;
  /** Known destinations → the name shown on the curtain. */
  destinations: { path: string; label: string }[];
}

const EASE = [0.76, 0, 0.24, 1] as const;
const MIN_HOLD_MS = 380;
const FALLBACK_MS = 4500;
const strip = (p: string) => p.replace(/\/+$/, '') || '/';

/**
 * Page transitions for internal links (any link on the site, same locale, other page):
 * 1. cover  — an ink curtain opens as a circle from the click point (the logo's ring draws in
 *             with the destination's name),
 * 2. hold   — the route is pushed; we wait until the new page has rendered,
 * 3. reveal — the curtain lifts upward, uncovering the new page (its hero entrance starts then).
 *
 * One capture-phase listener on `window` takes the click before Next's <Link> does.
 * Skipped for new-tab / modified clicks, hash links on the same page, language switches,
 * downloads, external links and when the visitor prefers reduced motion.
 */
export function PageTransition({ lang, destinations }: PageTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const [target, setTarget] = useState<Target | null>(null);
  const phaseRef = useRef<Phase>('idle');
  const fromPath = useRef('');
  const heldAt = useRef(0);
  phaseRef.current = phase;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const labelFor = (path: string, anchor: HTMLAnchorElement) => {
      const known = destinations.find((d) => strip(d.path) === strip(path));
      if (known) return known.label;
      const text = (anchor.dataset.transitionLabel ?? anchor.textContent ?? '').replace(/\s+/g, ' ').trim();
      return text.length > 72 ? `${text.slice(0, 70)}…` : text;
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a') : null;
      if (!anchor || !anchor.href) return;
      if ((anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download') || anchor.hasAttribute('hreflang')) return;
      if (anchor.dataset.noTransition !== undefined) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith(`/${lang}/`)) return;
      if (strip(url.pathname) === strip(window.location.pathname)) return; // same page (e.g. #booking)
      if (reduce.matches) return; // plain Next navigation

      event.preventDefault();
      event.stopPropagation();
      if (phaseRef.current !== 'idle') return;

      // Keyboard activation has no pointer position — start from the link itself
      let x = event.clientX;
      let y = event.clientY;
      if (event.detail === 0) {
        const rect = anchor.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 2;
      const href = `${url.pathname}${url.search}${url.hash}`;

      router.prefetch(href);
      fromPath.current = window.location.pathname;
      document.documentElement.dataset.transitioning = '';
      setTarget({ href, label: labelFor(url.pathname, anchor), x, y, r });
      setPhase('cover');
    };

    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [lang, destinations, router]);

  // Hold: wait for the new route (and a beat for the name to read), with a hard-navigation fallback
  useEffect(() => {
    if (phase !== 'hold' || !target) return;
    if (strip(pathname ?? '') !== strip(fromPath.current)) {
      const wait = Math.max(0, MIN_HOLD_MS - (performance.now() - heldAt.current));
      const timer = window.setTimeout(() => setPhase('reveal'), wait);
      return () => window.clearTimeout(timer);
    }
    const fallback = window.setTimeout(() => window.location.assign(target.href), FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, [phase, pathname, target]);

  // The new page's hero entrance waits under the curtain and plays as it lifts
  useEffect(() => {
    if (phase === 'reveal' || phase === 'idle') delete document.documentElement.dataset.transitioning;
  }, [phase]);

  const onCurtainDone = () => {
    if (!target) return;
    if (phase === 'cover') {
      heldAt.current = performance.now();
      setPhase('hold');
      router.push(target.href);
    } else if (phase === 'reveal') {
      setPhase('idle');
      setTarget(null);
    }
  };

  const long = (target?.label.length ?? 0) > 26;

  return (
    <AnimatePresence>
      {target ? (
        <m.div
          key="page-curtain"
          aria-hidden="true"
          className="fixed inset-0 z-[80] grid place-items-center bg-ink text-white"
          initial={{ clipPath: `circle(0px at ${target.x}px ${target.y}px)`, y: '0%' }}
          animate={
            phase === 'reveal'
              ? { clipPath: `circle(${target.r}px at ${target.x}px ${target.y}px)`, y: '-100%' }
              : { clipPath: `circle(${target.r}px at ${target.x}px ${target.y}px)`, y: '0%' }
          }
          transition={{ duration: phase === 'reveal' ? 0.8 : 0.7, ease: EASE }}
          onAnimationComplete={onCurtainDone}
        >
          {/* Hairline rings behind the name (logo motif) */}
          <svg viewBox="0 0 600 600" fill="none" className="pointer-events-none absolute size-[44rem] max-w-none text-white/[0.06]">
            <circle cx="300" cy="300" r="296" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <circle cx="300" cy="300" r="210" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>

          <m.div
            className="relative flex flex-col items-center gap-7 px-6 text-center"
            initial={{ y: 40, opacity: 0 }}
            animate={phase === 'reveal' ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: phase === 'cover' ? 0.18 : 0 }}
          >
            <span className="relative grid size-28 place-items-center sm:size-32">
              <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 size-full -rotate-90">
                <circle cx="100" cy="100" r="96" strokeWidth="1.25" vectorEffect="non-scaling-stroke" className="stroke-white/15" />
                <m.circle
                  cx="100"
                  cy="100"
                  r="96"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="stroke-gold"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
                />
              </svg>
              <LogoMark className="h-14 w-auto sm:h-16" />
            </span>
            <span
              className={cn(
                'max-w-4xl font-display leading-[1.35] font-semibold text-balance',
                long ? 'text-2xl sm:text-4xl' : 'text-[2.6rem] sm:text-6xl lg:text-7xl',
              )}
            >
              {target.label}
            </span>
          </m.div>

          {/* Gold edge on the curtain's hem — visible as it lifts */}
          <span className="absolute inset-x-0 bottom-0 h-1 bg-gold" />
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

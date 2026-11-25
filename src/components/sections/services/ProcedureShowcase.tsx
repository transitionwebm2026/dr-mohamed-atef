'use client';

import { useCallback, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { BedDouble, CalendarCheck, Eye, MousePointerClick, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/shared/Reveal';

export interface ProcedureView {
  id: string;
  title: string;
  description: string;
  stay: string;
  recovery: string;
  image: string;
  bookHref: string;
}

interface ProcedureShowcaseProps {
  procedures: ProcedureView[];
  /** Server-rendered specialty copy (title, description, highlights, CTA). */
  intro: ReactNode;
  /** Server-rendered specialty icon shown on the image corner. */
  badge: ReactNode;
  reversed?: boolean;
  dir: 'rtl' | 'ltr';
  labels: { title: string; hint: string; nowShowing: string; bookProcedure: string };
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Specialty showcase: the procedure cards act as tabs. Selecting one swaps the main
 * image (crossfade), overlays the procedure details and marks the card as "Now showing".
 */
export function ProcedureShowcase({ procedures, intro, badge, reversed = false, dir, labels }: ProcedureShowcaseProps) {
  const uid = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const preloaded = useRef(new Set<string>());

  const active = procedures[activeIndex] ?? procedures[0];
  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = `${uid}-panel`;

  const preload = useCallback((src: string) => {
    if (preloaded.current.has(src)) return;
    preloaded.current.add(src);
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  }, []);

  /** Bring the image into view when it is mostly off-screen (e.g. on phones). */
  const revealPanel = () => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 80));
    if (visible < rect.height * 0.45) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
  };

  const select = (index: number, fromPointer: boolean) => {
    setActiveIndex(index);
    if (fromPointer) requestAnimationFrame(revealPanel);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const n = procedures.length;
    const next = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const prev = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    let index = activeIndex;
    if (event.key === next || event.key === 'ArrowDown') index = (activeIndex + 1) % n;
    else if (event.key === prev || event.key === 'ArrowUp') index = (activeIndex - 1 + n) % n;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = n - 1;
    else return;
    event.preventDefault();
    select(index, false);
    tabRefs.current[index]?.focus();
  };

  if (!active) return null;

  return (
    <>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn('relative', reversed && 'lg:order-last')}>
          <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] border border-silver" />
          <div
            ref={panelRef}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId(activeIndex)}
            className="relative isolate aspect-[4/3] overflow-hidden rounded-3xl bg-ink shadow-card-hover"
          >
            <AnimatePresence initial={false}>
              <m.img
                key={active.id}
                src={active.image}
                alt={active.title}
                width={960}
                height={720}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 -z-10 size-full object-cover"
              />
            </AnimatePresence>
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/25 to-ink/10" />

            <span className="absolute start-5 top-5 inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1.5 text-xs font-extrabold text-ink shadow-gold">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-ink/60" />
                <span className="relative size-2 rounded-full bg-ink" />
              </span>
              {labels.nowShowing}
            </span>
            {/* dir="ltr" lives on the inner span so `end-5` still resolves against the page direction */}
            <span className="absolute end-5 top-5 rounded-full border border-white/25 bg-ink/50 px-3 py-1.5 text-xs font-extrabold text-white backdrop-blur">
              <span dir="ltr">
                {pad(activeIndex + 1)} / {pad(procedures.length)}
              </span>
            </span>

            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-x-0 bottom-0 p-5 sm:p-7"
              >
                <p className="text-lg leading-relaxed font-extrabold text-white sm:text-2xl">{active.title}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-silver/90 px-3 py-1.5 text-ink">
                    <BedDouble aria-hidden="true" className="size-3.5" />
                    {active.stay}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-silver/90 px-3 py-1.5 text-ink">
                    <Timer aria-hidden="true" className="size-3.5" />
                    {active.recovery}
                  </span>
                  <Link
                    href={active.bookHref}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-ink transition hover:bg-gold-300"
                  >
                    <CalendarCheck aria-hidden="true" className="size-3.5" />
                    {labels.bookProcedure}
                  </Link>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
          <span className="absolute -bottom-5 z-10 grid size-16 place-items-center rounded-2xl bg-gold text-ink shadow-gold ltr:right-6 rtl:left-6">
            {badge}
          </span>
        </Reveal>

        <Reveal delay={0.1}>{intro}</Reveal>
      </div>

      <div className="mt-16">
        <Reveal className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-3 text-xl font-extrabold text-ink">
            <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-gold" />
            {labels.title}
          </h3>
          <p className="inline-flex items-center gap-2 rounded-full bg-silver/35 px-4 py-2 text-sm font-bold text-ink-700">
            <MousePointerClick aria-hidden="true" className="size-4 text-ink" />
            {labels.hint}
          </p>
        </Reveal>

        <div role="tablist" aria-label={labels.title} onKeyDown={onKeyDown} className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {procedures.map((p, i) => {
            const selected = i === activeIndex;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={tabId(i)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i, true)}
                onPointerEnter={() => preload(p.image)}
                onFocus={() => preload(p.image)}
                className={cn(
                  'card-smart group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 p-6 text-start transition duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
                  selected
                    ? '-translate-y-1 border-gold bg-gold/10 shadow-gold'
                    : 'border-silver bg-white shadow-card hover:-translate-y-1 hover:border-gold/70 hover:shadow-card-hover',
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'grid size-10 place-items-center rounded-xl text-sm font-extrabold transition-colors duration-300',
                      selected ? 'bg-gold text-ink' : 'bg-silver/40 text-ink group-hover:bg-gold/30',
                    )}
                    dir="ltr"
                  >
                    {pad(i + 1)}
                  </span>
                  {selected ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[0.7rem] font-extrabold text-gold">
                      <Eye aria-hidden="true" className="size-3.5" />
                      {labels.nowShowing}
                    </span>
                  ) : (
                    <Eye aria-hidden="true" className="size-4 text-silver transition-colors group-hover:text-gold" />
                  )}
                </span>
                <span className="mt-4 block text-base leading-relaxed font-extrabold text-ink">{p.title}</span>
                <span className="mt-2 block flex-1 text-sm leading-loose text-ink-500">{p.description}</span>
                <span
                  className={cn(
                    'mt-5 flex flex-wrap gap-2 border-t pt-4 text-xs font-bold text-ink-700',
                    selected ? 'border-gold/40' : 'border-silver',
                  )}
                >
                  <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5', selected ? 'bg-white' : 'bg-silver/30')}>
                    <BedDouble aria-hidden="true" className="size-3.5 text-gold-600" />
                    {p.stay}
                  </span>
                  <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5', selected ? 'bg-white' : 'bg-silver/30')}>
                    <Timer aria-hidden="true" className="size-3.5 text-gold-600" />
                    {p.recovery}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 top-0 h-1.5 origin-center bg-gold transition-transform duration-500',
                    selected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50',
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

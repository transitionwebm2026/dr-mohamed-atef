'use client';

import { useCallback, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { BedDouble, MousePointerClick, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterPills } from '@/components/shared/FilterPills';
import { Reveal } from '@/components/shared/Reveal';
import { GlassCard } from '@/components/shared/glass/GlassCard';

export interface ProcedureView {
  id: string;
  title: string;
  description: string;
  stay: string;
  recovery: string;
  image: string;
}

/** A sub-specialty of the department and its procedures. */
export interface ProcedureGroupView {
  id: string;
  label: string;
  procedures: ProcedureView[];
}

interface ProcedureShowcaseProps {
  groups: ProcedureGroupView[];
  /** Server-rendered department copy (title, description, highlights, CTA). */
  intro: ReactNode;
  /** Server-rendered department icon shown on the image corner. */
  badge: ReactNode;
  reversed?: boolean;
  dir: 'rtl' | 'ltr';
  labels: { title: string; hint: string; groups: string };
}

/**
 * Department showcase as a list–detail view: the procedures are a list of tabs (the
 * selected one opens to show its description and stay / recovery), and the large
 * image beside it crossfades to the selected procedure. Departments with several
 * sub-specialties get a row of pills above the list that switches between them.
 */
export function ProcedureShowcase({ groups, intro, badge, reversed = false, dir, labels }: ProcedureShowcaseProps) {
  const uid = useId();
  const [groupId, setGroupId] = useState(groups[0]?.id ?? '');
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const preloaded = useRef(new Set<string>());

  const group = groups.find((g) => g.id === groupId) ?? groups[0];
  const procedures = group?.procedures ?? [];
  const active = procedures[activeIndex] ?? procedures[0];

  const selectGroup = (id: string) => {
    if (id === groupId) return;
    setGroupId(id);
    setActiveIndex(0);
  };
  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = `${uid}-panel`;

  const preload = useCallback((src: string) => {
    if (preloaded.current.has(src)) return;
    preloaded.current.add(src);
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  }, []);

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
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  if (!group || !active) return null;

  const chip = 'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ring-1 ring-inset ring-ink/15';

  return (
    <>
      <Reveal>{intro}</Reveal>

      <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
        {/* Image panel */}
        <Reveal variant="swing" className={cn('lg:col-span-7', reversed && 'lg:order-last')}>
          <div className="lg:sticky lg:top-28">
          <GlassCard surface="none" enter={false} maxTilt={6} radius="rounded-[1.75rem]">
          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId(activeIndex)}
            className="relative isolate aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_40px_70px_-35px_rgb(58_58_56/0.6)]"
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
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink/60 via-transparent to-transparent" />

            <span className="absolute start-2.5 top-2.5 grid size-9 place-items-center rounded-full bg-gold text-ink shadow-gold md:start-5 md:top-5 md:size-14 [&_svg]:size-4 md:[&_svg]:size-6">
              {badge}
            </span>

            {/* Caption: a small tag of liquid glass with the procedure's name only
                (booking lives in the specialty CTA above) */}
            <div className="absolute start-2.5 bottom-2.5 max-w-[calc(100%-1.25rem)] md:start-4 md:bottom-4 md:max-w-[calc(100%-2rem)]">
              <span aria-hidden="true" className="liquid-glass absolute inset-0 rounded-xl md:rounded-2xl" />
              <AnimatePresence mode="wait" initial={false}>
                <m.p
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative line-clamp-1 px-3 py-1.5 font-display text-xs leading-relaxed font-semibold text-white md:px-5 md:py-2.5 md:text-lg"
                >
                  {active.title}
                </m.p>
              </AnimatePresence>
            </div>
          </div>
          </GlassCard>
          </div>
        </Reveal>

        {/* Procedure list (tabs) */}
        <Reveal delay={0.08} className="lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-sans text-lg font-bold text-ink">{labels.title}</h3>
            <p className="inline-flex items-center gap-2 text-xs font-bold text-ink-500">
              <MousePointerClick aria-hidden="true" className="size-4" />
              {labels.hint}
            </p>
          </div>

          {groups.length > 1 ? (
            <FilterPills
              size="sm"
              className="mt-5"
              label={labels.groups}
              active={group.id}
              onSelect={selectGroup}
              pills={groups.map((g) => ({ key: g.id, label: g.label, count: g.procedures.length }))}
            />
          ) : null}

          <m.div
            key={group.id}
            role="tablist"
            aria-label={groups.length > 1 ? `${labels.title} — ${group.label}` : labels.title}
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 grid gap-3"
          >
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
                  onClick={() => setActiveIndex(i)}
                  onPointerEnter={() => preload(p.image)}
                  onFocus={() => preload(p.image)}
                  className={cn(
                    'group relative block w-full rounded-[1.5rem] px-5 py-4 text-start transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-offset-2',
                    selected ? 'scale-[1.01]' : 'hover:-translate-y-0.5',
                  )}
                >
                  {/* Glass item — gold-tinted when selected */}
                  <span
                    aria-hidden="true"
                    className={cn('liquid-glass liquid-glass-light absolute inset-0 rounded-[1.5rem]', selected && 'liquid-glass-gold-light')}
                  />
                  <span className="relative flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors duration-300',
                        selected ? 'border-gold' : 'border-silver group-hover:border-ink-500',
                      )}
                    >
                      <span className={cn('size-2 rounded-full bg-gold transition-transform duration-300', selected ? 'scale-100' : 'scale-0')} />
                    </span>
                    <span
                      className={cn(
                        'flex-1 text-base leading-relaxed font-bold transition-colors duration-300 sm:text-lg',
                        selected ? 'text-ink' : 'text-ink-500 group-hover:text-ink',
                      )}
                    >
                      {p.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'relative grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      selected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <span className="block overflow-hidden ps-9">
                      <span className="block pt-3 text-sm leading-loose text-ink-500">{p.description}</span>
                      <span className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-ink-700">
                        <span className={chip}>
                          <BedDouble aria-hidden="true" className="size-3.5 text-gold-ink" />
                          {p.stay}
                        </span>
                        <span className={chip}>
                          <Timer aria-hidden="true" className="size-3.5 text-gold-ink" />
                          {p.recovery}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </m.div>
        </Reveal>
      </div>
    </>
  );
}

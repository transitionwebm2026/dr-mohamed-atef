'use client';

import Link from 'next/link';
import { useState } from 'react';
import { KnobArrow } from '@/components/shared/ButtonLink';
import { cn } from '@/lib/utils';

export interface FeaturedPanel {
  id: string;
  href: string;
  image: string;
  title: string;
  description: string;
  tag: string;
}

/**
 * Expanding image panels (lg+): the panel under the pointer / keyboard focus widens and
 * reveals its description, the others narrow to slim columns. Below lg they stack, fully open.
 */
export function FeaturedPanels({ items }: { items: FeaturedPanel[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="grid gap-4 lg:flex lg:h-[34rem] lg:gap-4">
      {items.map((item, i) => {
        const open = i === active;
        return (
          <li
            key={item.id}
            onPointerEnter={() => setActive(i)}
            onFocusCapture={() => setActive(i)}
            style={{ flexGrow: open ? 2.4 : 1 }}
            className="group/btn relative isolate flex aspect-[4/3] min-w-0 basis-0 overflow-hidden rounded-[1.75rem] bg-ink text-white transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:aspect-[16/9] lg:aspect-auto"
          >
            <img
              src={item.image}
              alt=""
              width={960}
              height={720}
              loading="lazy"
              decoding="async"
              className={cn(
                'absolute inset-0 -z-20 size-full object-cover transition duration-1000 ease-out',
                open ? 'lg:scale-105' : 'lg:scale-100 lg:grayscale-[35%]',
              )}
            />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink/80 via-ink/15 to-transparent" />

            {/* Whole panel is the link (the caption plate is its own positioned layer) */}
            <Link href={item.href} aria-labelledby={`${item.id}-title`} className="absolute inset-0 z-20 rounded-[1.75rem]" />

            <span className="liquid-glass absolute start-3 top-3 overflow-hidden rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold text-white md:start-5 md:top-5 md:px-3 md:py-1 md:text-xs">
              <span className="relative">{item.tag}</span>
            </span>

            {/* Caption on a small floating plate of liquid glass (gold-tinted on the open panel).
                Phones/tablets: compact. lg+: the open panel shows title + description, the slim
                closed panels only the title. */}
            <div className="relative m-2 mt-auto w-[calc(100%-1rem)] md:m-3 md:mt-auto md:w-[calc(100%-1.5rem)] lg:m-4 lg:mt-auto lg:w-[calc(100%-2rem)]">
              <span aria-hidden="true" className={cn('liquid-glass absolute inset-0 rounded-2xl md:rounded-[1.35rem]', open && 'liquid-glass-gold')} />
              <div className={cn('relative flex items-end justify-between gap-3 p-3 md:gap-5 md:p-5', open ? 'lg:p-6' : 'lg:p-4')}>
                <div className="min-w-0">
                  <h3
                    id={`${item.id}-title`}
                    className={cn(
                      'leading-snug font-bold transition-[font-size] duration-500',
                      open ? 'text-sm md:text-xl lg:text-[1.7rem] lg:leading-normal' : 'text-sm md:text-xl lg:text-base',
                    )}
                  >
                    {item.title}
                  </h3>
                  {/* Always in the DOM (screen readers, < lg); collapsed to zero height on closed panels at lg+.
                      Only `max-md:` line-clamp — `line-clamp-none` would set overflow: visible and break the collapse. */}
                  <div
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0',
                    )}
                  >
                    <p className="min-h-0 overflow-hidden pt-1 text-xs leading-relaxed text-white/80 max-md:line-clamp-2 md:pt-3 md:text-base md:leading-loose lg:max-w-md">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-full bg-gold text-ink transition duration-500 md:size-12',
                    !open && 'lg:size-10 lg:bg-white/15 lg:text-white',
                  )}
                >
                  <KnobArrow />
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

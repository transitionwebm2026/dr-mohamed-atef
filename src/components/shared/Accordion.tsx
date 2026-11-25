'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index opened initially; `null` keeps all closed. */
  defaultOpen?: number | null;
}

/**
 * Accessible single-open accordion — frameless rows on hairlines.
 * Smooth height transition via CSS grid rows; the ring toggle turns + into ×.
 */
export function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpen === null ? null : (items[defaultOpen]?.id ?? null),
  );
  const baseId = useId();

  return (
    <div className="border-t border-ink/15">
      {items.map((item) => {
        const open = openId === item.id;
        const buttonId = `${baseId}-${item.id}-q`;
        const panelId = `${baseId}-${item.id}-a`;
        return (
          <div key={item.id} className="border-b border-ink/15">
            <h3 className="font-sans">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-start text-base leading-relaxed font-bold text-ink sm:text-lg"
              >
                <span className={cn('transition-colors duration-300', !open && 'group-hover:text-gold-ink')}>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,rotate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    open ? 'rotate-45 bg-gold' : 'ring-1 ring-silver ring-inset group-hover:ring-gold',
                  )}
                >
                  <span className="absolute h-[1.5px] w-3.5 rounded-full bg-ink" />
                  <span className="absolute h-3.5 w-[1.5px] rounded-full bg-ink" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 sm:pe-16 leading-loose text-ink-500">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
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

/** Accessible single-open accordion with a smooth height transition (CSS grid rows). */
export function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpen === null ? null : (items[defaultOpen]?.id ?? null),
  );
  const baseId = useId();

  return (
    <div className="divide-y divide-silver/60 overflow-hidden card-smart rounded-3xl border border-silver bg-white shadow-card">
      {items.map((item) => {
        const open = openId === item.id;
        const buttonId = `${baseId}-${item.id}-q`;
        const panelId = `${baseId}-${item.id}-a`;
        return (
          <div key={item.id} className={cn('px-5 transition-colors duration-300 sm:px-7', open && 'bg-paper/70')}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-start text-base leading-relaxed font-bold text-ink sm:py-6 sm:text-lg"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-full border transition duration-300',
                    open ? 'rotate-45 border-gold bg-gold text-ink' : 'border-silver text-ink',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-400 ease-out',
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 leading-loose text-ink-500">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

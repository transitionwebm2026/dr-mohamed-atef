'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArticleCard, type ArticleCardData } from '@/components/shared/ArticleCard';
import { cn } from '@/lib/utils';

interface ArticlesExplorerProps {
  articles: ArticleCardData[];
  categories: { key: string; label: string }[];
  labels: { all: string; filter: string; empty: string; read: string };
}

/** 3 + 3 article grid with category filter pills. */
export function ArticlesExplorer({ articles, categories, labels }: ArticlesExplorerProps) {
  const [active, setActive] = useState<string>('all');

  const available = useMemo(
    () => categories.filter((c) => articles.some((a) => a.categoryKey === c.key)),
    [articles, categories],
  );
  const visible = active === 'all' ? articles : articles.filter((a) => a.categoryKey === active);
  const pills = [{ key: 'all', label: labels.all }, ...available];

  return (
    <div>
      <div role="group" aria-label={labels.filter} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {pills.map((pill) => {
          const selected = pill.key === active;
          const count = pill.key === 'all' ? articles.length : articles.filter((a) => a.categoryKey === pill.key).length;
          return (
            <button
              key={pill.key}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(pill.key)}
              className={cn(
                'inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full ps-5 pe-2 text-sm font-bold ring-1 transition duration-300 ring-inset',
                selected ? 'bg-ink text-white ring-ink' : 'bg-white text-ink-700 ring-silver hover:ring-ink',
              )}
            >
              {pill.label}
              <span
                className={cn(
                  'grid size-7 place-items-center rounded-full text-xs',
                  selected ? 'bg-gold text-ink' : 'bg-paper text-ink-700',
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
          aria-live="polite"
        >
          {visible.length > 0 ? (
            visible.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} readLabel={labels.read} />
              </li>
            ))
          ) : (
            <li className="col-span-full rounded-3xl border border-dashed border-silver p-10 text-center text-ink-500">
              {labels.empty}
            </li>
          )}
        </m.ul>
      </AnimatePresence>
    </div>
  );
}

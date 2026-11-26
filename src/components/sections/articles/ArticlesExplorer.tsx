'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArticleCard, type ArticleCardData } from '@/components/shared/ArticleCard';
import { FilterPills } from '@/components/shared/FilterPills';

interface ArticlesExplorerProps {
  articles: ArticleCardData[];
  /** The three service departments, in order. */
  categories: { key: string; label: string }[];
  labels: { all: string; filter: string; empty: string; read: string };
}

/** Article grid with department filter pills. */
export function ArticlesExplorer({ articles, categories, labels }: ArticlesExplorerProps) {
  const [active, setActive] = useState<string>('all');

  const pills = useMemo(
    () => [
      { key: 'all', label: labels.all, count: articles.length },
      ...categories
        .map((c) => ({ ...c, count: articles.filter((a) => a.categoryKey === c.key).length }))
        .filter((c) => c.count > 0),
    ],
    [articles, categories, labels.all],
  );
  const visible = active === 'all' ? articles : articles.filter((a) => a.categoryKey === active);

  return (
    <div>
      <FilterPills pills={pills} active={active} onSelect={setActive} label={labels.filter} />

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

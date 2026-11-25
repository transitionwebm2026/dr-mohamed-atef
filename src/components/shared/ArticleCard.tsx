import Link from 'next/link';
import { CalendarDays, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ArticleCardData {
  slug: string;
  href: string;
  image: string;
  imageAlt: string;
  category: string;
  categoryKey: string;
  title: string;
  excerpt: string;
  readTimeLabel: string;
  dateLabel: string;
  dateIso: string;
}

interface ArticleCardProps {
  article: ArticleCardData;
  readLabel: string;
  className?: string;
  headingLevel?: 'h2' | 'h3';
  /**
   * - `tile` frameless: image on top, copy below on the page surface (grids)
   * - `row`  compact: round thumbnail beside the title (secondary lists)
   */
  layout?: 'tile' | 'row';
}

export function ArticleMeta({ article, className }: { article: ArticleCardData; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500', className)}>
      <span className="font-bold text-gold-ink">{article.category}</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock aria-hidden="true" className="size-3.5" />
        {article.readTimeLabel}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays aria-hidden="true" className="size-3.5" />
        <time dateTime={article.dateIso}>{article.dateLabel}</time>
      </span>
    </div>
  );
}

/** Whole item is clickable via a stretched link on the title. */
export function ArticleCard({ article, readLabel, className, headingLevel: Heading = 'h3', layout = 'tile' }: ArticleCardProps) {
  if (layout === 'row') {
    return (
      <article className={cn('group relative flex items-center gap-5 py-6', className)}>
        <span className="relative size-24 shrink-0 overflow-hidden rounded-full bg-paper shadow-[0_12px_24px_-12px_rgb(58_58_56/0.5)] ring-4 ring-white transition-[box-shadow] duration-500 group-hover:ring-gold sm:size-28">
          <img
            src={article.image}
            alt=""
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition duration-700 ease-out group-hover:scale-110"
          />
        </span>
        <div className="min-w-0 flex-1">
          <ArticleMeta article={article} />
          <Heading className="mt-2 font-sans text-base leading-relaxed font-bold text-ink sm:text-lg">
            <Link href={article.href} className="link-sweep pb-0.5 after:absolute after:inset-0 after:content-['']">
              {article.title}
            </Link>
          </Heading>
          <span className="sr-only">{readLabel}</span>
        </div>
      </article>
    );
  }

  return (
    <article className={cn('group relative flex h-full flex-col', className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-paper">
        <img
          src={article.image}
          alt={article.imageAlt}
          width={960}
          height={720}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        {/* Read cue: a gold knob that rolls in from the corner on hover */}
        <span
          aria-hidden="true"
          className="absolute end-4 bottom-4 grid size-12 translate-y-3 place-items-center rounded-full bg-gold text-ink opacity-0 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 -rotate-45 rtl:-scale-x-100 rtl:rotate-45">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <ArticleMeta article={article} />
        <Heading className="mt-3 font-sans text-lg leading-relaxed font-bold text-ink">
          <Link href={article.href} className="link-sweep pb-0.5 after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-2 text-sm leading-loose text-ink-500">{article.excerpt}</p>
        <span className="sr-only">{readLabel}</span>
      </div>
    </article>
  );
}

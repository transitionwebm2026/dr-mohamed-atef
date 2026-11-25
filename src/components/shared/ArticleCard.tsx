import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
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
}

/** Whole card is clickable via a stretched link on the title. */
export function ArticleCard({ article, readLabel, className, headingLevel: Heading = 'h3' }: ArticleCardProps) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden card-smart rounded-3xl border border-silver bg-white shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <img
          src={article.image}
          alt={article.imageAlt}
          width={960}
          height={600}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute start-4 top-4 rounded-full bg-silver px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-3.5 text-gold-600" />
            {article.readTimeLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="size-3.5 text-gold-600" />
            <time dateTime={article.dateIso}>{article.dateLabel}</time>
          </span>
        </div>
        <Heading className="mt-3 text-lg leading-relaxed font-bold text-ink">
          <Link href={article.href} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-sm leading-loose text-ink-500">{article.excerpt}</p>
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-ink transition-colors group-hover:text-gold-ink"
        >
          {readLabel}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-center scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}

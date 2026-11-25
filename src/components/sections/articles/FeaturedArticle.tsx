import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock, Sparkles } from 'lucide-react';
import type { ArticleCardData } from '@/components/shared/ArticleCard';
import { Reveal } from '@/components/shared/Reveal';

interface FeaturedArticleProps {
  article: ArticleCardData;
  label: string;
  readLabel: string;
}

/** Full-width split card highlighting the flagship guide. */
export function FeaturedArticle({ article, label, readLabel }: FeaturedArticleProps) {
  return (
    <section className="bg-white pt-20 lg:pt-28">
      <div className="container-x">
        <Reveal>
          <article className="group relative grid overflow-hidden card-smart rounded-[2rem] border border-silver bg-white shadow-card transition duration-500 hover:shadow-card-hover lg:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[28rem]">
              <img
                src={article.image}
                alt={article.imageAlt}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute start-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-xs font-extrabold text-ink shadow-gold">
                <Sparkles aria-hidden="true" className="size-3.5" />
                {label}
              </span>
            </div>
            <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <span aria-hidden="true" className="absolute top-0 h-1 w-24 bg-gold ltr:left-10 rtl:right-10 lg:ltr:left-14 lg:rtl:right-14" />
              <span className="w-fit rounded-full bg-silver/40 px-3 py-1 text-xs font-bold text-ink">{article.category}</span>
              <h2 className="mt-5 text-2xl leading-[1.4] font-extrabold text-ink sm:text-3xl">
                <Link href={article.href} className="after:absolute after:inset-0 after:content-['']">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-4 leading-loose text-ink-500">{article.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="size-4 text-gold-600" />
                  {article.readTimeLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays aria-hidden="true" className="size-4 text-gold-600" />
                  <time dateTime={article.dateIso}>{article.dateLabel}</time>
                </span>
              </div>
              <span
                aria-hidden="true"
                className="mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition duration-300 group-hover:bg-gold group-hover:text-ink"
              >
                {readLabel}
                <ArrowRight className="size-4 rtl:-scale-x-100" />
              </span>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

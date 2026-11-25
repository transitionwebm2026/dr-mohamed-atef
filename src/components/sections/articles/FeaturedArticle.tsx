import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { ArticleMeta, type ArticleCardData } from '@/components/shared/ArticleCard';
import { ButtonKnob, buttonClasses } from '@/components/shared/ButtonLink';
import { Reveal } from '@/components/shared/Reveal';

interface FeaturedArticleProps {
  article: ArticleCardData;
  label: string;
  readLabel: string;
}

/** Flagship guide: a large image with the copy set beside it on the page surface. */
export function FeaturedArticle({ article, label, readLabel }: FeaturedArticleProps) {
  return (
    <section className="bg-white pt-20 lg:pt-28">
      <div className="container-x">
        <Reveal>
          <article className="group group/btn relative grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-paper lg:col-span-7">
              <img
                src={article.image}
                alt={article.imageAlt}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover transition duration-1000 ease-out group-hover:scale-105"
              />
              <span className="absolute start-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-xs font-extrabold text-ink">
                <Sparkles aria-hidden="true" className="size-3.5" />
                {label}
              </span>
            </div>
            <div className="lg:col-span-5">
              <ArticleMeta article={article} className="text-sm" />
              <h2 className="mt-5 text-2xl leading-[1.45] font-bold text-ink sm:text-3xl lg:text-[2.1rem]">
                <Link href={article.href} className="link-sweep pb-1 after:absolute after:inset-0 after:content-['']">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-5 leading-loose text-ink-500 sm:text-lg">{article.excerpt}</p>
              <span aria-hidden="true" className={buttonClasses('dark', 'md', true, 'mt-8 w-fit')}>
                <span>{readLabel}</span>
                <ButtonKnob variant="dark" />
              </span>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

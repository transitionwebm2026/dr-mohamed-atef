import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { articles } from '@/data/articles';
import { localizedPath, routes } from '@/lib/routes';
import { toArticleCard } from '@/lib/localize';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function ArticlesSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.articles;
  const latest = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3)
    .map((a) => toArticleCard(a, lang, dict));

  return (
    <section className="section-y bg-paper">
      <div className="container-x">
        <Reveal>
          <SectionHeading title={copy.title} description={copy.description} />
        </Reveal>
        <ul className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article, i) => (
            <Reveal as="li" variant="zoom" key={article.slug} delay={i * 0.1}>
              <ArticleCard article={article} readLabel={dict.common.readArticle} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href={localizedPath(lang, routes.articles)} variant="secondary" size="lg">
            {dict.common.viewAllArticles}
            <ArrowRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { articles } from '@/data/articles';
import { localizedPath, routes } from '@/lib/routes';
import { toArticleCard } from '@/lib/localize';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

/** Latest reading on glass: one lead article large, the next ones as compact glass rows. */
export function ArticlesSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.articles;
  const [lead, ...rest] = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 4)
    .map((a) => toArticleCard(a, lang, dict));

  return (
    <section className="section-y bg-paper">
      <GlassStage tone="light" layout="c" />
      <div className="container-x">
        <Reveal>
          <SectionHeading
            align="split"
            title={copy.title}
            description={copy.description}
            action={
              <ButtonLink href={localizedPath(lang, routes.articles)} variant="outline">
                {dict.common.viewAllArticles}
              </ButtonLink>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {lead ? (
            <div className="lg:col-span-7">
              <GlassCard tone="light" maxTilt={6} contentClassName="p-3 pb-7 sm:p-4 sm:pb-8">
                <ArticleCard
                  article={lead}
                  readLabel={dict.common.readArticle}
                  className="[&_h3]:text-xl [&_h3]:leading-[1.6] sm:[&_h3]:text-2xl [&>div:last-child]:px-3"
                />
              </GlassCard>
            </div>
          ) : null}
          <ul className="grid content-start gap-5 lg:col-span-5">
            {rest.map((article, i) => (
              <li key={article.slug}>
                <GlassCard tone="light" gold={i === 0} maxTilt={7} delay={0.08 + i * 0.08} radius="rounded-[1.75rem]" contentClassName="px-5 sm:px-6">
                  <ArticleCard article={article} readLabel={dict.common.readArticle} layout="row" className="py-5" />
                </GlassCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import { CalendarCheck } from 'lucide-react';
import { resolveLocale, type LangParams } from '@/i18n/server';
import { getDictionary } from '@/dictionaries';
import { heroImages } from '@/data/media';
import { featuredArticle, gridArticles } from '@/data/articles';
import { departmentFilters } from '@/data/services';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';
import { articlesIndexSchema } from '@/lib/schema';
import { toArticleCard } from '@/lib/localize';
import { localizedPath, routes } from '@/lib/routes';
import { UnifiedHero } from '@/components/shared/UnifiedHero';
import { JsonLd } from '@/components/shared/JsonLd';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { FeaturedArticle } from '@/components/sections/articles/FeaturedArticle';
import { ArticlesExplorer } from '@/components/sections/articles/ArticlesExplorer';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { meta } = getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: routes.articles,
    title: meta.pages.articles.title,
    description: meta.pages.articles.description,
  });
}

export default async function ArticlesPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dict = getDictionary(lang);
  const hero = dict.hero.articles;
  const copy = dict.articles.grid;
  const page = dict.meta.pages.articles;
  const crumbs = buildBreadcrumbs(lang, dict, [{ label: dict.nav.articles, path: routes.articles }]);

  const featured = toArticleCard(featuredArticle, lang, dict);
  const grid = gridArticles.map((a) => toArticleCard(a, lang, dict));
  const categories = departmentFilters(lang);

  return (
    <>
      <UnifiedHero
        lang={lang}
        image={heroImages.articles}
        title={hero.title}
        accent={hero.accent}
        subtitle={hero.subtitle}
        breadcrumbs={crumbs.items}
        breadcrumbLabel={dict.common.breadcrumb}
        ctas={[
          {
            label: dict.common.bookConsultation,
            href: `${localizedPath(lang, routes.contact)}#booking`,
            icon: <CalendarCheck aria-hidden="true" className="size-5" />,
          },
          { label: dict.common.ourServices, href: localizedPath(lang, routes.services) },
        ]}
      />

      <FeaturedArticle article={featured} label={dict.articles.featured.label} readLabel={dict.common.readArticle} />

      <section className="section-y bg-white">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="split" title={copy.title} description={copy.description} />
          </Reveal>
          <Reveal className="mt-10" delay={0.08}>
            <ArticlesExplorer
              articles={grid}
              categories={categories}
              labels={{ all: copy.all, filter: copy.filterLabel, empty: copy.empty, read: dict.common.readArticle }}
            />
          </Reveal>
        </div>
      </section>

      <PageCtaBanner lang={lang} dict={dict} copy={dict.articles.cta} />
      <JsonLd data={articlesIndexSchema(lang, page.title, page.description, [featuredArticle, ...gridArticles])} />
      <JsonLd data={crumbs.schema} />
    </>
  );
}

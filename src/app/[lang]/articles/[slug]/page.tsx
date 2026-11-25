import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BadgeCheck, CalendarCheck, CalendarDays, CircleAlert, Clock, Lightbulb } from 'lucide-react';
import { isLocale, localeMeta } from '@/i18n/config';
import { getDictionary, t } from '@/dictionaries';
import { heroImages, doctorPortrait } from '@/data/media';
import { articleCategories, articles, getArticle } from '@/data/articles';
import { doctor } from '@/data/doctor';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbs } from '@/lib/breadcrumbs';
import { articleSchema } from '@/lib/schema';
import { toArticleCard } from '@/lib/localize';
import { articlePath, localizedPath, routes } from '@/lib/routes';
import { formatDate, whatsappUrl } from '@/lib/utils';
import { UnifiedHero } from '@/components/shared/UnifiedHero';
import { JsonLd } from '@/components/shared/JsonLd';
import { Reveal } from '@/components/shared/Reveal';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { WhatsAppIcon } from '@/components/shared/BrandIcons';
import { GoldCheck } from '@/components/shared/GoldCheck';
import { headingClass } from '@/components/shared/SectionHeading';
import { PageCtaBanner } from '@/components/sections/shared/PageCtaBanner';

type ArticleParams = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

async function resolve(params: ArticleParams['params']) {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(lang) || !article) notFound();
  return { lang, article };
}

export async function generateMetadata({ params }: ArticleParams): Promise<Metadata> {
  const { lang, article } = await resolve(params);
  const dict = getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: articlePath(article.slug),
    title: article.title[lang],
    description: article.excerpt[lang],
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    image: {
      src: article.image,
      width: 1280,
      height: 800,
      alt: t(dict.articles.detail.coverAlt, { title: article.title[lang] }),
    },
  });
}

export default async function ArticlePage({ params }: ArticleParams) {
  const { lang, article } = await resolve(params);
  const dict = getDictionary(lang);
  const copy = dict.articles.detail;
  const intl = localeMeta[lang].intl;
  const title = article.title[lang];
  const crumbs = buildBreadcrumbs(lang, dict, [
    { label: dict.nav.articles, path: routes.articles },
    { label: title, path: articlePath(article.slug) },
  ]);

  const related = [
    ...articles.filter((a) => a.slug !== article.slug && a.category === article.category),
    ...articles.filter((a) => a.slug !== article.slug && a.category !== article.category),
  ]
    .slice(0, 3)
    .map((a) => toArticleCard(a, lang, dict));

  return (
    <>
      <UnifiedHero
        lang={lang}
        image={heroImages.articles}
        title={title}
        subtitle={article.excerpt[lang]}
        breadcrumbs={crumbs.items}
        breadcrumbLabel={dict.common.breadcrumb}
        compact
        ctas={[
          {
            label: dict.common.bookConsultation,
            href: `${localizedPath(lang, routes.contact)}#booking`,
            icon: <CalendarCheck aria-hidden="true" className="size-5" />,
          },
          { label: copy.backToArticles, href: localizedPath(lang, routes.articles) },
        ]}
      >
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
          <li className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-4 text-gold" />
            {t(dict.common.minRead, { n: article.readTime })}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="size-4 text-gold" />
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, intl)}</time>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <BadgeCheck aria-hidden="true" className="size-4 text-gold" />
            {copy.reviewedBy}
          </li>
        </ul>
      </UnifiedHero>

      <div className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8">
            <Reveal>
              <div className="aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-paper">
                <img
                  src={article.image}
                  alt={t(copy.coverAlt, { title })}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>

            <div className="mt-12 space-y-10">
              {article.body[lang].map((section, i) => (
                <Reveal key={section.heading} delay={i === 0 ? 0 : 0.04}>
                  <section>
                    <h2 className="flex items-baseline gap-3 text-2xl leading-[1.5] font-semibold text-ink sm:text-[1.7rem]">
                      <span aria-hidden="true" className="size-2.5 shrink-0 -translate-y-1 rounded-full bg-gold" />
                      {section.heading}
                    </h2>
                    <p className="mt-4 text-lg leading-[2.1] text-ink-700">{section.text}</p>
                  </section>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12">
              {/* Takeaways: a gold-tinted bubble, like a note handed over at the clinic */}
              <aside className="bubble bg-gold/15 p-7 sm:p-9">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-ink">
                  <span className="grid size-10 place-items-center rounded-full bg-gold text-ink">
                    <Lightbulb aria-hidden="true" className="size-5" />
                  </span>
                  {copy.takeaways}
                </h2>
                <ul className="mt-6 grid gap-3">
                  {article.takeaways[lang].map((point) => (
                    <li key={point} className="flex items-start gap-3 leading-loose text-ink-700">
                      <GoldCheck className="mt-1" />
                      {point}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>

            <p className="mt-8 flex items-start gap-3 border-t border-ink/10 pt-6 text-sm leading-loose text-ink-500">
              <CircleAlert aria-hidden="true" className="mt-1 size-5 shrink-0 text-ink-500" />
              {copy.disclaimer}
            </p>

            <p className="mt-6 text-xs text-ink-500">
              {copy.updated}: <time dateTime={article.updatedAt}>{formatDate(article.updatedAt, intl)}</time>
            </p>
          </article>

          <aside className="lg:col-span-4">
            {/* Author rail — dark panel with an arched portrait */}
            <div className="rounded-[1.75rem] bg-ink p-7 text-white lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <img
                  src={doctorPortrait.src}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="arch h-20 w-16 shrink-0 object-cover object-top [--arch-top:40%]"
                />
                <div>
                  <p className="font-display text-lg font-semibold">{doctor.name[lang]}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gold">{doctor.title[lang]}</p>
                </div>
              </div>
              <p className="mt-6 flex items-center gap-2 border-t border-white/15 pt-5 text-sm font-bold text-white/80">
                <BadgeCheck aria-hidden="true" className="size-4 text-gold" />
                {copy.reviewedBy}
              </p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href={`${localizedPath(lang, routes.contact)}#booking`} className="w-full" icon={<CalendarCheck />}>
                  {dict.common.bookConsultation}
                </ButtonLink>
                <ButtonLink
                  href={whatsappUrl(`${dict.common.askMessage}${title}`)}
                  external
                  variant="ghost-light"
                  className="w-full"
                  icon={<WhatsAppIcon />}
                >
                  {dict.common.whatsapp}
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section className="section-y bg-paper">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className={headingClass}>{copy.related}</h2>
            <ButtonLink href={localizedPath(lang, routes.articles)} variant="outline">
              {copy.backToArticles}
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {related.map((card, i) => (
              <Reveal as="li" variant="zoom" key={card.slug} delay={i * 0.08}>
                <ArticleCard article={card} readLabel={dict.common.readArticle} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <PageCtaBanner lang={lang} dict={dict} copy={dict.articles.cta} />
      <JsonLd data={articleSchema(article, lang)} />
      <JsonLd data={crumbs.schema} />
    </>
  );
}

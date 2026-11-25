import { localeMeta, type Locale } from '@/i18n/config';
import { t, type Dictionary } from '@/dictionaries';
import { articleCategories } from '@/data/articles';
import { localizeVideo } from '@/data/videos';
import type { Article, Review, VideoItem } from '@/data/types';
import type { ArticleCardData } from '@/components/shared/ArticleCard';
import type { ReviewCardData } from '@/components/shared/ReviewCard';
import type { FacadeVideo } from '@/components/shared/VideoFacade';
import { articlePath, localizedPath } from './routes';
import { formatDate } from './utils';

/** Server-side projection of bilingual data into lean, single-locale props for client components. */

export function toArticleCard(article: Article, lang: Locale, dict: Dictionary): ArticleCardData {
  return {
    slug: article.slug,
    href: localizedPath(lang, articlePath(article.slug)),
    image: article.image,
    imageAlt: t(dict.articles.detail.coverAlt, { title: article.title[lang] }),
    category: articleCategories[article.category][lang],
    categoryKey: article.category,
    title: article.title[lang],
    excerpt: article.excerpt[lang],
    readTimeLabel: t(dict.common.minRead, { n: article.readTime }),
    dateLabel: formatDate(article.publishedAt, localeMeta[lang].intl),
    dateIso: article.publishedAt,
  };
}

export function toReviewCard(review: Review, lang: Locale): ReviewCardData {
  return {
    id: review.id,
    name: review.name[lang],
    procedure: review.procedure[lang],
    rating: review.rating,
    text: review.text[lang],
  };
}

export function toFacadeVideo(video: VideoItem, lang: Locale): FacadeVideo {
  return localizeVideo(video, lang);
}

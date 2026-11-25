import type { Locale } from '@/i18n/config';
import type { VideoItem } from './types';

/**
 * Video library.
 * Add the YouTube (or YouTube Shorts) ID to `youtubeId` for each video. The facade loads
 * the embed only after a click, so videos have zero impact on initial page load.
 * Videos without an ID link out to the social channel configured in `config/site.ts`.
 */
export const introVideo: VideoItem = {
  id: 'intro',
  youtubeId: '',
  thumbnail: '/images/videos/intro.webp',
  duration: '2:45',
  title: { ar: 'تعرّف على د. محمد عاطف الكردي', en: 'Meet Dr. Mohamed Atef ElKordy' },
  topic: { ar: 'فيديو تعريفي', en: 'Introduction' },
};

export const promoVideo: VideoItem = {
  id: 'promo',
  youtubeId: '',
  thumbnail: '/images/videos/promo.webp',
  duration: '3:30',
  title: {
    ar: 'رحلة مريض الأورام: من التشخيص إلى التعافي',
    en: 'A cancer patient’s journey: from diagnosis to recovery',
  },
  topic: { ar: 'فيلم تعريفي', en: 'Feature film' },
};

export const shortVideos: VideoItem[] = [
  {
    id: 'v1',
    youtubeId: '',
    thumbnail: '/images/videos/short-1.webp',
    duration: '0:58',
    title: { ar: 'هل كل كتلة في الثدي سرطان؟', en: 'Is every breast lump cancer?' },
    topic: { ar: 'أورام الثدي', en: 'Breast' },
  },
  {
    id: 'v2',
    youtubeId: '',
    thumbnail: '/images/videos/short-2.webp',
    duration: '1:12',
    title: { ar: 'جراحة الأورام بالمنظار: متى تكون مناسبة؟', en: 'Laparoscopic cancer surgery: when is it suitable?' },
    topic: { ar: 'المناظير', en: 'Laparoscopy' },
  },
  {
    id: 'v3',
    youtubeId: '',
    thumbnail: '/images/videos/short-3.webp',
    duration: '0:47',
    title: { ar: '5 علامات تستدعي فحص القولون', en: '5 signs you need a colon check' },
    topic: { ar: 'القولون', en: 'Colorectal' },
  },
  {
    id: 'v4',
    youtubeId: '',
    thumbnail: '/images/videos/short-4.webp',
    duration: '1:05',
    title: { ar: 'أول أسبوع بعد جراحة الأورام', en: 'Your first week after cancer surgery' },
    topic: { ar: 'التعافي', en: 'Recovery' },
  },
  {
    id: 'v5',
    youtubeId: '',
    thumbnail: '/images/videos/short-5.webp',
    duration: '0:52',
    title: { ar: 'علاج البواسير بالليزر: ماذا تتوقع؟', en: 'Laser haemorrhoid treatment: what to expect' },
    topic: { ar: 'الشرج والمستقيم', en: 'Anorectal' },
  },
  {
    id: 'v6',
    youtubeId: '',
    thumbnail: '/images/videos/short-6.webp',
    duration: '1:20',
    title: { ar: 'لماذا العلاج الكيميائي قبل الجراحة أحيانًا؟', en: 'Why chemotherapy sometimes comes before surgery' },
    topic: { ar: 'خطة العلاج', en: 'Treatment plan' },
  },
  {
    id: 'v7',
    youtubeId: '',
    thumbnail: '/images/videos/short-7.webp',
    duration: '0:44',
    title: { ar: 'كيف تدعم مريض الأورام نفسيًا؟', en: 'How to support a cancer patient emotionally' },
    topic: { ar: 'نصائح', en: 'Tips' },
  },
  {
    id: 'v8',
    youtubeId: '',
    thumbnail: '/images/videos/short-8.webp',
    duration: '0:55',
    title: { ar: 'أعراض أورام المعدة المبكرة', en: 'Early signs of stomach cancer' },
    topic: { ar: 'أورام المعدة', en: 'Gastric' },
  },
  {
    id: 'v9',
    youtubeId: '',
    thumbnail: '/images/videos/short-9.webp',
    duration: '1:08',
    title: { ar: 'التغذية الصحيحة بعد جراحات الأورام', en: 'Eating well after cancer surgery' },
    topic: { ar: 'التعافي', en: 'Recovery' },
  },
];

export function localizeVideo(video: VideoItem, lang: Locale) {
  return {
    id: video.id,
    youtubeId: video.youtubeId,
    thumbnail: video.thumbnail,
    duration: video.duration,
    title: video.title[lang],
    topic: video.topic[lang],
  };
}

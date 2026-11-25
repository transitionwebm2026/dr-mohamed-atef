import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'د. محمد عاطف الكردي — Dr. Mohamed Atef ElKordy',
    short_name: 'د. محمد عاطف الكردي',
    description: 'استشاري جراحة أمراض القولون والمستقيم والشرج — Colon & Rectal Surgery Consultant',
    start_url: '/ar/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: siteConfig.themeColor,
    lang: 'ar',
    dir: 'rtl',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}

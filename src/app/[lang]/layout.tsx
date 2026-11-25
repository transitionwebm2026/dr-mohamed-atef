import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Almarai } from 'next/font/google';
import { notFound } from 'next/navigation';
import { isLocale, localeMeta, locales } from '@/i18n/config';
import { getDictionary } from '@/dictionaries';
import { siteConfig } from '@/config/site';
import { siteSchema } from '@/lib/schema';
import { MotionProvider } from '@/components/shared/MotionProvider';
import { Navbar, type NavbarLabels } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { FloatingActions } from '@/components/shared/FloatingActions';
import { JsonLd } from '@/components/shared/JsonLd';
import { SpotlightTracker } from '@/components/shared/SpotlightTracker';
import '../globals.css';

const almarai = Almarai({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '700', '800'],
  display: 'swap',
  variable: '--font-almarai',
  // Don't preload all 8 weight/subset files at high priority — that would compete with the
  // LCP hero image. The render-blocking CSS discovers them early and only used faces download.
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.siteTitle, template: `%s | ${dict.meta.siteName}` },
    description: dict.meta.siteDescription,
    applicationName: dict.meta.siteName,
    keywords: dict.meta.keywords,
    authors: [{ name: dict.meta.siteName, url: siteConfig.url }],
    creator: dict.meta.siteName,
    publisher: dict.meta.siteName,
    category: 'health',
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteConfig.themeColor,
  colorScheme: 'light',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const navLabels: NavbarLabels = {
    links: {
      home: dict.nav.home,
      about: dict.nav.about,
      services: dict.nav.services,
      reviews: dict.nav.reviews,
      videos: dict.nav.videos,
      articles: dict.nav.articles,
      contact: dict.nav.contact,
    },
    book: dict.nav.book,
    mainNav: dict.nav.mainNav,
    openMenu: dict.nav.openMenu,
    closeMenu: dict.nav.closeMenu,
    switchLanguage: dict.nav.switchLanguage,
    logoName: dict.meta.siteName,
    logoTagline: dict.nav.logoTagline,
  };

  return (
    <html lang={lang} dir={localeMeta[lang].dir} className={almarai.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-bold focus:text-ink"
        >
          {dict.common.skipToContent}
        </a>
        <MotionProvider>
          <Navbar lang={lang} labels={navLabels} />
          <main id="main">{children}</main>
          <Footer lang={lang} dict={dict} />
        </MotionProvider>
        <FloatingActions
          whatsappLabel={dict.floating.whatsapp}
          callLabel={dict.floating.call}
          greeting={dict.floating.whatsappGreeting}
        />
        <SpotlightTracker />
        <JsonLd data={siteSchema(lang)} />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { defaultLocale } from '@/i18n/config';
import { languageAlternates, localizedPath } from '@/lib/routes';

const target = localizedPath(defaultLocale, '/');

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'د. محمد عاطف | Dr. Mohamed Atef',
  robots: { index: false, follow: true },
  alternates: { canonical: target, languages: languageAlternates('/') },
};

/**
 * Static hosts can't run middleware, so "/" redirects client-side (meta refresh + JS).
 * public/.htaccess also performs a server-side 301 on Apache/LiteSpeed (Hostinger).
 */
export default function RootRedirectPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(target)} + location.search + location.hash);`,
        }}
      />
      <p style={{ fontFamily: 'system-ui, sans-serif', padding: '3rem 1rem', textAlign: 'center' }}>
        <a href={localizedPath('ar', '/')}>العربية</a> · <a href={localizedPath('en', '/')}>English</a>
      </p>
    </>
  );
}

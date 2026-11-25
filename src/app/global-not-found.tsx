import type { Metadata } from 'next';
import { Almarai } from 'next/font/google';
import { ar } from '@/dictionaries/ar';
import { en } from '@/dictionaries/en';
import { LogoMark } from '@/components/shared/Logo';
import './globals.css';

const almarai = Almarai({
  subsets: ['arabic', 'latin'],
  weight: ['400', '800'],
  display: 'swap',
  variable: '--font-almarai',
  preload: false,
});

export const metadata: Metadata = {
  title: `404 — ${ar.notFound.title} | ${en.notFound.title}`,
  description: en.notFound.description,
};

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={almarai.variable}>
      <body>
        <main className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-ink px-4 py-16 text-center text-white">
          <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
          <div aria-hidden="true" className="absolute -top-40 left-1/2 -z-10 size-[34rem] -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
          <div className="max-w-xl">
            <LogoMark className="mx-auto h-24 w-auto" />
            <p className="mt-8 text-8xl font-extrabold text-gold" dir="ltr">
              404
            </p>
            <h1 className="mt-4 text-3xl font-extrabold">{ar.notFound.title}</h1>
            <p className="mt-3 leading-loose text-white/70">{ar.notFound.description}</p>
            <p lang="en" dir="ltr" className="mt-6 text-lg font-bold text-white/90">
              {en.notFound.title}
            </p>
            <p lang="en" dir="ltr" className="mt-1 text-white/60">
              {en.notFound.description}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="/ar/" className="inline-flex h-12 items-center rounded-full bg-gold px-7 font-bold text-ink">
                {ar.notFound.home}
              </a>
              <a
                href="/en/"
                lang="en"
                className="inline-flex h-12 items-center rounded-full border border-white/30 px-7 font-bold text-white hover:bg-white/10"
              >
                {en.notFound.home}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

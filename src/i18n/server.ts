import { notFound } from 'next/navigation';
import { isLocale, type Locale } from './config';

export type LangParams = { params: Promise<{ lang: string }> };

/** Resolve and validate the `[lang]` route param (404 for unsupported locales). */
export async function resolveLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

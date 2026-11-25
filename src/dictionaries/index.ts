import type { Locale } from '@/i18n/config';
import { ar, type Dictionary } from './ar';
import { en } from './en';

const dictionaries: Record<Locale, Dictionary> = { ar, en };

/** Dictionaries are only imported by Server Components; client components receive slices as props. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Replace `{key}` placeholders: t('{n} min read', { n: 5 }) → '5 min read'. */
export function t(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}

export type { Dictionary };

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { otherLocale, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  lang: Locale;
  /** Same page in the other language. */
  href: string;
  /** Accessible label for the switch action ("Switch to English" / "التبديل إلى العربية"). */
  label: string;
  /** Navbar is in its solid (scrolled / menu open) state. */
  solid: boolean;
}

/** Physical order is fixed (EN left · عربي right) so the thumb always slides the same way. */
const options: { locale: Locale; text: string }[] = [
  { locale: 'en', text: 'EN' },
  { locale: 'ar', text: 'عربي' },
];

/**
 * Two-sided language toggle with a sliding gold thumb. The thumb moves immediately on
 * click (optimistic) while the same page loads in the other language.
 */
export function LanguageToggle({ lang, href, label, solid }: LanguageToggleProps) {
  const [shown, setShown] = useState<Locale>(lang);

  useEffect(() => {
    setShown(lang);
  }, [lang]);

  return (
    <div
      dir="ltr"
      role="group"
      aria-label="Language / اللغة"
      className={cn(
        'relative grid h-10 grid-cols-2 items-center rounded-full border p-1 text-sm font-bold transition-colors duration-300',
        solid ? 'border-silver bg-white/70' : 'border-white/30 bg-white/10 backdrop-blur-md',
      )}
    >
      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-gold shadow-gold transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          shown === 'ar' ? 'translate-x-full' : 'translate-x-0',
        )}
      />
      {options.map((option) => {
        const active = option.locale === lang;
        const itemClass = cn(
          'relative z-10 grid h-8 w-12 place-items-center rounded-full transition-colors duration-300',
          option.locale === shown ? 'text-ink' : solid ? 'text-ink-500 hover:text-ink' : 'text-white/80 hover:text-white',
        );
        return active ? (
          <span key={option.locale} lang={option.locale} aria-current="true" className={itemClass}>
            {option.text}
          </span>
        ) : (
          <Link
            key={option.locale}
            href={href}
            hrefLang={option.locale}
            lang={option.locale}
            aria-label={label}
            onClick={() => setShown(otherLocale(lang))}
            className={itemClass}
          >
            {option.text}
          </Link>
        );
      })}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { CalendarCheck, Menu, Phone, X } from 'lucide-react';
import { otherLocale, type Locale } from '@/i18n/config';
import { localizedPath, navOrder, routes, switchLocaleInPath, type RouteKey } from '@/lib/routes';
import { cn, telUrl } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';

export interface NavbarLabels {
  links: Record<RouteKey, string>;
  book: string;
  mainNav: string;
  openMenu: string;
  closeMenu: string;
  switchLanguage: string;
  logoName: string;
  logoTagline: string;
}

const strip = (p: string) => p.replace(/\/+$/, '') || '/';

export function Navbar({ lang, labels }: { lang: Locale; labels: NavbarLabels }) {
  const pathname = usePathname() ?? `/${lang}/`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change and on Escape
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const current = strip(pathname);
  const isActive = (key: RouteKey) => {
    const href = strip(localizedPath(lang, routes[key]));
    return key === 'home' ? current === href : current === href || current.startsWith(`${href}/`);
  };

  const solid = scrolled || open;
  const target = otherLocale(lang);
  const switchHref = switchLocaleInPath(pathname, target);
  const bookHref = `${localizedPath(lang, routes.contact)}#booking`;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,color] duration-500',
        solid
          ? 'border-silver/60 bg-white/85 text-ink shadow-[0_10px_30px_-18px_rgb(38_38_36/0.3)] backdrop-blur-xl'
          : 'border-white/10 bg-ink/10 text-white backdrop-blur-md',
      )}
    >
      <nav aria-label={labels.mainNav} className="container-x flex h-20 items-center justify-between gap-4">
        <Link href={localizedPath(lang, routes.home)} className="shrink-0 rounded-xl" aria-label={labels.logoName}>
          <Logo
            name={labels.logoName}
            tagline={labels.logoTagline}
            taglineClassName={solid ? 'text-ink-500' : 'text-white/75'}
          />
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {navOrder.map((key) => {
            const active = isActive(key);
            return (
              <li key={key}>
                <Link
                  href={localizedPath(lang, routes[key])}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-bold transition-colors duration-300',
                    'after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-gold after:transition-transform after:duration-300',
                    active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                    solid ? (active ? 'text-ink' : 'text-ink-700 hover:text-ink') : active ? 'text-white' : 'text-white/80 hover:text-white',
                  )}
                >
                  {labels.links[key]}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageToggle lang={lang} href={switchHref} label={labels.switchLanguage} solid={solid} />

          <Link
            href={bookHref}
            className="hidden h-10 btn-shine items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-ink shadow-gold transition duration-300 hover:-translate-y-0.5 hover:bg-gold-300 sm:inline-flex"
          >
            <CalendarCheck aria-hidden="true" className="size-4" />
            {labels.book}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className={cn(
              'grid size-10 place-items-center rounded-full border transition-colors xl:hidden',
              solid ? 'border-silver text-ink' : 'border-white/30 text-white',
            )}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-silver/50 bg-white/95 backdrop-blur-xl xl:hidden"
          >
            <ul className="container-x grid gap-1 py-4">
              {navOrder.map((key) => {
                const active = isActive(key);
                return (
                  <li key={key}>
                    <Link
                      href={localizedPath(lang, routes[key])}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold transition-colors',
                        active ? 'bg-gold/15 text-ink' : 'text-ink-700 hover:bg-paper',
                      )}
                    >
                      {labels.links[key]}
                      {active ? <span aria-hidden="true" className="size-2 rounded-full bg-gold" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="container-x grid gap-3 pb-6 sm:grid-cols-2">
              <Link
                href={bookHref}
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold font-bold text-ink"
              >
                <CalendarCheck aria-hidden="true" className="size-4" />
                {labels.book}
              </Link>
              <a
                href={telUrl()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-silver font-bold text-ink"
              >
                <Phone aria-hidden="true" className="size-4" />
                <span dir="ltr">{siteConfig.phone.display}</span>
              </a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

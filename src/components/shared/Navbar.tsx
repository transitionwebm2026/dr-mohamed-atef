'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useScroll } from 'framer-motion';
import { CalendarCheck, Phone } from 'lucide-react';
import { otherLocale, type Locale } from '@/i18n/config';
import { activeSocials, siteConfig, type SocialNetwork } from '@/config/site';
import { localizedPath, navOrder, routes, switchLocaleInPath, type RouteKey } from '@/lib/routes';
import { cn, telUrl, whatsappUrl } from '@/lib/utils';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { SocialLinks } from './SocialLinks';
import { WhatsAppIcon } from './BrandIcons';

export interface NavbarLabels {
  links: Record<RouteKey, string>;
  book: string;
  mainNav: string;
  openMenu: string;
  closeMenu: string;
  switchLanguage: string;
  logoName: string;
  logoTagline: string;
  menu: string;
  close: string;
  callUs: string;
  whatsapp: string;
  whatsappGreeting: string;
  social: Record<SocialNetwork, string>;
}

/** Imagery previewed in the menu while a destination is hovered / focused. */
const previews: Record<RouteKey, string> = {
  home: '/images/doctor/portrait.webp',
  about: '/images/videos/intro.webp',
  services: '/images/services/colorectal-oncology.webp',
  reviews: '/images/articles/colon-cancer-early-signs.webp',
  videos: '/images/videos/short-2.webp',
  articles: '/images/articles/breast-cancer-surgery-guide.webp',
  contact: '/images/videos/promo.webp',
};

const EASE = [0.76, 0, 0.24, 1] as const;
const strip = (p: string) => p.replace(/\/+$/, '') || '/';

/**
 * Navigation without a link bar: two floating islands (logo · actions) and a menu button whose
 * gold ring fills with the page's scroll progress. The menu is a full-screen ink layer that
 * opens as a circle from the button, with the pages set large and an arched preview image.
 */
export function Navbar({ lang, labels }: { lang: Locale; labels: NavbarLabels }) {
  const pathname = usePathname() ?? `/${lang}/`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<RouteKey | null>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0, r: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
    setHovered(null);
  }, [pathname]);

  // While open: Escape closes, the page behind is inert + not scrollable, previews are warmed up
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    const behind = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    behind.forEach((el) => (el.inert = true));
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    Object.values(previews).forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 450);
    return () => {
      window.removeEventListener('keydown', onKey);
      behind.forEach((el) => (el.inert = false));
      root.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, close]);

  const toggle = () => {
    if (open) return close();
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 2;
    setOrigin({ x, y, r });
    setOpen(true);
  };

  const current = strip(pathname);
  const isActive = (key: RouteKey) => {
    const href = strip(localizedPath(lang, routes[key]));
    return key === 'home' ? current === href : current === href || current.startsWith(`${href}/`);
  };
  const activeKey = navOrder.find(isActive) ?? 'home';
  const previewKey = hovered ?? activeKey;

  const switchHref = switchLocaleInPath(pathname, otherLocale(lang));
  const bookHref = `${localizedPath(lang, routes.contact)}#booking`;

  // Island surfaces: clear over the hero, frosted once scrolled, clear again over the open menu
  const island = cn(
    'pointer-events-auto rounded-full transition-[background-color,box-shadow,color] duration-500',
    open
      ? 'text-white'
      : scrolled
        ? 'bg-white/85 text-ink shadow-float ring-1 ring-silver/60 backdrop-blur-xl'
        : 'text-white',
  );
  const onDark = open || !scrolled;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="container-x flex items-start justify-between gap-3 pt-3 sm:pt-4">
          {/* Logo island */}
          <Link
            href={localizedPath(lang, routes.home)}
            aria-label={labels.logoName}
            className={cn(island, 'flex min-w-0 items-center py-1.5 ps-1.5 pe-4 sm:pe-5')}
          >
            <Logo name={labels.logoName} tagline={labels.logoTagline} taglineClassName={onDark ? 'text-white/70' : 'text-ink-500'} />
          </Link>

          {/* Actions island */}
          <div className={cn(island, 'flex shrink-0 items-center gap-1.5 p-1.5')}>
            <div className="hidden md:block">
              <LanguageToggle lang={lang} href={switchHref} label={labels.switchLanguage} solid={!onDark} />
            </div>
            <Link
              href={bookHref}
              className={cn(
                'group/btn h-11 items-center gap-2.5 rounded-full bg-gold ps-4 pe-1.5 text-sm font-bold whitespace-nowrap text-ink transition duration-300 hover:bg-gold-300',
                open ? 'hidden' : 'hidden sm:inline-flex',
              )}
            >
              {labels.book}
              <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-ink text-gold transition-transform duration-500 group-hover/btn:-rotate-12">
                <CalendarCheck className="size-4" />
              </span>
            </Link>

            <button
              ref={buttonRef}
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? labels.closeMenu : labels.openMenu}
              className={cn(
                'group flex h-11 items-center gap-3 rounded-full ps-1 text-sm font-bold transition-colors duration-300 sm:ps-4',
                onDark ? 'text-white' : 'text-ink',
              )}
            >
              <span className="relative hidden h-5 overflow-hidden sm:block">
                <span className={cn('block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]', open && '-translate-y-1/2')}>
                  <span className="block h-5 leading-5">{labels.menu}</span>
                  <span className="block h-5 leading-5">{labels.close}</span>
                </span>
              </span>
              {/* Knob: ring = scroll progress, two lines morph into a cross */}
              <span className={cn('relative grid size-11 place-items-center rounded-full transition-colors duration-500', open ? 'bg-gold text-ink' : 'bg-ink text-white')}>
                <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="absolute -inset-1 size-[calc(100%+0.5rem)] -rotate-90">
                  <circle cx="24" cy="24" r="22.5" strokeWidth="1.5" className={onDark ? 'stroke-white/25' : 'stroke-ink/15'} />
                  <m.circle cx="24" cy="24" r="22.5" strokeWidth="2.5" strokeLinecap="round" className="stroke-gold" style={{ pathLength: scrollYProgress }} />
                </svg>
                <span aria-hidden="true" className="relative block h-2.5 w-4">
                  <span
                    className={cn(
                      'absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]',
                      open && 'translate-y-[4.25px] rotate-45',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute bottom-0 h-[1.5px] rounded-full bg-current transition-[transform,width] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ltr:right-0 rtl:left-0',
                      open ? 'w-full -translate-y-[4.25px] -rotate-45' : 'w-2.5 group-hover:w-full',
                    )}
                  />
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <m.div
            id="site-menu"
            key="site-menu"
            className="fixed inset-0 z-[45] overflow-y-auto overscroll-contain bg-ink text-white"
            initial={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
            animate={{ clipPath: `circle(${origin.r}px at ${origin.x}px ${origin.y}px)` }}
            exit={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            {/* Oversized hairline rings (logo motif) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 600"
              fill="none"
              className="pointer-events-none absolute -bottom-72 size-[46rem] max-w-none text-white/[0.05] ltr:-left-64 rtl:-right-64"
            >
              <circle cx="300" cy="300" r="296" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle cx="300" cy="300" r="220" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>

            <div className="container-x relative flex min-h-full flex-col pt-28 pb-8 sm:pt-32">
              <div className="grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <nav aria-label={labels.mainNav} className="lg:col-span-7">
                  <ul className="group/list" onMouseLeave={() => setHovered(null)}>
                    {navOrder.map((key, i) => {
                      const active = isActive(key);
                      return (
                        <m.li
                          key={key}
                          initial={{ y: 56, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 24, opacity: 0, transition: { duration: 0.2 } }}
                          transition={{ delay: 0.22 + i * 0.05, duration: 0.7, ease: EASE }}
                        >
                          <Link
                            ref={i === 0 ? firstLinkRef : undefined}
                            href={localizedPath(lang, routes[key])}
                            aria-current={active ? 'page' : undefined}
                            onMouseEnter={() => setHovered(key)}
                            onFocus={() => setHovered(key)}
                            onClick={() => {
                              if (active) close(false);
                            }}
                            className={cn(
                              'group flex w-fit items-center gap-4 py-1 font-display text-[2.15rem] leading-[1.35] font-semibold transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-5xl lg:text-[3.5rem]',
                              'group-hover/list:text-white/25 hover:text-white! focus-visible:text-white! ltr:hover:translate-x-2 rtl:hover:-translate-x-2',
                              active ? 'text-gold' : 'text-white',
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                'grid size-3 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors duration-300',
                                active ? 'border-gold bg-gold' : 'border-white/30 group-hover:border-gold',
                              )}
                            />
                            {labels.links[key]}
                          </Link>
                        </m.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Preview: arched image of the hovered / current page (lg+) */}
                <m.div
                  aria-hidden="true"
                  className="hidden lg:col-span-5 lg:block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
                >
                  <div className="arch relative ms-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-ink-800 [--arch-top:40%]">
                    <AnimatePresence initial={false}>
                      <m.img
                        key={previewKey}
                        src={previews[previewKey]}
                        alt=""
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 size-full object-cover"
                      />
                    </AnimatePresence>
                    <span className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-7 font-display text-2xl font-semibold">{labels.links[previewKey]}</span>
                  </div>
                </m.div>
              </div>

              {/* Direct contact */}
              <m.div
                className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <Link
                  href={bookHref}
                  className="inline-flex h-12 items-center gap-3 rounded-full bg-gold ps-5 pe-1.5 text-sm font-bold text-ink sm:hidden"
                >
                  {labels.book}
                  <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-ink text-gold">
                    <CalendarCheck className="size-4" />
                  </span>
                </Link>
                <a
                  href={telUrl()}
                  aria-label={`${labels.callUs}: ${siteConfig.phone.display}`}
                  className="inline-flex h-12 items-center gap-3 rounded-full ps-1.5 pe-5 text-sm font-bold ring-1 ring-white/20 ring-inset transition-colors hover:bg-white/10"
                >
                  <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-gold text-ink">
                    <Phone className="size-4" />
                  </span>
                  <span dir="ltr" className="whitespace-nowrap">{siteConfig.phone.display}</span>
                </a>
                <a
                  href={whatsappUrl(labels.whatsappGreeting)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-3 rounded-full ps-1.5 pe-5 text-sm font-bold ring-1 ring-white/20 ring-inset transition-colors hover:bg-white/10"
                >
                  <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-whatsapp text-ink">
                    <WhatsAppIcon className="size-4" />
                  </span>
                  {labels.whatsapp}
                </a>
                <div className="md:hidden">
                  <LanguageToggle lang={lang} href={switchHref} label={labels.switchLanguage} solid={false} />
                </div>
                {activeSocials.length > 0 ? <SocialLinks labels={labels.social} className="ms-auto" /> : null}
              </m.div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

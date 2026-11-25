import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { siteConfig } from '@/config/site';
import { clinics } from '@/data/clinics';
import { specialties } from '@/data/services';
import { localizedPath, navOrder, routes } from '@/lib/routes';
import { telUrl, whatsappUrl } from '@/lib/utils';
import { LogoFull } from './Logo';
import { CreditBadge } from './CreditBadge';
import { SocialLinks } from './SocialLinks';
import { WhatsAppIcon } from './BrandIcons';

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const headingClass = 'mb-4 text-sm font-bold text-gold ltr:tracking-[0.14em] ltr:uppercase';
  const linkClass = 'text-white/70 transition-colors hover:text-gold';

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" />
      <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-60" />

      <div className="container-x relative grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-14">
        <div className="lg:col-span-4">
          <Link href={localizedPath(lang, routes.home)} className="inline-block rounded-xl">
            <LogoFull alt={`${dict.meta.siteName} — ${dict.nav.logoTagline}`} className="w-40" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{dict.footer.tagline}</p>
          <SocialLinks labels={dict.common.social} className="mt-5" />
        </div>

        <nav aria-label={dict.footer.quickLinks} className="lg:col-span-2">
          <h2 className={headingClass}>{dict.footer.quickLinks}</h2>
          <ul className="grid gap-2.5 text-sm">
            {navOrder.map((key) => (
              <li key={key}>
                <Link href={localizedPath(lang, routes[key])} className={linkClass}>
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.footer.specialties} className="lg:col-span-3">
          <h2 className={headingClass}>{dict.footer.specialties}</h2>
          <ul className="grid gap-2.5 text-sm">
            {specialties.map((s) => (
              <li key={s.id}>
                <Link href={`${localizedPath(lang, routes.services)}#${s.id}`} className={linkClass}>
                  {s.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={headingClass}>{dict.footer.contact}</h2>
          <ul className="grid gap-3 text-sm">
            <li>
              <a href={telUrl()} className="flex items-center gap-3 text-white/80 transition-colors hover:text-gold">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-gold" />
                <span dir="ltr">{siteConfig.phone.display}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(dict.floating.whatsappGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-gold"
              >
                <WhatsAppIcon className="size-4 shrink-0 text-gold" />
                {dict.common.whatsapp}
              </a>
            </li>
            {siteConfig.email ? (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-white/80 transition-colors hover:text-gold">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-gold" />
                <span dir="ltr">{siteConfig.email}</span>
              </a>
              </li>
              ) : null}
            {clinics.map((c) => (
              <li key={c.id} className="flex gap-3 text-white/70">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  <span className="block font-bold text-white/90">{c.name[lang]}</span>
                  {c.address[lang]}
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-white/55">
                    <Clock aria-hidden="true" className="size-3.5" />
                    {c.hours[lang]}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Credit badge — centred above the divider line */}
      <div className="container-x relative flex justify-center pb-7">
        <CreditBadge label={dict.footer.credit} />
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-4 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {dict.meta.siteName}. {dict.footer.rights}.
          </p>
          <p className="max-w-xl">{dict.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

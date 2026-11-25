import Link from 'next/link';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import { ChevronLeft, Phone } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { HeroImage } from '@/data/types';
import { getDictionary } from '@/dictionaries';
import { siteConfig } from '@/config/site';
import { cn, telUrl } from '@/lib/utils';
import { ButtonLink, type ButtonVariant } from './ButtonLink';
import { SocialLinks } from './SocialLinks';

export interface HeroCta {
  label: string;
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  icon?: ReactNode;
}

interface UnifiedHeroProps {
  lang: Locale;
  image: HeroImage;
  title: string;
  accent?: string;
  subtitle: string;
  ctas?: HeroCta[];
  breadcrumbs?: { label: string; href?: string }[];
  breadcrumbLabel?: string;
  /** Extra content under the subtitle (e.g. article meta). */
  children?: ReactNode;
  /** Smaller headline for long titles (article pages). */
  compact?: boolean;
}

/**
 * Unified full-viewport hero shared by every page.
 * The doctor stays centred and unobstructed: on lg+ the copy is confined to 44% of the
 * container (always left of / right of the centre line) and the directional gradient fades
 * out before 50%. Below lg the copy sits at the bottom over a vertical gradient.
 */
export function UnifiedHero({
  lang,
  image,
  title,
  accent,
  subtitle,
  ctas = [],
  breadcrumbs,
  breadcrumbLabel,
  children,
  compact = false,
}: UnifiedHeroProps) {
  // Social icons + phone are anchored to the bottom corner of EVERY page hero
  const dict = getDictionary(lang);
  const anchor = {
    followLabel: dict.common.followUs,
    socialLabels: dict.common.social,
    callLabel: dict.common.callUs,
  };

  // Responsive preload of the LCP image — only the matching source is fetched.
  preload(image.mobile, { as: 'image', type: 'image/webp', fetchPriority: 'high', media: '(max-width: 767px)' });
  preload(image.desktop, { as: 'image', type: 'image/webp', fetchPriority: 'high', media: '(min-width: 768px)' });

  return (
    <section className="relative isolate flex min-h-[85svh] overflow-hidden bg-ink text-white lg:min-h-svh">
      <picture>
        <source media="(max-width: 767px)" srcSet={image.mobile} type="image/webp" width={828} height={1300} />
        <img
          src={image.desktop}
          alt={image.alt[lang]}
          width={2560}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          // lg+: nudge the (centred) subject ~5% away from the copy side so the face stays clear
          className="absolute inset-0 -z-20 size-full object-cover object-[50%_18%] md:object-[50%_22%] lg:ltr:object-[45%_22%] lg:rtl:object-[55%_22%]"
        />
      </picture>

      {/* Overall tonal veil keeps the clinical backdrop on-brand */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/25" />
      {/* Top fade for navbar legibility */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-44 bg-linear-to-b from-ink/75 to-transparent" />
      {/* < lg: bottom-up gradient behind the copy */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink from-5% via-ink/80 via-40% to-transparent to-75% lg:hidden"
      />
      {/* lg+: directional gradient on the text side only — fades out before the centre line */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden from-ink/95 from-0% via-ink/75 via-28% to-transparent to-49% lg:block ltr:bg-linear-to-r rtl:bg-linear-to-l"
      />
      {/* Gold hairline accent at the bottom edge */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/70 to-transparent" />

      <div
        className={cn(
          'container-x relative flex flex-col justify-end pt-32 lg:justify-center lg:pt-28',
          'pb-28 lg:pb-32',
        )}
      >
        {/* Copy column: hard-capped at 42% of the container on lg+ — never reaches the centre line */}
        <div className="max-w-xl lg:w-[42%] lg:max-w-none">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav aria-label={breadcrumbLabel} className="mb-6 animate-hero-in">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
                {breadcrumbs.map((crumb, i) => (
                  <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-gold">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="font-bold text-white">
                        {crumb.label}
                      </span>
                    )}
                    {i < breadcrumbs.length - 1 ? (
                      <ChevronLeft aria-hidden="true" className="size-4 text-gold ltr:rotate-180" />
                    ) : null}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <h1
            className={cn(
              'animate-hero-in font-bold text-balance [animation-delay:80ms] ltr:tracking-tight',
              compact
                ? 'text-[1.9rem] leading-[1.4] sm:text-4xl xl:text-[2.5rem]'
                : 'text-[2.5rem] leading-[1.25] sm:text-5xl xl:text-[3.4rem]',
            )}
          >
            <span className="block">{title}</span>
            {accent ? (
              <span className="mt-4 flex items-center gap-3 text-[0.42em] leading-snug font-semibold text-gold">
                <span aria-hidden="true" className="h-[1.5px] w-8 shrink-0 rounded-full bg-gold" />
                {accent}
              </span>
            ) : null}
          </h1>

          <p className="mt-6 max-w-lg animate-hero-in text-base leading-loose text-white/80 [animation-delay:160ms] sm:text-lg">
            {subtitle}
          </p>

          {children ? <div className="mt-6 animate-hero-in [animation-delay:200ms]">{children}</div> : null}

          {ctas.length > 0 ? (
            <div className="mt-9 flex animate-hero-in flex-wrap gap-3 [animation-delay:240ms] sm:gap-4">
              {ctas.map((cta, i) => (
                <ButtonLink
                  key={cta.href}
                  href={cta.href}
                  external={cta.external}
                  size="lg"
                  variant={cta.variant ?? (i === 0 ? 'primary' : 'ghost-light')}
                  icon={cta.icon}
                >
                  {cta.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {anchor ? (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-x flex animate-hero-in items-center gap-3 pb-7 [animation-delay:320ms] sm:gap-4">
            <span className="hidden text-xs font-bold text-white/70 md:inline">{anchor.followLabel}</span>
            <SocialLinks labels={anchor.socialLabels} variant="hero" />
            <span aria-hidden="true" className="hidden h-6 w-px bg-white/25 sm:block" />
            <a
              href={telUrl()}
              aria-label={`${anchor.callLabel}: ${siteConfig.phone.display}`}
              className="group inline-flex h-10 shrink-0 items-center gap-2.5 rounded-full bg-white/10 ps-1 pe-4 text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur-md transition-colors ring-inset hover:bg-white/20"
            >
              <span className="grid size-8 place-items-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-12">
                <Phone aria-hidden="true" className="size-4" />
              </span>
              <span dir="ltr" className="whitespace-nowrap">{siteConfig.phone.display}</span>
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}

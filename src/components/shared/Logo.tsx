import { cn } from '@/lib/utils';

/**
 * Brand assets cropped from public/images/DR Mohamed Atef LOGO1.png
 * (gold #ffb701 + silver #c6c6c4 colon mark).
 */
export const brandAssets = {
  mark: { src: '/images/brand/logo-mark.webp', width: 186, height: 192 },
  full: { src: '/images/brand/logo-full.webp', width: 640, height: 488 },
  wordmark: { src: '/images/brand/logo-wordmark.webp', width: 640, height: 111 },
} as const;

/** The circular colon mark from the doctor's logo. Decorative by default. */
export function LogoMark({ className, alt = '' }: { className?: string; alt?: string }) {
  const { src, width, height } = brandAssets.mark;
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      className={cn('object-contain', className)}
    />
  );
}

/** Full logo lockup (mark + DR.MOHAMED ATEF + titles) — used on dark surfaces such as the footer. */
export function LogoFull({ alt, className }: { alt: string; className?: string }) {
  const { src, width, height } = brandAssets.full;
  return <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className={cn('h-auto object-contain', className)} />;
}

interface LogoProps {
  name: string;
  tagline: string;
  className?: string;
  /** Tagline colour class (inherits text colour for the name). */
  taglineClassName?: string;
}

/** Navbar lockup: logo mark + live text (crisp at any size, translatable). */
export function Logo({ name, tagline, className, taglineClassName }: LogoProps) {
  return (
    <span className={cn('flex min-w-0 items-center gap-3', className)}>
      <LogoMark className="h-11 w-auto shrink-0 sm:h-12" />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-base font-extrabold sm:text-lg">{name}</span>
        <span className={cn('truncate text-[0.7rem] font-normal sm:text-xs', taglineClassName)}>{tagline}</span>
      </span>
    </span>
  );
}

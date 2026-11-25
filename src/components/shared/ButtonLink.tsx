import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost-light' | 'whatsapp';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: 'md' | 'lg';
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const buttonBase =
  'btn-shine group/btn inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold active:scale-[0.98]';

export const buttonSizes = {
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-[0.95rem]',
} as const;

export const buttonVariants: Record<ButtonVariant, string> = {
  // Primary brand colour #ffb701
  primary: 'bg-gold text-ink shadow-gold hover:-translate-y-0.5 hover:bg-gold-300',
  // Secondary brand colour #c6c6c4 — turns primary on hover
  secondary: 'bg-silver text-ink hover:-translate-y-0.5 hover:bg-gold hover:shadow-gold',
  dark: 'bg-ink text-white hover:-translate-y-0.5 hover:bg-ink-800',
  outline: 'border border-silver bg-white text-ink hover:border-gold hover:bg-gold/10',
  'ghost-light': 'border border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/15',
  whatsapp: 'bg-whatsapp text-ink hover:-translate-y-0.5 hover:brightness-95',
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(buttonBase, buttonSizes[size], buttonVariants[variant], className);
  const isProtocol = /^(tel:|mailto:)/.test(href);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  if (isProtocol) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

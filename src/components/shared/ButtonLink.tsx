import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost-light' | 'whatsapp';

interface ButtonLinkProps {
  href: string;
  /** The button label. */
  children: ReactNode;
  /** Icon shown in the round knob. Defaults to a direction-aware arrow; `false` hides the knob. */
  icon?: ReactNode | false;
  variant?: ButtonVariant;
  size?: 'md' | 'lg';
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const buttonBase =
  'group/btn inline-flex shrink-0 items-center justify-between gap-3 rounded-full font-bold whitespace-nowrap transition-[background-color,color,box-shadow,translate] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold active:translate-y-px';

export const buttonSizes = {
  md: { root: 'h-12 ps-5 pe-1.5 text-sm', bare: 'h-12 px-6 text-sm', knob: 'size-9' },
  lg: { root: 'h-14 ps-7 pe-2 text-[0.95rem]', bare: 'h-14 px-8 text-[0.95rem]', knob: 'size-10' },
} as const;

/** [surface, knob] per variant */
export const buttonVariants: Record<ButtonVariant, [string, string]> = {
  // Primary brand colour #ffb701 with a graphite knob
  primary: ['bg-gold text-ink hover:bg-gold-300 hover:shadow-gold', 'bg-ink text-gold'],
  // Secondary brand colour #c6c6c4 — warms to gold on hover
  secondary: ['bg-silver text-ink hover:bg-gold', 'bg-ink text-white'],
  dark: ['bg-ink text-white hover:bg-ink-800', 'bg-gold text-ink'],
  outline: ['bg-transparent text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink', 'bg-ink text-white'],
  'ghost-light': ['bg-white/5 text-white ring-1 ring-inset ring-white/35 backdrop-blur-sm hover:bg-white/15 hover:ring-white/70', 'bg-white text-ink'],
  whatsapp: ['bg-whatsapp text-ink hover:brightness-95', 'bg-ink text-white'],
};

/** Arrow that slides out and loops back in on hover (mirrored in RTL). */
export function KnobArrow({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('relative block size-4 overflow-hidden rtl:-scale-x-100', className)}>
      <ArrowRight className="absolute inset-0 size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-[160%]" />
      <ArrowRight className="absolute inset-0 size-4 -translate-x-[160%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0" />
    </span>
  );
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: 'md' | 'lg' = 'md', withKnob = true, className?: string) {
  return cn(buttonBase, withKnob ? buttonSizes[size].root : buttonSizes[size].bare, buttonVariants[variant][0], className);
}

export function ButtonKnob({ variant = 'primary', size = 'md', children }: { variant?: ButtonVariant; size?: 'md' | 'lg'; children?: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-105 [&>svg]:size-4',
        buttonSizes[size].knob,
        buttonVariants[variant][1],
      )}
    >
      {children ?? <KnobArrow />}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  icon,
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  ariaLabel,
}: ButtonLinkProps) {
  const withKnob = icon !== false;
  const classes = buttonClasses(variant, size, withKnob, className);
  const content = (
    <>
      <span>{children}</span>
      {withKnob ? (
        <ButtonKnob variant={variant} size={size}>
          {icon}
        </ButtonKnob>
      ) : null}
    </>
  );
  const isProtocol = /^(tel:|mailto:)/.test(href);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  if (isProtocol) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AccentBar } from './AccentBar';

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'start';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = 'center',
  tone = 'light',
  as: Heading = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <Heading
        id={id}
        className={cn(
          'text-3xl leading-[1.25] font-extrabold text-balance sm:text-4xl lg:text-[2.75rem]',
          dark ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </Heading>
      {/* Short primary-gold accent bar under every section title — draws in on scroll */}
      <AccentBar centered={align === 'center'} />
      {description ? (
        <p className={cn('mt-5 text-base leading-loose sm:text-lg', dark ? 'text-white/75' : 'text-ink-500')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  /**
   * - `center` stacked + centred
   * - `start`  stacked, aligned to the reading start
   * - `split`  title on the start side, description (+ action) on the end side (lg+)
   */
  align?: 'center' | 'start' | 'split';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  /** Link/button shown next to the description (split) or under it. */
  action?: ReactNode;
  className?: string;
}

export const headingClass = 'font-bold text-balance leading-[1.35] text-[1.85rem] sm:text-4xl lg:text-[2.85rem] ltr:tracking-tight';

export function SectionHeading({
  title,
  description,
  align = 'center',
  tone = 'light',
  as: Heading = 'h2',
  id,
  action,
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  const titleNode = (
    <Heading id={id} className={cn(headingClass, dark ? 'text-white' : 'text-ink')}>
      {title}
    </Heading>
  );
  const descClass = cn('text-base leading-loose sm:text-lg', dark ? 'text-white/70' : 'text-ink-500');

  if (align === 'split') {
    return (
      <div className={cn('grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12', className)}>
        <div className="lg:col-span-7">{titleNode}</div>
        {description || action ? (
          <div className="lg:col-span-5 lg:pb-2">
            {description ? <p className={descClass}>{description}</p> : null}
            {action ? <div className={description ? 'mt-6' : undefined}>{action}</div> : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {titleNode}
      {description ? <p className={cn('mt-5', descClass)}>{description}</p> : null}
      {action ? <div className={cn('mt-8', align === 'center' && 'flex justify-center')}>{action}</div> : null}
    </div>
  );
}

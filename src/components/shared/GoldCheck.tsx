import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Hairline gold ring with a check — used in highlight lists. */
export function GoldCheck({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-gold',
        tone === 'dark' ? 'text-gold' : 'text-gold-ink',
        className,
      )}
    >
      <Check className="size-3.5" strokeWidth={3} />
    </span>
  );
}

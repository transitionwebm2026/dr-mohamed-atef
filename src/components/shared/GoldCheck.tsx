import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Solid primary-gold check badge used in highlight lists. */
export function GoldCheck({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('grid size-6 shrink-0 place-items-center rounded-full bg-gold text-ink', className)}>
      <Check className="size-3.5" strokeWidth={3} />
    </span>
  );
}

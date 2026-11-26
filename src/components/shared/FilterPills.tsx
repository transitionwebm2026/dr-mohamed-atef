import { cn } from '@/lib/utils';

export interface FilterPill {
  key: string;
  label: string;
  count?: number;
}

interface FilterPillsProps {
  pills: FilterPill[];
  active: string;
  onSelect: (key: string) => void;
  /** Accessible name of the group, e.g. "Filter articles by department". */
  label: string;
  /** `md` page filters (scroll sideways on phones, centred from sm) · `sm` compact, wrapping, start-aligned. */
  size?: 'md' | 'sm';
  className?: string;
}

/** Toggle pills with a gold count knob — the department filter of articles, videos and services. */
export function FilterPills({ pills, active, onSelect, label, size = 'md', className }: FilterPillsProps) {
  const small = size === 'sm';

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        small
          ? 'flex flex-wrap gap-2'
          : 'no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0',
        className,
      )}
    >
      {pills.map((pill) => {
        const selected = pill.key === active;
        return (
          <button
            key={pill.key}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(pill.key)}
            className={cn(
              'inline-flex shrink-0 items-center rounded-full font-bold ring-1 transition duration-300 ring-inset',
              small ? 'h-10 gap-2 ps-4 pe-1.5 text-[0.8rem]' : 'h-11 gap-2.5 ps-5 pe-2 text-sm',
              pill.count === undefined && (small ? 'pe-4' : 'pe-5'),
              selected ? 'bg-ink text-white ring-ink' : 'bg-white/80 text-ink-700 ring-silver hover:ring-ink',
            )}
          >
            {pill.label}
            {pill.count !== undefined ? (
              <span
                className={cn(
                  'grid size-7 place-items-center rounded-full text-xs',
                  selected ? 'bg-gold text-ink' : 'bg-paper text-ink-700',
                )}
              >
                {pill.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

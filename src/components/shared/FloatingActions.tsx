import { Phone } from 'lucide-react';
import { cn, telUrl, whatsappUrl } from '@/lib/utils';
import { WhatsAppIcon } from './BrandIcons';

interface FloatingActionsProps {
  whatsappLabel: string;
  callLabel: string;
  greeting: string;
}

const tooltip =
  'pointer-events-none absolute end-full top-1/2 me-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100';

/** Persistent quick actions (WhatsApp + direct call) visible on every page. */
export function FloatingActions({ whatsappLabel, callLabel, greeting }: FloatingActionsProps) {
  return (
    <div className="fixed end-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-center gap-3 sm:end-6 sm:bottom-6">
      <a
        href={telUrl()}
        aria-label={callLabel}
        className={cn(
          'group relative grid size-13 place-items-center rounded-full border border-gold/40 bg-ink text-gold shadow-[0_12px_30px_-10px_rgb(38_38_36/0.55)] transition duration-300 hover:-translate-y-0.5 hover:bg-ink-800',
        )}
      >
        <Phone aria-hidden="true" className="size-5" />
        <span className={tooltip}>{callLabel}</span>
      </a>
      <a
        href={whatsappUrl(greeting)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsappLabel}
        className="group relative grid size-15 place-items-center rounded-full bg-whatsapp text-white shadow-[0_14px_32px_-10px_rgb(37_211_102/0.75)] transition duration-300 hover:-translate-y-0.5"
      >
        <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp" />
        <WhatsAppIcon className="relative size-7" />
        <span className={tooltip}>{whatsappLabel}</span>
      </a>
    </div>
  );
}

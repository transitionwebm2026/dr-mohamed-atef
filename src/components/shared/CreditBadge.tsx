import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

/**
 * "Design & development by Transition" pill shown centred at the very end of the footer.
 * Brand gradient: primary gold → graphite (mirrors with the reading direction).
 */
export function CreditBadge({ label }: { label: string }) {
  const { name, url, logo } = siteConfig.credit;

  const className = cn(
    'group inline-flex h-12 items-center gap-4 rounded-full px-7 shadow-[0_12px_30px_-14px_rgb(255_183_1/0.55)] ring-1 ring-white/10 transition duration-300',
    'from-gold from-0% via-gold-600/80 via-30% to-ink to-80% ltr:bg-linear-to-r rtl:bg-linear-to-l',
    url && 'hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgb(255_183_1/0.7)]',
  );

  const content = (
    <>
      <span className="text-sm font-extrabold text-ink">{label}</span>
      <img
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        loading="lazy"
        decoding="async"
        className="h-7 w-auto opacity-95 transition-transform duration-300 group-hover:scale-110"
      />
      <span lang="en" dir="ltr" className="text-sm font-extrabold tracking-wide text-white">
        {name}
      </span>
    </>
  );

  return url ? (
    <a href={url} target="_blank" rel="noopener" aria-label={`${label} ${name}`} className={className}>
      {content}
    </a>
  ) : (
    <span className={className}>{content}</span>
  );
}

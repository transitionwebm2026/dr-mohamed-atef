import { cn } from '@/lib/utils';

/** Gradients for the glossy rings — rendered once per page (in the locale layout). */
export function GlassDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
      <defs>
        <linearGradient id="glossy-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="0.45" stopColor="#ffb701" />
          <stop offset="1" stopColor="#b37e00" />
        </linearGradient>
        <linearGradient id="glossy-silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#c6c6c4" />
          <stop offset="1" stopColor="#6f6f6c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type Layout = 'a' | 'b' | 'c';

interface RingSpec {
  pos: string;
  size: string;
  tone: 'gold' | 'silver';
  width: number;
  float: string;
}

/*
 * Rings sit low and mostly in the side gutters (partly off-canvas), so they pass behind the
 * glass rather than behind headings and plain text, which sit at the top of each section.
 */
const layouts: Record<Layout, RingSpec[]> = {
  a: [
    { pos: 'top-[30%] -end-28', size: 'size-60 lg:size-80', tone: 'gold', width: 18, float: 'animate-[float-y_7s_ease-in-out_infinite_alternate]' },
    { pos: 'bottom-[4%] -start-32', size: 'size-56 lg:size-96', tone: 'silver', width: 14, float: 'animate-[float-y_9s_ease-in-out_infinite_alternate-reverse]' },
    { pos: 'bottom-[12%] end-[36%]', size: 'size-24 lg:size-32', tone: 'gold', width: 24, float: 'animate-[float-y_6s_ease-in-out_infinite_alternate]' },
  ],
  b: [
    { pos: 'top-[42%] -start-28', size: 'size-52 lg:size-80', tone: 'silver', width: 14, float: 'animate-[float-y_8s_ease-in-out_infinite_alternate]' },
    { pos: '-bottom-12 -end-24', size: 'size-60 lg:size-[24rem]', tone: 'gold', width: 16, float: 'animate-[float-y_10s_ease-in-out_infinite_alternate-reverse]' },
  ],
  c: [
    { pos: 'top-[45%] -end-32', size: 'size-60 lg:size-[26rem]', tone: 'gold', width: 16, float: 'animate-[float-y_9s_ease-in-out_infinite_alternate]' },
    { pos: '-bottom-20 -start-20', size: 'size-44 lg:size-64', tone: 'silver', width: 14, float: 'animate-[float-y_8s_ease-in-out_infinite_alternate-reverse]' },
  ],
};

interface GlassStageProps {
  tone?: 'light' | 'dark';
  layout?: Layout;
  /** Drift the light and float the rings (keep off for long runs of repeated sections). */
  animated?: boolean;
  className?: string;
}

/**
 * The lit backdrop that liquid glass needs: blurred gold / silver light and a few glossy
 * rings (the logo's circle). Place inside a `relative isolate overflow-clip` section.
 */
export function GlassStage({ tone = 'light', layout = 'a', animated = true, className }: GlassStageProps) {
  const dark = tone === 'dark';

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <span
        className={cn(
          'absolute top-[6%] -start-64 size-[44rem] rounded-full bg-gold/30 blur-[120px]',
          animated && 'animate-[blob-drift_24s_ease-in-out_infinite_alternate]',
        )}
      />
      <span
        className={cn(
          'absolute top-[38%] -end-48 size-[40rem] rounded-full blur-[120px]',
          dark ? 'bg-silver/25' : 'bg-silver/60',
          animated && 'animate-[blob-drift_30s_ease-in-out_infinite_alternate-reverse]',
        )}
      />
      <span
        className={cn(
          'absolute bottom-[2%] start-[30%] size-[30rem] rounded-full blur-[110px]',
          dark ? 'bg-gold/25' : 'bg-gold/20',
          animated && 'animate-[blob-drift_27s_ease-in-out_infinite_alternate]',
        )}
      />

      {layouts[layout].map((ring, i) => (
        <div key={i} className={cn('absolute', ring.pos, animated && ring.float)}>
          <svg viewBox="0 0 200 200" fill="none" className={ring.size}>
            <circle cx="100" cy="100" r="80" stroke={`url(#glossy-${ring.tone})`} strokeWidth={ring.width} />
            <circle cx="100" cy="100" r={80 + ring.width / 2 + 4} stroke="white" strokeOpacity={dark ? 0.3 : 0.8} strokeWidth="1.25" />
          </svg>
        </div>
      ))}
    </div>
  );
}

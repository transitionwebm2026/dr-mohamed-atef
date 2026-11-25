import type { Dictionary } from '@/dictionaries';
import { doctorPortrait } from '@/data/media';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { LogoMark } from '@/components/shared/Logo';

export function DoctorWord({ dict }: { dict: Dictionary }) {
  const copy = dict.about.word;

  return (
    <section className="section-y bg-white">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Arched portrait — first in DOM = right side in RTL */}
        <Reveal variant="swing" className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          {/* Offset hairline arch echoing the frame */}
          <div aria-hidden="true" className="arch absolute inset-0 translate-x-4 -translate-y-4 border border-gold/70 [--arch-top:40%] rtl:-translate-x-4" />
          <div className="arch relative aspect-[4/5] overflow-hidden bg-paper [--arch-top:40%]">
            <img
              src={doctorPortrait.src}
              alt={copy.portraitAlt}
              width={doctorPortrait.width}
              height={doctorPortrait.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
          <div className="absolute -bottom-7 flex items-center gap-3 rounded-full bg-ink py-2 ps-2 pe-6 text-white ltr:left-1/2 ltr:-translate-x-1/2 rtl:right-1/2 rtl:translate-x-1/2">
            <span className="grid size-12 place-items-center rounded-full bg-white">
              <LogoMark className="size-8" />
            </span>
            <span className="whitespace-nowrap">
              <span className="block text-sm font-bold">{copy.signatureName}</span>
              <span className="block text-xs text-white/65">{copy.signatureTitle}</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-7">
          <SectionHeading align="start" title={copy.title} className="max-w-none" />
          <div className="mt-8 space-y-6 text-lg leading-loose text-ink-700">
            {copy.paragraphs.map((p, i) => (
              <p
                key={p.slice(0, 24)}
                // The opening paragraph is set larger — the doctor's own voice leads
                className={i === 0 ? 'font-display text-xl leading-[1.9] font-medium text-ink sm:text-[1.4rem]' : undefined}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-5 border-t border-ink/15 pt-8">
            <div>
              <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">{copy.signatureName}</p>
              <p className="mt-1 text-sm font-bold text-gold-ink">{copy.signatureTitle}</p>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 160 60"
              className="ms-auto hidden h-14 w-40 text-ink/60 sm:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 42c10-18 22-30 30-28 9 2-6 30 2 32 7 2 14-24 22-24 7 0-2 22 5 22 9 0 14-20 24-20 8 0 3 16 11 16 10 0 18-12 32-14 8-1 14 2 20 4" />
              <path d="M30 52c30-4 70-6 116-4" opacity="0.5" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

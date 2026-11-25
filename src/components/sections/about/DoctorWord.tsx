import { Quote } from 'lucide-react';
import type { Dictionary } from '@/dictionaries';
import { doctorPortrait } from '@/data/media';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { LogoMark } from '@/components/shared/Logo';

export function DoctorWord({ dict }: { dict: Dictionary }) {
  const copy = dict.about.word;

  return (
    <section className="section-y relative overflow-hidden bg-white">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Portrait — first in DOM = right side in RTL */}
        <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-4 rounded-[2.25rem] border border-silver/80" />
          <div aria-hidden="true" className="absolute -top-8 h-40 w-40 rounded-full bg-gold/20 blur-2xl ltr:-left-8 rtl:-right-8" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper shadow-card-hover">
            <img
              src={doctorPortrait.src}
              alt={copy.portraitAlt}
              width={doctorPortrait.width}
              height={doctorPortrait.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/70 to-transparent" />
          </div>
          <div className="absolute -bottom-6 flex items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-white shadow-card-hover ltr:left-6 rtl:right-6">
            <LogoMark className="size-10" />
            <div>
              <p className="font-extrabold">{copy.signatureName}</p>
              <p className="text-xs text-white/70">{copy.signatureTitle}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-7">
          <Quote aria-hidden="true" className="mb-6 size-14 fill-gold/20 text-gold rtl:-scale-x-100" />
          <SectionHeading align="start" title={copy.title} className="max-w-none" />
          <div className="mt-8 space-y-6 text-lg leading-loose text-ink-700">
            {copy.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-5 border-t border-silver pt-8">
            <span aria-hidden="true" className="h-14 w-1 rounded-full bg-gold" />
            <div>
              <p className="text-3xl font-extrabold text-ink">{copy.signatureName}</p>
              <p className="mt-1 text-sm font-bold text-gold-ink">{copy.signatureTitle}</p>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 160 60"
              className="ms-auto hidden h-14 w-40 text-ink/70 sm:block"
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

import { Check, ClipboardList, FileText, ScanSearch, Scale, UserCheck, type LucideIcon } from 'lucide-react';
import type { Dictionary } from '@/dictionaries';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

const icons: LucideIcon[] = [ClipboardList, ScanSearch, Scale, FileText, UserCheck];

/** The treatment method is a true sequence: each step a dark glass slab led by a floating numeral. */
export function TreatmentMethod({ dict }: { dict: Dictionary }) {
  const copy = dict.services.method;

  return (
    <section className="section-y bg-ink text-white">
      <GlassStage tone="dark" layout="c" />
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading align="start" tone="dark" title={copy.title} description={copy.description} />
        </Reveal>

        <ol className="grid gap-5 lg:col-span-7">
          {copy.steps.map((step, i) => {
            const Icon = icons[i] ?? ClipboardList;
            return (
              <li key={step.title}>
                <GlassCard
                  tone="dark"
                  gold={i === 2}
                  maxTilt={7}
                  delay={i * 0.06}
                  radius="rounded-[1.75rem]"
                  contentClassName="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-5 p-6 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-7 sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-5xl leading-none font-semibold text-outline [transform:translateZ(60px)] sm:text-7xl"
                    dir="ltr"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 [transform-style:preserve-3d]">
                    <h3 className="flex items-center gap-3 font-sans text-lg leading-relaxed font-bold text-white [transform:translateZ(36px)] sm:text-xl">
                      <span className="sr-only">{i + 1}.</span>
                      {step.title}
                      <Icon aria-hidden="true" className="size-5 shrink-0 text-gold/80" strokeWidth={1.5} />
                    </h3>
                    <p className="mt-2 leading-loose text-white/70 [transform:translateZ(22px)]">{step.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2 [transform:translateZ(30px)]">
                      {step.points.map((point) => (
                        <li
                          key={point}
                          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm text-white/90 ring-1 ring-white/15 ring-inset"
                        >
                          <Check aria-hidden="true" className="size-3.5 shrink-0 text-gold" strokeWidth={2.5} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

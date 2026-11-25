import { ClipboardCheck, HeartPulse, Microscope, Stethoscope, type LucideIcon } from 'lucide-react';
import { t, type Dictionary } from '@/dictionaries';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { RingIcon } from '@/components/shared/RingIcon';
import { SectionHeading } from '@/components/shared/SectionHeading';

const stepIcons: LucideIcon[] = [Stethoscope, ClipboardCheck, Microscope, HeartPulse];

/** A real sequence: ring nodes on a gold rail, each step's story in a dark glass slab. */
export function PatientJourney({ dict }: { dict: Dictionary }) {
  const copy = dict.home.journey;

  return (
    <section className="section-y bg-ink text-white">
      <GlassStage tone="dark" layout="b" />
      <div className="container-x">
        <Reveal>
          <SectionHeading align="split" tone="dark" title={copy.title} description={copy.description} />
        </Reveal>

        <ol className="relative mt-16 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {/* Rail: horizontal on lg+, vertical along the reading start below */}
          <span aria-hidden="true" className="absolute start-10 top-10 bottom-10 w-px bg-linear-to-b from-gold via-gold/40 to-white/10 lg:hidden" />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-10 hidden h-px from-gold via-gold/40 to-white/10 lg:block ltr:bg-linear-to-r rtl:bg-linear-to-l"
          />
          {copy.steps.map((step, i) => {
            const Icon = stepIcons[i] ?? Stethoscope;
            return (
              <li key={step.title} className="relative grid grid-cols-[auto_1fr] gap-5 lg:grid-cols-1 lg:gap-7">
                <Reveal variant="zoom" delay={i * 0.1} className="relative z-10 w-fit self-start rounded-full bg-ink">
                  <RingIcon size="lg" tone="dark" interactive={false} className="bg-ink">
                    <Icon className="ring-icon" strokeWidth={1.5} />
                  </RingIcon>
                </Reveal>
                <GlassCard tone="dark" gold={i === 2} delay={0.1 + i * 0.1} radius="rounded-[1.75rem]" contentClassName="p-6">
                  <p className="text-sm font-bold text-gold [transform:translateZ(40px)]">{t(copy.stepLabel, { n: i + 1 })}</p>
                  <h3 className="mt-2 font-sans text-lg leading-relaxed font-bold text-white [transform:translateZ(30px)]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-loose text-white/70 [transform:translateZ(18px)]">{step.text}</p>
                </GlassCard>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

import { ClipboardCheck, HeartPulse, Microscope, Stethoscope, type LucideIcon } from 'lucide-react';
import { t, type Dictionary } from '@/dictionaries';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

const stepIcons: LucideIcon[] = [Stethoscope, ClipboardCheck, Microscope, HeartPulse];

export function PatientJourney({ dict }: { dict: Dictionary }) {
  const copy = dict.home.journey;

  return (
    <section className="section-y relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute -top-32 left-1/2 -z-10 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

      <div className="container-x">
        <Reveal>
          <SectionHeading tone="dark" title={copy.title} description={copy.description} />
        </Reveal>

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Horizontal connector (lg+) */}
          <span
            aria-hidden="true"
            className="absolute inset-x-[12.5%] top-8 hidden h-px bg-linear-to-r from-gold/0 via-gold/60 to-gold/0 lg:block"
          />
          {copy.steps.map((step, i) => {
            const Icon = stepIcons[i] ?? Stethoscope;
            const last = i === copy.steps.length - 1;
            return (
              <Reveal as="li" variant="zoom" key={step.title} delay={i * 0.12} className="relative flex gap-6 lg:flex-col lg:items-center lg:text-center">
                {/* Vertical connector (< lg) */}
                {!last ? (
                  <span aria-hidden="true" className="absolute start-8 top-16 -bottom-10 w-px bg-linear-to-b from-gold/60 to-gold/10 lg:hidden" />
                ) : null}
                <span className="relative z-10 grid size-16 shrink-0 place-items-center rounded-full border-2 border-gold bg-ink text-xl font-extrabold text-gold shadow-[0_0_0_8px_var(--color-ink)]" dir="ltr">
                  {i + 1}
                </span>
                <div className="flex-1 card-smart rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition duration-500 hover:border-gold/40 hover:bg-white/[0.07] lg:mt-2 lg:w-full">
                  <Icon aria-hidden="true" className="size-7 text-gold lg:mx-auto" strokeWidth={1.75} />
                  <p className="mt-4 text-xs font-bold text-white/65">{t(copy.stepLabel, { n: i + 1 })}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-loose text-white/70">{step.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

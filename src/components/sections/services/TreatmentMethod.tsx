import { Check, ClipboardList, FileText, ScanSearch, Scale, UserCheck, type LucideIcon } from 'lucide-react';
import type { Dictionary } from '@/dictionaries';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

const icons: LucideIcon[] = [ClipboardList, ScanSearch, Scale, FileText, UserCheck];

export function TreatmentMethod({ dict }: { dict: Dictionary }) {
  const copy = dict.services.method;

  return (
    <section className="section-y relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute -top-40 -z-10 size-[30rem] rounded-full bg-gold/15 blur-3xl ltr:-left-40 rtl:-right-40" />

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading align="start" tone="dark" title={copy.title} description={copy.description} />
        </Reveal>

        <ol className="grid gap-5 lg:col-span-7">
          {copy.steps.map((step, i) => {
            const Icon = icons[i] ?? ClipboardList;
            return (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.06}
                className="group relative overflow-hidden card-smart rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-500 hover:border-gold/40 hover:bg-white/[0.07] sm:p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-gold text-ink shadow-gold">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                    <span className="absolute -end-2 -top-2 grid size-6 place-items-center rounded-full bg-white text-[0.7rem] font-extrabold text-ink">
                      {i + 1}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg leading-relaxed font-extrabold text-white sm:text-xl">{step.title}</h3>
                    <p className="mt-2 leading-loose text-white/70">{step.text}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-1">
                      {step.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-white/85">
                          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

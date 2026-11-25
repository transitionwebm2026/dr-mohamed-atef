import { CalendarCheck, GraduationCap, HeartHandshake, ShieldCheck, Stethoscope, type LucideIcon } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { localizedPath, routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { GlassCard } from '@/components/shared/glass/GlassCard';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { RingIcon } from '@/components/shared/RingIcon';
import { SectionHeading } from '@/components/shared/SectionHeading';

const pillarIcons: LucideIcon[] = [Stethoscope, GraduationCap, ShieldCheck, HeartHandshake];

export function WhyChoose({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.home.why;

  return (
    <section className="section-y bg-white">
      <GlassStage tone="light" layout="a" />
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading align="start" title={copy.title} description={copy.description} />
          <ButtonLink
            href={`${localizedPath(lang, routes.contact)}#booking`}
            size="lg"
            className="mt-10"
            icon={<CalendarCheck />}
          >
            {copy.cta}
          </ButtonLink>
        </Reveal>

        {/* Pillars as 3D glass slabs; the second column sits lower */}
        <ul className="grid gap-6 sm:grid-cols-2 sm:pb-14 lg:col-span-7">
          {copy.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i] ?? Stethoscope;
            return (
              <li key={pillar.title} className={cn(i % 2 === 1 && 'sm:translate-y-14')}>
                <GlassCard tone="light" gold={i === 0} delay={(i % 2) * 0.12} contentClassName="p-7 sm:p-8">
                  <div className="[transform:translateZ(55px)]">
                    <RingIcon size="md" interactive={false} className="bg-white/80 shadow-[0_12px_24px_-12px_rgb(58_58_56/0.4)]">
                      <Icon className="ring-icon" strokeWidth={1.5} />
                    </RingIcon>
                  </div>
                  <h3 className="mt-6 font-sans text-lg leading-relaxed font-bold text-ink [transform:translateZ(36px)] sm:text-xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 leading-loose text-ink-700 [transform:translateZ(20px)]">{pillar.text}</p>
                </GlassCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import { localeMeta, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { certifications } from '@/data/doctor';
import { GlassStage } from '@/components/shared/glass/GlassStage';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CertCarousel } from './CertCarousel';

/** Degrees & memberships on a turning 3D cylinder of liquid glass. */
export function Certifications({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.about.certifications;

  return (
    <section className="section-y bg-ink text-white">
      <GlassStage tone="dark" layout="a" />
      <div className="container-x">
        <Reveal>
          <SectionHeading align="split" tone="dark" title={copy.title} description={copy.description} />
        </Reveal>
        <div className="mt-12 lg:mt-16">
          <CertCarousel
            dir={localeMeta[lang].dir}
            labels={{ previous: copy.previous, next: copy.next, region: copy.region }}
            items={certifications.map((c) => ({
              id: c.id,
              title: c.title[lang],
              issuer: c.issuer[lang],
              badge: c.badge[lang],
              icon: c.icon,
            }))}
          />
        </div>
      </div>
    </section>
  );
}

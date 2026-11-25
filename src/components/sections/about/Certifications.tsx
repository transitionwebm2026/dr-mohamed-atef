import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/dictionaries';
import { certifications } from '@/data/doctor';
import { DataIcon } from '@/components/shared/DataIcon';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Certifications({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.about.certifications;

  return (
    <section className="section-y relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute -bottom-40 -z-10 size-[32rem] rounded-full bg-gold/10 blur-3xl ltr:-right-40 rtl:-left-40" />
      <div className="container-x">
        <Reveal>
          <SectionHeading tone="dark" title={copy.title} description={copy.description} />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal as="li" variant="zoom" key={cert.id} delay={(i % 3) * 0.08}>
              <article className="group relative h-full overflow-hidden card-smart rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.07]">
                {/* Certificate-style inner frame */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[1.25rem] border border-dashed border-white/10" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid size-14 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
                    <DataIcon name={cert.icon} className="size-7" />
                  </span>
                  <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/75">
                    {cert.badge[lang]}
                  </span>
                </div>
                <h3 className="relative mt-6 text-lg leading-relaxed font-extrabold text-white">{cert.title[lang]}</h3>
                <p className="relative mt-2 text-sm text-gold/90">{cert.issuer[lang]}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

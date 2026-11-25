import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Faq } from '@/data/types';
import { Accordion } from '@/components/shared/Accordion';
import { ButtonLink, KnobArrow } from '@/components/shared/ButtonLink';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { whatsappUrl } from '@/lib/utils';

interface FaqSectionProps {
  lang: Locale;
  faqs: Faq[];
  title: string;
  description: string;
  id?: string;
  more?: { label: string; href: string };
  ask: { label: string; message: string };
  className?: string;
}

export function FaqSection({ lang, faqs, title, description, id, more, ask, className }: FaqSectionProps) {
  const items = faqs.map((f) => ({ id: f.id, question: f.question[lang], answer: f.answer[lang] }));

  return (
    <section id={id} className={className ?? 'section-y bg-white'}>
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading align="start" title={title} description={description} />
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href={whatsappUrl(ask.message)} external variant="dark" icon={<MessageCircle />}>
              {ask.label}
            </ButtonLink>
            {more ? (
              <Link
                href={more.href}
                className="group/btn link-sweep inline-flex items-center gap-2 pb-1 text-sm font-bold text-ink"
              >
                {more.label}
                <KnobArrow />
              </Link>
            ) : null}
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}

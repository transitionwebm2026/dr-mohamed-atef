import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Faq } from '@/data/types';
import { Accordion } from '@/components/shared/Accordion';
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
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={whatsappUrl(ask.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-ink underline decoration-gold decoration-2 underline-offset-8 transition-colors hover:text-gold-ink"
            >
              <MessageCircle aria-hidden="true" className="size-5 text-gold-600" />
              {ask.label}
            </a>
            {more ? (
              <Link
                href={more.href}
                className="inline-flex items-center gap-2 font-bold text-ink-500 transition-colors hover:text-ink"
              >
                {more.label}
                <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
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

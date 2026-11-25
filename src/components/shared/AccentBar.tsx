'use client';

import { m } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Gold accent bar under section titles — draws itself in when it enters the viewport. */
export function AccentBar({ centered }: { centered: boolean }) {
  return (
    <m.span
      aria-hidden="true"
      className={cn(
        'mt-5 block h-1 w-16 rounded-full bg-linear-to-r from-gold via-gold-300 to-gold',
        centered ? 'mx-auto origin-center' : 'ltr:origin-left rtl:origin-right',
      )}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

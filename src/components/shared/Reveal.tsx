'use client';

import { m, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealVariant = 'up' | 'zoom' | 'fade';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px for the `up` variant. */
  y?: number;
  /** `up`: rise + de-blur (default) · `zoom`: scale-in + de-blur (cards) · `fade`: opacity only. */
  variant?: RevealVariant;
  as?: 'div' | 'li' | 'article';
}

const EASE = [0.22, 1, 0.36, 1] as const;

function buildVariants(variant: RevealVariant, y: number): Variants {
  switch (variant) {
    case 'zoom':
      return {
        hidden: { opacity: 0, y: Math.min(y, 18), scale: 0.94, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
      };
    case 'fade':
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    default:
      return {
        hidden: { opacity: 0, y, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      };
  }
}

/** Smart viewport entrance (runs once): soft blur → sharp, with rise or zoom. */
export function Reveal({ children, className, delay = 0, y = 32, variant = 'up', as = 'div' }: RevealProps) {
  const Component = as === 'li' ? m.li : as === 'article' ? m.article : m.div;
  return (
    <Component
      className={className}
      variants={buildVariants(variant, y)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -70px 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

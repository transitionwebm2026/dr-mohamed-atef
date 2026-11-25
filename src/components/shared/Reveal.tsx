'use client';

import { m, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealVariant = 'up' | 'zoom' | 'swing' | 'fade';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /**
   * Quiet entrances (all run once):
   * - `up`    rises a little while fading in
   * - `zoom`  rises + settles from 97% scale (media, list items)
   * - `swing` media fades in from a slight scale-up
   * - `fade`  opacity only
   */
  variant?: RevealVariant;
  as?: 'div' | 'li' | 'article';
}

const EASE = [0.22, 1, 0.36, 1] as const;

function buildVariants(variant: RevealVariant, y: number): Variants {
  switch (variant) {
    case 'zoom':
      return {
        hidden: { opacity: 0, y: y * 0.6, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };
    case 'swing':
      return {
        hidden: { opacity: 0, scale: 1.04 },
        visible: { opacity: 1, scale: 1 },
      };
    case 'fade':
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    default:
      return {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      };
  }
}

/** Viewport-triggered entrance, runs once. */
export function Reveal({ children, className, delay = 0, y = 24, variant = 'up', as = 'div' }: RevealProps) {
  const Component = as === 'li' ? m.li : as === 'article' ? m.article : m.div;
  return (
    <Component
      className={className}
      variants={buildVariants(variant, y)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

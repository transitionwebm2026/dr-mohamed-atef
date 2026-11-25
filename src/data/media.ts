import type { HeroImage } from './types';

/**
 * Hero imagery. Every page uses a full-bleed shot with Dr. Mohamed Atef centred.
 * Replace the files in /public/images/doctor/ with the doctor's real photography:
 *  - desktop: 2560×1080 (≈21:9), subject centred and occupying ~25% of the width, with
 *    calm empty backdrop on both sides (the copy sits on one side, the gradient on top)
 *  - mobile:  828×1300 (portrait), face in the upper half
 */
const doctorHero: HeroImage = {
  desktop: '/images/doctor/hero-desktop.webp',
  mobile: '/images/doctor/hero-mobile.webp',
  alt: {
    ar: 'د. محمد عاطف الكردي، استشاري جراحة أمراض القولون والمستقيم والشرج',
    en: 'Dr. Mohamed Atef ElKordy, Colon & Rectal Surgery Consultant',
  },
};

export const heroImages = {
  home: doctorHero,
  about: doctorHero,
  services: doctorHero,
  reviews: doctorHero,
  videos: doctorHero,
  articles: doctorHero,
  contact: doctorHero,
} satisfies Record<string, HeroImage>;

export const doctorPortrait = {
  src: '/images/doctor/portrait.webp',
  width: 880,
  height: 1100,
};

export const ogImage = {
  src: '/images/og/og-cover.jpg',
  width: 1200,
  height: 630,
};

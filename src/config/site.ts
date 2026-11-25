/**
 * Central business configuration.
 * Phone: clinic number published on the doctor's Dalili Medical listing (01021228989).
 * ⚠️ Confirm it (and that it has WhatsApp) with the clinic, and fill in any missing channels.
 *    Empty strings hide the corresponding link/row everywhere on the site.
 */
const social = {
  facebook: 'https://www.facebook.com/share/19ES9k9XE6/',
  // TODO: replace with the doctor's real profile links (icons are shown meanwhile)
  instagram: 'https://www.instagram.com/',
  youtube: '',
  tiktok: 'https://www.tiktok.com/',
};

export type SocialNetwork = keyof typeof social;

export const siteConfig = {
  /** Absolute production URL without trailing slash — set NEXT_PUBLIC_SITE_URL before building. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.drmohamedatefelkordy.com').replace(/\/+$/, ''),

  /** Primary clinic phone — `e164` is used for tel: links and structured data. */
  phone: {
    display: '010 2122 8989',
    e164: '+201021228989',
  },

  /** WhatsApp number in international format, digits only (no "+" or spaces). */
  whatsapp: '201021228989',

  /** Leave empty to hide the email row. */
  email: '',

  social: social as Record<SocialNetwork, string>,

  /** Theme colour used by browsers (address bar) and the web manifest. */
  themeColor: '#3a3a38',

  /** Footer credit badge (design & development agency). */
  credit: {
    name: 'Transition',
    url: 'https://transitioneg.com/',
    logo: { src: '/images/brand/transition-logo.webp', width: 115, height: 96 },
  },
} as const;

/** Social networks that actually have a URL configured. */
export const activeSocials = (Object.keys(social) as SocialNetwork[]).filter((n) => Boolean(social[n]));

/** Where video cards without a YouTube ID link to (YouTube channel, else Facebook page). */
export const videoChannel = social.youtube || social.facebook;

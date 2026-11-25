import type { ComponentType, SVGProps } from 'react';
import { activeSocials, siteConfig, type SocialNetwork } from '@/config/site';
import { cn } from '@/lib/utils';
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from './BrandIcons';

const icons: Record<SocialNetwork, ComponentType<SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
};


interface SocialLinksProps {
  labels: Record<SocialNetwork, string>;
  variant?: 'hero' | 'footer';
  className?: string;
}

export function SocialLinks({ labels, variant = 'footer', className }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {activeSocials.map((network) => {
        const Icon = icons[network];
        return (
          <li key={network}>
            <a
              href={siteConfig.social[network]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels[network]}
              className={cn(
                'grid size-10 place-items-center rounded-full ring-1 ring-inset transition duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-ink hover:ring-gold',
                variant === 'hero'
                  ? 'bg-white/10 text-white ring-white/20 backdrop-blur-md'
                  : 'text-white/80 ring-white/15',
              )}
            >
              <Icon className="size-[1.05rem]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

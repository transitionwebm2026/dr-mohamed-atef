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
                'grid size-10 place-items-center rounded-full transition duration-300',
                variant === 'hero'
                  ? 'border border-white/25 bg-white/10 text-white backdrop-blur-md hover:border-gold hover:bg-gold hover:text-ink'
                  : 'border border-white/10 bg-white/5 text-white/80 hover:border-gold hover:bg-gold hover:text-ink',
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

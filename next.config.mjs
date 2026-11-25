/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static output (./out) — deployable to any static host (Hostinger, Netlify, S3…)
  output: 'export',
  // Emit /ar/about/index.html so Apache/LiteSpeed serve clean URLs without rewrites
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Single 404 page for the whole app (root layout lives under the dynamic [lang] segment)
    globalNotFound: true,
  },
};

export default nextConfig;

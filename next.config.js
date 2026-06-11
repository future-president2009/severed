/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local images are pre-optimized, but allow Next.js to further serve modern formats
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;

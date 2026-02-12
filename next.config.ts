import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel optimizations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Optimize for Vercel
  swcMinify: true,
};

export default nextConfig;

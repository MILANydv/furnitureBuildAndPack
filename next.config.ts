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
};

export default nextConfig;

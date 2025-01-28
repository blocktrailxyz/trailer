import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Frontend API route
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`, // Backend Fastify route
      },
    ];
  },
  // Additional Next.js configurations (optional)
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;

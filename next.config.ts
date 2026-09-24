import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"}/api/:path*`,
      },
    ];
  },
  experimental: {
    // Use lightningcss which supports modern CSS features like @layer properties
    // that Turbopack needs for Tailwind v4 compatibility
    cssChunking: true,
  },
};

export default nextConfig;

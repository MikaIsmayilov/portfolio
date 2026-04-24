import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "public.tableau.com",
      },
    ],
  },
};

export default nextConfig;

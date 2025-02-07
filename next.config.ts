import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "yourdomain.com", "s3.amazonaws.com", "r2.cloudflare.com"], // Danh sách các domain hợp lệ
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        // pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "yourdomain.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/your-bucket/**",
      },
      {
        protocol: "https",
        hostname: "pub-3ba9c77385e24a1eadfbc97e9d677b73.r2.dev",
        // pathname: "/your-r2-bucket/**",
      },
    ],
  },
};

export default nextConfig;

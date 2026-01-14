import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.treasureprops.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.treasurepal.co.zw",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "treasurepal-backened.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nyc.cloud.appwrite.io", // 👈 Appwrite domain for storage
        pathname: "/**",
      },
    ],
  },
  experimental: {
    swcPlugins: [],
  },
};

export default nextConfig;

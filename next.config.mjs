import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    // ✅ All allowed domains
    domains: ["ui-avatars.com", "images.pexels.com", "www.treasureprops.com"],
    // ✅ Remote patterns for stricter matching
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
        hostname: "www.treasureprops.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    swcPlugins: [],
  },
};

export default nextConfig;

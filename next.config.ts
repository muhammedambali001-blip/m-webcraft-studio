import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Standalone output is only used for self-hosting; Vercel builds the app
     with its own runtime, so we keep the default output here. */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;

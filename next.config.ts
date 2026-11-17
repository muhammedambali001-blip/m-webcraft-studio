import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Standalone output is only used for self-hosting; Vercel builds the app
     with its own runtime, so we keep the default output here. */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  /* Allow measurement builds to write to an isolated directory so the live
     dev server's .next is never touched (NEXT_DIST_DIR=.next-measure). */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  images: {
    /* Serve AVIF (smallest) then WebP to browsers that support them.
       Next.js compresses text responses (gzip/brotli) automatically. */
    formats: ["image/avif", "image/webp"],
    /* Photographic quality: q90 keeps the portrait/logo sharp (the default
       75 visibly softened fine detail). 75 stays allowed for any image that
       does not request a specific quality. */
    qualities: [75, 90],
    /* The source photographs are 854px wide at most — never let the
       optimizer generate upscaled (blurry) variants above native size. */
    deviceSizes: [640, 750, 828, 854],
    /* Optimised variants are stable: let browsers cache them for 31 days. */
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        /* Unversioned public assets: cache for a week in the browser and
           serve stale while revalidating for 30 days after that. Chunked,
           fingerprinted /_next/static files already get immutable caching. */
        source: "/:all*(webp|png|jpg|jpeg|svg|ico|txt|xml|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served under agent-engineering.ch/ml-foundations via a rewrite in the
  // agent-engineering Vercel project. Locally the page lives at
  // localhost:3000/ml-foundations as well.
  basePath: "/ml-foundations",
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: { globalNotFound: true },
  async rewrites() {
    return {
      beforeFiles: ["", "/services", "/about", "/contact"].map((path) => ({
        source: path || "/",
        destination: `/en${path}`,
      })),
      afterFiles: [],
      fallback: [],
    };
  },
};
export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Static export → S3. No server at runtime. */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

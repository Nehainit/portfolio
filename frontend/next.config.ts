import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/chat": ["./src/content/*.md"],
  },
};

export default nextConfig;

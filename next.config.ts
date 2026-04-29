import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "100.103.79.86", "mini"],
  output: "standalone",
};

export default nextConfig;

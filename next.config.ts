import type { NextConfig } from "next";

import NextBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";
const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // root: path.join(__dirname, "."),
    // resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
export default withBundleAnalyzer(nextConfig);

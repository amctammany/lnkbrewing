import type { NextConfig } from "next";

import NextBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";
const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.join(__dirname, "."),
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  experimental: {
    useCache: true,
    ppr: "incremental",
    authInterrupts: true,
  },
  /**
   * 
  eslint: {
    ignoreDuringBuilds: true,
  },
   */
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
/**const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: true,
});
export default process.env.ANALYZE === "true"
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
  */
export default withBundleAnalyzer(nextConfig);

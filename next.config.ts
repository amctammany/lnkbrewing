import type { NextConfig } from "next";

import NextBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";
const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.join(__dirname, "."),
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  reactCompiler: {
    compilationMode: "annotation",
  },
  experimental: {
    useCache: true,
    //    cacheComponents: true,
    authInterrupts: true,
  },
  /**
   * 
  eslint: {
    ignoreDuringBuilds: true,
  },
   */
};

const withBundleAnalyzer1 = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
//const c =
// process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;
export default withBundleAnalyzer1(nextConfig);

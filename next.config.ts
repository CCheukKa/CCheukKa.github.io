import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'export',
    distDir: 'out',
    productionBrowserSourceMaps: true,
};

export default nextConfig;
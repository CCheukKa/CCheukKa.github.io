import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    distDir: 'out',
    generateBuildId: async () => {
        return process.env.GIT_HASH
            ? `GIT_HASH_${process.env.GIT_HASH}`
            : `BUILD_TIME_${Date.now().toString(36)}`;
    },
    output: 'export',
    productionBrowserSourceMaps: true,
    reactCompiler: true,
    reactStrictMode: true,
    typedRoutes: true,
};

export default nextConfig;
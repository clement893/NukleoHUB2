/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nukleohub/ui', '@nukleohub/commercial'],
  experimental: {
    optimizePackageImports: ['@nukleohub/ui'],
  },
};

module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    // 允許從 API 路由載入圖片
    remotePatterns: [],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // 簡化 webpack 配置，只保留必要的路徑別名
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
}

module.exports = nextConfig

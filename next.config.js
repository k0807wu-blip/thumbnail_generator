/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  webpack: (config, { isServer }) => {
    // 設定路徑別名
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    
    // 確保 PostCSS 配置正確載入
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
}

module.exports = nextConfig

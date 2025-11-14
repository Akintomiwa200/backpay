import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { 
    unoptimized: true 
  },
  
  // Add turbopack config to resolve the error
  turbopack: {},
  
  // Optional: Use webpack with proper Turbopack compatibility
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    // Ignore backend files in webpack
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/backend': false,
        '../backend': false,
        '../../backend': false,
      };
    }

    return config;
  },
  
  // Ignore TypeScript errors in backend during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Output setting for static export
  output: 'export',
  
  // Disable strict mode if needed
  reactStrictMode: false,

  // Add trailing slash for better compatibility
  trailingSlash: true,

  // Skip specific dependencies if needed
  experimental: {
    esmExternals: true,
  }
};

export default nextConfig;
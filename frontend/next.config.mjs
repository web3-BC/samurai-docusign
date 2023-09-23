/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    turbo: {},
    serverActions: true,
    // esmExternals: false,
    // fallbackNodePolyfills: false,
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: ["ipfs.io"],
    minimumCacheTTL: 86400,
  },
  webpack: (config, context) => {
    if (!context.isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.child_process = false;
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
};

export default config;

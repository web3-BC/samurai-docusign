/** @type {import("next").NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://ipfs.io' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Accept, Accept-Version, Content-Length, Content-Type' },
        ],
      },
    ]
  },
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

    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
};

export default config;

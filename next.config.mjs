/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['mongodb', 'bcryptjs', 'jsonwebtoken'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle these server-only modules on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
      }
      
      config.externals = config.externals || []
      config.externals.push({
        'mongodb': 'commonjs mongodb',
        'bcryptjs': 'commonjs bcryptjs',
        'jsonwebtoken': 'commonjs jsonwebtoken',
      })
    }
    return config
  },
}

export default nextConfig

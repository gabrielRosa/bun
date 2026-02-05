/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@use "@/styles/variables" as v;`,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  }
};

export default nextConfig;

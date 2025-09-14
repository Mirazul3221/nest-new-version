/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['three'],
    eslint: {
        ignoreDuringBuilds: true,
      },

};

export default nextConfig;
//ok

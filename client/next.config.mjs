import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: false,
  transpilePackages: ["three"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeFonts: false, // enable font optimization
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // PWA disabled in dev
  },
});

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    domains: ['images.unsplash.com'], // Add 'images.unsplash.com' to the domains array
  },
  webpack(config) {
    return config;
  },}

module.exports = nextConfig

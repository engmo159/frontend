/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig

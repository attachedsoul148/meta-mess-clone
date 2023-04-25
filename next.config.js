/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'links.papareact.com',
      'scontent.flwo4-2.fna.fbcdn.net',
      'platform-lookaside.fbsbx.com',
    ],
  },
}

module.exports = nextConfig

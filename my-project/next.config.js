/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
serverActions:true,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'links.papareact.com',
           
          },
        ],
      }
}

module.exports = nextConfig
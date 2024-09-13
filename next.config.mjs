/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'as2.ftcdn.net',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  
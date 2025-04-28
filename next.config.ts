import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
 images: {
    domains:[
      "img.freepik.com",
      "res.cloudinary.com"
    ]
  }
};

export default nextConfig;

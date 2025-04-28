import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // IGNORA ERROS DE TYPESCRIPT DURANTE O BUILD
  },
 images: {
    domains:[
      "img.freepik.com",
      "res.cloudinary.com"
    ]
  }
};

export default nextConfig;

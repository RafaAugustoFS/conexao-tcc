import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // IGNORA ERROS DE TYPESCRIPT DURANTE O BUILD
  },
 images: {
    domains:[
      "img.freepik.com",
      "res.cloudinary.com"
    ],
    // Otimizações recomendadas:
    formats: ['image/webp'], // Habilita conversão para WebP
    minimumCacheTTL: 60, // Cache mínimo de 60 segundos
  },

  // Configuração de performance (opcional mas recomendado)
  compress: true, // Ativa compressão GZIP
  
};

export default nextConfig;
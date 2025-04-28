import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração obrigatória para deploy na Vercel
  output: 'standalone', // Gera uma pasta standalone otimizada

  // Configuração de otimização de imagens
  images: {
    domains: [
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
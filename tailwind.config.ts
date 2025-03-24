import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // <-- Adicionado para permitir modo escuro manual
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
<<<<<<< Updated upstream
=======
      fontFamily: {
        epilogue: ["var(--font-epilogue)", ...fontFamily.sans],
      },
      screens: {
        // Breakpoints padrão (min-width) - LARGURAS MÍNIMAS
        'min-2xs': '360px',   // Dispositivos muito pequenos
        'min-xs': '480px',    // Celulares pequenos
        'min-sm': '640px',    // Celulares grandes
        'min-md': '768px',    // Tablets pequenos
        'min-lg': '1024px',   // Tablets grandes/notebooks
        'min-xl': '1280px',   // Desktops médios
        'min-2xl': '1536px',  // Desktops grandes
        'min-3xl': '1920px',  // Telas extra grandes
        'min-4xl': '2560px',  // Telas 4K

        // LARGURAS MÁXIMAS (max-width)
        'max-2xs': {'max': '359px'},  // Tudo abaixo de 360px
        'max-xs': {'max': '479px'},   // Tudo abaixo de 480px
        'max-sm': {'max': '639px'},   // Tudo abaixo de 640px
        'max-md': {'max': '767px'},   // Tudo abaixo de 768px
        'max-lg': {'max': '1023px'},  // Tudo abaixo de 1024px
        'max-xl': {'max': '1279px'},  // Tudo abaixo de 1280px
        'max-2xl': {'max': '1535px'}, // Tudo abaixo de 1536px
        'max-3xl': {'max': '1919px'}, // Tudo abaixo de 1920px
        'max-4xl': {'max': '2559px'}, // Tudo abaixo de 2560px

        // FAIXAS ESPECÍFICAS (min-width e max-width combinados)
        'only-2xs': {'min': '360px', 'max': '479px'},
        'only-xs': {'min': '480px', 'max': '639px'},
        'only-sm': {'min': '640px', 'max': '767px'},
        'only-md': {'min': '768px', 'max': '1023px'},
        'only-lg': {'min': '1024px', 'max': '1279px'},
        'only-xl': {'min': '1280px', 'max': '1535px'},
        'only-2xl': {'min': '1536px', 'max': '1919px'},
        'only-3xl': {'min': '1920px', 'max': '2559px'},

        // BREAKPOINTS BASEADOS EM ALTURA
        'short': { 'raw': '(max-height: 750px)' },     // Telas curtas
        'tall': { 'raw': '(min-height: 900px)' },      // Telas altas
        'very-tall': { 'raw': '(min-height: 1200px)' }, // Telas muito altas
        
        // Breakpoints para dispositivos específicos (opcional)
        'iphone-se': { 'raw': '(max-width: 375px) and (max-height: 667px)' }, // iPhone SE
        'foldable': { 'raw': '(max-width: 768px) and (max-height: 1024px)' }, // Tablets/dobráveis
      },
>>>>>>> Stashed changes
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
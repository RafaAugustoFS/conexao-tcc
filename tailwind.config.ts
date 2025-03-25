import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
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
      fontFamily: {
        epilogue: ["var(--font-epilogue)", "sans-serif"], // Corrigido: substituído fontFamily.sans por "sans-serif"
      },
      screens: {
        // Breakpoints padrão (min-width)
        'min-2xs': '360px',
        'min-xs': '480px',
        'min-sm': '640px',
        'min-md': '768px',
        'min-lg': '1024px',
        'min-xl': '1280px',
        'min-2xl': '1536px',
        'min-3xl': '1920px',
        'min-4xl': '2560px',

        // LARGURAS MÁXIMAS (max-width)
        'max-2xs': {'max': '359px'},
        'max-xs': {'max': '479px'},
        'max-sm': {'max': '639px'},
        'max-md': {'max': '767px'},
        'max-lg': {'max': '1023px'},
        'max-xl': {'max': '1279px'},
        'max-2xl': {'max': '1535px'},
        'max-3xl': {'max': '1919px'},
        'max-4xl': {'max': '2559px'},

        // FAIXAS ESPECÍFICAS
        'only-2xs': {'min': '360px', 'max': '479px'},
        'only-xs': {'min': '480px', 'max': '639px'},
        'only-sm': {'min': '640px', 'max': '767px'},
        'only-md': {'min': '768px', 'max': '1023px'},
        'only-lg': {'min': '1024px', 'max': '1279px'},
        'only-xl': {'min': '1280px', 'max': '1535px'},
        'only-2xl': {'min': '1536px', 'max': '1919px'},
        'only-3xl': {'min': '1920px', 'max': '2559px'},

        // BREAKPOINTS BASEADOS EM ALTURA
        'short': {'raw': '(max-height: 750px)'},
        'tall': {'raw': '(min-height: 900px)'},
        'very-tall': {'raw': '(min-height: 1200px)'},
       
        // Breakpoints para dispositivos específicos
        'iphone-se': {'raw': '(max-width: 375px) and (max-height: 667px)'},
        'foldable': {'raw': '(max-width: 768px) and (max-height: 1024px)'},
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
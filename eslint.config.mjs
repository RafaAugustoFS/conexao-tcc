import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Regras personalizadas para suprimir erros
    rules: {
      "@next/next/no-html-link-for-pages": "off",       // Exemplo: Desativa aviso de links HTML no Next.js
      "@typescript-eslint/no-unused-vars": "warn",      // Transforma erros de variáveis não usadas em avisos
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-console": "off",                             // Permite uso de console.log
      "react/no-unescaped-entities": "off",            // Desativa avisos de entidades HTML no JSX
      // Adicione outras regras conforme necessário
    },
  },
];

export default eslintConfig;
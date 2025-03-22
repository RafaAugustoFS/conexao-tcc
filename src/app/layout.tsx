// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Epilogue } from "next/font/google"; // Importe a fonte Epilogue

export const metadata: Metadata = {
  title: "On Academy",
  description: "On Academy",
};

// Configuração da fonte Geist
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuração da fonte Epilogue
const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue", // Defina uma variável CSS para a fonte
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${epilogue.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}